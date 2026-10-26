#!/usr/bin/env python3
"""
KAVACH Industrial SCADA Safety Interlock & Diagnostic Vault Utility v4.8
AERB Safety Instrumented System (SIS) - Restricted Maintenance Routine
Classification: AERB-OT-RESTRICTED-L4
"""
import os
import sys
import json
import pwd

# Security isolation: Drop privileges to 'safety_supervisor' if executed with elevated rights
try:
    vault_user = pwd.getpwnam("safety_supervisor")
    os.setgid(vault_user.pw_gid)
    os.setuid(vault_user.pw_uid)
except Exception:
    pass

BANNER = """================================================================================
  KAVACH INDUSTRIAL SCADA INTERLOCK RECOVERY UTILITY v4.8
  AERB SAFETY INSTRUMENTED SYSTEM (SIS) - AIR-GAPPED DIAGNOSTIC VAULT
================================================================================"""

def print_status():
    print("[*] LATCH STATUS: SCRAM RELAYS ACTIVE (0x7F)")
    print("[*] DECAY HEAT COOLING: EMERGENCY RECOVERY INTERLOCK ARMED")
    print(f"[*] RUNTIME IDENTITY: {pwd.getpwuid(os.getuid()).pw_name} (UID {os.getuid()})")

def print_registers():
    print("[*] Reading holding registers 40001 - 40250...")
    print("[+] Register parity verified: 100% synchronized.")

def verify_and_read_vault(manifest_raw):
    try:
        manifest = json.loads(manifest_raw)
    except Exception as e:
        print(f"[-] Invalid JSON manifest: {e}")
        return 1

    vault_dir = "/opt/kavach/vault/"
    vault_key = manifest.get("vault_key", "")
    auth_header = manifest.get("auth", "")

    if not vault_key:
        print("[-] Error: 'vault_key' field required in manifest descriptor.")
        return 1

    if auth_header != "SIS_OVERRIDE":
        print("[-] Error: Unauthorized recovery request. Expected 'auth': 'SIS_OVERRIDE'")
        return 1

    # Normalization: Strip relative path sequences
    sanitized_key = vault_key.lstrip("/")
    sanitized_key = sanitized_key.replace("../", "")

    target_path = os.path.join(vault_dir, sanitized_key)
    resolved_path = os.path.realpath(target_path)

    # Perimeter Interlock: Confine all reads strictly to /opt/kavach/ boundaries
    if not resolved_path.startswith("/opt/kavach/"):
        print(f"[-] Perimeter Interlock Tripped: Access outside /opt/kavach is strictly prohibited.")
        return 1

    print(f"[*] Accessing safety vault descriptor: {sanitized_key}")
    try:
        with open(resolved_path, "r") as f:
            data = f.read()
        print("\n[+] ========================================================")
        print("[+] EMERGENCY OVERRIDE VAULT KEY VERIFIED:")
        print(data.strip())
        print("[+] ========================================================\n")
        return 0
    except FileNotFoundError:
        print(f"[-] Vault key not found: {resolved_path}")
        return 1
    except PermissionError:
        print(f"[-] Security Fault: Access denied to {resolved_path}")
        return 1
    except Exception as e:
        print(f"[-] Hardware bus read error: {e}")
        return 1

def main():
    print(BANNER)
    if len(sys.argv) < 2:
        print("Usage: scada-core-ctl.py <--status | --dump-registers | --manifest '<json>'>")
        sys.exit(1)

    cmd = sys.argv[1]
    if cmd == "--status":
        print_status()
    elif cmd == "--dump-registers":
        print_registers()
    elif cmd == "--manifest":
        if len(sys.argv) < 3:
            print("[-] Error: Manifest JSON string required.")
            sys.exit(1)
        sys.exit(verify_and_read_vault(sys.argv[2]))
    else:
        print(f"[-] Unknown action: {cmd}")
        sys.exit(1)

if __name__ == "__main__":
    main()
