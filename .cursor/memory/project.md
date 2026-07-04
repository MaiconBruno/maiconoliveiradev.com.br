# Project Memory

## Nome do projeto

Portfólio com painel administrativo

## Objetivo

Criar um portfólio online com **painel administrativo** para gerenciar:

- Projetos publicados no site
- Partes editáveis do conteúdo da página pública (seções configuráveis pelo admin)

## Escopo

- **Site público** (Vercel / Next.js): apresentação profissional, listagem de projetos, conteúdo vindo da API
- **Laravel na Hostinger**: API REST + painel admin (projetos e conteúdo editável)
- **MySQL** no hPanel Hostinger
- Fonte inicial de dados: `portfolio-data.md` (bootstrap / seed)

## Arquitetura

```
Vercel (Next.js)  →  API Laravel (Hostinger)  →  MySQL (Hostinger)
                         ↳ Admin (Inertia + React)
```

## Fontes de verdade

- `portfolio-data.md` — seed inicial do banco (deploy)
- `.cursor/context/`
- `.cursor/docs/`

## Status atual (2026-07-03)

### Produção

| Serviço | URL |
|---------|-----|
| Site (PT/EN) | https://maiconoliveiradev.com.br |
| API REST | https://admin.maiconoliveiradev.com.br/api/v1 |
| Painel admin | https://admin.maiconoliveiradev.com.br/login |

### Deploy contínuo

| App | Plataforma | Gatilho |
|-----|------------|---------|
| `apps/web` | **Vercel** | Push no repo → build + deploy automático |
| `apps/api` | **Hostinger** | Deploy via Git |

### Implementado

| Camada | Status |
|--------|--------|
| `apps/api` — Laravel 12 | API v1 (10 endpoints), admin Inertia (8 módulos), DeepL, upload |
| `apps/web` — Next.js 15 | 5 rotas PT/EN, integração API, SEO, sitemap/robots, Framer Motion |
| `packages/types` | Contratos TypeScript compartilhados |
| Docker local | `mysql` + `api` + `web` via `docker compose` |
| Seed | `PortfolioDataSeeder` + `AdminUserSeeder` |
| Contato | E-mail SMTP + reCAPTCHA + honeypot |
| Analytics | Vercel Analytics no layout raiz |
| Deploy | Vercel (site) + Hostinger (API/admin) com DNS |

### Pendente / polish

- `html lang` dinâmico, nav ativa no header
- Traduções EN no seed (gerar via DeepL no admin)
- Testes automatizados da API
- GitHub Actions para lint/test em PR (opcional — deploy já coberto)

### Domínios

- Site: `maiconoliveiradev.com.br` → Vercel
- API + Admin: `admin.maiconoliveiradev.com.br` → Hostinger

**Próximo passo:** polish web (task 13) e conteúdo EN.

Detalhes: [readiness-checklist.md](../docs/readiness-checklist.md)
