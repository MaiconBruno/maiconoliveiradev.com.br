# Produção — deploy seguro (main)

**Status (2026-07-03):** Ativo — Vercel (web) e Hostinger Git (api) com deploy automático na `main`.

Front (Vercel) e back (Hostinger) no ar. Este guia evita que push na `main` desconfigure produção.

---

## Visão geral

| App | Onde | Deploy | Config persiste em |
|-----|------|--------|-------------------|
| Site Next.js | Vercel | automático (Git `main`) | Painel Vercel → Environment Variables |
| API + Admin | Hostinger | Git `main` + script pós-deploy | `~/domains/maiconoliveiradev.com.br/private/adm_portifolio/` |

```
push main
  ├─ Vercel      → build Next.js (env no painel, não some)
  └─ Hostinger   → git pull em public_html/adm_portifolio/
                   → deploy-hostinger.sh restaura .env, uploads, build, composer
```

---

## Hostinger — configurar uma vez

### 1. Pasta persistente (SSH)

```bash
mkdir -p ~/domains/maiconoliveiradev.com.br/private/adm_portifolio/public-build
mkdir -p ~/domains/maiconoliveiradev.com.br/private/adm_portifolio/storage-app-public
chmod 700 ~/domains/maiconoliveiradev.com.br/private/adm_portifolio
```

`.env` de produção **só** aqui:

```bash
nano ~/domains/maiconoliveiradev.com.br/private/adm_portifolio/.env
chmod 600 ~/domains/maiconoliveiradev.com.br/private/adm_portifolio/.env
```

### 2. Build do admin (upload uma vez; depois só se mudar CSS/JS)

Na sua máquina:

```bash
cd apps/api && npm ci && npm run build
```

Envie o conteúdo de `apps/api/public/build/` para:

`~/domains/maiconoliveiradev.com.br/private/adm_portifolio/public-build/`

(O script cria symlink `public/build` → essa pasta.)

### 3. Comando pós-deploy no hPanel (obrigatório)

hPanel → **Git** → repositório → **Comandos de implantação**:

```bash
cd $HOME/domains/maiconoliveiradev.com.br/public_html/adm_portifolio/apps/api && export PORTFOLIO_PERSISTENT_DIR=$HOME/domains/maiconoliveiradev.com.br/private/adm_portifolio && bash scripts/deploy-hostinger.sh
```

Sem isso, cada push **só troca código** e quebra `vendor`, `.env` e assets.

### 4. Document root do subdomínio `admin`

Deve apontar para:

`.../public_html/adm_portifolio/apps/api/public`

PHP 8.3 fica fixo no `.htaccess` desse `public/` (versionado no Git).

### 5. SSH — PHP para Composer (opcional, recomendado)

```bash
echo 'export PATH="/opt/alt/php83/usr/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

---

## O que cada push na main faz

| Item | Com pós-deploy configurado |
|------|---------------------------|
| Código PHP/Blade | Atualiza do Git |
| `.env` | **Mantém** (`~/private/adm_portifolio/.env`) |
| `APP_KEY` / sessões | **Mantém** |
| MySQL | **Mantém** |
| Imagens upload | **Mantém** (`storage-app-public`) |
| Admin CSS/JS | **Mantém** (`public-build`) |
| `vendor/` | Recriado pelo `composer install` |
| PHP 8.3 no site | **Mantém** (`.htaccess` no repo) |

---

## Quando mudar só o admin (CSS/JS)

1. Local: `cd apps/api && npm run build`
2. Upload para `~/domains/maiconoliveiradev.com.br/private/adm_portifolio/public-build/`
3. Push na `main` (se houver código) — o script não apaga o build persistente

---

## Vercel (front)

Nada extra no servidor. Garanta no painel Vercel (Production):

```env
NEXT_PUBLIC_API_URL=https://admin.maiconoliveiradev.com.br
NEXT_PUBLIC_APP_URL=https://maiconoliveiradev.com.br
NEXT_PUBLIC_DEFAULT_LOCALE=pt
```

Deploy automático na `main` é seguro — variáveis ficam no painel, não no repo.

---

## Checklist rápido pós-push

- [ ] `https://maiconoliveiradev.com.br/pt` — site
- [ ] `https://admin.maiconoliveiradev.com.br/login` — admin
- [ ] `https://admin.maiconoliveiradev.com.br/api/v1/profile` — API
- [ ] Imagem `/storage/...` abre
- [ ] hPanel → Git → último deploy com status OK e script executado

---

## Problemas comuns

| Sintoma | Causa | Ação |
|---------|-------|------|
| 500 após push | Sem pós-deploy ou `.env` sumiu | Rodar `deploy-hostinger.sh`; conferir `~/private/adm_portifolio/.env` |
| Composer PHP 8.1 | SSH usa PHP da conta | `/opt/alt/php83/usr/bin/php /usr/local/bin/composer install --no-dev` |
| Admin sem estilo | `public-build` vazio | Upload build para `~/domains/maiconoliveiradev.com.br/private/adm_portifolio/public-build/` |
| Imagens 404 | Symlink storage | Rodar `deploy-hostinger.sh` |

---

Workflow completo inicial: [deploy-hostinger.md](./deploy-hostinger.md)
