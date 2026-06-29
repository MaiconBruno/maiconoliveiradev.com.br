# Checklist de prontidão — geração do projeto

Última revisão: 2026-06-28 (revisão completa)

## ✅ Definido — pronto para gerar

| Área | Documento |
|------|-----------|
| Objetivo, escopo, arquitetura | `memory/project.md`, `decisions.md` |
| Domínios | `maiconoliveiradev.com.br` · `admin.maiconoliveiradev.com.br` — `docs/hosting.md` |
| Stack + versões | `skills/stack/instructions.md` |
| Monorepo + env | `docs/monorepo.md`, `apps/*/.env*` |
| 8 módulos admin | `docs/content-models.md`, `docs/admin-panel.md` |
| Páginas + home (6 destaques, 3 exp.) | `docs/site-pages.md` |
| i18n PT/EN + DeepL + tabs | `docs/i18n.md` |
| Design dark + laranja | `docs/design-system.md` |
| API REST v1 | `docs/api-conventions.md` |
| Auth Breeze, admin único | `docs/admin-panel.md` |
| Seed portfolio-data.md | `docs/seed.md` |
| Storage local | `docs/storage.md` |
| Contato + honeypot | `docs/site-pages.md`, `api-conventions.md` |
| Animações Framer Motion | `docs/design-system.md` |
| Dev local | `workflows/local-dev.md` |
| Deploy inicial | `workflows/deploy-initial.md` |
| Cursor rule + skill gerar | `rules/project.mdc`, `skills/generate-portfolio/` |

## ✅ Defaults v1 (bloqueados para geração)

| Item | Decisão |
|------|---------|
| Versões | Laravel 12, Next 15, PHP 8.3, Node 20 |
| i18n DB | JSON `{ pt, en }` |
| Textos longos | Markdown |
| Projetos home | `destaque=true`, máx. 6 |
| Anti-spam | Honeypot + 5 req/min |
| Upload | 5 MB, jpeg/png/webp |
| Formação + certificações | Módulos 7 e 8 — incluídos |
| Sanctum | Não na v1 |
| `packages/types` | Sim, na v1 |

## ❓ Opcional (pós-MVP)

| Item | Nota |
|------|------|
| Nome do repositório GitHub | Ex. `portfolio-maicon` |
| CI/CD GitHub Actions | Automatizar deploy |
| Otimização imagens | intervention/image |
| Filtro stack em `/projetos` | Fase 2 |
| Google Analytics | Fora da v1 |
| reCAPTCHA | Só se honeypot insuficiente |

## 🔧 Ajustar na geração (código)

| Item | Ação |
|------|------|
| `portfolio-data.md` linha Portfólio | Atualizar URL para `maiconoliveiradev.com.br` |
| Apps `apps/web`, `apps/api` | Ainda não existem — **gerar scaffold** |
| README raiz | Criar na geração |

## Veredito

**Documentação completa para gerar o monorepo.** Nenhum bloqueio pendente.

Única decisão opcional restante: **nome do repositório GitHub**.
