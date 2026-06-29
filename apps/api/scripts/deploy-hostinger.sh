#!/usr/bin/env bash
# Hostinger shared hosting — sem Node/npm.
# Roda após cada pull Git (hPanel → Comandos de implantação).
# Mantém .env, uploads e build Vite fora da pasta sobrescrita pelo Git.
set -euo pipefail

cd "$(dirname "$0")/.."

PHP_BIN=""
for candidate in php83 /usr/bin/php83 /opt/alt/php83/usr/bin/php; do
  if command -v "$candidate" >/dev/null 2>&1 && "$candidate" -r 'exit(version_compare(PHP_VERSION, "8.2.0", ">=") ? 0 : 1);' 2>/dev/null; then
    PHP_BIN="$candidate"
    break
  fi
  if [ -x "$candidate" ] && "$candidate" -r 'exit(version_compare(PHP_VERSION, "8.2.0", ">=") ? 0 : 1);' 2>/dev/null; then
    PHP_BIN="$candidate"
    break
  fi
done

if [ -z "$PHP_BIN" ]; then
  echo "✗ PHP 8.2+ não encontrado no SSH."
  echo "  Use: /opt/alt/php83/usr/bin/php /usr/local/bin/composer install --no-dev"
  exit 1
fi

echo "→ PHP CLI: $($PHP_BIN -v | head -1)"

COMPOSER_BIN=""
for composer_path in /usr/local/bin/composer /usr/bin/composer composer.phar; do
  if [ -f "$composer_path" ]; then
    COMPOSER_BIN="$PHP_BIN $composer_path"
    break
  fi
done
if [ -z "$COMPOSER_BIN" ]; then
  COMPOSER_BIN="$PHP_BIN $(command -v composer)"
fi

PERSISTENT_DIR="${PORTFOLIO_PERSISTENT_DIR:-$HOME/private/adm_portifolio}"
PERSISTENT_ENV="${PORTFOLIO_PERSISTENT_ENV:-$PERSISTENT_DIR/.env}"
PERSISTENT_STORAGE="${PORTFOLIO_PERSISTENT_STORAGE:-$PERSISTENT_DIR/storage-app-public}"
PERSISTENT_BUILD="${PORTFOLIO_PERSISTENT_BUILD:-$PERSISTENT_DIR/public-build}"

mkdir -p "$PERSISTENT_DIR" "$PERSISTENT_BUILD"

# --- .env ---
if [ ! -f .env ]; then
  if [ -f "$PERSISTENT_ENV" ]; then
    echo "→ link .env"
    ln -sf "$PERSISTENT_ENV" .env
  else
    echo "✗ .env ausente em $PERSISTENT_ENV"
    exit 1
  fi
elif [ ! -f "$PERSISTENT_ENV" ]; then
  echo "→ backup .env"
  cp .env "$PERSISTENT_ENV"
  chmod 600 "$PERSISTENT_ENV"
fi

# --- uploads (imagens do admin) ---
if [ ! -L storage/app/public ] && [ -d storage/app/public ] && [ "$(ls -A storage/app/public 2>/dev/null)" ]; then
  if [ ! "$(ls -A "$PERSISTENT_STORAGE" 2>/dev/null)" ]; then
    echo "→ migrar uploads"
    mkdir -p "$PERSISTENT_STORAGE"
    cp -a storage/app/public/. "$PERSISTENT_STORAGE/"
  fi
fi

mkdir -p "$PERSISTENT_STORAGE"
if [ ! -L storage/app/public ]; then
  rm -rf storage/app/public
  ln -sf "$PERSISTENT_STORAGE" storage/app/public
fi

# --- build Vite (admin CSS/JS) ---
if [ ! -L public/build ] && [ -d public/build ] && [ "$(ls -A public/build 2>/dev/null)" ]; then
  if [ ! -f "$PERSISTENT_BUILD/manifest.json" ]; then
    echo "→ migrar public/build"
    cp -a public/build/. "$PERSISTENT_BUILD/"
  fi
fi

if [ ! -L public/build ]; then
  rm -rf public/build
  ln -sf "$PERSISTENT_BUILD" public/build
fi

if [ ! -f "$PERSISTENT_BUILD/manifest.json" ]; then
  echo "⚠ build ausente em $PERSISTENT_BUILD — envie após npm run build local"
fi

# --- Laravel ---
if ! grep -q '^APP_KEY=base64:' .env 2>/dev/null; then
  echo "→ gerar APP_KEY"
  $PHP_BIN artisan key:generate --force
fi

echo "→ composer install"
$COMPOSER_BIN install --no-dev --optimize-autoloader

echo "→ migrations"
$PHP_BIN artisan migrate --force

if [ "${PORTFOLIO_SEED_ON_DEPLOY:-false}" = "true" ]; then
  echo "→ seed"
  $PHP_BIN artisan db:seed --force
fi

echo "→ storage link"
$PHP_BIN artisan storage:link 2>/dev/null || true

echo "→ cache"
$PHP_BIN artisan config:clear
$PHP_BIN artisan config:cache
$PHP_BIN artisan route:cache
$PHP_BIN artisan view:cache

echo "✓ Deploy Hostinger OK"
