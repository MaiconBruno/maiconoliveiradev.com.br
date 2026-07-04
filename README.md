# Portfólio — MAICONOLIVEIRADEV

Monorepo do portfólio profissional com painel administrativo.

**Status (2026-07-03):** Em produção — site, API e painel admin publicados.

## Produção

| Serviço | URL |
|---------|-----|
| Site (PT/EN) | https://maiconoliveiradev.com.br |
| API REST | https://admin.maiconoliveiradev.com.br/api/v1 |
| Painel admin | https://admin.maiconoliveiradev.com.br/login |

| App | Stack | Deploy |
|-----|-------|--------|
| `apps/web` | Next.js 15, next-intl, Tailwind, Framer Motion | Vercel → `maiconoliveiradev.com.br` |
| `apps/api` | Laravel 12, Inertia + React, MySQL | Hostinger → `admin.maiconoliveiradev.com.br` |
| `packages/types` | TypeScript | Contratos API compartilhados |

## Pré-requisitos

**Docker (recomendado):** Docker + Docker Compose

**Sem Docker:** PHP 8.3+, Composer, Node.js 20+, MySQL 8

## Setup local (Docker)

```bash
docker compose up -d --build
```

| URL | Serviço |
|-----|---------|
| http://localhost:3000/pt | Site Next.js |
| http://localhost:8000/login | Admin Laravel |
| http://localhost:8000/api/v1/profile | API REST |

Login: `devmaiconrodrigues@gmail.com` / `admin123456`

```bash
docker compose down          # parar
docker compose logs -f web   # logs
```

## Setup local (sem Docker)

### API (Laravel)

```bash
cd apps/api
composer install
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
npm install && npm run build
php artisan serve
```

### Web (Next.js)

```bash
cd apps/web
npm install
npm run dev
```

## O que está implementado

- **API v1** — 10 endpoints públicos + CORS + cache 5 min
- **Admin** — 8 módulos CRUD, tabs PT/EN, DeepL, upload de mídia
- **Site** — 5 rotas bilíngues, SEO, JSON-LD, animações
- **Deploy contínuo** — Vercel (web) + Hostinger Git (api)
- **Seed** — `PortfolioDataSeeder` a partir de `portfolio-data.md`

## Pendências principais

- `html lang` dinâmico e nav ativa no header
- Traduções EN no seed (gerar via DeepL no admin)
- Testes automatizados da API

## Documentação

Toda a especificação está em `.cursor/docs/`:

- [readiness-checklist.md](.cursor/docs/readiness-checklist.md) — **status atual**
- [hosting.md](.cursor/docs/hosting.md)
- [api-conventions.md](.cursor/docs/api-conventions.md)
- [design-system.md](.cursor/docs/design-system.md)

## Fonte de conteúdo

`portfolio-data.md` — seed inicial via `PortfolioDataSeeder`.
