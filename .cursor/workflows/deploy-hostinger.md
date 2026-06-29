# Deploy — Hostinger (API + Admin)

> **Escopo desta fase:** subir só `apps/api` em `admin.maiconoliveiradev.com.br`.  
> O site Next.js (Vercel) fica para a fase seguinte.

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

## Fase 4 — `.env` de produção

No servidor (SSH ou Gerenciador de arquivos), criar `apps/api/.env` a partir de `apps/api/.env.example`:

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

```bash
cd ~/PORTIFOLIO/apps/api
chmod +x scripts/deploy.sh

# Primeiro deploy (migra + seed)
PORTFOLIO_SEED_ON_DEPLOY=true ./scripts/deploy.sh
```

Se `npm` não estiver disponível no Hostinger, build local e envie `public/build`:

```bash
# Na sua máquina local
cd apps/api
npm ci && npm run build
# Commitar public/build só se necessário, ou enviar via SFTP
```

Depois, no servidor, rode o deploy sem depender do npm (comentar linhas npm no script ou rodar manualmente as etapas PHP).

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
| 500 após deploy | `APP_KEY` vazio → `php artisan key:generate` |
| CSS/JS admin quebrado | `npm run build` → pasta `public/build` |
| Imagens 404 | `php artisan storage:link` |
| Erro de banco | Conferir `DB_*` no hPanel MySQL |
| HTTPS redireciona errado | `APP_URL` com `https://`; `trustProxies` já configurado |

---

## Próxima fase

Quando o admin estiver OK → [deploy-initial.md](./deploy-initial.md) seção Vercel (site público).
