# Site público — Páginas e seções

> Rotas com prefixo de locale — ver [i18n.md](i18n.md). Raiz `/` redireciona via cookie.

**Status (2026-06-30):** 5/5 rotas implementadas em `apps/web`. Pendências: sitemap, nav ativa, `html lang` dinâmico.

## Rotas

| # | PT-BR | EN | Página |
|---|-------|-----|--------|
| 1 | `/pt` | `/en` | Home |
| 2 | `/pt/projetos` | `/en/projetos` | Lista de projetos |
| 3 | `/pt/projetos/[slug]` | `/en/projetos/[slug]` | Case study |
| 4 | `/pt/sobre` | `/en/sobre` | Bio, experiências, formação |
| 5 | `/pt/contato` | `/en/contato` | Formulário + links |

---

## Home (`/pt` · `/en`)

| Ordem | Seção | API / regra |
|-------|-------|--------------|
| 1 | **Hero** | `GET /profile` |
| 2 | **Projetos em destaque** | `GET /projects?featured=1` — máx. **6**, flag `destaque` |
| 3 | **Experiências** | `GET /experiences?limit=3` — *implementado: fetch all + `.slice(0,3)`* |
| 4 | **Skills** | `GET /skills` — só `destaque=true` — *implementado: filtro no client* |
| 5 | **Redes sociais** | `GET /contact` — *links no hero + `ContactBand` (sem seção titulada)* |

Link “Ver todas” em experiências → `/pt/sobre` ou `/en/sobre`

---

## `/projetos`

- Grid de projetos `status=publicado`
- Filtro por stack → **fase 2**

---

## `/projetos/[slug]`

- Case study completo
- SEO: `GET /seo?path=/pt/projetos/{slug}`

---

## `/sobre`

- Bio longa
- Timeline completa de experiências
- Formação acadêmica (`GET /education`)
- Certificações (`GET /certifications`)
- Skills por categoria

---

## `/contato`

- Dados + redes (`GET /contact`)
- Formulário → `POST /api/v1/contact`
- Links diretos (e-mail, LinkedIn, GitHub)

### Formulário

| Campo | Obrigatório |
|-------|-------------|
| Nome | sim |
| E-mail | sim |
| Assunto | opcional |
| Mensagem | sim |

**Proteção (v1):** honeypot `_honeypot` + rate limit 5/min — ver [api-conventions.md](api-conventions.md)

---

## Navegação (header)

- Logo → home do locale atual
- Projetos · Sobre · Contato
- Toggle **PT | EN** → rota equivalente

---

## SEO

Rotas com prefixo: `/pt`, `/en`, `/pt/projetos`, `/en/projetos`, etc.

Ver [content-models.md](content-models.md) módulo 6.

---

## Implementação (`apps/web`)

| Componente | Arquivo |
|------------|---------|
| Home | `app/[locale]/page.tsx` + `components/home/*` |
| Projetos | `app/[locale]/projetos/page.tsx` + `ProjectsArchive` |
| Case study | `app/[locale]/projetos/[slug]/page.tsx` + galeria/markdown |
| Sobre | `app/[locale]/sobre/page.tsx` |
| Contato | `app/[locale]/contato/page.tsx` + `ContactForm` |
| Layout | `Header`, `Footer`, `FadeIn` |
| SEO | `lib/seo.ts`, `JsonLd` |
