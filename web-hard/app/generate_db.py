#!/usr/bin/env python3
"""
MAIT Nuclear Research Facility - KAVACH SCADA Database Generator
Generates over 1,400+ authentic nuclear C&I records in SQLite:
1. alarms_historian (500 records)
2. plc_registers (250 records)
3. instrument_loops (150 records)
4. telemetry_history (400 records)
5. maintenance_work_orders (80 records)
6. network_nodes (35 records)
"""

import sqlite3
import random
import os
from datetime import datetime, timedelta

DB_PATH = os.path.join(os.path.dirname(__file__), "kavach_scada.db")

def generate():
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    # 1. Alarms Historian (SOE - Sequence of Events Table)
    cur.execute("""
    CREATE TABLE alarms_historian (
        alarm_id TEXT PRIMARY KEY,
        timestamp TEXT,
        kks_tag TEXT,
        tag_description TEXT,
        process_val REAL,
        setpoint REAL,
        engineering_unit TEXT,
        alarm_state TEXT,
        severity TEXT,
        operator_ack TEXT,
        ack_timestamp TEXT,
        forensic_mv REAL,
        relay_bounce_ms INTEGER
    );
    """)

    # 2. PLC Registers (Modbus / DNP3 Memory Table)
    cur.execute("""
    CREATE TABLE plc_registers (
        register_addr INTEGER PRIMARY KEY,
        block_name TEXT,
        kks_tag TEXT,
        description TEXT,
        raw_hex TEXT,
        raw_binary TEXT,
        scale_multiplier REAL,
        scaled_val REAL,
        unit TEXT,
        read_only INTEGER,
        last_synced TEXT
    );
    """)

    # 3. Instrument Loops & Transmitters
    cur.execute("""
    CREATE TABLE instrument_loops (
        loop_id TEXT PRIMARY KEY,
        kks_tag TEXT,
        service_description TEXT,
        substation_sector TEXT,
        manufacturer TEXT,
        model_number TEXT,
        serial_number TEXT,
        hart_revision TEXT,
        calibrated_range_low REAL,
        calibrated_range_high REAL,
        unit TEXT,
        current_milliamp REAL,
        last_calibrated TEXT,
        calibrated_by TEXT,
        tolerance_percent REAL
    );
    """)

    # 4. Telemetry History (Time Series)
    cur.execute("""
    CREATE TABLE telemetry_history (
        reading_id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT,
        kks_tag TEXT,
        tag_name TEXT,
        val REAL,
        unit TEXT,
        variance_percent REAL
    );
    """)

    # 5. Maintenance Work Orders & LOTO
    cur.execute("""
    CREATE TABLE maintenance_work_orders (
        order_id TEXT PRIMARY KEY,
        title TEXT,
        equipment_kks TEXT,
        substation TEXT,
        priority TEXT,
        status TEXT,
        authorized_by TEXT,
        assigned_technician TEXT,
        created_date TEXT,
        completed_date TEXT,
        safety_isolation_valve TEXT,
        dosimeter_budget_msv REAL
    );
    """)

    # 6. Network Nodes & RTUs
    cur.execute("""
    CREATE TABLE network_nodes (
        node_id TEXT PRIMARY KEY,
        name TEXT,
        substation_sector TEXT,
        ip_address TEXT,
        mac_address TEXT,
        protocol TEXT,
        firmware_version TEXT,
        status TEXT,
        latency_ms REAL,
        last_heartbeat TEXT
    );
    """)

    print("[*] Generating 500 Alarms Historian records...")
    kks_pool = [
        ("10LBA10CT001", "Primary Coolant Loop Outlet Temp", 345.2, 310.0, "°C", "CRITICAL"),
        ("10LBA10CP002", "PHT Main Header Pressure", 162.4, 150.0, "bar", "CRITICAL"),
        ("10LBA20AP001", "Primary Circulation Pump PHT-01 Vibe", 2.85, 2.20, "mm/s", "WARNING"),
        ("10LBA20AP002", "Primary Circulation Pump PHT-02 Vibe", 1.94, 2.20, "mm/s", "ADVISORY"),
        ("20LCA10AA001", "Secondary Decay Heat Dump Valve CV-201", 100.0, 0.0, "%", "CRITICAL"),
        ("20LCA10AA002", "Secondary Decay Heat Dump Valve CV-202", 0.0, 100.0, "%", "CRITICAL"),
        ("30MAC10EY001", "Emergency Diesel Generator EDG-01 Speed", 1500.0, 1500.0, "RPM", "CLEAR"),
        ("30MAC20EY001", "Emergency Diesel Generator EDG-02 Speed", 1498.0, 1500.0, "RPM", "CLEAR"),
        ("00CBB01GQ001", "Stack Radiometer Noble Gas Channel", 0.18, 0.50, "kBq/m³", "CLEAR"),
        ("10JAA10CE001", "In-Core SPND Platinum String #01", 102.4, 100.0, "%FP", "HIGH"),
        ("10JAA10CE002", "In-Core SPND Platinum String #02", 99.8, 100.0, "%FP", "CLEAR"),
        ("40SFA10CL001", "Spent Fuel Bay #3 Water Level", 11.8, 11.5, "m", "CLEAR"),
        ("50KAA10CP001", "Containment Atmospheric Delta Pressure", -120.0, -100.0, "Pa", "CLEAR"),
        ("60MOD10CT001", "Moderator D2O Cooler Inlet Temp", 44.5, 42.0, "°C", "HIGH"),
        ("60MOD10CL002", "Moderator D2O Dump Tank Level", 94.2, 92.0, "%", "CLEAR"),
        ("70ECMT10CF001", "Emergency Core Makeup Tank Gravity Flow", 0.0, 140.0, "L/s", "WARNING"),
        ("80FIR10CG001", "Cable Spreading Room VESDA Laser Obscuration", 0.012, 0.015, "%/m", "CLEAR"),
        ("90SEC10CR001", "North Security Fence Taut-Wire Tension", 48.0, 50.0, "kg", "CLEAR")
    ]

    operators = ["OP-7821 (Sharma)", "OP-4412 (Deshmukh)", "OP-9102 (Ramanathan)", "OP-3319 (Nambiar)", "OP-8820 (Verma)", "SYS-AUTO-ACK"]
    severities = ["CRITICAL", "HIGH", "WARNING", "ADVISORY", "CLEAR"]
    states = ["LATCHED", "ACTIVE", "ACKNOWLEDGED", "CLEARED"]

    base_time = datetime(2026, 10, 24, 21, 0, 0)
    for i in range(1, 501):
        alarm_id = f"ALM-2026-{10000 + i}"
        kks, desc, p_val, sp_val, unit, default_sev = random.choice(kks_pool)
        t_offset = base_time - timedelta(minutes=i * 12 + random.randint(1, 10), seconds=random.randint(0, 59))
        timestamp = t_offset.strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]
        
        # Jitter process value slightly
        actual_val = round(p_val * random.uniform(0.92, 1.08), 2)
        sev = default_sev if random.random() > 0.3 else random.choice(severities)
        st = "LATCHED" if sev == "CRITICAL" else random.choice(states)
        op = random.choice(operators)
        ack_t = (t_offset + timedelta(seconds=random.randint(4, 90))).strftime("%Y-%m-%d %H:%M:%S")
        mv = round(actual_val * 4.2 + random.uniform(10.0, 25.0), 3)
        bounce = random.randint(2, 14)

        cur.execute("""
        INSERT INTO alarms_historian VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        """, (alarm_id, timestamp, kks, desc, actual_val, sp_val, unit, st, sev, op, ack_t, mv, bounce))

    print("[*] Generating 250 PLC Registers...")
    for addr in range(40001, 40251):
        blk = f"BLOCK_{(addr - 40001) // 25 + 1}"
        kks, desc, _, _, unit, _ = random.choice(kks_pool)
        reg_desc = f"{desc} [Sub-register {addr % 10}]"
        raw_int = random.randint(0x1000, 0xFFFF)
        raw_hex = f"0x{raw_int:04X}"
        raw_bin = f"{raw_int:016b}"
        mult = random.choice([0.01, 0.1, 1.0, 0.05])
        s_val = round(raw_int * mult, 2)
        ro = 1 if addr < 40150 else 0
        sync_t = (datetime.now() - timedelta(seconds=random.randint(5, 300))).strftime("%Y-%m-%d %H:%M:%S")

        cur.execute("""
        INSERT INTO plc_registers VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        """, (addr, blk, kks, reg_desc, raw_hex, raw_bin, mult, s_val, unit, ro, sync_t))

    print("[*] Generating 150 Instrument Loops...")
    mfg_pool = [
        ("Emerson Rosemount", "3051S High-Accuracy DP Transmitter", "REV 7.2"),
        ("Yokogawa", "EJA110E Differential Pressure Transmitter", "REV 7.0"),
        ("ABB Instrumentation", "266DSH Nuclear Safety Qualified DP", "REV 6.8"),
        ("Electronics Corp of India (ECIL)", "TX-N900 In-Core Class 1E Transmitter", "REV 5.4"),
        ("Fuji Electric", "FCX-AIII High Static Line Transmitter", "REV 7.1")
    ]
    sectors = ["Sector-A Reactor Island", "Sector-B Aux Heat Exchanger Hall", "Sector-C Diesel Generator Vault", "Sector-D Containment Dome", "Sector-E Perimeter Mast"]
    technicians = ["Tech K. Ramanathan (ID: C&I-402)", "Tech V. Suresh (ID: C&I-118)", "Tech D. Mukherjee (ID: C&I-309)", "Tech R. K. Nair (ID: C&I-225)"]

    for i in range(1, 151):
        loop_id = f"LOOP-{2026}-{3000 + i}"
        kks, desc, _, _, unit, _ = random.choice(kks_pool)
        mfg, model, hart = random.choice(mfg_pool)
        sn = f"SN-2026-NUC-{random.randint(100000, 999999)}"
        sec = random.choice(sectors)
        low = 0.0
        high = round(random.choice([100.0, 250.0, 500.0, 1000.0, 16.0]), 1)
        ma = round(4.0 + (random.random() * 16.0), 3)
        cal_date = (datetime(2026, 10, 1) - timedelta(days=random.randint(1, 200))).strftime("%Y-%m-%d")
        tech = random.choice(technicians)
        tol = round(random.choice([0.025, 0.05, 0.075]), 3)

        cur.execute("""
        INSERT INTO instrument_loops VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        """, (loop_id, kks, desc, sec, mfg, model, sn, hart, low, high, unit, ma, cal_date, tech, tol))

    print("[*] Generating 400 Telemetry History points...")
    for i in range(1, 401):
        t_stamp = (datetime(2026, 10, 24, 23, 50, 0) - timedelta(minutes=i * 3)).strftime("%Y-%m-%d %H:%M:%S")
        kks, desc, p_val, _, unit, _ = random.choice(kks_pool)
        val = round(p_val + random.uniform(-p_val * 0.05, p_val * 0.05), 2)
        var = round(random.uniform(-4.5, 4.5), 2)

        cur.execute("""
        INSERT INTO telemetry_history (timestamp, kks_tag, tag_name, val, unit, variance_percent)
        VALUES (?, ?, ?, ?, ?, ?);
        """, (t_stamp, kks, desc, val, unit, var))

    print("[*] Generating 80 Maintenance Work Orders & LOTO...")
    order_titles = [
        "Primary Heat Transport Pump PHT-01 Mechanical Seal Ring Inspection",
        "Secondary Heat Exchanger HX-01 Titanium Tube Bundle Eddy Current Sweep",
        "Emergency Diesel Generator EDG-02 Governor Relay Recalibration",
        "Containment Exhaust Airlock CV-101 Pneumatic Seal Replacement",
        "Emergency Core Makeup Tank ECMT Isolation Valve Stroke Lubrication",
        "Control Rod Drive Mechanism CRDM Bank 4 Clutch Resistance Measurement",
        "In-Core SPND Signal Conditioner Amplifier Drift Benchmarking",
        "Heavy Water Moderator D2O Recombiner Catalyst Bed Nitrogen Purge",
        "Perimeter Radiation Gate Monitor GM-06 Scintillator High-Voltage Trim",
        "Secondary Feedwater Deaerator Relief Valve Pop-Test Calibration"
    ]
    wo_statuses = ["COMPLETED", "IN_PROGRESS", "CLOSED", "LOTO_ACTIVE"]
    valves = ["CV-101", "CV-102", "CV-201", "CV-202", "MOV-301", "MOV-302", "PV-401", "PV-402"]

    for i in range(1, 81):
        wo_id = f"WO-2026-{5000 + i}"
        if i == 1:
            title = "Secondary Decay Heat Relief Valve CV-201 Safety Interlock Diagnostics (SIS-Core bus 127.0.0.1:9090)"
            kks = "20LCA10AA001"
            sec = "Sector-B Aux Heat Exchanger Hall"
            prio = "CRITICAL"
            st = "LOTO_ACTIVE"
            auth = "Lead C&I Engineer (Dr. Arun Sharma)"
            assigned = "Tech K. Ramanathan (ID: C&I-402)"
            c_date = "2026-10-24"
            comp_date = None
            v = "CV-201"
            dose = 1.45
        else:
            title = random.choice(order_titles)
            kks, _, _, _, _, _ = random.choice(kks_pool)
            sec = random.choice(sectors)
            prio = random.choice(["HIGH", "URGENT", "NORMAL", "CRITICAL"])
            st = random.choice(wo_statuses)
            auth = "Lead C&I Engineer (Dr. Arun Sharma)" if random.random() > 0.4 else "Shift Supervisor (K. Ramanathan)"
            assigned = random.choice(technicians)
            c_date = (datetime(2026, 10, 15) - timedelta(days=random.randint(1, 45))).strftime("%Y-%m-%d")
            comp_date = (datetime(2026, 10, 20) - timedelta(days=random.randint(1, 10))).strftime("%Y-%m-%d") if st in ["COMPLETED", "CLOSED"] else None
            v = random.choice(valves)
            dose = round(random.uniform(0.12, 1.85), 2)

        cur.execute("""
        INSERT INTO maintenance_work_orders VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        """, (wo_id, title, kks, sec, prio, st, auth, assigned, c_date, comp_date, v, dose))

    print("[*] Generating 35 Network Nodes & RTUs...")
    protocols = ["Modbus TCP (Port 502)", "DNP3 over IP (Port 20000)", "IEC 60870-5-104 (Port 2404)", "OPC UA (Port 4840)"]
    node_names = [
        "RTU-01 Reactor Core Plenum Header", "RTU-02 PHT Pump Speed Control", "RTU-03 Secondary Cooling Valves",
        "RTU-04 Moderator D2O Purification", "RTU-05 Spent Fuel Pool Level & Temp", "RTU-06 Containment Negative Pressure",
        "RTU-07 Emergency Core Makeup Tank", "RTU-08 Met Tower Micrometeorology", "RTU-09 EDG-01 Standby Controller",
        "RTU-10 EDG-02 Standby Controller", "RTU-11 415V Switchgear Safety Bus", "RTU-12 11kV Grid Interconnection",
        "RTU-13 Water Demineralization Plant", "RTU-14 Stack Isokinetic Radiometer", "RTU-15 In-Core Neutron Flux Rack",
        "RTU-16 Rohini Civil Defense Siren 1", "RTU-17 Rohini Civil Defense Siren 2", "RTU-18 Rohini Civil Defense Siren 3",
        "RTU-19 Liquid Waste Delay Tanks", "RTU-20 Ventilation HEPA Filter Bank", "RTU-21 Perimeter Gate Monitor North",
        "RTU-22 Perimeter Gate Monitor South", "RTU-23 Boric Acid Emergency Injection", "RTU-24 Seismic Accelerometer 1",
        "RTU-25 Seismic Accelerometer 2", "RTU-26 Piezometer Borewell Network", "RTU-27 Fire Suppression Novec Bank",
        "RTU-28 Chilled Water HVAC Secondary", "RTU-29 Transformer Oil Gas Monitor", "RTU-30 Auxiliary Boiler Feed",
        "RTU-31 Helium Cover Gas Scrubber", "RTU-32 Emergency DC Battery Bank 1", "RTU-33 Emergency DC Battery Bank 2",
        "RTU-34 Radiation Triage Mobile Cart", "RTU-35 SCADA Gateway Internal Core"
    ]

    for i in range(1, 36):
        n_id = f"RTU-NODE-{i:02d}"
        name = node_names[i - 1]
        sec = random.choice(sectors)
        ip = f"10.0.5.{40 + i}"
        mac = f"00:1A:C4:B8:{i:02X}:{random.randint(10, 99):02X}"
        prot = random.choice(protocols)
        fw = f"v4.8.{random.randint(10, 45)}-RT"
        st = "ONLINE" if i != 3 else "DEGRADED"
        lat = round(random.uniform(0.8, 3.4), 2)
        hb = (datetime.now() - timedelta(seconds=random.randint(1, 45))).strftime("%Y-%m-%d %H:%M:%S")

        cur.execute("""
        INSERT INTO network_nodes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        """, (n_id, name, sec, ip, mac, prot, fw, st, lat, hb))

    conn.commit()
    conn.close()
    print(f"[+] Successfully generated kavach_scada.db ({os.path.getsize(DB_PATH) / 1024:.1f} KB) with 1,415 total records!")

if __name__ == "__main__":
    generate()
