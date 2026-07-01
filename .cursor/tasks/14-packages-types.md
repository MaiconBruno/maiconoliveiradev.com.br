# Task 14 — packages/types (contratos API)

**ID do agente:** `packages-types`  
**Status:** ✅ Concluída (2026-06-30)  
**Independente** — pode rodar em paralelo com qualquer task

---

## Objetivo

Criar pacote **`packages/types`** com contratos TypeScript espelhando a API v1 e migrar o site para usá-lo.

## Leitura obrigatória

- `.cursor/tasks/00-contexto-compartilhado.md`
- `.cursor/docs/api-conventions.md`
- `apps/web/lib/types.ts` (tipos atuais)
- Controllers em `apps/api/app/Http/Controllers/Api/V1/`

## Escopo

### Pacote
```
packages/types/
├── package.json          name: @portfolio/types
├── tsconfig.json
└── src/
    ├── index.ts
    └── api.ts            Profile, Project, Experience, Skill, Contact, SeoMeta, Education, Certification
```

### Tipos
- Campos bilíngues: `LocalizedString = { pt: string | null; en: string | null }`
- Enums: `ProjectStatus = 'draft' | 'published' | 'archived'`
- Respostas de lista vs detalhe conforme API

### Integração web
- Adicionar dependência em `apps/web/package.json` (workspace ou file:)
- Substituir imports de `@/lib/types` por `@portfolio/types`
- Remover ou re-exportar `apps/web/lib/types.ts`

### Opcional
- `packages/types/src/contact-form.ts` para payload POST contact

## Arquivos principais

```
packages/types/package.json          (criar)
packages/types/src/api.ts            (criar)
packages/types/src/index.ts          (criar)
apps/web/package.json
apps/web/lib/types.ts                (migrar/remover)
apps/web/tsconfig.json               (paths se necessário)
```

## Não mexer em

- Laravel/PHP
- Lógica de negócio

## Teste

```bash
cd apps/web && npm run build
# Sem erros de tipo
```

## Critério de pronto

- [ ] `packages/types` exporta todos os tipos da API v1
- [ ] `apps/web` importa do pacote centralizado
- [ ] `npm run build` no web passa
