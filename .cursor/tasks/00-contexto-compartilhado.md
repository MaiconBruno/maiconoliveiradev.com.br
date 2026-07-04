# Agente: contexto-compartilhado

> Cole este bloco no início de qualquer agente, ou use como referência. Não é uma task executável sozinha.

**Atualizado:** 2026-07-03

## Leitura obrigatória

1. `.cursor/skills/generate-portfolio/SKILL.md`
2. `portfolio-data.md`
3. `.cursor/docs/readiness-checklist.md` — **status atual**
4. `.cursor/docs/content-models.md`
5. `.cursor/docs/api-conventions.md`
6. `.cursor/docs/design-system.md`
7. `.cursor/workflows/local-dev.md`

## Regras globais

- **Não fabricar** experiência, métricas, projetos ou certificações
- Campos bilíngues no MySQL: JSON `{ "pt": "...", "en": "..." }`
- Textos longos: Markdown
- Design: dark + laranja (~15% accent) — site e admin
- Auth: sessão admin, usuário único, sem registro público
- Teste local: `docker compose up -d --build`

## Estrutura do monorepo

```
apps/web/         → Next.js 15 (site público) ✅
apps/api/         → Laravel 12 + Inertia/React (admin + API) ✅
packages/types/   → @portfolio/types ✅
docker-compose.yml
```

## URLs locais

| Serviço | URL |
|---------|-----|
| Site | http://localhost:3000/pt |
| API | http://localhost:8000/api/v1/profile |
| Admin | http://localhost:8000/login |

## O que já existe

- Migrations, models, seeders (`PortfolioDataSeeder`, `AdminUserSeeder`)
- API v1 pública completa (10 endpoints)
- Admin: login, dashboard, CRUD dos **8 módulos**
- DeepL backend (`DeepLTranslationService`, `POST /admin/translate`)
- Upload (`ImageUploadService`, galeria image/video em projetos)
- Site: home, projetos, case study, sobre, contato (5 rotas PT/EN)
- SEO: `generateMetadata`, JSON-LD, `sitemap.ts`, `robots.ts`, fallbacks
- Contato: e-mail SMTP + reCAPTCHA no `POST /contact`
- Vercel Analytics no layout raiz
- Deploy produção: Vercel + Hostinger
- `packages/types` consumido no web
- Docker: mysql + api + web

## Lacunas conhecidas

- `html lang` fixo em `pt` no root layout
- Nav sem estado ativo
- Traduções EN no seed (só PT preenchido)
- Testes API ausentes
- GitHub Actions em PR (opcional — deploy já via Vercel + Hostinger)

## O que NÃO fazer

- Sobrescrever pasta em `sites/` sem confirmação
- Commitar `.env` com secrets
- Mexer em módulos fora do escopo da sua task
- Regerar scaffold — projeto já existe
