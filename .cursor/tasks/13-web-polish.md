# Task 13 — Site: imagens e polish visual

**ID do agente:** `web-polish`  
**Depende de:** Task 10 (URLs `/storage/...`)

---

## Objetivo

Exibir **imagens reais** da API no site e refinar UI/UX conforme design system.

## Leitura obrigatória

- `.cursor/tasks/00-contexto-compartilhado.md`
- `.cursor/docs/design-system.md`
- `.cursor/docs/site-pages.md`

## Escopo

### Imagens
- Configurar `next.config.ts` — `images.remotePatterns` para:
  - `localhost:8000` (dev)
  - `admin.maiconoliveiradev.com.br` (prod)
- Helper `getStorageUrl(path)` — prefixa `NEXT_PUBLIC_API_URL` + `/storage/`
- `next/image` em:
  - Hero (foto profile)
  - `ProjectCard` (capa)
  - Case study (`/projetos/[slug]`) — galeria se `imagens[]` existir

### Polish visual
- Refinar cards, tipografia, espaçamentos
- Mais animações **Framer Motion** (`FadeIn` já existe) — respeitar `prefers-reduced-motion` em `globals.css`
- Estados vazios e loading skeletons (opcional)

### Prose/Markdown
- Se descrições forem markdown: renderizar com componente seguro ou `prose` Tailwind

## Arquivos principais

```
apps/web/next.config.ts
apps/web/lib/utils.ts                    (getStorageUrl)
apps/web/components/ProjectCard.tsx
apps/web/app/[locale]/page.tsx
apps/web/app/[locale]/projetos/[slug]/page.tsx
apps/web/components/FadeIn.tsx
```

## Não mexer em

- Admin upload (task 10)
- CRUD backend

## Teste

```bash
# Com imagens no seed ou upload admin:
# Home e /projetos/[slug] exibem imagens
# Lighthouse / visual check no browser
```

## Critério de pronto

- [ ] Imagens carregam via `next/image` sem erro 403/404
- [ ] Visual alinhado ao design dark + laranja
- [ ] Animações suaves com reduced-motion respeitado
