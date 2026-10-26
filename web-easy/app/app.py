import os
import re
import time
import hashlib
import hmac
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from procurement_data import NEWS_TICKER, VENDORS, CIRCULARS, TENDERS

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "M_AMCEL_Static_Session_Secret_2026_Prod!")

SECRET = os.environ.get("COREZERO_FLAG_HMAC_SECRET", "CTF_Rak5hna_Ori3ntat1on")

ORIGINAL_FLAGS = {
    "easy": "RAKSHNA{1d0r_r3v34ls_pr0cur3m3nt_l34k}",
    "medium": "RAKSHNA{pr0t0typ3_p0llut10n_scv4m_c0r3}",
    "hard": "RAKSHNA{sc4d4_ssrf_t0_rc3_pr1v3sc_m3ltd0wn}"
}

def make_participant_web_flag(email: str, difficulty: str) -> str:
    normalized_email = str(email or 'participant@ctf.local').strip().lower()
    normalized_difficulty = str(difficulty or 'easy').strip().lower()
    original_flag = ORIGINAL_FLAGS.get(normalized_difficulty, "RAKSHNA{flag}")

    tier = f"web_{normalized_difficulty}"
    suffix = hmac.new(SECRET.encode('utf-8'), f"{normalized_email}|{tier}".encode('utf-8'), hashlib.sha256).hexdigest()
    base_payload = original_flag[8:-1]
    return f"RAKSHNA{{{base_payload}_{suffix}}}"

@app.before_request
def enforce_email_gate():
    # Allow static files and the gate itself
    if request.path.startswith('/static') or request.path in ['/gate', '/gate/submit']:
        return None

    chall_cookie = request.cookies.get('Web_Chall_cookie')
    if not chall_cookie:
        if request.path.startswith('/api/'):
            return jsonify({
                "status": "error",
                "message": "Access Denied: Web_Chall_cookie is missing. Please initialize your session at /gate"
            }), 403
        return redirect(url_for('gate', next=request.path))

USERS = {
    "contractor_testing": {
        "password": "Mait@Procure2026!",
        "name": "Vikram Adit (QA Inspector)",
        "org": "Adit Precision Valves & Subcontracting Ltd.",
        "role": "External QA Contractor",
        "orders": ["ORD-2026-8812", "ORD-2026-4402"]
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
        "status": "Delivered - Quality Non-Conformance Logged",
        "shipping_address": "QA Inspection Bay 4, Adit Heavy Valves, Industrial Estate, Okhla Phase III, New Delhi",
        "notes": "Consignment received with inspection non-conformance. Case #401 logged."
    },
    "ORD-2026-4402": {
        "order_id": "ORD-2026-4402",
        "invoice_id": "INV-MNRF-BORON-EMERGENCY",
        "po_number": "PO-MAMCEL-2026-EMG-041",
        "item": "Enriched Boron-10 Suppression Control Rod Pellets",
        "specification": "Sintered B4C Pellets / B-10 Abundance > 96.0%",
        "quantity": "50 kg",
        "date": "2026-10-13",
        "amount": "₹ 3,85,00,000",
        "tax": "₹ 69,30,000 (GST @ 18%)",
        "grand_total": "₹ 4,54,30,000",
        "status": "HELD - Regulatory Safety Quarantine",
        "shipping_address": "Reactivity Control Laboratory, MAIT Nuclear Research Facility, Sector 22, Rohini",
        "notes": "Emergency transit consignment held under AERB Section 12 Quality Protocol."
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
        "compliance": "DAE Heavy Water Board Spec 2026",
        "image": "heavy-water.jpg",
        "desc": "High-purity isotopic deuterium oxide for neutron thermalization in pressurized heavy water reactor calandria vaults."
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

# Central Logistics Discrepancy & Grievance Case Registry (Indexed 401..420)
TICKETS = {
    401: {
        "id": 401,
        "author": "Vikram Adit (QA Inspector)",
        "author_user": "contractor_testing",
        "department": "Adit Precision Valves / External QA Contractor",
        "invoice_ref": "INV-2026-8812",
        "subject": "Micro-abrasions observed on outer flange seal delivery",
        "date": "2026-10-18 10:30 IST",
        "priority": "Medium",
        "status": "Resolved - Credit Note Dispatched",
        "body": "During receipt inspection of Invoice INV-2026-8812, batch #441 showed surface abrasions on 3 out of 24 units. Replacement seals requested.",
        "resolution": "RMA approved. Replacement batch cleared by M-AMCEL metallurgical lab."
    },
    402: {
        "id": 402,
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
    403: {
        "id": 403,
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
    404: {
        "id": 404,
        "author": "Dr. Meenakshi S. (Radiochemistry)",
        "department": "BARC Materials Science Division, Trombay",
        "invoice_ref": "INV-BARC-ZR-889",
        "subject": "Request for Spectrographic Hafnium assay report",
        "date": "2026-10-12 16:05 IST",
        "priority": "Low",
        "status": "Resolved",
        "body": "Zircaloy cladding shipment arrived safely. We need the verified Hafnium impurity ppm breakdown for archive.",
        "resolution": "ICP-MS certificate transmitted via secure courier."
    },
    405: {
        "id": 405,
        "author": "Vikram Adit (QA Inspector)",
        "author_user": "contractor_testing",
        "department": "Adit Precision Valves / External QA Contractor",
        "invoice_ref": "INV-2026-8812",
        "subject": "Batch calibration certificate missing for primary weld coupons",
        "date": "2026-10-18 14:15 IST",
        "priority": "Low",
        "status": "Resolved - Certificate Attached",
        "body": "Initial consignment received on 12-Oct was missing Annexure B metallurgical certificate. Vendor provided signed copy upon follow-up.",
        "resolution": "Annexure B uploaded to procurement portal archive."
    },
    406: {
        "id": 406,
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
    407: {
        "id": 407,
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
    408: {
        "id": 408,
        "author": "A. K. Subramanian",
        "department": "Kudankulam Nuclear Power Plant - Unit 2",
        "invoice_ref": "INV-KKNPP-TITAN-701",
        "subject": "Titanium-stabilized secondary piping coupon testing",
        "date": "2026-10-15 15:45 IST",
        "priority": "Medium",
        "status": "Resolved",
        "body": "Intergranular corrosion test coupons required for recent secondary circuit piping consignment.",
        "resolution": "Mill test coupons dispatched with ultrasonic examination documentation."
    },
    409: {
        "id": 409,
        "author": "S. Chouhan (Instrument Control)",
        "department": "Rajasthan Atomic Power Station (RAPS), Rawatbhata",
        "invoice_ref": "INV-RAPS-SEAL-552",
        "subject": "Control rod drive mechanism elastomeric O-rings shelf-life inquiry",
        "date": "2026-10-16 12:20 IST",
        "priority": "Low",
        "status": "Closed",
        "body": "Cure date on ethylene propylene diene monomer (EPDM) seals was missing from inner blister packet.",
        "resolution": "OEM cure date verified as Q3-2026 with 5-year rated shelf life."
    },
    410: {
        "id": 410,
        "author": "Devinder Singh (Procurement Exec)",
        "department": "Gorakhpur Haryana Anu Vidyut Pariyojana (GHAVP)",
        "invoice_ref": "INV-GHAVP-SEN-220",
        "subject": "Sensor calibration test coupon delivery delay",
        "date": "2026-10-17 14:05 IST",
        "priority": "Low",
        "status": "Closed",
        "body": "Consignment delayed by 48 hours at Haryana interstate checkpost.",
        "resolution": "Priority green corridor transit clearance issued. Consignment received."
    },
    411: {
        "id": 411,
        "author": "T. Balakrishnan (NDT Lead)",
        "department": "Madras Atomic Power Station (MAPS), Kalpakkam",
        "invoice_ref": "INV-MAPS-ZR-104",
        "subject": "Ultrasonic immersion echo variance on Zircaloy spools",
        "date": "2026-10-17 16:30 IST",
        "priority": "Medium",
        "status": "Closed",
        "body": "Spool #09 demonstrated 3% echo amplitude variation on calibration standard notch.",
        "resolution": "Re-scanned at NFC Hyderabad inspection lab. Echo verified within ASTM B811 permissible tolerance."
    },
    412: {
        "id": 412,
        "author": "M. K. Joshi (Logistics Desk)",
        "department": "Heavy Water Board - Kota Plant",
        "invoice_ref": "INV-HWB-KOTA-404",
        "subject": "Bulk transport road tanker weighbridge tare discrepancy",
        "date": "2026-10-18 09:45 IST",
        "priority": "Low",
        "status": "Closed",
        "body": "Gross weighbridge reading showed 140 kg variance compared to Kota dispatch ticket.",
        "resolution": "Tare scale recalibrated. Net heavy water mass verified against drum ullage measurements."
    },
    413: {
        "id": 413,
        "author": "S. R. Kulkarni (Quality Cell)",
        "department": "L&T Heavy Engineering Hazira Works",
        "invoice_ref": "INV-LT-RUPT-082",
        "subject": "Primary loop rupture disc burst pressure certification",
        "date": "2026-10-18 11:20 IST",
        "priority": "Medium",
        "status": "Closed",
        "body": "Batch test certificate for Inconel rupture disc lot #883 missing ASME Section III stamp.",
        "resolution": "Authorized Nuclear Inspector (ANI) re-endorsed test certificate."
    },
    414: {
        "id": 414,
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
    415: {
        "id": 415,
        "author": "B. N. Rao (Reactor Engineering)",
        "department": "Nuclear Fuel Complex (NFC), Hyderabad",
        "invoice_ref": "INV-NFC-TUBE-551",
        "subject": "Calandria tube spacer spring compression test report",
        "date": "2026-10-19 14:15 IST",
        "priority": "Low",
        "status": "Resolved",
        "body": "Spring relaxation testing at 300 deg C required for fuel channel spacer ring batch.",
        "resolution": "Hot mechanical testing data uploaded to M-AMCEL technical portal."
    }
}

# Duplicate string keys for flexible lookup
for k in list(TICKETS.keys()):
    TICKETS[str(k)] = TICKETS[k]


@app.route('/gate', methods=['GET'])
def gate():
    next_url = request.args.get('next', url_for('home'))
    current_email = request.cookies.get('Web_Chall_cookie', '')
    error = request.args.get('error', '')
    return render_template('gate.html', next_url=next_url, current_email=current_email, error=error)

@app.route('/gate/submit', methods=['POST'])
def gate_submit():
    email = request.form.get('email', '').strip()
    next_url = request.form.get('next', url_for('home'))

    # Accept any email format with '@' and '.'
    if not email or '@' not in email or '.' not in email.split('@')[-1]:
        return redirect(url_for('gate', error="Please provide a valid email address.", next=next_url))

    resp = redirect(next_url)
    resp.set_cookie('Web_Chall_cookie', email, max_age=604800, samesite='Lax')
    return resp

@app.route('/')
@app.route('/home')
def home():
    return render_template('index.html', user=session, news=NEWS_TICKER, materials=CATALOG)

index = home

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
        else:
            return render_template('login.html', error="Invalid clearance credentials or empanelment expired.")
            
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))

@app.route('/tenders')
def tenders_page():
    divisions = sorted(list(set(t['division'] for t in TENDERS)))
    return render_template('tenders.html', user=session, tenders=TENDERS, divisions=divisions)

tenders = tenders_page

@app.route('/circulars')
def circulars_page():
    return render_template('circulars.html', user=session, circulars=CIRCULARS)

circulars = circulars_page

@app.route('/vendors')
def vendors_page():
    return render_template('vendors.html', user=session, vendors=VENDORS)

vendors = vendors_page

@app.route('/materials')
def materials():
    return render_template('materials.html', user=session, catalog=CATALOG, materials=CATALOG)

@app.route('/search')
def search_page():
    query = request.args.get('q', '').strip().lower()
    tenders_match = [t for t in TENDERS if query in t['title'].lower() or query in t['tender_no'].lower() or query in t['division'].lower()]
    circulars_match = [c for c in CIRCULARS if query in c['title'].lower() or query in c['ref'].lower() or query in c['category'].lower()]
    vendors_match = [v for v in VENDORS if query in v['company_name'].lower() or query in v['vendor_id'].lower() or query in v['location'].lower()]
    materials_match = [m for m in CATALOG if query in m['name'].lower() or query in m['category'].lower() or query in m['compliance'].lower()]
    
    total_matches = len(tenders_match) + len(circulars_match) + len(vendors_match) + len(materials_match)
    
    return render_template('search.html', 
                           user=session, 
                           query=request.args.get('q', ''),
                           tenders=tenders_match, 
                           circulars=circulars_match, 
                           vendors=vendors_match, 
                           materials=materials_match,
                           total=total_matches)

search = search_page

@app.route('/orders')
def orders():
    if 'user' not in session:
        return redirect(url_for('login'))
    user_orders = [INVOICES[oid] for oid in USERS[session['user']]['orders'] if oid in INVOICES]
    return render_template('orders.html', user=session, orders=user_orders)

@app.route('/order/new')
def order_new():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('order_new.html', user=session, materials=CATALOG)

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

    user_tickets = [t for k, t in TICKETS.items() if isinstance(k, int) and t.get('author_user') == session.get('user')]
    return render_template('grievance.html', user=session, tickets=user_tickets, notice=submission_notice)

# Central Logistics Discrepancy Case Viewer API (Vulnerable to IDOR)
@app.route('/api/grievance/view', methods=['GET'])
def get_grievance():
    if 'user' not in session:
        return jsonify({"status": "error", "message": "Authentication session required."}), 401

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

        if abs(now - ts) > 120:
            return jsonify({
                "status": "error",
                "message": "Client integrity token expired. Please reload the dossier."
            }), 403

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

    query_id = request.args.get('id') or request.args.get('docket') or request.args.get('case_id') or ''
    query_id = str(query_id).strip()

    try:
        num_id = int(query_id)
    except (ValueError, TypeError):
        return jsonify({"status": "error", "message": "Invalid docket identifier format. Numerical registry index required."}), 400

    # Strict application-level range bounding to prevent automated scanning outside active docket index
    if num_id < 400 or num_id > 425:
        return jsonify({"status": "error", "message": "Dossier record out of active archive index range."}), 404

    ticket = TICKETS.get(num_id)
    if not ticket:
        return jsonify({"status": "error", "message": "Case docket not found in central registry."}), 404

    # Dynamically inject personalized flag for ticket #414 based on Web_Chall_cookie
    response_ticket = dict(ticket)
    if num_id == 414:
        user_email = request.cookies.get('Web_Chall_cookie', '')
        dynamic_flag = make_participant_web_flag(user_email, "easy")
        response_ticket['body'] = re.sub(r'RAKSHNA\{[^\}]+\}', dynamic_flag, response_ticket['body'])

    return jsonify({
        "status": "success",
        "data": response_ticket
    })

# =========================================================================
# REALISTIC DECOY APIS (ENTERPRISE SUPPLY CHAIN HAYSTACK)
# =========================================================================
@app.route('/api/v1/tenders/<tender_no>', methods=['GET'])
def api_tender_detail(tender_no):
    tender = next((t for t in TENDERS if t['tender_no'].upper() == tender_no.upper()), None)
    if not tender:
        return jsonify({"status": "error", "message": "Tender notice not found."}), 404
    return jsonify({"status": "success", "tender": tender})

@app.route('/api/v1/circulars/<path:ref>', methods=['GET'])
def api_circular_detail(ref):
    circular = next((c for c in CIRCULARS if c['ref'].upper() == ref.upper()), None)
    if not circular:
        return jsonify({"status": "error", "message": "Circular directive not found."}), 404
    return jsonify({"status": "success", "circular": circular})

@app.route('/api/v1/orders/track', methods=['GET'])
def api_track_order():
    order_ref = request.args.get('order_ref', 'PO-MAMCEL-2026-EMG-041')
    return jsonify({
        "order_ref": order_ref,
        "consignment_title": "Reactor Grade Enriched Boron-10 Suppression Pellets (Requisition #REQ-4402)",
        "consignee": "MAIT Nuclear Research Facility - Sector 22, Rohini",
        "security_escort": "CISF Armed Transit Convoy Unit #4",
        "transit_status": "HELD_AT_CHECKPOST",
        "linked_dockets": [],
        "milestones": [
            {"step": "Production Clearance", "status": "COMPLETED", "date": "2026-10-10"},
            {"step": "AERB Radio-Chemical Assay", "status": "COMPLETED", "date": "2026-10-12"},
            {"step": "Inter-State Transit Pass", "status": "HALTED", "reason": "Central Safety Cell Audit Hold"}
        ]
    })

@app.route('/api/v1/materials/specifications', methods=['GET'])
def api_material_specs():
    code = request.args.get('code', 'MTR-BORON-10')
    return jsonify({
        "material_code": code,
        "material_name": "Enriched Boron-10 Carbide Pellets",
        "isotopic_enrichment_b10": "96.2% atom fraction",
        "density_g_cm3": 2.45,
        "neutron_capture_cross_section_barns": 3837,
        "maximum_halogens_ppm": 18.4,
        "storage_directive": "AERB-SS-2026-CORE-CRITICAL"
    })

@app.route('/api/v1/compliance/iso-audit', methods=['GET'])
def api_iso_audit():
    return jsonify({
        "standard": "ISO 19443:2018 Nuclear Sector Quality Management",
        "audit_body": "Atomic Energy Regulatory Board (AERB) Quality Directorate",
        "last_inspection": "2026-09-30",
        "clearance_tier": "Tier-1 Strategic Reactor Grade Supplier",
        "valid_until": "2029-09-29",
        "active_dockets_under_review": 26
    })

@app.route('/api/v1/vendor/clearance', methods=['GET'])
def api_vendor_clearance():
    vendor_id = request.args.get('vendor_id', 'VND-DEL-8820')
    return jsonify({
        "vendor_id": vendor_id,
        "company_name": "Adit Precision Valves & Subcontracting Ltd.",
        "gate_pass_validity": "2026-12-31",
        "escort_authorization": "CLEARANCE_GRANTED_ZONE_2",
        "radioactive_transport_license": "AERB/RTL/2026/8821-B"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
