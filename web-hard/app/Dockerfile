FROM python:3.11-slim

# Install system dependencies, sudo, netcat, procps
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    sudo \
    procps \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

# Create unprivileged user (User X): scada_operator (UID 1001)
RUN useradd -m -u 1001 -s /bin/bash scada_operator

# Create vault service user (User Y): safety_supervisor (UID 1002) - system account without login shell
RUN useradd -r -u 1002 -s /bin/false safety_supervisor

# Harden environment: Disable bash history globally and lock ~/.bashrc
RUN echo "unset HISTFILE\nexport HISTSIZE=0\nexport HISTFILESIZE=0\nset +o history" >> /etc/bash.bashrc \
    && echo "unset HISTFILE\nexport HISTSIZE=0\nexport HISTFILESIZE=0\nset +o history" >> /etc/profile \
    && echo "unset HISTFILE\nexport HISTSIZE=0\nexport HISTFILESIZE=0\nset +o history" > /home/scada_operator/.bashrc \
    && chown root:root /home/scada_operator/.bashrc \
    && chmod 444 /home/scada_operator/.bashrc

# Create app directory
WORKDIR /app

# Copy requirements & install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create /opt/kavach realistic industrial SCADA environment
RUN mkdir -p /opt/kavach/bin \
             /opt/kavach/scripts \
             /opt/kavach/config \
             /opt/kavach/logs \
             /opt/kavach/vault \
             /opt/kavach/secure_vault

# Copy application files
COPY . .

# Setup diagnostic recovery utility (Python)
RUN cp scada-core-ctl.py /opt/kavach/bin/scada-core-ctl.py \
    && ln -s /opt/kavach/bin/scada-core-ctl.py /opt/kavach/bin/scada-core-ctl \
    && chown root:safety_supervisor /opt/kavach/bin/scada-core-ctl.py \
    && chmod 555 /opt/kavach/bin/scada-core-ctl.py

# Allow scada_operator to run scada-core-ctl.py as safety_supervisor without password
RUN echo "scada_operator ALL=(safety_supervisor) NOPASSWD: /opt/kavach/bin/scada-core-ctl.py" >> /etc/sudoers \
    && echo "scada_operator ALL=(ALL) NOPASSWD: /opt/kavach/bin/scada-core-ctl.py" >> /etc/sudoers

# Populate realistic SCADA binaries and helpers
RUN cp check_routine.sh /opt/kavach/scripts/check_routine.sh \
    && ln -s /opt/kavach/scripts/check_routine.sh /opt/kavach/bin/check_routine.sh \
    && chmod +x /opt/kavach/scripts/check_routine.sh \
    && echo '#!/usr/bin/env python3\nprint("[*] Modbus Poller Daemon: RTU-01, RTU-02, RTU-03 online.")' > /opt/kavach/bin/modbus_poller.py \
    && echo '#!/bin/sh\necho "[*] Lockout/Tagout (LOTO) active: Tag #AERB-883921"' > /opt/kavach/bin/loto_tagger.sh \
    && chmod +x /opt/kavach/bin/modbus_poller.py /opt/kavach/bin/loto_tagger.sh

# Populate realistic SCADA configs and logs
RUN echo '{"facility":"MAIT-NRF","node":"SCADA-GATEWAY-ROHINI","scram_lock":true,"sis_version":"4.8.1-RT"}' > /opt/kavach/config/config.json \
    && echo '40001:REACTIVITY_HOLD\n40002:BORON_FEED_FLOW\n40010:CV201_RELIEF_VALVE' > /opt/kavach/config/modbus_registers.conf \
    && echo '[INFO] SCADA Bus initialized at 2026-10-21 04:00:00\n[INFO] Periodic register sync 100% OK' > /opt/kavach/logs/scada_bus.log \
    && echo '[2026-10-21 07:15:22] [WARN] SIS interlock latched on CV-201 (Relay 0x44 tripped).\n[2026-10-21 07:18:04] [CRIT] Emergency SCRAM state locked by AERB protocol.\n[2026-10-21 07:20:11] [AUDIT] Emergency override flag sealed into secure_vault/flag.txt by safety_supervisor.' > /opt/kavach/logs/sis_interlock.log \
    && echo '{"vault_id":"VAULT-SIS-01","status":"ARMED"}' > /opt/kavach/vault/baseline.dat \
    && echo '<thresholds><interlock id="0x44" status="LATCHED" relief_valve="CV-201"/></thresholds>' > /opt/kavach/vault/interlock_thresholds.xml

# Place flag/recovery voucher in protected secure_vault: accessible ONLY by safety_supervisor (Mode 0700 dir, 0400 file)
RUN printf '================================================================================\n[+] AERB SIS EMERGENCY VAULT RECOVERY VOUCHER\n    FACILITY: MAIT NUCLEAR RESEARCH FACILITY (MAIT-NRF)\n    STATUS  : SCRAM INTERLOCK LATCHED ON RELAY 0x44 (CV-201)\n================================================================================\n\n[+] AIR-GAPPED RECOVERY VOUCHER KEY:\n    KAVACH-OVERRIDE-AERB-9941\n\n[!] INSTRUCTION:\n    Submit this recovery voucher at the terminal clearance console:\n    http://<workstation_host>:8003/scada/clearance-claim\n    to seal containment and issue your verified dynamic CTF flag!\n================================================================================\n' > /opt/kavach/secure_vault/flag.txt \
    && chown -R safety_supervisor:safety_supervisor /opt/kavach/secure_vault \
    && chmod 700 /opt/kavach/secure_vault \
    && chmod 400 /opt/kavach/secure_vault/flag.txt

# Ensure general permissions on /opt/kavach are readable by scada_operator
RUN chown -R root:scada_operator /opt/kavach/config /opt/kavach/logs /opt/kavach/vault \
    && chmod -R 755 /opt/kavach/bin /opt/kavach/config /opt/kavach/logs /opt/kavach/vault

# Generate database and lock to READ-ONLY (Mode 444) to prevent database tampering
RUN python3 generate_db.py \
    && chown -R scada_operator:scada_operator /app \
    && chmod 444 /app/kavach_scada.db \
    && chmod +x entrypoint.sh

EXPOSE 5000

ENTRYPOINT ["/app/entrypoint.sh"]
