# Task 04 — Admin: Skills

**ID do agente:** `admin-skills`  
**Status:** ✅ Concluída (2026-06-30)  
**Depende de:** Task 01 (padrão CRUD)

---

## Objetivo

CRUD completo de **Skills** com categorias no painel admin.

## Leitura obrigatória

- `.cursor/tasks/00-contexto-compartilhado.md`
- `.cursor/docs/content-models.md` (seção 4. Skills)

## Escopo

### Backend
- `SkillController` resource completo
- Campos: `nome` (não traduzir), `categoria`, `nivel`, `ordem`, `destaque`
- Categorias conforme seed: linguagens, frontend, backend, dados, devops, etc.

### Frontend
- `Admin/Skills/Index.tsx` — agrupar por `categoria` visualmente
- `Create.tsx`, `Edit.tsx`
- Checkbox `destaque` para home/sobre

## Arquivos principais

```
apps/api/app/Http/Controllers/Admin/SkillController.php  (criar)
apps/api/app/Http/Requests/StoreSkillRequest.php         (criar)
apps/api/app/Http/Requests/UpdateSkillRequest.php        (criar)
apps/api/app/Models/Skill.php
apps/api/resources/js/Pages/Admin/Skills/*               (criar)
apps/api/routes/web.php
```

## Não mexer em

- Outros módulos, site Next.js

## Teste

```bash
curl http://localhost:8000/api/v1/skills
# Site home e /sobre
```

## Critério de pronto

- [ ] CRUD skills funcional
- [ ] API retorna skills agrupadas por categoria
- [ ] Skills com `destaque=true` aparecem na home
