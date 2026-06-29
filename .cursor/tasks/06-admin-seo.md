# Task 06 — Admin: SEO

**ID do agente:** `admin-seo`  
**Depende de:** Task 01 (padrão CRUD), Task 10 (upload OG — pode implementar inline se 10 não pronta)

---

## Objetivo

CRUD de **SeoMeta** por rota/página para metadados PT/EN e imagem OG.

## Leitura obrigatória

- `.cursor/tasks/00-contexto-compartilhado.md`
- `.cursor/docs/content-models.md` (seção 6. SEO)
- `.cursor/docs/site-pages.md`

## Escopo

### Backend
- `SeoController` admin resource ou edit por rota
- Campos: `rota` (única), `title`, `description`, `og_title`, `og_description` {pt,en}
- `og_image`, `canonical`, `noindex`
- Rotas exemplo: `/pt`, `/en`, `/pt/projetos`, `/en/projetos`, `/pt/sobre`, `/pt/contato`

### Frontend
- `Admin/Seo/Index.tsx` — lista de páginas
- `Admin/Seo/Edit.tsx` — edição por rota
- Upload `og_image` em `storage/app/public/seo/`

### API pública
- Verificar `SeoController` API v1 (`GET /api/v1/seo`) aceita query `?rota=/pt` ou similar
- Ajustar se necessário para consumo pelo Next.js (task 12)

## Arquivos principais

```
apps/api/app/Http/Controllers/Admin/SeoController.php       (criar)
apps/api/app/Http/Controllers/Api/V1/SeoController.php    (revisar)
apps/api/app/Models/SeoMeta.php
apps/api/resources/js/Pages/Admin/Seo/*                   (criar)
apps/api/routes/web.php
```

## Não mexer em

- `generateMetadata` no Next.js (task 12)

## Teste

```bash
curl "http://localhost:8000/api/v1/seo?rota=/pt"
```

## Critério de pronto

- [ ] Admin edita SEO por rota
- [ ] API retorna title/description/og por locale
- [ ] Upload OG image com URL pública `/storage/...`
