# Task 15 — Deploy produção

**ID do agente:** `deploy-prod`  
**Status:** ✅ Concluída (2026-07-03) — Vercel + Hostinger publicados com DNS  
**Depende de:** MVP estável (tasks 01–13 principais) ✅

---

## Objetivo

Publicar o portfólio em **produção**: Vercel (site) + Hostinger (API/admin).

## Leitura obrigatória

- `.cursor/tasks/00-contexto-compartilhado.md`
- `.cursor/workflows/deploy-initial.md`
- `.cursor/docs/hosting.md`
- `apps/web/.env.example`
- `apps/api/.env.example`

## Escopo

### DNS
- `maiconoliveiradev.com.br` + `www` → Vercel
- `admin.maiconoliveiradev.com.br` → Hostinger

### Vercel (`apps/web`)
- Root Directory: `apps/web`
- Node 20.x
- Env:
  - `NEXT_PUBLIC_API_URL=https://admin.maiconoliveiradev.com.br`
  - `NEXT_PUBLIC_APP_URL=https://maiconoliveiradev.com.br`
  - `NEXT_PUBLIC_DEFAULT_LOCALE=pt`

### Hostinger (`apps/api`)
- Document root: `public/`
- MySQL no hPanel
- `.env` produção:
  - `APP_URL`, `FRONTEND_URL`
  - `DB_*`, `ADMIN_PASSWORD` forte
  - `DEEPL_API_KEY`, SMTP Hostinger
  - `MAIL_*` para formulário de contato
- Deploy commands:
  ```bash
  composer install --no-dev --optimize-autoloader
  php artisan migrate --force
  php artisan db:seed --force
  php artisan storage:link
  npm ci && npm run build
  php artisan config:cache && php artisan route:cache
  ```

### CORS
- Atualizar `apps/api/config/cors.php` — origins Vercel + domínio produção

### Pós-deploy checklist
- [ ] https://admin.maiconoliveiradev.com.br/login
- [ ] https://maiconoliveiradev.com.br/pt
- [ ] POST contact funciona (e-mail log ou SMTP)
- [ ] Imagens `/storage/...` acessíveis
- [ ] Gerar EN no admin (DeepL)

## Arquivos principais

```
apps/api/config/cors.php
apps/api/.env.example
apps/web/.env.example
apps/web/next.config.ts              (domínios imagem)
.cursor/workflows/deploy-initial.md  (atualizar se necessário)
```

## Não mexer em

- Features novas de CRUD (só config deploy)

## Critério de pronto

- [ ] Site e admin acessíveis nos domínios reais com HTTPS
- [ ] API pública responde da Vercel
- [ ] Admin login com senha forte (não `admin123456`)
- [ ] Checklist pós-deploy completo
