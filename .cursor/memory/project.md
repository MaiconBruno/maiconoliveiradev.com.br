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

## Status atual (2026-06-30)

### Implementado

| Camada | Status |
|--------|--------|
| `apps/api` — Laravel 12 | API v1 (10 endpoints), admin Inertia (8 módulos), DeepL, upload |
| `apps/web` — Next.js 15 | 5 rotas PT/EN, integração API, SEO, Framer Motion |
| `packages/types` | Contratos TypeScript compartilhados |
| Docker local | `mysql` + `api` + `web` via `docker compose` |
| Seed | `PortfolioDataSeeder` + `AdminUserSeeder` |

### Pendente / polish

- Envio real de e-mail no formulário de contato
- Deploy produção (Vercel + Hostinger com DNS)
- `sitemap.xml`, `robots.txt`, `html lang` dinâmico, nav ativa
- CI/CD GitHub Actions
- Testes automatizados da API

### Domínios

- Site: `maiconoliveiradev.com.br` → Vercel
- API + Admin: `admin.maiconoliveiradev.com.br` → Hostinger

**Próximo passo:** deploy produção (task 15) e polish final do site (tasks 12–13).

Detalhes: [readiness-checklist.md](../docs/readiness-checklist.md)
