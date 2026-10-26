#!/usr/bin/env python3
"""
MAIT-NRF Internal Safety Instrumented Controller (SIS-Core)
Hardware bus watchdog and firmware diagnostics service.
Bound to isolated internal loopback port 9090.
"""

from flask import Flask, request, jsonify
import subprocess
import os

app = Flask(__name__)
PORT = 9090

@app.route('/', methods=['GET'])
def index():
    return jsonify({
        "service": "MAIT-NRF Safety Instrumented System (SIS-Core)",
        "version": "4.8.1-RT",
        "node_id": "SIS-CORE- Rohini-01",
        "operating_mode": "POST_SCRAM_DECAY_HEAT_LOCKED",
        "internal_endpoints": [
            {
                "path": "/api/controller/status",
                "method": "GET",
                "description": "Hardware watchdog, bus voltages & relay latch registers"
            },
            {
                "path": "/api/controller/firmware-verify",
                "method": "GET/POST",
                "description": "Executes cryptographic parity check on controller firmware routine",
                "parameters": {
                    "routine": "Target routine identifier (e.g. decay_heat_recovery)",
                    "checksum": "Expected 32-bit hex CRC (e.g. 0x8FA4)"
                }
            }
        ]
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
    # Accept from either JSON, query parameters, or form data
    data = {}
    if request.is_json:
        data = request.get_json() or {}
    
    routine = request.args.get('routine') or data.get('routine') or request.form.get('routine') or 'decay_heat_recovery'
    checksum = request.args.get('checksum') or data.get('checksum') or request.form.get('checksum') or '0x8FA4'

    # Routine validation invokes parity check shell script
    cmd = f"/opt/kavach/scripts/check_routine.sh {routine} {checksum}"
    
    try:
        proc = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=8, executable='/bin/bash')
        output = (proc.stdout + proc.stderr)[:4096]
        return jsonify({
            "status": "completed",
            "command_executed": cmd,
            "returncode": proc.returncode,
            "output": output
        })
    except subprocess.TimeoutExpired:
        return jsonify({"status": "timeout", "error": "Diagnostic routine timed out."}), 504
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500

if __name__ == '__main__':
    # Loopback & internal network binding (Port 9090 is unexposed externally)
    app.run(host='0.0.0.0', port=PORT)
