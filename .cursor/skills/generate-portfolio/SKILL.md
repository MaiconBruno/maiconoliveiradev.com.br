---
name: generate-portfolio
description: >-
  Gera ou evolui o monorepo do portfólio (apps/web Next.js + apps/api Laravel)
  a partir de portfolio-data.md e documentação em .cursor/. Use quando pedir
  para criar, scaffold, gerar ou atualizar o projeto.
---

# Gerar portfólio

## Antes de gerar

1. Ler `portfolio-data.md`
2. Ler `.cursor/docs/readiness-checklist.md`
3. Ler `.cursor/skills/stack/instructions.md`
4. Não fabricar experiência, métricas ou projetos

## Estrutura alvo

```
apps/web/     # Next.js 15, next-intl, Tailwind, shadcn, Framer Motion
apps/api/     # Laravel 12, Breeze+Inertia+React, MySQL
packages/types/
portfolio-data.md
```

## Domínios

- Site: `maiconoliveiradev.com.br`
- API+Admin: `admin.maiconoliveiradev.com.br`

## Ordem de geração

1. Scaffold Laravel em `apps/api` (Breeze React/Inertia)
2. Scaffold Next.js em `apps/web`
3. Models + migrations + seed (`PortfolioDataSeeder`)
4. API v1 pública + CORS
5. Admin CRUD (6 módulos + formação + certificações)
6. DeepL translate endpoint + tabs PT/EN
7. Páginas Next (`/pt`, `/en`) conforme `docs/site-pages.md`
8. Design tokens `docs/design-system.md`

## Referências

- API: [api-conventions.md](../docs/api-conventions.md)
- Modelos: [content-models.md](../docs/content-models.md)
- Deploy: [workflows/deploy-initial.md](../workflows/deploy-initial.md)
- Dev local: [workflows/local-dev.md](../workflows/local-dev.md)
