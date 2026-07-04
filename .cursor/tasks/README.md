# Tasks para agentes paralelos

Cada arquivo `NN-*.md` é um prompt **autocontido** para um agente Cursor executar uma feature restante do portfólio.

**Status geral (2026-07-03):** MVP em produção. Tasks 01–15 concluídas; deploy contínuo via Vercel + Hostinger Git. Foco em polish residual (13).

## Mapa de conclusão

| Task | Título | Status | Notas |
|------|--------|--------|-------|
| 00 | Contexto compartilhado | ✅ Referência | Atualizado |
| 01 | Admin: CRUD Projetos | ✅ Concluída | + galeria image/video |
| 02 | Admin: Hero/Sobre | ✅ Concluída | |
| 03 | Admin: Experiências | ✅ Concluída | + campo `progressao` |
| 04 | Admin: Skills | ✅ Concluída | |
| 05 | Admin: Contato | ✅ Concluída | E-mail SMTP + reCAPTCHA |
| 06 | Admin: SEO | ✅ Concluída | |
| 07 | Admin: Formação | ✅ Concluída | |
| 08 | Admin: Certificações | ✅ Concluída | |
| 09 | Admin: i18n UI | ✅ Concluída | Tabs + DeepL |
| 10 | Admin: Upload | ✅ Concluída | Galeria vídeo |
| 11 | Admin: Shell | ✅ Concluída | Sidebar + layout |
| 12 | Web: SEO | ✅ Concluída | + sitemap/robots |
| 13 | Web: Polish | ⚠️ Parcial | Nav ativa, `html lang`, shadcn |
| 14 | packages/types | ✅ Concluída | |
| 15 | Deploy produção | ✅ Concluída | Vercel + Hostinger |
| 16 | GitHub Actions (lint/test) | ❓ Opcional | Deploy já via Vercel + Hostinger |

## Como usar

1. Abra um chat/agente novo por task **pendente**
2. Cole o conteúdo completo do arquivo `.md` como prompt inicial
3. O agente deve ler os docs listados em **Leitura obrigatória** antes de codar
4. Testar com `docker compose up -d` (site `:3000`, admin `:8000`)

## Ordem sugerida (restante)

| Onda | Tasks | Foco |
|------|-------|------|
| 1 | `13` | Polish web (`html lang`, nav ativa) |

## Deploy contínuo

| App | Plataforma |
|-----|------------|
| `apps/web` | Vercel — push → build + deploy automático |
| `apps/api` | Hostinger — deploy via Git |

## Credenciais locais

- Admin: http://localhost:8000/login — `devmaiconrodrigues@gmail.com` / `admin123456`
- Site: http://localhost:3000/pt

## Produção

- Site: https://maiconoliveiradev.com.br
- Admin: https://admin.maiconoliveiradev.com.br/login

## Mapa de dependências

```
10-upload ──┬──► 01-projects ──┬──► 02–08 (módulos admin) ✅
            │                  ├──► 11-shell ✅
            │                  └──► 09-i18n-ui ✅
            └──► 13-web-polish ⚠️

06-admin-seo ──► 12-web-seo ✅

14-types ✅

09 + 12 + 13 ──► 15-deploy ✅    16-actions ❓ (opcional)
```
