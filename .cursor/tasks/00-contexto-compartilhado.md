# Agente: contexto-compartilhado

> Cole este bloco no início de qualquer agente, ou use como referência. Não é uma task executável sozinha.

## Leitura obrigatória

1. `.cursor/skills/generate-portfolio/SKILL.md`
2. `portfolio-data.md`
3. `profile/preferences.yaml`
4. `.cursor/docs/content-models.md`
5. `.cursor/docs/api-conventions.md`
6. `.cursor/docs/design-system.md`
7. `.cursor/workflows/local-dev.md`

## Regras globais

- **Não fabricar** experiência, métricas, projetos ou certificações
- Campos bilíngues no MySQL: JSON `{ "pt": "...", "en": "..." }`
- Textos longos: Markdown
- Design: dark + laranja (~15% accent) — site e admin
- Auth: Breeze, admin único, sem registro público
- Teste local: `docker compose up -d --build`

## Estrutura do monorepo

```
apps/web/     → Next.js 15 (site público)
apps/api/     → Laravel 12 + Inertia/React (admin + API)
packages/types/ → planejado (task 14)
```

## URLs locais

| Serviço | URL |
|---------|-----|
| Site | http://localhost:3000/pt |
| API | http://localhost:8000/api/v1/profile |
| Admin | http://localhost:8000/login |

## O que já existe

- Migrations, models, seeders (`PortfolioDataSeeder`)
- API v1 pública completa
- Site: home, projetos, case, sobre, contato
- Admin: login, dashboard, lista de projetos (CRUD **stub**)
- DeepL backend (`DeepLTranslationService`, `POST /admin/translate`)
- Docker: mysql + api + web

## O que NÃO fazer

- Sobrescrever pasta em `sites/` sem confirmação
- Commitar `.env` com secrets
- Mexer em módulos fora do escopo da sua task
