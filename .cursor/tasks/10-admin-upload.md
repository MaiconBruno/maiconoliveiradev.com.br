# Task 10 — Admin: Upload e storage

**ID do agente:** `admin-upload`  
**Prioridade:** Alta — desbloqueia tasks 01, 02, 06, 13

---

## Objetivo

Centralizar **upload de imagens** no Laravel com componente React reutilizável.

## Leitura obrigatória

- `.cursor/tasks/00-contexto-compartilhado.md`
- `.cursor/docs/storage.md`

## Escopo

### Backend
- `ImageUploadService.php`:
  - Validar: jpeg, png, webp — máx. **5 MB**
  - Salvar em `storage/app/public/{folder}/`
  - Retornar path relativo ou URL pública
- Rota admin opcional: `POST /admin/upload` (auth) para upload AJAX
- Garantir `php artisan storage:link` no entrypoint Docker (já existe)

### Frontend
- `ImageUpload.tsx` — preview, drag-drop ou file input, remove
- Props: `value`, `onChange`, `folder` (projects|profile|seo)

### Pastas
```
storage/app/public/projects/
storage/app/public/profile/
storage/app/public/seo/
```

## Arquivos principais

```
apps/api/app/Services/ImageUploadService.php           (criar)
apps/api/app/Http/Controllers/Admin/UploadController.php  (criar, opcional)
apps/api/resources/js/Components/ImageUpload.tsx     (criar)
apps/api/routes/web.php
docker/api/entrypoint.sh                               (verificar storage:link)
```

## Não mexer em

- CRUD completo dos módulos (só fornecer componente/serviço)
- Site Next.js (task 13 configura `next/image`)

## Teste

```bash
# Upload via admin → arquivo em storage/app/public/
# URL: http://localhost:8000/storage/projects/xxx.webp
```

## Critério de pronto

- [ ] Upload valida tipo e tamanho
- [ ] URL pública acessível
- [ ] Componente `ImageUpload` documentado para uso nas tasks 01, 02, 06
