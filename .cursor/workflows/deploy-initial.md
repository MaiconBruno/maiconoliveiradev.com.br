# Deploy inicial

## Domínios

- Site: `maiconoliveiradev.com.br` + `www` → **Vercel**
- API + Admin: `admin.maiconoliveiradev.com.br` → **Hostinger**

## Pré-requisitos

- [x] Domínio definido
- [ ] DNS `@`/`www` → Vercel; `admin` → Hostinger
- [ ] MySQL criado no hPanel
- [ ] `DEEPL_API_KEY` (DeepL Free)
- [ ] SMTP Hostinger em `apps/api/.env`
- [ ] `ADMIN_PASSWORD` forte no `.env` (não usar `admin123456`)

## DNS (Hostinger)

| Registro | Nome | Destino |
|----------|------|---------|
| `A` | `@` | IP da Vercel (painel Vercel → Domains) |
| `CNAME` | `www` | valor exato da Vercel (`cname.vercel-dns.com` ou similar) |
| `A` ou `CNAME` | `admin` | Servidor Hostinger (IP do plano ou CNAME do hPanel) |

> Configurar DNS após o primeiro deploy em cada plataforma.

## Vercel (`maiconoliveiradev.com.br`)

| Config | Valor |
|--------|-------|
| Root Directory | `apps/web` |
| Node | 20.x (`.nvmrc` / `engines` no `package.json`) |
| Framework | Next.js (detectado automaticamente) |

### Variáveis de ambiente (Production)

```env
NEXT_PUBLIC_APP_URL=https://maiconoliveiradev.com.br
NEXT_PUBLIC_API_URL=https://admin.maiconoliveiradev.com.br
NEXT_PUBLIC_DEFAULT_LOCALE=pt
NEXT_PUBLIC_APP_ENV=production
```

Domínios no painel Vercel: `maiconoliveiradev.com.br`, `www.maiconoliveiradev.com.br`

Arquivo de referência: `apps/web/vercel.json`

## Hostinger (`admin.maiconoliveiradev.com.br`)

- Document root do subdomínio `admin`: `apps/api/public`
- PHP 8.3+
- Deploy via Git no hPanel (repositório completo; app em `apps/api`)

### `.env` produção

Copiar de `apps/api/.env.example` e preencher:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://admin.maiconoliveiradev.com.br
FRONTEND_URL=https://maiconoliveiradev.com.br
DB_*=...          # credenciais MySQL do hPanel
ADMIN_PASSWORD=... # senha forte
DEEPL_API_KEY=...
MAIL_*=...        # SMTP Hostinger
```

### Comandos de deploy

Script automatizado (recomendado no hPanel ou SSH):

```bash
cd apps/api
chmod +x scripts/deploy.sh
PORTFOLIO_SEED_ON_DEPLOY=true ./scripts/deploy.sh   # só no primeiro deploy
```

Ou manualmente:

```bash
cd apps/api
composer install --no-dev --optimize-autoloader
php artisan key:generate   # só se APP_KEY vazio
php artisan migrate --force
php artisan db:seed --force   # só no primeiro deploy
php artisan storage:link
npm ci && npm run build
php artisan config:cache && php artisan route:cache && php artisan view:cache
```

### CORS

`apps/api/config/cors.php` permite:

- `https://maiconoliveiradev.com.br` e `www`
- `FRONTEND_URL` do `.env`
- `*.vercel.app` em `local`/`staging`, ou com `ALLOW_VERCEL_PREVIEWS=true`

## Pós-deploy

- [ ] `https://admin.maiconoliveiradev.com.br/login`
- [ ] `https://maiconoliveiradev.com.br/pt`
- [ ] Gerar EN no painel (DeepL)
- [ ] Testar `POST /api/v1/contact` (e-mail via SMTP ou log)
- [ ] Imagens em `https://admin.maiconoliveiradev.com.br/storage/...`

Ver: [hosting.md](../docs/hosting.md), [seed.md](../docs/seed.md)
