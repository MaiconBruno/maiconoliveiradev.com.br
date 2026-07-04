# Convenções da API REST

Base URL: `https://admin.maiconoliveiradev.com.br/api/v1`

## Formato geral

| Item | Padrão |
|------|--------|
| Formato | JSON |
| Charset | UTF-8 |
| Versionamento | `/api/v1/` |
| Locale | Header `Accept-Language: pt` ou `en` |
| Erros | `{ "message": "...", "errors": { "campo": ["..."] } }` |
| Datas | ISO 8601 (`2026-06-28T12:00:00Z`) |
| Campos bilíngues na resposta | Objeto resolvido pelo locale ou `{ "pt": "...", "en": "..." }` — **preferir valor já resolvido** |

## Autenticação

| Área | Auth |
|------|------|
| `GET /api/v1/*` (público) | Nenhuma |
| `POST /api/v1/contact` | Nenhuma + honeypot + rate limit |
| `/admin/*` | Sessão Laravel Breeze (cookie) |
| `POST /admin/translate` | Sessão admin |

**Sanctum:** não usar na v1.

## Endpoints públicos

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/profile` | Hero + sobre (bio resumo/longa) |
| GET | `/projects` | Lista publicada; query `?featured=1` para home (máx. 6) |
| GET | `/projects/{slug}` | Detalhe do case study |
| GET | `/experiences` | Timeline; query `?limit=3` para home |
| GET | `/skills` | Agrupado por `categoria` |
| GET | `/education` | Formação acadêmica |
| GET | `/certifications` | Certificações |
| GET | `/contact` | Dados + redes |
| POST | `/contact` | Formulário — body: `name`, `email`, `subject?`, `message`, `_honeypot` |
| GET | `/seo` | Query `?path=/pt/projetos` — meta da rota |

## Status HTTP

| Código | Uso |
|--------|------|
| 200 | Sucesso |
| 201 | Criado (admin) |
| 422 | Validação |
| 429 | Rate limit (contato) |
| 404 | Recurso não encontrado / não publicado |

## CORS

```php
// Origens permitidas
'https://maiconoliveiradev.com.br'
'https://www.maiconoliveiradev.com.br'
// + *.vercel.app em APP_ENV=local|staging
```

## Rate limit

| Rota | Limite |
|------|--------|
| `POST /api/v1/contact` | 5 req / minuto por IP |

## Paginação (futuro)

Query `?page=1&per_page=20` — não necessário na v1 (poucos projetos).

## Cache (recomendado)

- API pública: `Cache-Control: public, max-age=300` (5 min)
- Invalidar cache ao salvar no admin (evento Laravel → opcional tag)

## Tipos compartilhados

Contratos TypeScript em `packages/types/src/api.ts` espelhando estes endpoints.

---

## Status implementação (2026-07-03)

| Item | Status |
|------|--------|
| 10 endpoints públicos | ✅ |
| `Accept-Language` | ✅ (`App\Support\Locale`) |
| Cache `max-age=300` | ✅ |
| CORS produção + Vercel preview | ✅ |
| Honeypot + rate limit contato | ✅ |
| reCAPTCHA no POST contact | ✅ |
| POST contact → e-mail SMTP | ✅ `ContactFormSubmitted` |
| Invalidação cache no admin | ❌ opcional |
| Testes feature | ❌ |
| `nivel` em GET `/skills` | ❌ omitido na resposta |
| URLs absolutas mídia projetos | ⚠️ paths relativos |
