#!/usr/bin/env python3
"""
MAIT Nuclear Research Facility - KAVACH SCADA Industrial Gateway v4.8
External Port: 5000 (Mapped externally via Nginx reverse proxy on Port 8003)
Provides high-density data-driven HMI monitoring & operational diagnostics.
"""

from flask import Flask, render_template, request, jsonify, redirect, url_for
import sqlite3
import urllib.parse
import urllib.request
import hashlib
import json
import os
import time

import hmac

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "KAVACH_SCADA_SECRET_2026_PROD!")
DB_PATH = os.path.join(os.path.dirname(__file__), "kavach_scada.db")

SECRET = os.environ.get("COREZERO_FLAG_HMAC_SECRET", "CTF_Rak5hna_Ori3ntat1on")

ORIGINAL_FLAGS = {
    "easy": "RAKSHNA{1d0r_r3v34ls_pr0cur3m3nt_l34k}",
    "medium": "RAKSHNA{pr0t0typ3_p0llut10n_scv4m_c0r3}",
    "hard": "RAKSHNA{sc4d4_ssrf_t0_rc3_pr1v3sc_m3ltd0wn}"
}

def make_participant_web_flag(email: str, difficulty: str) -> str:
    normalized_email = str(email or 'participant@ctf.local').strip().lower()
    normalized_difficulty = str(difficulty or 'hard').strip().lower()
    original_flag = ORIGINAL_FLAGS.get(normalized_difficulty, "RAKSHNA{flag}")

    tier = f"web_{normalized_difficulty}"
    suffix = hmac.new(SECRET.encode('utf-8'), f"{normalized_email}|{tier}".encode('utf-8'), hashlib.sha256).hexdigest()
    base_payload = original_flag[8:-1]
    return f"RAKSHNA{{{base_payload}_{suffix}}}"

@app.before_request
def enforce_email_gate():
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

@app.route('/gate', methods=['GET'])
def gate():
    next_url = request.args.get('next', '/scada/overview')
    current_email = request.cookies.get('Web_Chall_cookie', '')
    error = request.args.get('error', '')
    return render_template('gate.html', next_url=next_url, current_email=current_email, error=error)

@app.route('/gate/submit', methods=['POST'])
def gate_submit():
    email = request.form.get('email', '').strip()
    next_url = request.form.get('next', '/scada/overview')
    if not email or '@' not in email or '.' not in email.split('@')[-1]:
        return redirect(url_for('gate', error="Please provide a valid email address.", next=next_url))

    resp = redirect(next_url)
    resp.set_cookie('Web_Chall_cookie', email, max_age=604800, samesite='Lax')
    return resp

def get_db():
    conn = sqlite3.connect(f"file:{DB_PATH}?mode=ro", uri=True)
    conn.row_factory = sqlite3.Row
    return conn

# =========================================================================
# APPLICATION VIEWS (MULTI-PAGE INDUSTRIAL SCADA WORKSTATION)
# =========================================================================

@app.route('/scada/clearance-claim', methods=['GET', 'POST'])
def clearance_claim():
    if request.method == 'POST':
        voucher = request.form.get('voucher_key', '').strip()
        user_email = request.cookies.get('Web_Chall_cookie', '')

        if not user_email:
            return render_template('clearance_claim.html', error="Web_Chall_cookie is missing. Please initialize your session at /gate first.")

        if voucher != "KAVACH-OVERRIDE-AERB-9941":
            return render_template('clearance_claim.html', error="Invalid SIS Recovery Voucher Key. Core interlocks remain latched.")

        flag = make_participant_web_flag(user_email, "hard")
        return render_template('clearance_claim.html', success=True, flag=flag, email=user_email)

    return render_template('clearance_claim.html')

@app.route('/')
def root():
    return redirect('/scada/overview')

@app.route('/scada/overview')
def overview():
    return render_template('overview.html')

@app.route('/scada/mimic')
def mimic():
    return render_template('mimic.html')

@app.route('/scada/historian')
def historian():
    return render_template('historian.html')

@app.route('/scada/registers')
def registers():
    return render_template('registers.html')

@app.route('/scada/instruments')
def instruments():
    return render_template('instruments.html')

@app.route('/scada/nodes')
def nodes():
    return render_template('nodes.html')

@app.route('/scada/maintenance')
def maintenance():
    return render_template('maintenance.html')

@app.route('/scada/diagnostics')
def diagnostics():
    return render_template('diagnostics.html')

# =========================================================================
# ASYNCHRONOUS DATA & TELEMETRY APIS
# =========================================================================

@app.route('/api/v1/scada/overview')
def api_overview():
    db = get_db()
    total_alarms = db.execute("SELECT COUNT(*) FROM alarms_historian").fetchone()[0]
    critical_alarms = db.execute("SELECT COUNT(*) FROM alarms_historian WHERE severity = 'CRITICAL'").fetchone()[0]
    total_instruments = db.execute("SELECT COUNT(*) FROM instrument_loops").fetchone()[0]
    total_nodes = db.execute("SELECT COUNT(*) FROM network_nodes").fetchone()[0]
    active_loto = db.execute("SELECT COUNT(*) FROM maintenance_work_orders WHERE status = 'LOTO_ACTIVE'").fetchone()[0]
    db.close()

    return jsonify({
        "status": "success",
        "system_status": "POST_SCRAM_STABILIZATION",
        "core_thermal_power": "0.14 MWth (Decay Heat Only)",
        "pht_coolant_pressure": "162.4 bar",
        "core_outlet_temp": "345.2 °C",
        "decay_heat_pump_cv201": "LOCKED_SHUT_TRIP_0x44",
        "scram_rods_status": "16/16 FULLY INSERTED (1.14s)",
        "active_alarms_count": critical_alarms,
        "total_alarms_logged": total_alarms,
        "online_field_nodes": total_nodes,
        "active_loto_isolations": active_loto,
        "calibrated_instruments": total_instruments,
        "facility": "MAIT Nuclear Research Facility - Sector 22 Rohini",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
    })

@app.route('/api/v1/scada/alarms')
def api_alarms():
    q = request.args.get('q', '').strip()
    sev = request.args.get('severity', '').strip()
    limit = int(request.args.get('limit', 100))
    offset = int(request.args.get('offset', 0))

    query = "SELECT * FROM alarms_historian WHERE 1=1"
    params = []

    if q:
        query += " AND (kks_tag LIKE ? OR tag_description LIKE ? OR alarm_id LIKE ?)"
        params.extend([f"%{q}%", f"%{q}%", f"%{q}%"])

    if sev and sev != 'ALL':
        query += " AND severity = ?"
        params.append(sev)

    query += " ORDER BY timestamp DESC LIMIT ? OFFSET ?"
    params.extend([limit, offset])

    db = get_db()
    rows = db.execute(query, params).fetchall()
    total = db.execute("SELECT COUNT(*) FROM alarms_historian").fetchone()[0]
    db.close()

    alarms = [dict(r) for r in rows]
    return jsonify({
        "status": "success",
        "total": total,
        "count": len(alarms),
        "alarms": alarms
    })

@app.route('/api/v1/scada/alarms/<alarm_id>')
def api_alarm_detail(alarm_id):
    db = get_db()
    row = db.execute("SELECT * FROM alarms_historian WHERE alarm_id = ?", (alarm_id,)).fetchone()
    db.close()

    if not row:
        return jsonify({"status": "error", "message": "Alarm record not found in SOE database."}), 404

    return jsonify({"status": "success", "alarm": dict(row)})

@app.route('/api/v1/scada/telemetry/tag/<kks_tag>')
def api_telemetry_tag(kks_tag):
    db = get_db()
    row = db.execute("SELECT * FROM instrument_loops WHERE kks_tag = ?", (kks_tag,)).fetchone()
    history = db.execute("SELECT timestamp, val, unit, variance_percent FROM telemetry_history WHERE kks_tag = ? ORDER BY timestamp DESC LIMIT 20", (kks_tag,)).fetchall()
    db.close()

    if not row:
        return jsonify({"status": "error", "message": f"Tag {kks_tag} not found in instrumentation registry."}), 404

    return jsonify({
        "status": "success",
        "instrument": dict(row),
        "history": [dict(h) for h in history]
    })

@app.route('/api/v1/scada/registers')
def api_registers():
    block = request.args.get('block', '').strip()
    search = request.args.get('q', '').strip()

    query = "SELECT * FROM plc_registers WHERE 1=1"
    params = []

    if block and block != 'ALL':
        query += " AND block_name = ?"
        params.append(block)

    if search:
        query += " AND (description LIKE ? OR kks_tag LIKE ? OR register_addr LIKE ?)"
        params.extend([f"%{search}%", f"%{search}%", f"%{search}%"])

    query += " ORDER BY register_addr ASC"

    db = get_db()
    rows = db.execute(query, params).fetchall()
    db.close()

    return jsonify({
        "status": "success",
        "count": len(rows),
        "registers": [dict(r) for r in rows]
    })

@app.route('/api/v1/scada/registers/<int:addr>')
def api_register_detail(addr):
    db = get_db()
    row = db.execute("SELECT * FROM plc_registers WHERE register_addr = ?", (addr,)).fetchone()
    db.close()

    if not row:
        return jsonify({"status": "error", "message": "Register address out of range."}), 404

    return jsonify({"status": "success", "register": dict(row)})

@app.route('/api/v1/scada/instruments')
def api_instruments():
    sec = request.args.get('sector', '').strip()
    q = request.args.get('q', '').strip()

    query = "SELECT * FROM instrument_loops WHERE 1=1"
    params = []

    if sec and sec != 'ALL':
        query += " AND substation_sector = ?"
        params.append(sec)

    if q:
        query += " AND (kks_tag LIKE ? OR service_description LIKE ? OR manufacturer LIKE ? OR serial_number LIKE ?)"
        params.extend([f"%{q}%", f"%{q}%", f"%{q}%", f"%{q}%"])

    query += " ORDER BY kks_tag ASC"

    db = get_db()
    rows = db.execute(query, params).fetchall()
    db.close()

    return jsonify({
        "status": "success",
        "count": len(rows),
        "instruments": [dict(r) for r in rows]
    })

@app.route('/api/v1/scada/instruments/<kks_tag>')
def api_instrument_detail(kks_tag):
    db = get_db()
    row = db.execute("SELECT * FROM instrument_loops WHERE kks_tag = ?", (kks_tag,)).fetchone()
    db.close()

    if not row:
        return jsonify({"status": "error", "message": "Instrument loop not found."}), 404

    return jsonify({"status": "success", "loop": dict(row)})

@app.route('/api/v1/scada/nodes')
def api_nodes():
    db = get_db()
    rows = db.execute("SELECT * FROM network_nodes ORDER BY node_id ASC").fetchall()
    db.close()

    return jsonify({
        "status": "success",
        "count": len(rows),
        "nodes": [dict(r) for r in rows]
    })

@app.route('/api/v1/scada/nodes/<node_id>/health')
def api_node_health(node_id):
    db = get_db()
    row = db.execute("SELECT * FROM network_nodes WHERE node_id = ?", (node_id,)).fetchone()
    db.close()

    if not row:
        return jsonify({"status": "error", "message": "Node ID not recognized."}), 404

    return jsonify({
        "status": "success",
        "node_id": node_id,
        "name": row['name'],
        "ip_address": row['ip_address'],
        "protocol": row['protocol'],
        "ping_status": "ACK (Packet Sent: 64 bytes)",
        "rtt_ms": row['latency_ms'],
        "firmware": row['firmware_version'],
        "last_sync": time.strftime("%Y-%m-%d %H:%M:%S")
    })

@app.route('/api/v1/scada/work-orders')
def api_work_orders():
    st = request.args.get('status', '').strip()
    query = "SELECT * FROM maintenance_work_orders WHERE 1=1"
    params = []

    if st and st != 'ALL':
        query += " AND status = ?"
        params.append(st)

    query += " ORDER BY created_date DESC"

    db = get_db()
    rows = db.execute(query, params).fetchall()
    db.close()

    return jsonify({
        "status": "success",
        "count": len(rows),
        "work_orders": [dict(r) for r in rows]
    })

@app.route('/api/v1/scada/work-orders/<order_id>')
def api_work_order_detail(order_id):
    db = get_db()
    row = db.execute("SELECT * FROM maintenance_work_orders WHERE order_id = ?", (order_id,)).fetchone()
    db.close()

    if not row:
        return jsonify({"status": "error", "message": "Work order not found."}), 404

    return jsonify({"status": "success", "work_order": dict(row)})

# =========================================================================
# REMOTE TELEMETRY DIAGNOSTIC PROBE DISPATCHER
# =========================================================================

@app.route('/api/v1/scada/diagnostics/probe', methods=['POST'])
def diagnostic_probe():
    data = request.get_json(silent=True) or request.form
    target_url = (data.get('target_url') or '').strip()
    timeout = int(data.get('timeout') or 5)
    method = (data.get('method') or 'GET').upper()
    payload = data.get('payload') or ''

    if not target_url:
        return jsonify({"status": "error", "message": "Target endpoint URL parameter is required."}), 400

    # Auto-prepend http:// if omitted by user
    if not target_url.startswith(('http://', 'https://')):
        target_url = 'http://' + target_url

    # Parse and validate protocol
    parsed = urllib.parse.urlparse(target_url)
    if parsed.scheme not in ['http', 'https']:
        return jsonify({"status": "error", "message": "Unsupported telemetry scheme. Use HTTP or HTTPS."}), 400

    host = (parsed.hostname or '').lower()

    # Blacklist filter preventing obvious localhost/127.0.0.1
    # Bypassed via: 127.0.0.2, decimal IP (2130706433), octal (0177.0.0.1), [::1], etc.
    blocked_hosts = ["localhost", "127.0.0.1", "0.0.0.0", "::", "0"]
    if host in blocked_hosts or host.startswith("localhost"):
        return jsonify({
            "status": "security_violation",
            "code": "AERB-OT-SEC-901",
            "message": "Access Denied: Direct probe of loopback localhost addresses is prohibited by AERB Cyber Directive Section 9."
        }), 403

    try:
        req = urllib.request.Request(target_url, method=method)
        req.add_header('User-Agent', 'KAVACH-SCADA-Diagnostic-Probe/4.8 (Nuclear C&I)')
        
        body_bytes = None
        if method == 'POST' and payload:
            if isinstance(payload, dict):
                req.add_header('Content-Type', 'application/json')
                body_bytes = json.dumps(payload).encode('utf-8')
            else:
                body_bytes = str(payload).encode('utf-8')

        with urllib.request.urlopen(req, data=body_bytes, timeout=timeout) as response:
            resp_body = response.read().decode('utf-8', errors='replace')
            resp_code = response.getcode()
            headers = dict(response.headers)

            return jsonify({
                "status": "success",
                "probe_target": target_url,
                "http_status": resp_code,
                "headers": headers,
                "response": resp_body
            })

    except urllib.error.HTTPError as e:
        err_body = e.read().decode('utf-8', errors='replace')
        return jsonify({
            "status": "remote_error",
            "http_status": e.code,
            "response": err_body
        }), e.code
    except Exception as e:
        return jsonify({
            "status": "network_failure",
            "message": f"Connection to remote diagnostic node failed: {str(e)}"
        }), 502

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
