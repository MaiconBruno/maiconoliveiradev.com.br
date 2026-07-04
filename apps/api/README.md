# apps/api — Laravel API + Admin

Laravel 12 com API REST JSON (`/api/v1`) e painel administrativo Inertia + React.

**Produção:** https://admin.maiconoliveiradev.com.br (Hostinger — API + admin)

## Rotas principais

| Área | Prefixo | Auth |
|------|---------|------|
| API pública | `/api/v1/*` | Nenhuma |
| Admin | `/admin/*` | Sessão (login) |
| Login | `/login` | Público |

## Desenvolvimento

```bash
# Com Docker (recomendado, na raiz do monorepo)
docker compose up -d --build

# Ou localmente
composer install
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
npm install && npm run dev   # Vite (admin assets)
php artisan serve
```

Admin: http://localhost:8000/login  
API: http://localhost:8000/api/v1/profile

**Login local:** `devmaiconrodrigues@gmail.com` / `admin123456`

## Módulos admin

1. Projetos — CRUD, galeria, status, destaque
2. Hero / Sobre — perfil, foto, CTAs, currículo
3. Experiências — timeline com progressão
4. Skills — categorias, nível, destaque
5. Contato e redes — singleton
6. SEO — meta por rota
7. Formação acadêmica
8. Certificações

Todos com tabs PT-BR | EN e botão **Gerar EN** (DeepL).

## Variáveis de ambiente

Copiar de `.env.example`. Principais:

```env
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
DB_*=...
ADMIN_EMAIL=...
ADMIN_PASSWORD=...
DEEPL_API_KEY=...
MAIL_*=...
```

## Estrutura

```
app/Http/Controllers/
  Api/V1/          # Endpoints públicos
  Admin/           # CRUD Inertia
app/Models/        # Eloquent (9 models)
database/seeders/  # PortfolioDataSeeder, AdminUserSeeder
resources/js/
  Pages/Admin/     # React (Inertia)
  Components/      # BilingualField, ImageUpload, etc.
routes/
  api.php          # /api/v1
  web.php          # /admin, /login
```

## Deploy Hostinger

```bash
cd apps/api
export PORTFOLIO_PERSISTENT_DIR=~/domains/.../private/adm_portifolio
bash scripts/deploy-hostinger.sh
```

Ver [deploy-hostinger.md](../../.cursor/workflows/deploy-hostinger.md).

## Scripts

| Comando | Ação |
|---------|------|
| `composer install` | Dependências PHP |
| `php artisan migrate --seed` | Banco + seed |
| `npm run dev` | Vite (hot reload admin) |
| `npm run build` | Build assets admin (produção) |
| `php artisan test` | Testes (mínimos) |

## Documentação

- [admin-panel.md](../../.cursor/docs/admin-panel.md)
- [content-models.md](../../.cursor/docs/content-models.md)
- [api-conventions.md](../../.cursor/docs/api-conventions.md)
- [storage.md](../../.cursor/docs/storage.md)
