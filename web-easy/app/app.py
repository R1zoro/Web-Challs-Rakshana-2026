import os
import time
import hashlib
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from procurement_data import NEWS_TICKER, VENDORS, CIRCULARS, TENDERS

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "M_AMCEL_Static_Session_Secret_2026_Prod!")


USERS = {
    "contractor_testing": {
        "password": "Mait@Procure2026!",
        "name": "Vikram Adit (QA Inspector)",
        "org": "Adit Precision Valves & Subcontracting Ltd.",
        "role": "External QA Contractor",
        "orders": ["ORD-2026-8812"]
    }
}

INVOICES = {
    "ORD-2026-8812": {
        "order_id": "ORD-2026-8812",
        "invoice_id": "INV-2026-8812",
        "po_number": "PO-MAMCEL-2026-Q3-094",
        "item": "Class-A Zirconium Alloy Cladding Seals",
        "specification": "ASTM B811 / Reactor Grade Zircaloy-4 (OD 9.5mm, WT 0.57mm)",
        "quantity": "24 units",
        "date": "2026-10-14",
        "amount": "₹ 4,82,000",
        "tax": "₹ 86,760 (GST @ 18%)",
        "grand_total": "₹ 5,68,760",
        "status": "Delivered - Partial Defects Reported",
        "shipping_address": "QA Inspection Bay 4, Adit Heavy Valves, Industrial Estate, Okhla Phase III, New Delhi",
        "ticket_id": 10
    }
}

CATALOG = [
    {
        "id": "MAT-ZR4",
        "name": "Zircaloy-4 Fuel Cladding Tubes",
        "category": "Core Metallurgy",
        "purity": "99.85% Reactor Grade",
        "stock": "180 assemblies",
        "compliance": "AERB-NF-2024 / ASTM B811",
        "image": "zirconium-tubes.jpg",
        "desc": "Low thermal neutron absorption cross-section zirconium-tin alloy designed specifically for fuel rod structural cladding."
    },
    {
        "id": "MAT-B10",
        "name": "Enriched Boron-10 Control Rod Pellets",
        "category": "Neutron Absorption",
        "purity": "96.4% B-10 Isotopic Enrichment",
        "stock": "65 kg",
        "compliance": "IAEA-SGS-Cat3 / ISO-19443",
        "image": "boron-pellets.jpg",
        "desc": "High-density sintered boron carbide (B4C) pellets for emergency reactivity attenuation and secondary shutdown assemblies."
    },
    {
        "id": "MAT-D2O",
        "name": "Reactor Grade Heavy Water (D2O)",
        "category": "Moderators & Coolants",
        "purity": "99.92% Isotopic Purity",
        "stock": "42 drums (210L each)",
        "compliance": "BARC-QA-09 / AERB Nuclear Spec",
        "image": "heavy-water.jpg",
        "desc": "Ultra-pure deuterium oxide moderator fluids with electrical conductivity under 0.1 uS/cm for pressurized heavy-water cores."
    },
    {
        "id": "MAT-GR7",
        "name": "High-Density Nuclear Graphite Blocks",
        "category": "Core Reflectors",
        "purity": "Total Ash Content < 100 ppm",
        "stock": "340 blocks",
        "compliance": "ISO 9001:2015 / AERB Reflector Code",
        "image": "graphite-blocks.jpg",
        "desc": "Extruded isotropic nuclear graphite blocks optimized for high thermal conductivity and thermal neutron reflection."
    }
]

# Grievance Ticket Store (IDs 1 through 12)
TICKETS = {
    1: {
        "id": 1,
        "author": "R. K. Mishra (Materials Inspector)",
        "department": "Narora Atomic Power Station - Unit 2",
        "invoice_ref": "INV-NAPS-LD-041",
        "subject": "Lead Shielding Brick dimensional variance",
        "date": "2026-10-09 10:15 IST",
        "priority": "Low",
        "status": "Closed",
        "body": "Batch #12 lead interlocking blocks showed a 0.8mm edge bevel deviation. Re-machined onsite under vendor supervision.",
        "resolution": "QA deviation report accepted by NAPS site engineer."
    },
    2: {
        "id": 2,
        "author": "G. Venkatesh (Operations Sup.)",
        "department": "Kaiga Generating Station - Primary Heat Transport",
        "invoice_ref": "INV-KGS-VALVE-902",
        "subject": "Stem packing leakage on emergency bypass valve",
        "date": "2026-10-10 14:40 IST",
        "priority": "Medium",
        "status": "Closed",
        "body": "During cold hydrostatic testing, valve spindle gland showed 4 drops/min seepage at 110 kg/cm2 pressure.",
        "resolution": "Vendor dispatched specialist retrofit kit. Gland repacked with graphite foil ring."
    },
    3: {
        "id": 3,
        "author": "Dr. Meenakshi S. (Radiochemistry)",
        "department": "BARC Materials Science Division, Trombay",
        "invoice_ref": "INV-BARC-ZR-889",
        "subject": "Request for Spectrographic Hafnium assay report",
        "date": "2026-10-12 16:05 IST",
        "priority": "Low",
        "status": "Resolved",
        "body": "Zircaloy cladding shipment arrived safely. We need the verified Hafnium impurity ppm breakdown for archive.",
        "resolution": "Inductively Coupled Plasma Mass Spectrometry (ICP-MS) certificate transmitted via secure courier."
    },
    4: {
        "id": 4,
        "author": "Dr. Arun Sharma (Lead Reactor Safety Operations)",
        "department": "MAIT Nuclear Research Facility (MAIT-NRF)",
        "invoice_ref": "INV-MNRF-BORON-EMERGENCY",
        "subject": "CRITICAL: Accidental disclosure of internal session memo in procurement ticket",
        "date": "2026-10-13 03:22 IST",
        "priority": "High / Security Escalation",
        "status": "Pending Manual Purge",
        "body": (
            "URGENT ATTENTION: To the Vendor Central Logistics Desk,\n\n"
            "During our emergency requisition for Boron-10 reactivity suppression pellets, our junior technician "
            "inadvertently pasted internal MAIT Nuclear Research Facility emergency investigation notes into the purchase order annexure!\n\n"
            "The notes contain my administrative incident passphrase:\n"
            "RAKSHNA{1d0r_r3v34ls_pr0cur3m3nt_l34k}\n\n"
            "This secret is used to access our isolated internal incident investigation platform at:\n"
            "http://incident-portal.internal\n\n"
            "Please immediately purge this requisition ticket, cancel public vendor archiving, and destroy the attached memo."
        ),
        "resolution": "Ticket locked and flagged for deletion by M-AMCEL Information Security Officer."
    },
    5: {
        "id": 5,
        "author": "H. P. Patel (Maintenance Head)",
        "department": "Kakrapar Atomic Power Project - Unit 3",
        "invoice_ref": "INV-KAPP-D2O-114",
        "subject": "Heavy Water transport drum seal integrity verification",
        "date": "2026-10-14 11:00 IST",
        "priority": "Low",
        "status": "Closed",
        "body": "Drum #07 tamper-proof seal arrived with an unreadable barcode. Re-verification required.",
        "resolution": "Physical seal serial number cross-referenced with AERB consignment manifest."
    },
    6: {
        "id": 6,
        "author": "D. Roy (Fuel Handling Section)",
        "department": "Tarapur Atomic Power Station",
        "invoice_ref": "INV-TAPS-GRP-331",
        "subject": "Graphite reflector block batch certificate discrepancy",
        "date": "2026-10-15 09:12 IST",
        "priority": "Low",
        "status": "Closed",
        "body": "Delivery invoice listed batch GR-402, but shipping pallet tag indicated GR-403.",
        "resolution": "Typographical error on vendor dispatch desk corrected. Certificate reissued."
    },
    7: {
        "id": 7,
        "author": "A. K. Subramanian",
        "department": "Kudankulam Nuclear Power Plant - Unit 2",
        "invoice_ref": "INV-KKNPP-TITAN-701",
        "subject": "Titanium-stabilized secondary piping coupon testing",
        "date": "2026-10-15 15:45 IST",
        "priority": "Medium",
        "status": "Resolved",
        "body": "Intergranular corrosion test coupons required for the recent piping consignment.",
        "resolution": "Mill test coupons dispatched with ultrasonic examination documentation."
    },
    8: {
        "id": 8,
        "author": "S. Chouhan (Instrument Control)",
        "department": "Rajasthan Atomic Power Station (RAPS), Rawatbhata",
        "invoice_ref": "INV-RAPS-SEAL-552",
        "subject": "Control rod drive mechanism elastomeric O-rings shelf-life inquiry",
        "date": "2026-10-16 12:20 IST",
        "priority": "Low",
        "status": "Closed",
        "body": "Cure date on ethylene propylene diene monomer (EPDM) seals was missing from the inner blister packet.",
        "resolution": "OEM cure date verified as Q3-2026 with 5-year rated shelf life."
    },
    9: {
        "id": 9,
        "author": "Devinder Singh (Procurement Executive)",
        "department": "Gorakhpur Haryana Anu Vidyut Pariyojana (GHAVP)",
        "invoice_ref": "INV-GHAVP-SEN-220",
        "subject": "Sensor calibration test coupon delivery delay",
        "date": "2026-10-17 14:05 IST",
        "priority": "Low",
        "status": "Closed",
        "body": "Consignment delayed by 48 hours at Haryana interstate checkpost.",
        "resolution": "Priority green corridor transit clearance issued. Consignment received."
    },
    10: {
        "id": 10,
        "author": "Vikram Adit (QA Inspector)",
        "department": "Adit Precision Valves / External QA Contractor",
        "invoice_ref": "INV-2026-8812",
        "subject": "Micro-abrasions observed on outer flange seal delivery",
        "date": "2026-10-18 10:30 IST",
        "priority": "Medium",
        "status": "Resolved - Credit Note Dispatched",
        "body": "During receipt inspection of Invoice INV-2026-8812, batch #441 showed surface abrasions on 3 out of 24 units. Replacement seals requested.",
        "resolution": "RMA approved. Replacement batch cleared by M-AMCEL metallurgical lab."
    },
    11: {
        "id": 11,
        "author": "P. N. Joshi (Executive Director)",
        "department": "NPCIL Headquarters, Commercial Directorate, Mumbai",
        "invoice_ref": "INV-NPCIL-ANNUAL-004",
        "subject": "Annual Rate Contract schedule-II indexation clause",
        "date": "2026-10-19 11:50 IST",
        "priority": "Low",
        "status": "Closed",
        "body": "Clarification required on alloy raw material price fluctuation formula for FY 2026-27.",
        "resolution": "Formula aligned with Reserve Bank of India wholesale metals index."
    },
    12: {
        "id": 12,
        "author": "K. Balakrishnan (Fast Reactor Section)",
        "department": "Indira Gandhi Centre for Atomic Research (IGCAR), Kalpakkam",
        "invoice_ref": "INV-IGCAR-SODIUM-612",
        "subject": "Liquid metal heat exchanger gasket ultrasonic testing log",
        "date": "2026-10-20 17:10 IST",
        "priority": "Medium",
        "status": "Closed",
        "body": "Ultrasonic immersion test records requested for specialized nickel-chromium gaskets.",
        "resolution": "Digitally certified NDT logs uploaded to IGCAR vendor portal."
    }
}

@app.route('/')
def root():
    return redirect(url_for('home'))

@app.route('/home')
def home():
    divisions = sorted(list(set(t['division'] for t in TENDERS)))
    return render_template('index.html', 
                           catalog=CATALOG, 
                           tenders=TENDERS[:4], 
                           ticker=NEWS_TICKER, 
                           circulars=CIRCULARS[:3], 
                           vendors=VENDORS[:4],
                           divisions=divisions,
                           total_tenders=len(TENDERS),
                           total_vendors=len(VENDORS),
                           total_circulars=len(CIRCULARS))

@app.route('/tenders')
def tenders_page():
    divisions = sorted(list(set(t['division'] for t in TENDERS)))
    return render_template('tenders.html', 
                           tenders=TENDERS, 
                           divisions=divisions,
                           ticker=NEWS_TICKER)

@app.route('/circulars')
def circulars_page():
    return render_template('circulars.html', 
                           circulars=CIRCULARS,
                           ticker=NEWS_TICKER)

@app.route('/vendors')
def vendors_page():
    return render_template('vendors.html', 
                           vendors=VENDORS,
                           ticker=NEWS_TICKER)

@app.route('/search')
def search_page():
    q = request.args.get('q', '').strip()
    return render_template('search.html', q=q, ticker=NEWS_TICKER)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '').strip()
        if username in USERS and USERS[username]['password'] == password:
            session['user'] = username
            session['name'] = USERS[username]['name']
            session['org'] = USERS[username]['org']
            session['role'] = USERS[username]['role']
            return redirect(url_for('home'))
        return render_template('login.html', error="Invalid authorization credentials. Please check username/password.")
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))

@app.route('/materials')
def materials():
    return render_template('materials.html', catalog=CATALOG)

@app.route('/order/new', methods=['GET', 'POST'])
def order_new():
    if 'user' not in session:
        return redirect(url_for('login'))
    
    notice = None
    if request.method == 'POST':
        item = request.form.get('material')
        qty = request.form.get('quantity')
        urgency = request.form.get('urgency')
        notice = {
            "type": "warning",
            "title": "Procurement Request Recorded (RFQ-2026-9402)",
            "message": (
                f"Quotation request for {qty} of [{item}] has been logged under priority [{urgency}]. "
                "Notice: Contractor testing accounts hold READ-ONLY procurement status. "
                "Formal purchase orders require digital certificate token signing by the Central Procurement Cell."
            )
        }
    return render_template('order_new.html', catalog=CATALOG, notice=notice)

@app.route('/orders')
def orders():
    if 'user' not in session:
        return redirect(url_for('login'))
    user_orders = [INVOICES[oid] for oid in USERS[session['user']]['orders'] if oid in INVOICES]
    return render_template('orders.html', user=session, orders=user_orders)

@app.route('/grievance', methods=['GET', 'POST'])
def grievance():
    if 'user' not in session:
        return redirect(url_for('login'))
    
    submission_notice = None
    if request.method == 'POST':
        inv = request.form.get('invoice_ref', '').strip()
        subject = request.form.get('subject', '').strip()
        submission_notice = {
            "type": "info",
            "title": "Grievance Ticket Queued for Triaging",
            "message": f"Discrepancy for invoice [{inv}] ('{subject}') submitted. Quality Cell SLA response window is 48 business hours."
        }

    # Only show the logged-in user's ticket in the table
    user_tickets = [t for t in TICKETS.values() if t['id'] == 10]
    return render_template('grievance.html', user=session, tickets=user_tickets, notice=submission_notice)

# --- DECOY REALISTIC APIS (ANTI-AI CONTEXT-FLOODING HAYSTACK) ---
@app.route('/api/v1/facility/status', methods=['GET'])
def api_facility_status():
    return jsonify({
        "status": "operational",
        "facility": "MAIT Nuclear Research Facility (MAIT-NRF)",
        "reactor_core": "Heavy Water Moderated Pool Type",
        "ambient_radiation_usv": 0.12,
        "primary_coolant_flow_m3h": 412.5,
        "containment_integrity": "Nominal",
        "timestamp": int(time.time())
    })

@app.route('/api/v1/compliance/scorecard', methods=['GET'])
def api_compliance():
    return jsonify({
        "aerb_accreditation": "AERB/NF/2026/041-A",
        "last_inspection_date": "2026-09-18",
        "iso_19443_compliance": True,
        "qa_conformance_rate": "99.8%",
        "safety_incidents_recorded_ytd": 0
    })

@app.route('/api/v1/catalog/search', methods=['GET'])
def api_catalog_search():
    q = request.args.get('q', '').lower()
    results = [item for item in CATALOG if q in item['name'].lower() or q in item['desc'].lower()] if q else CATALOG
    return jsonify({"total_matches": len(results), "items": results})

@app.route('/api/v1/shipping/transit-zones', methods=['GET'])
def api_shipping_zones():
    return jsonify({
        "zones": [
            {"code": "NZ-01", "name": "Delhi NCR Heavy Corridor", "clearance": "AERB Green Pass"},
            {"code": "WZ-04", "name": "Gujarat / Rajasthan Transit", "clearance": "Express Security Escort"},
            {"code": "SZ-08", "name": "Tamil Nadu / Karnataka Line", "clearance": "Active Rail Freight"}
        ]
    })

@app.route('/api/v1/metallurgy/assays', methods=['GET'])
def api_assays():
    return jsonify({
        "batch_id": "AS-2026-904",
        "hafnium_impurity_ppm": 42.1,
        "tensile_strength_mpa": 485,
        "corrosion_loss_mdd": 1.2,
        "tested_by": "M-AMCEL Metallographic Core Lab"
    })

@app.route('/api/v1/ticker', methods=['GET'])
def api_ticker():
    return jsonify({
        "status": "success",
        "count": len(NEWS_TICKER),
        "items": NEWS_TICKER
    })

@app.route('/api/v1/tenders', methods=['GET'])
def api_tenders():
    q = request.args.get('q', '').lower().strip()
    division = request.args.get('division', '').strip()
    status_filter = request.args.get('status', '').strip()

    filtered = TENDERS
    if division and division != 'All':
        filtered = [t for t in filtered if t['division'].lower() == division.lower()]
    if status_filter and status_filter != 'All':
        filtered = [t for t in filtered if status_filter.lower() in t['status'].lower()]
    if q:
        filtered = [t for t in filtered if q in t['title'].lower() or q in t['tender_no'].lower() or q in t['specifications'].lower()]

    return jsonify({
        "status": "success",
        "total": len(filtered),
        "tenders": filtered
    })

@app.route('/api/v1/tenders/<tender_no>', methods=['GET'])
def api_tender_detail(tender_no):
    tender = next((t for t in TENDERS if t['tender_no'].upper() == tender_no.upper()), None)
    if not tender:
        return jsonify({"status": "error", "message": "Tender notice not found."}), 404
    return jsonify({"status": "success", "tender": tender})

@app.route('/api/v1/circulars', methods=['GET'])
def api_circulars():
    q = request.args.get('q', '').lower().strip()
    filtered = CIRCULARS
    if q:
        filtered = [c for c in filtered if q in c['title'].lower() or q in c['ref'].lower() or q in c['summary'].lower()]
    return jsonify({
        "status": "success",
        "total": len(filtered),
        "circulars": filtered
    })

@app.route('/api/v1/circulars/<path:ref>', methods=['GET'])
def api_circular_detail(ref):
    circular = next((c for c in CIRCULARS if c['ref'].upper() == ref.upper()), None)
    if not circular:
        return jsonify({"status": "error", "message": "Regulatory circular not found."}), 404
    return jsonify({"status": "success", "circular": circular})

@app.route('/api/v1/vendors', methods=['GET'])
def api_vendors():
    q = request.args.get('q', '').lower().strip()
    filtered = VENDORS
    if q:
        filtered = [v for v in filtered if q in v['company_name'].lower() or q in v['vendor_id'].lower() or q in v['location'].lower()]
    return jsonify({
        "status": "success",
        "total": len(filtered),
        "vendors": filtered
    })

@app.route('/api/v1/search', methods=['GET'])
def api_universal_search():
    q = request.args.get('q', '').lower().strip()
    if not q:
        return jsonify({"status": "success", "query": "", "results": {"tenders": [], "circulars": [], "materials": [], "vendors": []}})

    matched_tenders = [t for t in TENDERS if q in t['title'].lower() or q in t['tender_no'].lower() or q in t['specifications'].lower()]
    matched_circulars = [c for c in CIRCULARS if q in c['title'].lower() or q in c['ref'].lower() or q in c['summary'].lower()]
    matched_materials = [m for m in CATALOG if q in m['name'].lower() or q in m['id'].lower() or q in m['desc'].lower()]
    matched_vendors = [v for v in VENDORS if q in v['company_name'].lower() or q in v['vendor_id'].lower() or q in v['location'].lower()]

    total_matches = len(matched_tenders) + len(matched_circulars) + len(matched_materials) + len(matched_vendors)
    return jsonify({
        "status": "success",
        "query": q,
        "total_matches": total_matches,
        "results": {
            "tenders": matched_tenders,
            "circulars": matched_circulars,
            "materials": matched_materials,
            "vendors": matched_vendors
        }
    })

@app.route('/api/v1/kpi/summary', methods=['GET'])
def api_kpi():
    return jsonify({
        "active_tenders": len([t for t in TENDERS if 'Active' in t['status']]),
        "empanelled_vendors": len(VENDORS),
        "statutory_circulars": len(CIRCULARS),
        "reactor_grade_materials": len(CATALOG),
        "system_time": time.strftime("%Y-%m-%d %H:%M:%S IST")
    })

# --- IDOR ENDPOINT PROTECTED BY INVISIBLE JS INTEGRITY SHIELD ---
@app.route('/api/grievance/view', methods=['GET'])
def get_grievance():
    if 'user' not in session:
        return jsonify({"status": "error", "message": "Authentication session required."}), 401

    # Anti-AI / Anti-Automation: Verify Client-Side JavaScript Proof-of-Work
    client_ts = request.headers.get('X-Client-Timestamp')
    client_nonce = request.headers.get('X-Client-Nonce')

    if not client_ts or not client_nonce:
        return jsonify({
            "status": "error",
            "message": "Client integrity check failed. Browser JavaScript runtime execution required."
        }), 403

    try:
        ts = int(client_ts)
        nonce = int(client_nonce)
        now = int(time.time())

        # Allow a 120-second time drift window
        if abs(now - ts) > 120:
            return jsonify({
                "status": "error",
                "message": "Client integrity token expired. Please reload the dossier."
            }), 403

        # Verify cryptographic proof: sha256(user:ts:nonce) must start with '0000'
        username = session.get('user', '')
        seed = f"{username}:{ts}:{nonce}".encode('utf-8')
        digest = hashlib.sha256(seed).hexdigest()

        if not digest.startswith("0000"):
            return jsonify({
                "status": "error",
                "message": "Cryptographic client proof invalid."
            }), 403

    except (ValueError, TypeError):
        return jsonify({
            "status": "error",
            "message": "Malformed integrity payload format."
        }), 400

    raw_id = request.args.get('id', '')
    try:
        ticket_id = int(raw_id)
    except (ValueError, TypeError):
        return jsonify({"status": "error", "message": "Invalid ticket ID format."}), 400

    # Guard clause: only IDs 1 through 12 exist
    if ticket_id < 1 or ticket_id > 12:
        return jsonify({"status": "error", "message": "Ticket record not found or archived."}), 404

    # Vulnerability: Returns any ticket in the 1-12 range without checking author ownership
    ticket = TICKETS.get(ticket_id)
    return jsonify({
        "status": "success",
        "data": ticket
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
