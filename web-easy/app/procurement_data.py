# -*- coding: utf-8 -*-
"""
M-AMCEL Public e-Procurement & Tender Repository Data
MAIT Advanced Materials & Core Engineering Ltd.
Regulatory body: AERB / NPCIL / DAE
"""

NEWS_TICKER = [
    {"id": "TIC-01", "text": "AERB Directive 2026/14: All Stage-1 QA audit reports for Core Alloy consignments must be filed via e-Grievance portal.", "type": "warning"},
    {"id": "TIC-02", "text": "Global Expression of Interest invited for High-Temperature Inconel-625 cladding tubes (Ref: EOI-MAMCEL-2026-HT02).", "type": "info"},
    {"id": "TIC-03", "text": "Annual Vendor Empanelment window for FY 2026-27 is now open for Class-1 Nuclear Pressure Vessel Fabricators.", "type": "success"},
    {"id": "TIC-04", "text": "Notice: Emergency requisitions for reactivity suppression elements (Boron-10) require Central Safety Cell clearance.", "type": "danger"},
    {"id": "TIC-05", "text": "Consignment Dispatch: Batch ZR-402 Zircaloy structural channels cleared customs at Dadri Inland Container Depot.", "type": "info"},
    {"id": "TIC-06", "text": "Pre-bid conference for Supply of Heavy Water Purification Spools scheduled for 04-Nov-2026 at Rohini HQ.", "type": "info"},
    {"id": "TIC-07", "text": "DAE Circular 881: Enhanced ultrasonic immersion testing mandatory for all primary coolant loop cast fittings.", "type": "warning"},
    {"id": "TIC-08", "text": "ISO-19443:2018 Nuclear Supply Chain surveillance audit concluded with zero major non-conformances.", "type": "success"}
]

VENDORS = [
    {
        "vendor_id": "VND-DEL-8820",
        "company_name": "Adit Precision Valves & Subcontracting Ltd.",
        "location": "Okhla Phase-III Industrial Area, New Delhi",
        "empanelment_category": "Class-B Nuclear QA & Precision Machining",
        "valid_till": "2028-03-31",
        "iso_cert": "ISO 9001:2015 / ISO 19443 Ready",
        "aerb_clearance": "AERB/SUP/QA-882-B",
        "active_contracts": 1,
        "contact_person": "Vikram Adit (Managing Director)",
        "verified": True
    },
    {
        "vendor_id": "VND-MUM-1042",
        "company_name": "Larsen & Toubro Heavy Nuclear Equipment Cell",
        "location": "Powai Campus, Mumbai / Hazira Manufacturing Complex",
        "empanelment_category": "Class-A Nuclear Reactor Pressure Vessels & Calandria",
        "valid_till": "2029-12-31",
        "iso_cert": "ASME Section III / ISO 19443:2018",
        "aerb_clearance": "AERB/SUP/TIER-1-002",
        "active_contracts": 14,
        "contact_person": "Dr. S. K. Narayanan (VP Strategic Tech)",
        "verified": True
    },
    {
        "vendor_id": "VND-HYD-3301",
        "company_name": "Nuclear Fuel Complex (NFC) Industrial Directorate",
        "location": "ECIL Post, Hyderabad, Telangana",
        "empanelment_category": "Primary Core Metallurgy & Zirconium Extrusion",
        "valid_till": "2030-01-01",
        "iso_cert": "DAE / AERB Primary Certified",
        "aerb_clearance": "AERB/NFC/CORE-01",
        "active_contracts": 8,
        "contact_person": "K. V. Ramana (Executive Director)",
        "verified": True
    },
    {
        "vendor_id": "VND-HYD-5514",
        "company_name": "Mishra Dhatu Nigam Ltd. (MIDHANI)",
        "location": "Kanchanbagh, Hyderabad, Telangana",
        "empanelment_category": "Special Alloy Steels, Titanium & Nickel Superalloys",
        "valid_till": "2028-06-30",
        "iso_cert": "ISO 9001:2015 / AS9100D",
        "aerb_clearance": "AERB/SUP/ALLOY-44",
        "active_contracts": 6,
        "contact_person": "P. Sudhakar (GM Commercial Metallurgy)",
        "verified": True
    },
    {
        "vendor_id": "VND-PUN-7729",
        "company_name": "Walchandnagar Industries Strategic Fabrication Unit",
        "location": "Walchandnagar, Pune, Maharashtra",
        "empanelment_category": "Core Mechanical Components & Fuelling Machine Vaults",
        "valid_till": "2027-09-30",
        "iso_cert": "ISO 9001:2015 / ASME N-Stamp",
        "aerb_clearance": "AERB/SUP/FAB-109",
        "active_contracts": 4,
        "contact_person": "G. M. Deshpande (Head Nuclear Sales)",
        "verified": True
    },
    {
        "vendor_id": "VND-TRI-9912",
        "company_name": "Bharat Heavy Electricals Ltd. (BHEL Nuclear Division)",
        "location": "Tiruchirappalli, Tamil Nadu",
        "empanelment_category": "Steam Generators, Moisture Separators & Piping Spools",
        "valid_till": "2029-08-15",
        "iso_cert": "ASME Section III / ISO 14001",
        "aerb_clearance": "AERB/SUP/BOILER-901",
        "active_contracts": 11,
        "contact_person": "R. Soundararajan (Chief Engineer Steam Loops)",
        "verified": True
    },
    {
        "vendor_id": "VND-BLR-4018",
        "company_name": "Godrej & Boyce Strategic Equipment Division",
        "location": "Vikhroli, Mumbai & Peenya, Bengaluru",
        "empanelment_category": "Control Rod Drive Assemblies & Precision Shielding",
        "valid_till": "2028-11-30",
        "iso_cert": "ISO 9001:2015 / ISO 19443",
        "aerb_clearance": "AERB/SUP/CRDM-312",
        "active_contracts": 3,
        "contact_person": "M. C. Bharadwaj (Senior Director Aerospace & Nuclear)",
        "verified": True
    },
    {
        "vendor_id": "VND-KOL-6120",
        "company_name": "Jessop Heavy Engineering Nuclear Crane Works",
        "location": "Dum Dum, Kolkata, West Bengal",
        "empanelment_category": "Heavy Handling Polar Cranes & Reactor Bay Lifting",
        "valid_till": "2027-04-30",
        "iso_cert": "ISO 9001:2015",
        "aerb_clearance": "AERB/SUP/CRANE-08",
        "active_contracts": 2,
        "contact_person": "A. Chatterjee (Lead Plant Engineer)",
        "verified": True
    },
    {
        "vendor_id": "VND-AHM-2245",
        "company_name": "Elecon Precision Industrial Drives Ltd.",
        "location": "Vallabh Vidyanagar, Gujarat",
        "empanelment_category": "Primary Coolant Pump Helical Reduction Gearboxes",
        "valid_till": "2028-02-28",
        "iso_cert": "AGMA / ISO 9001:2015",
        "aerb_clearance": "AERB/SUP/DRIVE-22",
        "active_contracts": 3,
        "contact_person": "N. K. Patel (Technical Liaison)",
        "verified": True
    },
    {
        "vendor_id": "VND-CHN-8190",
        "company_name": "KCP Heavy Engineering Nuclear Castings",
        "location": "Thiruvottiyur, Chennai, Tamil Nadu",
        "empanelment_category": "Austenitic Stainless Steel Heavy Valves & Casings",
        "valid_till": "2027-12-31",
        "iso_cert": "ISO 9001:2015 / PED 2014/68/EU",
        "aerb_clearance": "AERB/SUP/CAST-401",
        "active_contracts": 5,
        "contact_person": "T. R. Seshadri (Director Quality Assurance)",
        "verified": True
    }
]

CIRCULARS = [
    {
        "ref": "AERB/PROC/2026/09-CIR",
        "date": "2026-10-18",
        "title": "Mandatory Traceability Protocols for Nuclear Reactor Cladding Consignments",
        "issuing_authority": "Atomic Energy Regulatory Board (AERB) Safety Directorate",
        "category": "Statutory Directive",
        "summary": "Directs all authorized nuclear procurement entities and private subcontractors to record dual-point chemical assay certificates for all zirconium-niobium and zircaloy-4 shipments.",
        "full_text": "In accordance with Section 16 of the Atomic Energy Act, 1962, all consignments involving reactor core structural elements (fuel clad tubes, end plugs, spacer grids) must undergo certified ICP-MS spectrographic screening. No consignment shall be accepted into site bonded stores without verified Hafnium content under 100 ppm. Subcontractors failing to upload mill test coupons to the centralized QA clearinghouse will face automatic suspension of empanelment."
    },
    {
        "ref": "NPCIL/C&I/2026/112",
        "date": "2026-10-15",
        "title": "Standard Operating Procedure for Transport of Neutron Poison Pellets (Boron Carbide)",
        "issuing_authority": "Nuclear Power Corporation of India Ltd. Commercial Cell",
        "category": "Material Handling",
        "summary": "Establishes secure convoy protocols, moisture-resistant packaging, and dual-custody seal verification for enriched Boron-10 shipments.",
        "full_text": "Enriched Boron-10 carbide pellets represent high-priority strategic inventory vital for reactor shutdown reserves. All dispatches exceeding 10 kg must be packed in hermetically sealed argon-blanketed containers with tamper-evident digital seals. In the event of packaging compromise or transit delay, incident reports must be logged within 2 hours to the emergency dispatch desk."
    },
    {
        "ref": "DAE/SEC/2026/044",
        "date": "2026-10-11",
        "title": "Cybersecurity & Access Control Guidelines for Vendor Procurement Portals",
        "issuing_authority": "Department of Atomic Energy (DAE) Cyber Security Cell",
        "category": "Cybersecurity",
        "summary": "Mandates cryptographic integrity proofs, strict session timeouts, and segregation of contractor accounts from internal facility supervisory systems.",
        "full_text": "Recent audit findings indicate that external contractors frequently handle procurement dossiers containing sensitive engineering references. Facilities are mandated to enforce multi-factor client verification on all public-facing grievance and RFQ modules. Contractor testing credentials must never possess administrative privileges or access to internal plant telemetry networks."
    },
    {
        "ref": "AERB/NF/2026/031",
        "date": "2026-10-04",
        "title": "Permissible Leakage Thresholds for Primary Heat Transport Gland Seals",
        "issuing_authority": "AERB Division of Nuclear Safety & Engineering",
        "category": "Technical Spec",
        "summary": "Updates allowable seepage limits on motorized valve spindles operating in pressurized heavy water reactor primary coolant boundaries.",
        "full_text": "Zero-leakage standards remain mandatory for heavy water boundaries. If mechanical gland packing exhibits seepage exceeding 2 drops/minute during cold hydro-testing at 100 kg/cm2, the component must be immediately quarantined and repacked with nuclear-grade expanded graphite rings under OEM supervision."
    },
    {
        "ref": "M-AMCEL/QA/2026/108",
        "date": "2026-09-28",
        "title": "Guidelines on Filing Subcontractor Grievances and Material Discrepancy Reports",
        "issuing_authority": "M-AMCEL Quality Assurance Directorate",
        "category": "Internal Procedure",
        "summary": "Outlines procedure for vendors to report surface abrasions, dimensional variances, or certificate mismatches via the automated e-Grievance portal.",
        "full_text": "Empanelled contractors observing receipt discrepancies or micro-defects must file a ticket on the e-Grievance clearinghouse referencing the valid purchase order and invoice ID. The Quality Cell undertakes resolution within 48 business hours. Warning: Do not attach plant internal operational memos to public grievance filings."
    },
    {
        "ref": "AERB/RAD/2026/89",
        "date": "2026-09-15",
        "title": "Statutory Ambient Radiation Surveillance Protocols in Bonded Material Warehouses",
        "issuing_authority": "AERB Radiological Surveillance Directorate",
        "category": "Radiation Protection",
        "summary": "Defines calibration cycles and dosimetric logging for storage bays housing natural uranium, thorium, and neutron reflector graphite.",
        "full_text": "Continuous Geiger-Muller surveillance detectors must maintain 99.9% uptime with automated telemetry relays to the central plant HMI gateway. Any ambient drift exceeding 0.25 uSv/h outside reactor containment triggers immediate site investigation."
    }
]

TENDERS = [
    {
        "tender_no": "TND-MAMCEL-2026-081",
        "title": "Supply and Precision Non-Destructive Testing of Reactor Grade Zircaloy-4 Cladding Tubes",
        "division": "Core Metallurgy",
        "published_date": "2026-10-05",
        "closing_date": "2026-11-15",
        "est_value": "₹ 1,42,50,000",
        "emd_amount": "₹ 2,85,000",
        "status": "Active / Bidding Open",
        "class_requirement": "Class-A / ISO 19443 Certified",
        "specifications": "ASTM B811 / Reactor Grade Zircaloy-4 (OD 9.5mm, WT 0.57mm). Ultrasonic immersion examination for longitudinal and transverse defects with calibration notch depth 0.05mm.",
        "delivery_location": "Bonded Core Warehouse Bay-2, Rohini Facility, New Delhi"
    },
    {
        "tender_no": "TND-MAMCEL-2026-094",
        "title": "Procurement of High-Density Enriched Boron-10 Control Rod Pellets for Emergency Shutoff Assemblies",
        "division": "Neutron Systems",
        "published_date": "2026-10-10",
        "closing_date": "2026-11-20",
        "est_value": "₹ 3,85,00,000",
        "emd_amount": "₹ 7,70,000",
        "status": "Active / Bidding Open",
        "class_requirement": "Class-A Strategic Nuclear Supplier",
        "specifications": "Sintered Boron Carbide (B4C) pellets, B-10 isotopic abundance > 96.0%. Pellets must exhibit theoretical density > 93% with total halogen impurities under 25 ppm.",
        "delivery_location": "Reactivity Control Laboratory, MAIT Nuclear Research Facility"
    },
    {
        "tender_no": "TND-MAMCEL-2026-105",
        "title": "Design, Fabrication and Factory Acceptance Testing of Cryogenic Heavy Water Purification Heat Exchanger",
        "division": "Reactor Coolant Loops",
        "published_date": "2026-10-12",
        "closing_date": "2026-11-25",
        "est_value": "₹ 88,00,000",
        "emd_amount": "₹ 1,76,000",
        "status": "Active / Bidding Open",
        "class_requirement": "Class-B Nuclear Heat Exchanger Fabricator",
        "specifications": "Austenitic Stainless Steel 316L shell and U-tube assembly. Design pressure 125 bar at 320°C. Helium mass spectrometer leak test rate < 1x10^-8 mbar.l/s.",
        "delivery_location": "Primary Heat Transport Sub-station, Sector 22, Rohini"
    },
    {
        "tender_no": "TND-MAMCEL-2026-118",
        "title": "Supply of Class-1 High-Pressure Flanged Gate Valves with Bellows Seal for Primary Coolant Circuit",
        "division": "Piping & Valves",
        "published_date": "2026-10-14",
        "closing_date": "2026-11-28",
        "est_value": "₹ 64,20,000",
        "emd_amount": "₹ 1,28,400",
        "status": "Under Technical Triaging",
        "class_requirement": "Class-B Empanelled Valve Specialist",
        "specifications": "Forged F316LN body with Inconel 718 dual bellows stem seals. Hydrostatic shell test at 225 kg/cm2. Stellite-6 hardfaced seating surfaces.",
        "delivery_location": "Central Stores Receiving Bay, M-AMCEL Rohini"
    },
    {
        "tender_no": "TND-MAMCEL-2026-125",
        "title": "Annual Rate Contract for In-Service Ultrasonic Examination of Primary Coolant Piping Spools",
        "division": "Quality Assurance",
        "published_date": "2026-09-20",
        "closing_date": "2026-10-25",
        "est_value": "₹ 45,00,000",
        "emd_amount": "₹ 90,000",
        "status": "Awarded",
        "class_requirement": "BARC Level-III NDT Agency",
        "specifications": "Phased Array Ultrasonic Testing (PAUT) and Time of Flight Diffraction (TOFD) on primary stainless steel weldments.",
        "delivery_location": "Onsite Inspection Cells, North India Nuclear Installations"
    },
    {
        "tender_no": "TND-MAMCEL-2026-133",
        "title": "Supply and Calibration of Radiation Hardened Ionization Chambers for In-Core Flux Mapping",
        "division": "Instrumentation & Control",
        "published_date": "2026-10-16",
        "closing_date": "2026-12-05",
        "est_value": "₹ 1,15,00,000",
        "emd_amount": "₹ 2,30,000",
        "status": "Active / Bidding Open",
        "class_requirement": "Nuclear C&I Specialist",
        "specifications": "Self-Powered Neutron Detectors (SPND) with Vanadium and Platinum emitters. Mineral insulated coaxial cabling capable of 350°C and 10^14 nv neutron flux.",
        "delivery_location": "Instrumentation Calibration Lab, MAIT-NRF"
    },
    {
        "tender_no": "TND-MAMCEL-2026-140",
        "title": "Procurement of Extruded Nuclear Grade Isotropic Graphite Reflector Blocks",
        "division": "Core Metallurgy",
        "published_date": "2026-10-17",
        "closing_date": "2026-12-10",
        "est_value": "₹ 2,10,00,000",
        "emd_amount": "₹ 4,20,000",
        "status": "Active / Bidding Open",
        "class_requirement": "Class-A Nuclear Graphite Importer / Manufacturer",
        "specifications": "High-purity nuclear graphite with total equivalent boron content < 2 ppm. Bulk density 1.82 g/cm3, thermal conductivity > 130 W/m.K at 20°C.",
        "delivery_location": "Reflector Machining Workshop, Sector 22, Rohini"
    },
    {
        "tender_no": "TND-MAMCEL-2026-152",
        "title": "Supply of Specialized Lead Interlocking Shielding Bricks with Tongue & Groove Edges",
        "division": "Radiation Shielding",
        "published_date": "2026-09-12",
        "closing_date": "2026-10-15",
        "est_value": "₹ 28,50,000",
        "emd_amount": "₹ 57,000",
        "status": "Closed / Under Delivery",
        "class_requirement": "AERB Registered Metal Foundry",
        "specifications": "99.97% pure chemical lead. Standard Chevron pattern (100mm x 100mm x 50mm). Tolerance within +/- 0.5mm.",
        "delivery_location": "Hot Cell Shielding Expansion Wing, MAIT-NRF"
    },
    {
        "tender_no": "TND-MAMCEL-2026-160",
        "title": "Expression of Interest (EOI) for Armed Escort Logistics of Critical Nuclear Consignments",
        "division": "Strategic Logistics",
        "published_date": "2026-10-18",
        "closing_date": "2026-11-30",
        "est_value": "₹ 75,00,000",
        "emd_amount": "₹ 1,50,000",
        "status": "Active / Bidding Open",
        "class_requirement": "Ministry of Home Affairs / AERB Cleared Security Agency",
        "specifications": "GPS tracked armored transport vehicles, real-time satellite telemetry transponders, CISF coordination protocols for inter-state transit.",
        "delivery_location": "Designated Transit Corridors (Delhi NCR to Narora / RAPS)"
    },
    {
        "tender_no": "TND-MAMCEL-2026-174",
        "title": "Procurement of High-Purity Reactor Grade Deuterium Oxide (Heavy Water D2O)",
        "division": "Reactor Coolant Loops",
        "published_date": "2026-10-19",
        "closing_date": "2026-12-15",
        "est_value": "₹ 5,20,00,000",
        "emd_amount": "₹ 10,40,000",
        "status": "Active / Bidding Open",
        "class_requirement": "HWB / DAE Authorized Supplier",
        "specifications": "Heavy water with isotopic purity >= 99.92 mole% D2O. Electrical conductivity < 0.1 uS/cm. Shipped in 210-litre electropolished SS-304 drums.",
        "delivery_location": "Heavy Water Vault, MAIT Nuclear Research Facility"
    }
]
