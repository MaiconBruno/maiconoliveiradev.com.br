# Decisions Log

Registro de decisões arquiteturais e de produto.

## Formato

```markdown
### YYYY-MM-DD — Título da decisão

**Contexto:** …
**Decisão:** …
**Alternativas consideradas:** …
**Consequências:** …
```

## Decisões

### 2026-06-28 — Stack e hospedagem

**Contexto:** Plano Hostinger Premium; sem Node.js/PostgreSQL nativos. Objetivo: portfólio com admin.

**Decisão:**
- **Vercel** — site público em **Next.js**
- **Hostinger Premium** — **Laravel** (API + admin) + **MySQL**
- Next consome API Laravel; sem acesso direto ao banco

**Alternativas consideradas:** Laravel full-stack só na Hostinger; monorepo Docker em VPS; upgrade Business.

**Consequências:** dois deploys; CORS e env vars entre Vercel e Hostinger; admin em Inertia + React (não Filament).

### 2026-06-28 — Monorepo

**Contexto:** Dois deploys (Vercel + Hostinger) no mesmo projeto.

**Decisão:** Um repositório Git com `apps/web` (Next.js) e `apps/api` (Laravel). Vercel usa root `apps/web`; Hostinger usa root `apps/api`.

**Alternativas consideradas:** Dois repositórios separados.

**Consequências:** tipos/contratos API podem ir em `packages/types`; CI e docs centralizados.

### 2026-06-28 — Painel admin: React + Laravel

**Contexto:** Escolha de UI para o painel administrativo.

**Decisão:** Painel em **React** integrado ao Laravel via **Inertia.js** + **Vite**, dentro de `apps/api`. API REST JSON separada para o site Next.js na Vercel.

**Alternativas consideradas:** Filament; Nova; painel Blade/Livewire.

**Consequências:**
- Admin e API no mesmo app Laravel (um deploy Hostinger)
- Rotas web + Inertia para `/admin/*`; rotas `api/*` para o Next.js
- UI React no admin pode reutilizar padrões visuais do site (Tailwind, componentes)

### 2026-06-28 — i18n no admin + DeepL

**Contexto:** Site bilíngue PT-BR + EN; conteúdo dinâmico no painel.

**Decisão:**
- Campos traduzíveis com **tabs PT-BR | EN** no admin
- Botão geral **Gerar EN** chama **DeepL API Free**
- EN gerado é **editável**; PT-BR é fonte da verdade
- Confirmação antes de sobrescrever EN editado manualmente

**Alternativas consideradas:** Tradução só manual; LibreTranslate; tradução em tempo real no site.

**Consequências:** Modelos com campos `{ pt, en }`; serviço `DeepLTranslationService` no Laravel; `DEEPL_API_KEY` no env.

### 2026-06-28 — Troca de idioma no site

**Contexto:** Site bilíngue PT-BR + EN.

**Decisão:** Prefixo na URL (`/pt`, `/en`) **+** toggle no header que redireciona para a rota equivalente. Cookie opcional para persistir preferência.

**Alternativas consideradas:** Só cookie sem URL; só prefixo sem toggle.

**Consequências:** `next-intl` com routing por locale; middleware redirect `/` → `/pt` ou `/en` via cookie.

### 2026-06-28 — Auth do admin

**Decisão:** Login e-mail + senha via **Laravel Breeze**; **um único usuário admin**; registro público desabilitado.

**Alternativas consideradas:** Múltiplos admins; 2FA.

**Consequências:** Seeder de usuário admin; sem tela de registro; sessão Inertia.

### 2026-06-28 — Redirect da raiz `/`

**Decisão:** `/` redireciona para `/pt` ou `/en` conforme cookie `locale`; primeira visita sem cookie → `/pt`.

### 2026-06-28 — Seed inicial

**Decisão:** No primeiro deploy, `db:seed` importa `portfolio-data.md` (perfil, projetos, experiências, skills, contato, SEO). PT-BR preenchido; EN via admin depois.

**Consequências:** `PortfolioDataSeeder`; não fabricar dados ausentes no arquivo.

### 2026-06-28 — Armazenamento de imagens

**Decisão:** Uploads em **`storage/app/public`** no Laravel (Hostinger); URLs via `public/storage` symlink.

**Consequências:** `php artisan storage:link` no deploy; backup manual de `storage/app/public`.

### 2026-06-28 — Domínios

**Decisão:**
- Site público: **maiconoliveiradev.com.br** (Vercel)
- API + Admin Laravel: **admin.maiconoliveiradev.com.br** (Hostinger)

**Consequências:** `NEXT_PUBLIC_API_URL` aponta para `admin.*`; CORS e `FRONTEND_URL` com domínio principal.

### 2026-06-28 — Design system unificado

**Decisão:** Site e admin com **dark + laranja**; laranja em ~15% da UI (CTAs, links, métricas, estados ativos). Tokens compartilhados; admin mais sóbrio (sem animações scroll).

**Consequências:** `design-system.md` com tokens CSS/Tailwind; shadcn dark customizado; sidebar admin com accent laranja.

### 2026-06-28 — Animações do site

**Decisão:** Animações sutis no site (Framer Motion); admin só transições CSS.

**Consequências:** `framer-motion` em `apps/web`; `prefers-reduced-motion` obrigatório.
