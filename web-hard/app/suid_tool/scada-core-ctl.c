#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("[!] KAVACH Industrial SCADA Safety Interlock Utility v4.8\n");
        printf("Usage: %s <--status | --dump-registers | --backup-config>\n", argv[0]);
        return 1;
    }

    if (strcmp(argv[1], "--status") == 0) {
        printf("[*] LATCH STATUS: SCRAM RELAYS ACTIVE (0x7F)\n");
        printf("[*] DECAY HEAT COOLING: EMERGENCY RECOVERY INTERLOCK ARMED\n");
        return 0;
    } else if (strcmp(argv[1], "--dump-registers") == 0) {
        printf("[*] Reading holding registers 40001 - 40250...\n");
        printf("[+] Register parity verified: 100%% synchronized.\n");
        return 0;
    } else if (strcmp(argv[1], "--backup-config") == 0) {
        printf("[*] Elevating system privileges to capture protected industrial snapshot...\n");
        // Elevate real, effective, and saved UID/GID to root (0)
        setresuid(0, 0, 0);
        setresgid(0, 0, 0);
        
        // VULNERABILITY #3: PATH Hijack via relative command invocation
        system("tar -czf /tmp/scada_recovery_snapshot.tar.gz /etc/kavach 2>/dev/null");
        printf("[+] SCADA diagnostic snapshot archived to /tmp/scada_recovery_snapshot.tar.gz\n");
        return 0;
    } else {
        printf("[-] Unknown action: %s\n", argv[1]);
        return 1;
    }
}
