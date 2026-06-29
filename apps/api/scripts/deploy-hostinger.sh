#!/usr/bin/env bash
# Hostinger shared hosting — sem Node/npm.
# Build do admin: na sua máquina → npm run build → enviar public/build/ via FTP/hPanel.
set -euo pipefail

cd "$(dirname "$0")/.."

PERSISTENT_DIR="${PORTFOLIO_PERSISTENT_DIR:-$HOME/private/adm_portifolio}"
PERSISTENT_ENV="${PORTFOLIO_PERSISTENT_ENV:-$PERSISTENT_DIR/.env}"
PERSISTENT_STORAGE="${PORTFOLIO_PERSISTENT_STORAGE:-$PERSISTENT_DIR/storage-app-public}"

mkdir -p "$PERSISTENT_DIR"

if [ ! -f .env ]; then
  if [ -f "$PERSISTENT_ENV" ]; then
    echo "→ link .env de $PERSISTENT_ENV"
    ln -sf "$PERSISTENT_ENV" .env
  else
    echo "✗ .env ausente em $PERSISTENT_ENV"
    exit 1
  fi
elif [ ! -f "$PERSISTENT_ENV" ]; then
  echo "→ backup .env para $PERSISTENT_ENV"
  cp .env "$PERSISTENT_ENV"
  chmod 600 "$PERSISTENT_ENV"
fi

if [ ! -L storage/app/public ] && [ ! -d "$PERSISTENT_STORAGE" ] && [ -d storage/app/public ] && [ "$(ls -A storage/app/public 2>/dev/null)" ]; then
  echo "→ migrar uploads para $PERSISTENT_STORAGE"
  mkdir -p "$PERSISTENT_STORAGE"
  cp -a storage/app/public/. "$PERSISTENT_STORAGE/"
fi

mkdir -p "$PERSISTENT_STORAGE"
if [ ! -L storage/app/public ]; then
  rm -rf storage/app/public
  ln -sf "$PERSISTENT_STORAGE" storage/app/public
fi

if [ ! -f public/build/manifest.json ]; then
  echo "⚠ public/build/manifest.json ausente — admin sem CSS/JS até enviar o build"
fi

if ! grep -q '^APP_KEY=base64:' .env 2>/dev/null; then
  echo "→ gerar APP_KEY"
  php artisan key:generate --force
fi

echo "→ composer install (production)"
composer install --no-dev --optimize-autoloader

echo "→ migrations"
php artisan migrate --force

if [ "${PORTFOLIO_SEED_ON_DEPLOY:-false}" = "true" ]; then
  echo "→ seed (primeiro deploy)"
  php artisan db:seed --force
fi

echo "→ storage link"
php artisan storage:link 2>/dev/null || true

echo "→ cache"
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✓ Deploy Hostinger concluído (sem npm)"
