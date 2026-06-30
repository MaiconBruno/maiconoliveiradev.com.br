#!/bin/sh
set -e

cd /var/www/html

# Sincroniza variáveis do Docker no .env (volume montado do host)
sync_env() {
  var="$1"
  val="$(printenv "$var" || true)"
  if [ -n "$val" ]; then
    if grep -q "^${var}=" .env 2>/dev/null; then
      sed -i "s|^${var}=.*|${var}=${val}|" .env
    else
      echo "${var}=${val}" >> .env
    fi
  fi
}

for key in APP_URL FRONTEND_URL DB_HOST DB_PORT DB_DATABASE DB_USERNAME DB_PASSWORD ADMIN_EMAIL ADMIN_PASSWORD APP_ENV; do
  sync_env "$key"
done
# ADMIN_NAME com espaço — manter aspas no .env
if [ -n "$(printenv ADMIN_NAME)" ]; then
  sed -i "s|^ADMIN_NAME=.*|ADMIN_NAME=\"$(printenv ADMIN_NAME)\"|" .env
fi

if [ ! -f vendor/autoload.php ]; then
  if ! composer install --no-interaction --prefer-dist; then
    find vendor -mindepth 1 -delete 2>/dev/null || true
    composer install --no-interaction --prefer-dist --no-cache || \
      composer install --no-interaction --prefer-source --no-cache
  fi
fi

if [ ! -d node_modules ] || [ ! -f node_modules/.package-lock.json ]; then
  npm install
fi

if ! grep -q 'APP_KEY=base64:' .env 2>/dev/null; then
  php artisan key:generate --force
fi

php artisan config:clear
php artisan migrate --force

# Seed apenas na primeira subida (DB vazio) — evita sobrescrever edições do admin
if php artisan tinker --execute='echo \App\Models\Project::count();' 2>/dev/null | tail -1 | grep -q '^0$'; then
  php artisan db:seed --force
fi

php artisan storage:link 2>/dev/null || true

if [ ! -f public/build/manifest.json ]; then
  npm run build
fi

exec php artisan serve --host=0.0.0.0 --port=8000
