# Task 16 — CI/CD (opcional)

**ID do agente:** `ci-cd`  
**Depende de:** Task 15 (deploy manual funcionando)

---

## Objetivo

Automatizar **lint e build** no GitHub Actions e preparar deploy contínuo.

## Leitura obrigatória

- `.cursor/tasks/00-contexto-compartilhado.md`
- `.cursor/docs/monorepo.md`

## Escopo

### Workflow CI (`.github/workflows/ci.yml`)
- Trigger: `push` e `pull_request` em `main`
- Jobs paralelos:
  1. **web** — `cd apps/web && npm ci && npm run lint && npm run build`
  2. **api** — `cd apps/api && composer install && php artisan test` (se houver testes) ou `php -l` + pint opcional

### Workflow deploy (opcional)
- Vercel já faz deploy automático se conectado ao repo
- Hostinger: documentar deploy via FTP/Git ou webhook (sem secrets no repo)

### Documentação
- Atualizar README com badge CI
- Seção "Como contribuir" com comandos locais

## Arquivos principais

```
.github/workflows/ci.yml           (criar)
README.md                        (badge + instruções)
```

## Não mexer em

- Lógica de aplicação
- Secrets no repositório

## Teste

```bash
# Push em branch → Actions verdes
# Build web e validação api passam
```

## Critério de pronto

- [ ] CI roda em cada PR
- [ ] Build Next.js passa no CI
- [ ] API validada (composer + testes ou lint PHP)
- [ ] README documenta o pipeline
