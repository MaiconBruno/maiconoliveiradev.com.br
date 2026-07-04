# Task 16 — GitHub Actions lint/test (opcional)

**ID do agente:** `ci-cd`  
**Status:** ❓ Opcional / não necessário para deploy (2026-07-03)  
**Depende de:** Task 15 ✅

---

## Contexto

**Deploy contínuo já está ativo:**

| App | Plataforma | Como funciona |
|-----|------------|---------------|
| `apps/web` | **Vercel** | Repo conectado → push na branch de produção → build + deploy automático |
| `apps/api` | **Hostinger** | Deploy via Git no hPanel |

A Vercel já executa build do Next.js a cada push. Não é obrigatório duplicar isso no GitHub Actions.

## Objetivo (se implementar)

Adicionar **checks em PR** (lint + testes) antes do merge — complementar, não substituir Vercel/Hostinger.

## Leitura obrigatória

- `.cursor/tasks/00-contexto-compartilhado.md`
- `.cursor/docs/monorepo.md`
- `.cursor/workflows/deploy-producao.md`

## Escopo (opcional)

### Workflow CI (`.github/workflows/ci.yml`)
- Trigger: `pull_request` em `main` (e opcionalmente `push`)
- Jobs paralelos:
  1. **web** — `cd apps/web && npm ci && npm run lint && npm run build`
  2. **api** — `cd apps/api && composer install && php artisan test` (quando houver testes)

### Não duplicar
- Deploy web → já é da Vercel
- Deploy API → já é da Hostinger (Git)
- Secrets de produção → nunca no repo

## Critério de pronto (se for feito)

- [ ] CI roda em PRs
- [ ] Lint + build web passam
- [ ] API validada (testes ou lint PHP)
- [ ] README documenta que deploy é Vercel + Hostinger; Actions só para checks
