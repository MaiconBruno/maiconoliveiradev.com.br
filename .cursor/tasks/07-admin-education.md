# Task 07 — Admin: Formação acadêmica

**ID do agente:** `admin-education`  
**Depende de:** Task 01 (padrão CRUD)

---

## Objetivo

CRUD completo de **Education** (tabela `educations`).

## Leitura obrigatória

- `.cursor/tasks/00-contexto-compartilhado.md`
- `.cursor/docs/content-models.md` (seção 7. Formação acadêmica)

## Escopo

### Backend
- `EducationController` resource
- Model usa `$table = 'educations'` — **não alterar para `education`**
- Campos: `grau` {pt,en}, `instituicao`, `periodo`, `status` {pt,en}, `ordem`

### Frontend
- `Admin/Education/Index.tsx`, `Create.tsx`, `Edit.tsx`

## Arquivos principais

```
apps/api/app/Http/Controllers/Admin/EducationController.php  (criar)
apps/api/app/Models/Education.php
apps/api/resources/js/Pages/Admin/Education/*                 (criar)
apps/api/routes/web.php
```

## Não mexer em

- Outros módulos, migrations

## Teste

```bash
curl -H "Accept-Language: pt" http://localhost:8000/api/v1/education
# Site /pt/sobre
```

## Critério de pronto

- [ ] CRUD formação funcional
- [ ] API e página Sobre atualizados
