---
name: generate-portfolio
description: >-
  Gera ou evolui o monorepo do portfólio (apps/web Next.js + apps/api Laravel)
  a partir de portfolio-data.md e documentação em .cursor/. Use quando pedir
  para criar, scaffold, gerar ou atualizar o projeto.
---

# Gerar / evoluir portfólio

**Status (2026-06-30):** Scaffold gerado. Modo atual = **evolução** (polish, deploy, lacunas).

## Antes de codar

1. Ler `portfolio-data.md`
2. Ler `.cursor/docs/readiness-checklist.md` — status atual
3. Ler `.cursor/skills/stack/instructions.md`
4. Não fabricar experiência, métricas ou projetos

## Estrutura (existente)

```
apps/web/          # Next.js 15 — 5 rotas PT/EN ✅
apps/api/          # Laravel 12 — API v1 + admin 8 módulos ✅
packages/types/    # @portfolio/types ✅
docker-compose.yml # mysql + api + web ✅
portfolio-data.md
```

## Domínios

- Site: `maiconoliveiradev.com.br`
- API+Admin: `admin.maiconoliveiradev.com.br`

## O que já existe (não regerar)

- Migrations, models, seeders (`PortfolioDataSeeder`, `AdminUserSeeder`)
- API v1 pública (10 endpoints)
- Admin: login, dashboard, CRUD dos 8 módulos
- DeepL (`DeepLTranslationService`, `POST /admin/translate`)
- Upload (`ImageUploadService`, galeria image/video)
- Site: home, projetos, case, sobre, contato
- SEO: `generateMetadata` + JSON-LD
- Docker Compose local

## Lacunas conhecidas (prioridade)

1. E-mail SMTP no `POST /contact`
2. Deploy produção (task 15)
3. `sitemap.xml`, `robots.txt`, `html lang` dinâmico
4. Nav ativa no header
5. CI/CD GitHub Actions (task 16)
6. Testes API

## Ordem para novas features

1. Consultar [readiness-checklist.md](../docs/readiness-checklist.md)
2. Usar task específica em `.cursor/tasks/` se existir
3. Seguir padrões dos módulos já implementados (ex. `ProjectController` + `ProjectForm`)
4. Tipos em `packages/types` quando alterar contratos API

## Referências

- API: [api-conventions.md](../docs/api-conventions.md)
- Modelos: [content-models.md](../docs/content-models.md)
- Deploy: [workflows/deploy-producao.md](../workflows/deploy-producao.md)
- Dev local: [workflows/local-dev.md](../workflows/local-dev.md)
