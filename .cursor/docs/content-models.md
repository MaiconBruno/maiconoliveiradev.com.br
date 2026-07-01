# Conteúdo editável (admin)

> Fonte inicial: `portfolio-data.md` (seed). Admin CRUD para tudo abaixo.

## Módulos do painel

| # | Módulo | Escopo |
|---|--------|--------|
| 1 | **Projetos** | CRUD completo |
| 2 | **Hero / Sobre** | Identidade e apresentação |
| 3 | **Experiências** | Histórico profissional |
| 4 | **Skills** | Competências e categorias |
| 5 | **Contato e redes** | Canais e links |
| 6 | **SEO** | Meta por página/rota (com prefixo `/pt`, `/en`) |
| 7 | **Formação acadêmica** | Graus e instituições |
| 8 | **Certificações** | Cursos e certificados |

---

## 1. Projetos

| Campo | Tipo | Notas |
|-------|------|-------|
| `titulo` | json `{pt,en}` | |
| `slug` | string | único, não traduzir |
| `empresa` | string | opcional |
| `periodo` | string | ex. `jun/2025 – atual` |
| `papel` | json `{pt,en}` | |
| `stack` | json/array | tags — não traduzir |
| `url` | url | demo / repositório |
| `status` | enum | rascunho · publicado · arquivado |
| `descricao` | json `{pt,en}` | **Markdown** |
| `metricas` | json/array | `{ label, valor }` — só fatos confirmados |
| `destaques` | json/array | bullets traduzíveis |
| `imagens` | media[] | legado — migrado para `galeria` |
| `galeria` | json | `{ capa?, midias: [{ tipo, path, legenda? }] }` — image/video |
| `ordem` | int | ordenação no site (campo numérico; sem drag-and-drop) |
| `destaque` | bool | home — máx. **6** exibidos |
| `publicado_em` | datetime | opcional |

**Ações:** criar · editar · publicar/despublicar · reordenar (campo `ordem`) · upload

**Status implementação:** ✅ CRUD completo · ⚠️ URLs absolutas de mídia na API pendentes

---

## 2. Hero / Sobre

| Campo | Tipo | Notas |
|-------|------|-------|
| `nome_completo` | string | não traduzir |
| `headline` | json `{pt,en}` | |
| `localizacao` | string | |
| `modelo_trabalho` | json `{pt,en}` | ex. Remoto |
| `anos_experiencia` | string | ex. `8+` |
| `bio_resumo` | json `{pt,en}` | Markdown |
| `bio_longa` | json `{pt,en}` | Markdown |
| `foto` | media | `storage/app/public/profile/` |
| `cta_primario` | json | `{ label: {pt,en}, url, externo? }` |
| `cta_secundario` | json | opcional |
| `curriculo_pdf` | file/url | opcional |

---

## 3. Experiências

| Campo | Tipo | Notas |
|-------|------|-------|
| `empresa` | string | não traduzir |
| `cargo` | json `{pt,en}` | |
| `periodo_inicio` | date/string | |
| `periodo_fim` | date/string | null = atual |
| `modelo` | string | remoto · híbrido · presencial |
| `tipo` | string | CLT · PJ · contrato |
| `descricao` | json `{pt,en}` | Markdown |
| `responsabilidades` | json | bullets `{pt,en}` |
| `stack` | json/array | opcional |
| `metricas` | json/array | `{ label, valor }` |
| `progressao` | json/array | sub-cargos: `{ cargo, periodo?, descricao? }` bilíngue |
| `ordem` | int | mais recente primeiro |
| `publicado` | bool | |

**Status implementação:** ✅ CRUD + API · campo `progressao` exibido no site (`ExperienceLog`)

---

## 4. Skills

| Campo | Tipo | Notas |
|-------|------|-------|
| `nome` | string | nome técnico — não traduzir |
| `categoria` | enum/relation | linguagens · frontend · backend · etc. |
| `nivel` | enum | opcional |
| `ordem` | int | |
| `destaque` | bool | home + destaque na página sobre |

---

## 5. Contato e redes

| Campo | Tipo | Notas |
|-------|------|-------|
| `email` | email | |
| `telefone` | string | opcional |
| `linkedin` | url | |
| `github` | url | |
| `portfolio` | url | `https://maiconoliveiradev.com.br` |
| `outros` | json/array | `{ label, url, icone? }` |

---

## 6. SEO

| Campo | Tipo | Notas |
|-------|------|-------|
| `rota` | string | ex. `/pt/projetos`, `/en/sobre` |
| `title` | json `{pt,en}` | |
| `description` | json `{pt,en}` | |
| `og_title` | json `{pt,en}` | opcional |
| `og_description` | json `{pt,en}` | opcional |
| `og_image` | media/url | |
| `canonical` | url | opcional |
| `noindex` | bool | opcional |

---

## 7. Formação acadêmica

| Campo | Tipo | Notas |
|-------|------|-------|
| `grau` | json `{pt,en}` | |
| `instituicao` | string | |
| `periodo` | string | |
| `status` | json `{pt,en}` | Concluído · Em andamento |
| `ordem` | int | |

---

## 8. Certificações

| Campo | Tipo | Notas |
|-------|------|-------|
| `titulo` | json `{pt,en}` | |
| `emissor` | string | opcional |
| `ordem` | int | |

---

## API pública

Detalhes em [api-conventions.md](api-conventions.md).

Somente registros **publicados**. Locale via `Accept-Language`.

## Regra de conteúdo

Não fabricar métricas, projetos ou certificações — alinhado a `portfolio-data.md`.

---

## Status geral (2026-06-30)

| Módulo | Admin | API pública |
|--------|-------|-------------|
| 1 Projetos | ✅ | ⚠️ URLs mídia |
| 2 Hero/Sobre | ✅ | ✅ |
| 3 Experiências | ✅ | ✅ |
| 4 Skills | ✅ | ⚠️ sem `nivel` |
| 5 Contato | ✅ | ⚠️ POST só loga |
| 6 SEO | ✅ | ✅ |
| 7 Formação | ✅ | ✅ |
| 8 Certificações | ✅ | ✅ |
