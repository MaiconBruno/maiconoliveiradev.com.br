# Stack — Instruções

## Domínios

| App | URL |
|-----|-----|
| Site público | `https://maiconoliveiradev.com.br` |
| API + Admin | `https://admin.maiconoliveiradev.com.br` |

## Arquitetura

```
┌─────────────────────────┐         ┌────────────────────────────────────┐
│  Vercel                 │  HTTP   │  Hostinger Premium                 │
│  maiconoliveiradev.com  │ ──────► │  admin.maiconoliveiradev.com.br    │
│  Next.js 15             │         │  Laravel 12 + MySQL                │
└─────────────────────────┘         └────────────────────────────────────┘
```

## Versões (v1)

| Tecnologia | Versão |
|------------|--------|
| Laravel | **12** |
| PHP | **8.3+** |
| Next.js | **15** (App Router) |
| Node.js | **20 LTS** |
| MySQL | **8.x** |
| React | 19 (via Next / Inertia) |
| Tailwind CSS | 4.x ou 3.4+ |
| Framer Motion | latest |
| next-intl | latest |

## Monorepo

```
/
├── apps/web/          # Next.js → Vercel
├── apps/api/          # Laravel → Hostinger
├── packages/types/    # contratos API TypeScript
├── .cursor/
├── portfolio-data.md
└── README.md
```

## Stack por camada

| Camada | Tecnologia | Onde |
|--------|------------|------|
| Site público | Next.js 15 + next-intl | Vercel |
| UI site | Tailwind + shadcn/ui | `apps/web` |
| Animações | Framer Motion | `apps/web` |
| API REST | Laravel 12 `/api/v1` | Hostinger |
| Painel admin | Inertia.js + React + Vite | `apps/api` |
| Auth admin | **Laravel Breeze** (sessão) | `apps/api` |
| Banco | MySQL + Eloquent | Hostinger |
| i18n conteúdo | JSON `{pt,en}` + DeepL | Laravel |
| Mídia | `storage/app/public` | Laravel |

## Comunicação

- `NEXT_PUBLIC_API_URL=https://admin.maiconoliveiradev.com.br`
- CORS: `maiconoliveiradev.com.br` + `www` + `*.vercel.app` (staging)
- API: [api-conventions.md](../docs/api-conventions.md)

## Fora do escopo v1

- PostgreSQL / Prisma / Sanctum
- Docker / VPS
- Analytics
- Filtro projetos por stack

## Status

- [x] Arquitetura, domínios, versões
- [x] Monorepo, i18n, DeepL, design
- [x] API conventions documentadas
- [ ] Código gerado
