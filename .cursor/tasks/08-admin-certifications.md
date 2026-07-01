# Task 08 — Admin: Certificações

**ID do agente:** `admin-certifications`  
**Status:** ✅ Concluída (2026-06-30)  
**Depende de:** Task 01 (padrão CRUD)

---

## Objetivo

CRUD completo de **Certifications** no painel admin.

## Leitura obrigatória

- `.cursor/tasks/00-contexto-compartilhado.md`
- `.cursor/docs/content-models.md` (seção 8. Certificações)

## Escopo

### Backend
- `CertificationController` resource
- Campos: `titulo` {pt,en}, `emissor`, `ordem`

### Frontend
- `Admin/Certifications/Index.tsx`, `Create.tsx`, `Edit.tsx`

## Arquivos principais

```
apps/api/app/Http/Controllers/Admin/CertificationController.php  (criar)
apps/api/app/Models/Certification.php
apps/api/resources/js/Pages/Admin/Certifications/*                 (criar)
apps/api/routes/web.php
```

## Não mexer em

- Outros módulos, site Next.js

## Teste

```bash
curl -H "Accept-Language: pt" http://localhost:8000/api/v1/certifications
# Site /pt/sobre
```

## Critério de pronto

- [ ] CRUD certificações funcional
- [ ] API e Sobre atualizados
- [ ] Não fabricar certificações — só editar o que veio do seed ou adicionar com dados reais confirmados
