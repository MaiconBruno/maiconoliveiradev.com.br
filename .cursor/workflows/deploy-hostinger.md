# Deploy — Hostinger (API + Admin)

> **Escopo:** `apps/api` em `admin.maiconoliveiradev.com.br`.  
> Site Next.js (Vercel) — ver [deploy-initial.md](./deploy-initial.md). **Código do site pronto (2026-06-30).**

---

## DNS — adiar se não propagou

Se os nameservers ainda não propagaram (erro no painel DNS ou domínio não resolve), **pule a Fase 1.4 e a Fase 6 por URL pública**. Continue com MySQL, Git, `.env` e deploy via **SSH** ou **URL temporária** do hPanel.

Quando o DNS estiver OK, volte e valide:
- `https://admin.maiconoliveiradev.com.br/login`
- `https://admin.maiconoliveiradev.com.br/api/v1/profile`

Até lá, teste com a URL temporária do site no hPanel (ex. `*.hostingersite.com`) ou pelo IP do servidor, se o hPanel permitir.

---

## Visão geral

```
GitHub  →  hPanel (Git)  →  ~/.../PORTIFOLIO/apps/api
                                    ↳ document root: apps/api/public
                                    ↳ MySQL (hPanel)
```

---

## Fase 1 — hPanel (antes de subir código)

### 1.1 MySQL

1. hPanel → **Bancos de dados MySQL** → criar banco
2. Anotar: `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, `DB_HOST` (geralmente `127.0.0.1`)

### 1.2 Subdomínio `admin`

1. hPanel → **Domínios** → **Subdomínios** → criar `admin`
2. **Document root:** apontar para `apps/api/public` dentro do diretório onde o Git vai clonar o repo  
   Exemplo após clone:  
   `/home/SEU_USUARIO/domains/maiconoliveiradev.com.br/public_html/../PORTIFOLIO/apps/api/public`  
   (o caminho exato varia — ajuste no hPanel após o clone na Fase 3)

### 1.3 PHP

1. hPanel → **Configuração PHP** (ou PHP no domínio `admin`)
2. Versão **8.3** (mínimo 8.2)
3. Extensões necessárias: `pdo_mysql`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `fileinfo`, `bcmath`

**Importante (Hostinger):**
- `php -v` no **SSH** mostra o PHP **da conta** (muitas vezes 8.1), não o do site.
- O **site** usa o `.htaccess` em `apps/api/public/` (já fixa `application/x-lsphp83` no repo).
- Para **Composer/artisan** no SSH, use `php83` ou adicione ao `~/.bashrc`:
  ```bash
  echo 'export PATH="/opt/alt/php83/usr/bin:$PATH"' >> ~/.bashrc
  source ~/.bashrc
  php -v   # deve mostrar 8.3
  ```
- Se o hPanel “volta” para 8.1 após deploy Git, o `.htaccess` em `public/` mantém 8.3 no Apache.

### 1.4 DNS (só `admin` por agora)

| Registro | Nome | Destino |
|----------|------|---------|
| `A` ou `CNAME` | `admin` | IP/servidor Hostinger (hPanel mostra o valor) |

> `@` e `www` podem continuar como estão até a fase Vercel.

---

## Fase 2 — Repositório Git

O projeto precisa estar no GitHub para o deploy Git do hPanel.

```bash
cd /caminho/PORTIFOLIO
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git push -u origin main
```

---

## Fase 3 — Git no hPanel

1. hPanel → **Git** → **Criar repositório**
2. URL: `https://github.com/SEU_USUARIO/SEU_REPO.git`
3. Branch: `main`
4. Diretório de deploy: ex. `~/PORTIFOLIO` (fora de `public_html` se possível)
5. **Webhook / auto-deploy:** ativar se disponível
6. Após o primeiro clone, volte em **Subdomínios** e confirme o document root em `.../PORTIFOLIO/apps/api/public`

---

## ⚠ Auto-deploy apaga arquivos locais

O Git da Hostinger **substitui o diretório de deploy** pelo conteúdo do repositório a cada push na `main`. Isso remove tudo que **não está no Git**:

| Arquivo/pasta | No Git? | O que acontece |
|---------------|---------|----------------|
| `.env` | Não | some → 500, perde `APP_KEY`, senhas |
| `vendor/` | Não | some → precisa `composer install` |
| `public/build/` | Não | some → admin sem CSS/JS |
| `storage/app/public/` | Não | uploads apagados |
| MySQL | Fora do repo | **não** é apagado (só o código) |

**Solução:** guardar config, uploads e build **fora** da pasta clonada pelo Git + rodar `deploy-hostinger.sh` após cada pull.

> Guia de produção (front + back no ar): [deploy-producao.md](./deploy-producao.md)

### Uma vez no servidor (SSH)

```bash
mkdir -p ~/domains/maiconoliveiradev.com.br/private/adm_portifolio/public-build
mkdir -p ~/domains/maiconoliveiradev.com.br/private/adm_portifolio/storage-app-public
nano ~/domains/maiconoliveiradev.com.br/private/adm_portifolio/.env    # preencher DB, ADMIN_PASSWORD, DEEPL, SMTP...
chmod 600 ~/domains/maiconoliveiradev.com.br/private/adm_portifolio/.env
```

O `deploy-hostinger.sh` cria symlinks:
- `.env` → `~/domains/maiconoliveiradev.com.br/private/adm_portifolio/.env`
- `storage/app/public` → `~/domains/maiconoliveiradev.com.br/private/adm_portifolio/storage-app-public`
- `public/build` → `~/domains/maiconoliveiradev.com.br/private/adm_portifolio/public-build`

### Comando pós-deploy no hPanel

hPanel → **Git** → repositório → **Comandos de implantação**:

```bash
cd $HOME/domains/maiconoliveiradev.com.br/public_html/adm_portifolio/apps/api && export PORTFOLIO_PERSISTENT_DIR=$HOME/domains/maiconoliveiradev.com.br/private/adm_portifolio && bash scripts/deploy-hostinger.sh
```

Sem esse comando, cada push só atualiza o código e **não** reinstala dependências nem restaura o `.env`.

---

## Fase 4 — `.env` de produção

Criar **`~/domains/maiconoliveiradev.com.br/private/adm_portifolio/.env`** (não dentro de `adm_portifolio/`) a partir de `apps/api/.env.example`:

```env
APP_NAME="Portfolio Admin"
APP_ENV=production
APP_KEY=                    # gerado no deploy (artisan key:generate)
APP_DEBUG=false
APP_URL=https://admin.maiconoliveiradev.com.br

FRONTEND_URL=https://maiconoliveiradev.com.br
ALLOW_VERCEL_PREVIEWS=false

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=...
DB_USERNAME=...
DB_PASSWORD=...

SESSION_DRIVER=database
SESSION_SECURE_COOKIE=true
CACHE_STORE=database
QUEUE_CONNECTION=database

MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=465
MAIL_ENCRYPTION=ssl
MAIL_USERNAME=contato@maiconoliveiradev.com.br
MAIL_PASSWORD=...
MAIL_FROM_ADDRESS=contato@maiconoliveiradev.com.br
MAIL_TO_ADDRESS=seu@email.com

DEEPL_API_KEY=...

ADMIN_NAME="Maicon Bruno"
ADMIN_EMAIL=devmaiconrodrigues@gmail.com
ADMIN_PASSWORD=...          # senha forte — não usar admin123456

FILESYSTEM_DISK=public
```

**Nunca commitar** o `.env` com senhas reais.

---

## Fase 5 — Comandos no servidor (SSH)

### Hostinger compartilhado (sem Node/npm)

O admin Inertia usa Vite. **Build na sua máquina**, upload manual de `public/build/`:

```bash
# Na sua máquina
cd apps/api
npm ci && npm run build
```

Envie o build para a pasta **persistente** (não dentro do Git):

`~/domains/maiconoliveiradev.com.br/private/adm_portifolio/public-build/`

(O script liga `public/build` → essa pasta automaticamente.)

No servidor, use **`deploy-hostinger.sh`** (só PHP + Composer):

```bash
cd ~/domains/SEU_DOMINIO/public_html/adm_portifolio/apps/api
export PORTFOLIO_PERSISTENT_DIR=$HOME/domains/maiconoliveiradev.com.br/private/adm_portifolio
chmod +x scripts/deploy-hostinger.sh
./scripts/deploy-hostinger.sh
```

**Comando pós-deploy no hPanel (Git):**

```bash
cd ~/domains/SEU_DOMINIO/public_html/adm_portifolio/apps/api && export PORTFOLIO_PERSISTENT_DIR=$HOME/domains/maiconoliveiradev.com.br/private/adm_portifolio && bash scripts/deploy-hostinger.sh
```

> Sempre que mudar CSS/JS do admin: `npm run build` local → reenviar `public/build/`.

### Script completo (se o servidor tiver npm)

```bash
cd ~/PORTIFOLIO/apps/api
chmod +x scripts/deploy.sh

# Primeiro deploy (migra + seed)
PORTFOLIO_SEED_ON_DEPLOY=true ./scripts/deploy.sh
```

---

## Fase 6 — Validar

| URL | Esperado |
|-----|----------|
| `https://admin.maiconoliveiradev.com.br/up` | `{"status":"ok"}` ou health check Laravel |
| `https://admin.maiconoliveiradev.com.br/login` | Tela de login Breeze |
| `https://admin.maiconoliveiradev.com.br/api/v1/profile` | JSON do perfil |

Login: `ADMIN_EMAIL` + `ADMIN_PASSWORD` do `.env`.

---

## Problemas comuns

| Sintoma | Solução |
|---------|---------|
| Tudo “reseta” a cada commit na main | `.env` em `~/domains/maiconoliveiradev.com.br/private/adm_portifolio/` + pós-deploy com `deploy-hostinger.sh` |
| 500 após deploy | Conferir `~/domains/maiconoliveiradev.com.br/private/adm_portifolio/.env`; rodar `deploy-hostinger.sh` |
| CSS/JS admin quebrado | Upload build em `~/domains/maiconoliveiradev.com.br/private/adm_portifolio/public-build/` |
| Imagens 404 | `php artisan storage:link` |
| Erro de banco | Conferir `DB_*` no hPanel MySQL |
| HTTPS redireciona errado | `APP_URL` com `https://`; `trustProxies` já configurado |

---

## Próxima fase

Site Next.js na Vercel — [deploy-initial.md](./deploy-initial.md) (código em `apps/web` já implementado).
