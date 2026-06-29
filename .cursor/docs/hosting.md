# Hosting

## Plano Hostinger

**Premium Web Hosting**

## Domínios

| Uso | Domínio | Plataforma |
|-----|---------|------------|
| **Site público** | `maiconoliveiradev.com.br` (+ `www`) | Vercel |
| **API + Admin Laravel** | `admin.maiconoliveiradev.com.br` | Hostinger |

O mesmo app Laravel em `admin.*` serve:
- `/api/v1/*` — API REST para o Next.js
- `/admin/*` — painel Inertia + React
- `/login` — autenticação Breeze

## Arquitetura de deploy

| Componente | Plataforma | Stack |
|------------|------------|-------|
| Site público | **Vercel** | Next.js |
| API + Admin | **Hostinger Premium** | Laravel + MySQL |
| Banco de dados | **Hostinger** (hPanel) | MySQL |

## Hostinger — Laravel

- Deploy via **Git** no hPanel
- Subdomínio: **`admin.maiconoliveiradev.com.br`**
- Document root: `public/` do Laravel (`apps/api`)
- PHP 8.3+ recomendado
- MySQL criado no hPanel; credenciais em `.env`

## Vercel — Next.js

- Root Directory: `apps/web`
- Domínios: `maiconoliveiradev.com.br`, `www.maiconoliveiradev.com.br`
- Env:
  ```env
  NEXT_PUBLIC_APP_URL=https://maiconoliveiradev.com.br
  NEXT_PUBLIC_API_URL=https://admin.maiconoliveiradev.com.br
  ```

## DNS (Hostinger)

| Registro | Nome | Destino |
|----------|------|---------|
| `A` | `@` | IP da Vercel (painel Vercel → Domains) |
| `CNAME` | `www` | `cname.vercel-dns.com` (valor exato da Vercel) |
| `A` ou `CNAME` | `admin` | Servidor Hostinger (IP do plano ou CNAME do hPanel) |

> Configurar DNS após primeiro deploy em cada plataforma.

## CORS (Laravel)

`FRONTEND_URL=https://maiconoliveiradev.com.br`  
Incluir previews Vercel (`*.vercel.app`) em ambiente de staging.

## MySQL remoto

O Next.js **não** acessa MySQL — apenas via `https://admin.maiconoliveiradev.com.br/api/v1/`.

## URLs de mídia

`https://admin.maiconoliveiradev.com.br/storage/{path}`
