# Task 03 — Admin: Experiências

**ID do agente:** `admin-experiences`  
**Status:** ✅ Concluída (2026-06-30) — inclui campo `progressao`  
**Depende de:** Task 01 (padrão CRUD)

---

## Objetivo

CRUD completo de **Experiences** no painel admin.

## Leitura obrigatória

- `.cursor/tasks/00-contexto-compartilhado.md`
- `.cursor/docs/content-models.md` (seção 3. Experiências)

## Escopo

### Backend
- `ExperienceController` resource completo
- Campos: `empresa`, `cargo` {pt,en}, `periodo_inicio`, `periodo_fim`
- `modelo`, `tipo`, `descricao` {pt,en}, `responsabilidades` {pt,en}
- `stack`, `metricas`, `ordem`, `publicado`
- API pública já filtra por `publicado` — garantir consistência

### Frontend
- `Admin/Experiences/Index.tsx`, `Create.tsx`, `Edit.tsx`
- Repeater para responsabilidades e métricas
- Toggle `publicado`, ordenação

## Arquivos principais

```
apps/api/app/Http/Controllers/Admin/ExperienceController.php  (criar)
apps/api/app/Http/Requests/StoreExperienceRequest.php           (criar)
apps/api/app/Http/Requests/UpdateExperienceRequest.php          (criar)
apps/api/app/Models/Experience.php
apps/api/resources/js/Pages/Admin/Experiences/*                 (criar)
apps/api/routes/web.php
```

## Não mexer em

- Outros módulos admin, site Next.js

## Teste

```bash
curl -H "Accept-Language: pt" http://localhost:8000/api/v1/experiences
# Site /pt/sobre e home (3 experiências em destaque)
```

## Critério de pronto

- [ ] CRUD completo funcional no admin
- [ ] Experiência não publicada não aparece na API
- [ ] Ordenação por `ordem` respeitada no site
