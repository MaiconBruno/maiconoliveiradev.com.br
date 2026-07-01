# Armazenamento de mídia

## Decisão

Imagens e arquivos públicos ficam no **disco local do Laravel**:

```
apps/api/storage/app/public/
```

Servidos via symlink `public/storage` após `php artisan storage:link`.

| Tipo | Exemplos |
|------|----------|
| Hero | Foto de perfil |
| Projetos | Thumbnails, screenshots, galeria |
| SEO | `og_image` por rota |
| Outros | PDF currículo (opcional) |

---

## Configuração

```env
FILESYSTEM_DISK=public
```

`config/filesystems.php` — disk `public` → `storage/app/public`

---

## URLs

| Ambiente | Padrão |
|----------|--------|
| Local | `http://localhost:8000/storage/{path}` |
| Hostinger | `https://admin.maiconoliveiradev.com.br/storage/{path}` |

A API retorna URL completa para o Next.js exibir imagens.

---

## Upload no admin

- Formulários Inertia com upload multipart
- Laravel `Storage::disk('public')->put(...)`
- Validação: jpeg, png, webp; **máx. 5 MB**
- Nomes únicos (UUID ou slug + timestamp)

---

## Deploy Hostinger

```bash
php artisan storage:link
```

Garantir permissões de escrita em `storage/` e `bootstrap/cache/`.

---

## Backup

Incluir `storage/app/public` no backup manual ou rotina Hostinger — imagens não estão no Git.

---

## Pastas de upload

| Módulo | Path |
|--------|------|
| Projetos | `storage/app/public/projects/` |
| Perfil | `storage/app/public/profile/` |
| SEO | `storage/app/public/seo/` |

Galeria de projetos suporta **imagem e vídeo** (`galeria` JSON).

## Status

- [x] Disco: `storage/app/public` (Laravel local)
- [x] Validação: 5 MB, jpeg/png/webp
- [x] `ImageUploadService` + endpoints admin
- [x] Galeria image/video em projetos
- [x] Deploy Hostinger: symlink persistente via `deploy-hostinger.sh`
- [ ] Otimização de imagens (opcional)
- [ ] URLs absolutas na API de projetos (parcial — profile/seo resolvem)
