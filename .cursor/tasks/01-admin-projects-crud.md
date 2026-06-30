# Task 01 — Admin: CRUD Projetos (completo)

**ID do agente:** `admin-projects-crud`  
**Status:** ✅ Concluída (2026-06-30) — inclui galeria image/video  
**Prioridade:** Alta — define o padrão para os outros módulos admin

---

## Objetivo

Implementar CRUD **funcional** de Projetos no painel Laravel/Inertia.

> **Nota (2026-06-30):** Esta task foi concluída. Use como referência de padrão para novos módulos.

## Leitura obrigatória

- `.cursor/tasks/00-contexto-compartilhado.md`
- `.cursor/docs/content-models.md` (seção 1. Projetos)
- `.cursor/docs/admin-panel.md`
- `.cursor/docs/storage.md`

## Escopo

### Backend
- Completar `ProjectController`: `store`, `update`, `destroy`
- Criar `StoreProjectRequest` e `UpdateProjectRequest` com validação
- Persistir todos os campos da migration `projects`:
  - `slug`, `titulo` {pt,en}, `empresa`, `periodo`, `papel` {pt,en}
  - `stack` (array), `url`, `status` (draft|published|archived)
  - `descricao` {pt,en} markdown, `metricas`, `destaques`
  - `imagens`, `ordem`, `destaque`, `publicado_em`
- Regra: máx. **6** projetos com `destaque=true` (validar no update)
- Flash messages de sucesso/erro

### Frontend (Inertia + React)
- `Admin/Projects/Index.tsx` — listagem com status, destaque, ações
- `Admin/Projects/Create.tsx` — formulário completo
- `Admin/Projects/Edit.tsx` — edição completa
- Campos bilíngues com inputs separados PT/EN (tabs virão na task 09; por ora inputs lado a lado ou seções PT/EN)
- Tags para `stack`, repeater para `metricas` e `destaques`
- Select para `status`, checkbox `destaque`, input `ordem`

### Upload de imagens
- Se a task 10 ainda não existir: implementar upload básico inline (jpeg/png/webp, 5MB) em `storage/app/public/projects/`
- Se `ImageUpload.tsx` já existir (task 10): reutilizar

## Arquivos principais

```
apps/api/app/Http/Controllers/Admin/ProjectController.php
apps/api/app/Http/Requests/StoreProjectRequest.php      (criar)
apps/api/app/Http/Requests/UpdateProjectRequest.php     (criar)
apps/api/app/Models/Project.php
apps/api/resources/js/Pages/Admin/Projects/Index.tsx
apps/api/resources/js/Pages/Admin/Projects/Create.tsx
apps/api/resources/js/Pages/Admin/Projects/Edit.tsx
apps/api/routes/web.php
```

## Não mexer em

- Outros módulos admin (Profile, Experiences, etc.)
- Site Next.js (`apps/web`)
- Migrations (schema já existe)

## Teste

```bash
docker compose up -d
# Admin: http://localhost:8000/login
# Criar projeto → editar → publicar → verificar API:
curl http://localhost:8000/api/v1/projects
# Site: http://localhost:3000/pt
```

## Critério de pronto

- [ ] Criar, editar e excluir projeto pelo admin persiste no MySQL
- [ ] Projeto `published` aparece em `/api/v1/projects` e no site
- [ ] Projeto `draft` não aparece na API pública
- [ ] Validação de slug único e limite de 6 destaques
- [ ] Upload de imagem funcional (ou integrado com task 10)
