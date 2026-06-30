# Task 12 — Site: SEO dinâmico (Next.js)

**ID do agente:** `web-seo`  
**Status:** ⚠️ Parcial (2026-06-30) — metadata + JSON-LD OK; falta sitemap/robots  
**Depende de:** Task 06 ✅

---

## Objetivo

Implementar **`generateMetadata`** no Next.js consumindo `/api/v1/seo` para title, description e Open Graph por página e locale.

## Leitura obrigatória

- `.cursor/tasks/00-contexto-compartilhado.md`
- `.cursor/docs/site-pages.md`
- `.cursor/docs/api-conventions.md`
- `apps/api/app/Http/Controllers/Api/V1/SeoController.php`

## Escopo

### Helper
- `apps/web/lib/seo.ts`:
  - `getSeoMetadata(locale, path)` → fetch API
  - Fallback para títulos padrão se SEO não configurado

### Páginas (adicionar `generateMetadata`)
- `app/[locale]/page.tsx` — home
- `app/[locale]/projetos/page.tsx`
- `app/[locale]/projetos/[slug]/page.tsx` — usar dados do projeto + SEO global
- `app/[locale]/sobre/page.tsx`
- `app/[locale]/contato/page.tsx`

### Metadados
- `title`, `description`
- `openGraph`: title, description, image, locale (`pt_BR` / `en_US`)
- `alternates.languages` para hreflang PT/EN

### SSR
- Usar `API_INTERNAL_URL` no servidor (Docker) via `fetchApi` ou helper dedicado

## Arquivos principais

```
apps/web/lib/seo.ts                                    (criar)
apps/web/app/[locale]/page.tsx
apps/web/app/[locale]/projetos/page.tsx
apps/web/app/[locale]/projetos/[slug]/page.tsx
apps/web/app/[locale]/sobre/page.tsx
apps/web/app/[locale]/contato/page.tsx
apps/web/lib/utils.ts
```

## Não mexer em

- Admin SEO (task 06)
- Layout visual das páginas

## Teste

```bash
curl -s http://localhost:3000/pt | grep -i '<title>'
curl -s http://localhost:3000/pt | grep -i 'og:'
# View source no browser
```

## Critério de pronto

- [ ] Cada página tem `<title>` e meta description corretos
- [ ] OG tags presentes para compartilhamento
- [ ] PT e EN com metadados distintos
- [ ] Fallback se API SEO indisponível
