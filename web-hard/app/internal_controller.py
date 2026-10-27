#!/usr/bin/env python3
"""
MAIT-NRF Internal Safety Instrumented Controller (SIS-Core)
Hardware bus watchdog and firmware diagnostics service.
Bound to isolated internal loopback port 9090.
"""

from flask import Flask, request, jsonify, render_template_string
import subprocess
import os

app = Flask(__name__)
PORT = 9090

@app.route('/', methods=['GET'])
def index():
    return jsonify({
        "service": "MAIT-NRF Safety Instrumented System (SIS-Core)",
        "node_id": "SIS-CORE-Rohini-01",
        "hardware_model": "KAVACH-PLC-402-RT",
        "operating_mode": "POST_SCRAM_DECAY_HEAT_LOCKED",
        "bus_voltage_vdc": 24.12,
        "firmware_build": "v4.8.1-RT",
        "watchdog_active": True
    })

@app.route('/api/controller/status', methods=['GET'])
def status():
    return jsonify({
        "controller_id": "SIS-PLC-402",
        "watchdog_timer_ms": 250,
        "bus_24v_dc": 24.12,
        "bus_5v_logic": 5.02,
        "scram_latch_relay": "LATCHED (TRIPPED)",
        "decay_heat_pump_interlock": "LOCKED (SAFETY TRIP 0x44)",
        "recovery_status": "Manual engineering override required via controller terminal"
    })

@app.route('/api/controller/firmware-verify', methods=['GET', 'POST'])
def firmware_verify():
    data = {}
    if request.is_json:
        data = request.get_json() or {}
    elif request.form:
        data = request.form
    
    routine = request.args.get('routine') or data.get('routine') or 'decay_heat_recovery'
    checksum = request.args.get('checksum') or data.get('checksum') or '0x8FA4'
    format_template = request.args.get('format') or data.get('format') or "[AUDIT] Routine {{ routine }} verification: {{ status }}"

    # 1. Parameterized, safe execution (Command Injection on routine is blocked!)
    cmd = ["/opt/kavach/scripts/check_routine.sh", str(routine), str(checksum)]
    try:
        proc = subprocess.run(cmd, shell=False, capture_output=True, text=True, timeout=8)
        script_output = (proc.stdout + proc.stderr)[:2048]
    except Exception as e:
        script_output = f"Routine execution error: {str(e)}"

    # 2. Jinja2 template formatting for audit record (The SSTI entry point)
    try:
        rendered_audit = render_template_string(
            format_template,
            routine=routine,
            checksum=checksum,
            status="OK",
            output=script_output
        )
    except Exception as te:
        rendered_audit = f"Template rendering fault: {str(te)}"

    return jsonify({
        "status": "completed",
        "target_routine": str(routine),
        "parity_crc": str(checksum),
        "audit_record": rendered_audit,
        "controller_status": "LATCH_HELD"
    })

if __name__ == '__main__':
    # Loopback & internal network binding (Port 9090 is unexposed externally)
    app.run(host='0.0.0.0', port=PORT)
