#!/bin/sh
set -e

# Generate SQLite database if not present
if [ ! -f /app/kavach_scada.db ]; then
    python3 /app/generate_db.py
fi

# Ensure database is strictly read-only so participants cannot alter or drop tables
chmod 444 /app/kavach_scada.db

# Multi-tenant safety: Background ephemeral cleaner for /tmp to prevent participants from leaving flags/payloads
(while true; do
    find /tmp /var/tmp /dev/shm -mindepth 1 -not -name "kavach*" -not -name ".*" -mmin +0.3 -delete 2>/dev/null || true
    sleep 15
done) &

# Launch internal loopback controller on 127.0.0.1:9090 as scada_operator
echo "[+] Starting internal SIS-Core controller on 127.0.0.1:9090 as scada_operator..."
su -s /bin/sh scada_operator -c "python3 /app/internal_controller.py" &

# Wait for internal controller to bind
sleep 1

# Launch external SCADA Gateway on 0.0.0.0:5000
echo "[+] Starting KAVACH SCADA Gateway on 0.0.0.0:5000..."
exec su -s /bin/sh scada_operator -c "gunicorn -w 2 -b 0.0.0.0:5000 server:app"
