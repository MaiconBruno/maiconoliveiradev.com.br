#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  echo "✗ Arquivo .env não encontrado em apps/api — crie antes do deploy."
  exit 1
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

echo "→ build assets (Vite)"
npm ci
npm run build

echo "→ cache config & routes"
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✓ Deploy concluído"
