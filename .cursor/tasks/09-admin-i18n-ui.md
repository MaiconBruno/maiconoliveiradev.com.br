# Task 09 — Admin: i18n UI (tabs PT/EN + Gerar EN)

**ID do agente:** `admin-i18n-ui`  
**Status:** ✅ Concluída (2026-06-30)  
**Depende de:** Tasks 01–08 (formulários admin existentes)

---

## Objetivo

Criar componentes reutilizáveis de **internacionalização no admin**: tabs PT/EN e botão **Gerar EN** via DeepL.

## Leitura obrigatória

- `.cursor/tasks/00-contexto-compartilhado.md`
- `.cursor/docs/i18n.md`
- `apps/api/app/Services/DeepLTranslationService.php`
- `apps/api/app/Http/Controllers/Admin/TranslateController.php`

## Escopo

### Componentes React
- `LocaleTabs.tsx` — tabs PT | EN para campos `{ pt, en }`
- `LocaleField.tsx` — wrapper input/textarea markdown com valor bilíngue
- `GenerateEnButton.tsx` — chama `POST /admin/translate` com texto PT, preenche EN
- `GenerateAllEnButton.tsx` — traduz todos os campos PT do formulário de uma vez

### Backend
- Revisar `TranslateController` — aceitar texto ou objeto de campos
- Retornar JSON com traduções
- Mensagem clara se `DEEPL_API_KEY` ausente no `.env`

### Integração
- Integrar nos formulários de: Projects, Profile, Experiences, Education, Certifications, SEO
- **Não traduzir:** slug, stack, nomes técnicos de skills, empresa

## Arquivos principais

```
apps/api/resources/js/Components/LocaleTabs.tsx          (criar)
apps/api/resources/js/Components/LocaleField.tsx         (criar)
apps/api/resources/js/Components/GenerateEnButton.tsx      (criar)
apps/api/app/Http/Controllers/Admin/TranslateController.php
apps/api/resources/js/Pages/Admin/**/Create.tsx, Edit.tsx (integrar)
```

## Não mexer em

- Site Next.js i18n (next-intl já funciona)
- Lógica da API pública

## Teste

```bash
# Definir DEEPL_API_KEY no apps/api/.env ou docker-compose
# Admin → editar projeto → Gerar EN → campo EN preenchido
```

## Critério de pronto

- [ ] Tabs PT/EN funcionam em todos os forms bilíngues
- [ ] Gerar EN traduz via DeepL quando key configurada
- [ ] EN editável manualmente após geração
- [ ] Fallback amigável sem API key
