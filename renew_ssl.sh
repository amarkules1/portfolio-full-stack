#!/usr/bin/env bash
# ==============================================================================
# SSL Certificate Renewal Script for politician-trades.com
# ==============================================================================

# Exit immediately on error
set -e

# Ensure full PATH is available for Cron environment
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin

# ------------------------------------------------------------------------------
# Configuration
# ------------------------------------------------------------------------------
TARGET_USER="${SUDO_USER:-$USER}"
if [ "${TARGET_USER}" = "root" ]; then
    USER_HOME="/root"
else
    USER_HOME="/home/${TARGET_USER}"
fi
REPO_DIR="${USER_HOME}/repos/portfolio-full-stack"
DOMAIN="marqless.xyz"

echo "=================================================="
echo "SSL Renewal Started: $(date)"
echo "=================================================="

# 1. Stop Docker Container
echo "[1/5] Stopping portfolio-full-stack container..."
docker stop portfolio-full-stack || echo "Container already stopped or not found."

# 2. Renew Certificate (Non-Interactive)
echo "[2/5] Running Certbot renewal..."
certbot certonly --apache --domain "${DOMAIN}" --non-interactive --agree-tos

# 3. Copy Certificates (-L dereferences symlinks to copy real files)
echo "[3/5] Copying certificates to repository..."
cp -L /etc/letsencrypt/live/"${DOMAIN}"/*.pem "${REPO_DIR}/"

# Ensure user ownership of copied certs
if [ -n "${TARGET_USER}" ]; then
    chown "${TARGET_USER}:${TARGET_USER}" "${REPO_DIR}"/*.pem || true
fi

# 4. Clear Port 443
echo "[4/5] Clearing processes listening on port 443..."
if command -v fuser >/dev/null 2>&1; then
    fuser -k -9 443/tcp 2>/dev/null || true
elif command -v lsof >/dev/null 2>&1; then
    PIDS=$(lsof -t -i :443 2>/dev/null || true)
    if [ -n "${PIDS}" ]; then
        kill -9 ${PIDS} 2>/dev/null || true
    fi
fi

# 5. Restart Production Application
echo "[5/5] Restarting production application..."
cd "${REPO_DIR}"
./start_prod.sh

echo "=================================================="
echo "SSL Renewal Completed Successfully: $(date)"
echo "=================================================="