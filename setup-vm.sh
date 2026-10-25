#!/usr/bin/env bash
# ==============================================================================
# One-Click Azure VM Setup Script (Ubuntu 22.04 / 24.04 LTS)
# Installs Docker, Docker Compose Plugin, Git, and Configures Permissions
# ==============================================================================

set -e

echo "[+] Updating apt package index..."
sudo apt-get update -y

echo "[+] Installing prerequisite packages..."
sudo apt-get install -y ca-certificates curl gnupg lsb-release git

echo "[+] Setting up Docker official GPG key..."
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo "[+] Adding Docker repository..."
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update -y

echo "[+] Installing Docker Engine and Compose plugin..."
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "[+] Adding current user to the 'docker' group..."
sudo usermod -aG docker "$USER"

echo "[+] Setting executable permissions on manage.sh..."
chmod +x manage.sh 2>/dev/null || true

echo ""
echo "=================================================================="
echo "[+] DOCKER & DOCKER COMPOSE INSTALLED SUCCESSFULLY!"
echo "[!] NOTE: To apply group changes without logging out, run:"
echo "    newgrp docker"
echo "=================================================================="
