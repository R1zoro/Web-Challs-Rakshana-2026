#!/usr/bin/env bash
# ==============================================================================
# Rakshana Orientation CTF 2026 - Master Challenge Management Script
# Supports: start, stop, restart, status, logs, update, test
# ==============================================================================

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
CHALLS=("web-easy" "web-medium" "web-hard")
PORTS=(8001 8002 8003)

print_banner() {
    echo "=================================================================="
    echo "  RAKSHANA ORIENTATION CTF 2026 - WEB TRACK CONTROLLER"
    echo "=================================================================="
}

cmd_start() {
    print_banner
    echo "[+] Launching all 3 challenges in isolated bridge networks..."
    for chall in "${CHALLS[@]}"; do
        if [ -d "$DIR/$chall" ]; then
            echo "[*] Starting $chall..."
            docker compose -f "$DIR/$chall/docker-compose.yml" up -d --build
        fi
    done
    echo ""
    echo "[+] All challenges launched successfully!"
    cmd_status
}

cmd_stop() {
    print_banner
    echo "[!] Stopping all CTF challenges..."
    for chall in "${CHALLS[@]}"; do
        if [ -d "$DIR/$chall" ]; then
            echo "[*] Stopping $chall..."
            docker compose -f "$DIR/$chall/docker-compose.yml" down
        fi
    done
    echo "[+] All challenge containers stopped."
}

cmd_restart() {
    TARGET=${1:-"all"}
    if [ "$TARGET" == "all" ]; then
        cmd_stop
        cmd_start
    elif [[ " ${CHALLS[*]} " =~ " ${TARGET} " ]]; then
        echo "[*] Restarting $TARGET..."
        docker compose -f "$DIR/$TARGET/docker-compose.yml" restart
    else
        echo "[-] Unknown target: $TARGET. Available: web-easy, web-medium, web-hard, all"
        exit 1
    fi
}

cmd_status() {
    echo ""
    echo "--- ACTIVE CHALLENGE CONTAINERS ---"
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    echo ""
    echo "--- RESOURCE FOOTPRINT ---"
    docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"
    echo ""
}

cmd_logs() {
    TARGET=${1:-"web-hard"}
    if [[ " ${CHALLS[*]} " =~ " ${TARGET} " ]]; then
        echo "[*] Streaming logs for $TARGET (Ctrl+C to exit)..."
        docker compose -f "$DIR/$TARGET/docker-compose.yml" logs -f --tail=100
    else
        echo "[-] Usage: ./manage.sh logs [web-easy | web-medium | web-hard]"
    fi
}

cmd_update() {
    print_banner
    echo "[*] Pulling latest updates from Git..."
    git pull
    echo "[*] Rebuilding modified containers..."
    cmd_start
    echo "[+] Update complete & verified!"
}

cmd_test() {
    print_banner
    echo "[*] Running rapid health-check diagnostics..."
    for i in "${!CHALLS[@]}"; do
        CHALL="${CHALLS[$i]}"
        PORT="${PORTS[$i]}"
        echo -n "[*] Probing $CHALL on port $PORT... "
        STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:$PORT/" || echo "FAILED")
        if [ "$STATUS" == "200" ] || [ "$STATUS" == "302" ]; then
            echo -e "\033[0;32mONLINE (HTTP $STATUS)\033[0m"
        else
            echo -e "\033[0;31mOFFLINE / ERROR ($STATUS)\033[0m"
        fi
    done
    echo ""
}

# --- CLI Dispatcher ---
case "$1" in
    start)
        cmd_start
        ;;
    stop)
        cmd_stop
        ;;
    restart)
        cmd_restart "$2"
        ;;
    status)
        cmd_status
        ;;
    logs)
        cmd_logs "$2"
        ;;
    update)
        cmd_update
        ;;
    test)
        cmd_test
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|logs|update|test}"
        echo ""
        echo "Commands:"
        echo "  start              Build and start all 3 challenges"
        echo "  stop               Stop all running challenges"
        echo "  restart [name]     Restart all or a single challenge (web-easy, web-medium, web-hard)"
        echo "  status             View live containers and RAM/CPU metrics"
        echo "  logs [name]        Tail live container logs for debugging"
        echo "  update             git pull + rebuild and restart automatically"
        echo "  test               Run HTTP reachability check on ports 8001, 8002, 8003"
        exit 1
        ;;
esac
