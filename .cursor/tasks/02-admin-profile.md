# Task 02 — Admin: Hero / Sobre (Profile)

**ID do agente:** `admin-profile`  
**Status:** ✅ Concluída (2026-06-30)  
**Depende de:** Task 01 (padrão CRUD/formulário)

---

## Objetivo

Criar tela de edição do **Profile** (singleton) para gerenciar Hero e Sobre no painel admin.

## Leitura obrigatória

- `.cursor/tasks/00-contexto-compartilhado.md`
- `.cursor/docs/content-models.md` (seção 2. Hero / Sobre)

## Escopo

### Backend
- Criar `ProfileController` com `edit` + `update` (sem index/create — registro único)
- Rota: `GET/PUT admin/profile` ou `admin/profile/edit`
- Validar campos:
  - `nome_completo`, `headline` {pt,en}, `localizacao`
  - `modelo_trabalho` {pt,en}, `anos_experiencia`
  - `bio_resumo`, `bio_longa` {pt,en} markdown
  - `foto`, `cta_primario`, `cta_secundario`, `curriculo_pdf`
- Upload foto em `storage/app/public/profile/` (reutilizar task 10 se disponível)

### Frontend
- `Admin/Profile/Edit.tsx` — formulário único com seções Hero e Sobre
- CTAs como objeto JSON editável (label pt/en, url, externo)

## Arquivos principais

```
apps/api/app/Http/Controllers/Admin/ProfileController.php   (criar)
apps/api/app/Http/Requests/UpdateProfileRequest.php       (criar)
apps/api/app/Models/Profile.php
apps/api/resources/js/Pages/Admin/Profile/Edit.tsx        (criar)
apps/api/routes/web.php
```

## Não mexer em

- Projetos, Experiences, site Next.js
- Seeders (dados iniciais já existem)

## Teste

```bash
# Editar headline PT no admin → verificar:
curl -H "Accept-Language: pt" http://localhost:8000/api/v1/profile
curl -H "Accept-Language: en" http://localhost:8000/api/v1/profile
# Site home e /sobre
```

## Critério de pronto

- [ ] Admin edita profile e salva com sucesso
- [ ] `/api/v1/profile` reflete alterações em PT e EN
- [ ] Home (`/pt`) e Sobre mostram dados atualizados
- [ ] Upload de foto funcional
