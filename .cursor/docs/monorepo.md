# Monorepo

## Layout

```
/
├── apps/
│   ├── web/                 # Next.js — site público → Vercel
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── package.json
│   └── api/                 # Laravel — API + admin → Hostinger
│       ├── app/
│       ├── routes/
│       ├── database/
│       └── composer.json
├── packages/
│   └── types/               # (opcional) contratos API em TypeScript
├── portfolio-data.md        # seed / bootstrap de conteúdo
└── README.md
```

## Deploy

| App | Path | Plataforma | Config |
|-----|------|------------|--------|
| Site público | `apps/web` | Vercel | Root Directory = `apps/web` |
| API + Admin | `apps/api` | Hostinger | Deploy Git; docroot = `public/` |

## Variáveis de ambiente

Arquivos na raiz do monorepo — **`.env` está no `.gitignore`**:

| App | Template (commitado) | Local (gitignored) |
|-----|----------------------|---------------------|
| Next.js | `apps/web/.env.example` | `apps/web/.env` |
| Laravel | `apps/api/.env.example` | `apps/api/.env` |

Substituir domínios nos painéis Vercel/Hostinger conforme `docs/hosting.md`.

### `apps/web` (Vercel)

```env
NEXT_PUBLIC_APP_URL=https://maiconoliveiradev.com.br
NEXT_PUBLIC_API_URL=https://admin.maiconoliveiradev.com.br
NEXT_PUBLIC_DEFAULT_LOCALE=pt
```

### `apps/api` (Hostinger)

```env
APP_URL=https://admin.maiconoliveiradev.com.br
FRONTEND_URL=https://maiconoliveiradev.com.br
DB_*=...
DEEPL_API_KEY=...
MAIL_*=...
ADMIN_EMAIL=...
ADMIN_PASSWORD=...
```

## CORS

Laravel deve permitir:
- `https://maiconoliveiradev.com.br`
- `https://www.maiconoliveiradev.com.br`
- `*.vercel.app` (preview — só em `local`/`staging`)
