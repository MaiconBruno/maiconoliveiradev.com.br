# Checklist de prontidão — status do projeto

Última revisão: **2026-06-30**

## Veredito

**MVP funcional em desenvolvimento local.** Monorepo gerado, API v1, painel admin (8 módulos), site público (5 rotas) e `packages/types` implementados. Pendências concentradas em polish do site, envio de e-mail no contato, deploy produção e CI/CD.

---

## Status por área

| Área | Status | Notas |
|------|--------|-------|
| Documentação `.cursor/` | ✅ Completa | Esta revisão alinha docs ao código |
| Scaffold `apps/web` + `apps/api` | ✅ Gerado | Next.js 15 + Laravel 12 |
| `packages/types` | ✅ Implementado | Consumido em ~20 arquivos do web |
| API REST `/api/v1/*` | ✅ 10 endpoints | Cache 5 min, CORS, honeypot |
| Painel admin (8 módulos) | ✅ CRUD completo | Inertia + React, tabs PT/EN, DeepL |
| Upload de mídia | ✅ Implementado | 5 MB, jpeg/png/webp, galeria image/video |
| Site público (5 rotas) | ✅ Implementado | Home, projetos, case, sobre, contato |
| i18n PT/EN | ⚠️ ~90% | Falta `html lang` dinâmico |
| SEO por página | ⚠️ ~80% | Metadata + JSON-LD; sem sitemap/robots |
| Design system | ⚠️ ~75% | Dark + laranja ok; shadcn/ui não instalado |
| Seed `portfolio-data.md` | ✅ Implementado | Dados hardcoded no seeder; só PT |
| Docker local | ✅ Funcional | `docker compose up -d --build` |
| Deploy produção | 🔄 Em andamento | Workflows prontos; DNS/Vercel pendentes |
| CI/CD GitHub Actions | ❌ Pendente | Task 16 |
| Testes automatizados | ❌ Pendente | Só `ExampleTest.php` |

---

## ✅ Definido e implementado

| Área | Documento | Código |
|------|-----------|--------|
| Objetivo, escopo, arquitetura | `memory/project.md`, `decisions.md` | — |
| Domínios | `docs/hosting.md` | `.env.example` |
| Stack + versões | `skills/stack/instructions.md` | `composer.json`, `package.json` |
| Monorepo + env | `docs/monorepo.md` | `apps/*`, `packages/types` |
| 8 módulos admin | `docs/content-models.md`, `admin-panel.md` | `Admin/*` controllers + pages |
| Páginas + home | `docs/site-pages.md` | `app/[locale]/*` |
| i18n PT/EN + DeepL | `docs/i18n.md` | `next-intl`, `DeepLTranslationService` |
| Design dark + laranja | `docs/design-system.md` | Tailwind + tokens parciais |
| API REST v1 | `docs/api-conventions.md` | `routes/api.php` |
| Auth admin único | `docs/admin-panel.md` | Login Breeze-style (sem pacote) |
| Seed | `docs/seed.md` | `PortfolioDataSeeder` |
| Storage local | `docs/storage.md` | `ImageUploadService` |
| Dev local Docker | `workflows/local-dev.md` | `docker-compose.yml` |
| Deploy Hostinger | `workflows/deploy-hostinger.md` | `scripts/deploy-hostinger.sh` |
| Deploy produção | `workflows/deploy-producao.md` | — |

---

## ⚠️ Parcial — polish v1

| Item | Situação | Próximo passo |
|------|----------|---------------|
| POST `/contact` | Valida + loga; **não envia e-mail** | Configurar `MAIL_*` + Mailable |
| Reordenação admin | Campo `ordem` numérico | Drag-and-drop (opcional) |
| API skills | Omite `nivel` na resposta | Incluir no `SkillController` |
| URLs mídia projetos | Paths relativos na API | Resolver como em `ProfileController` |
| Home queries | `slice` no client | Usar `?limit=3` e filtro `destaque` na API |
| Seção redes na home | Links no hero + `ContactBand` | Seção dedicada (opcional) |
| Nav ativa no header | Não implementado | Task 13 |
| `sitemap.xml` / `robots.txt` | Ausentes | Task 12 |
| `html lang` por locale | Fixo `pt` no root layout | Task 13 |
| shadcn/ui | Não instalado | Opcional v1 |
| Rotas `show` órfãs | 3 resources admin | Remover ou implementar |
| Invalidação cache admin | Ausente | Opcional |
| Traduções EN no seed | Só PT preenchido | Gerar EN via DeepL no admin |

---

## Campos extras (além da spec original)

| Campo | Modelo | Descrição |
|-------|--------|-----------|
| `progressao` | `Experience` | Sub-cargos dentro de uma experiência (JSON) |
| `galeria` | `Project` | Capa + mídia image/video (substitui/evolui `imagens`) |

Documentados em `content-models.md` e `decisions.md`.

---

## ❓ Opcional (pós-MVP)

| Item | Nota |
|------|------|
| CI/CD GitHub Actions | Task 16 |
| Otimização imagens | intervention/image |
| Filtro stack em `/projetos` | Fase 2 |
| Google Analytics | Fora da v1 |
| reCAPTCHA | Só se honeypot insuficiente |
| `packages/ui-tokens` | Tokens CSS compartilhados |

---

## 🔧 Próximos passos recomendados

1. **Deploy produção** — DNS, Vercel, Hostinger com `deploy-hostinger.sh` (task 15)
2. **E-mail contato** — SMTP Hostinger + Mailable no `ContactController`
3. **Polish web** — `lang` dinâmico, nav ativa, sitemap (tasks 12–13)
4. **Gerar EN** — DeepL no admin após deploy
5. **CI** — lint + build no GitHub Actions (task 16)

---

## Tasks de agentes

Ver mapa de conclusão em [tasks/README.md](../tasks/README.md).
