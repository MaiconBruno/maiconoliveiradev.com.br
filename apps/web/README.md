# apps/web — Site público

Next.js 15 (App Router) com next-intl, Tailwind CSS 4 e Framer Motion.

**Deploy:** Vercel → `maiconoliveiradev.com.br`

## Rotas

| Rota | Página |
|------|--------|
| `/pt` · `/en` | Home |
| `/[locale]/projetos` | Lista de projetos |
| `/[locale]/projetos/[slug]` | Case study |
| `/[locale]/sobre` | Bio, experiências, formação, certificações |
| `/[locale]/contato` | Formulário + links diretos |

Raiz `/` redireciona para `/pt` ou `/en` via cookie `locale`.

## Desenvolvimento

```bash
# Com Docker (recomendado, na raiz do monorepo)
docker compose up -d --build

# Ou localmente
npm install
npm run dev
```

Site: http://localhost:3000/pt

## Variáveis de ambiente

Copiar de `.env.example`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
API_INTERNAL_URL=http://api:8000   # SSR no Docker
NEXT_PUBLIC_DEFAULT_LOCALE=pt
```

## Estrutura

```
app/[locale]/     # Páginas por locale
components/       # UI (home/, projects/, layout)
lib/              # fetchApi, seo, json-ld
messages/         # pt.json, en.json (UI estática)
i18n/             # routing next-intl
```

## Integração API

Todos os dados dinâmicos vêm de `https://admin.maiconoliveiradev.com.br/api/v1/*` (ou `localhost:8000` em dev).

Helper: `lib/utils.ts` → `fetchApi<T>(path, locale)` com `revalidate: 300`.

Tipos: `@portfolio/types` (`packages/types`).

## Scripts

| Comando | Ação |
|---------|------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run lint` | ESLint |

## Documentação

- [site-pages.md](../../.cursor/docs/site-pages.md)
- [design-system.md](../../.cursor/docs/design-system.md)
- [api-conventions.md](../../.cursor/docs/api-conventions.md)
