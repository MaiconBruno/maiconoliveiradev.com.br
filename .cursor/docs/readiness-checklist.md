# Checklist de prontidão — status do projeto

Última revisão: **2026-07-03**

## Veredito

**MVP em produção.** Site (`maiconoliveiradev.com.br`), API e painel admin (`admin.maiconoliveiradev.com.br`) publicados na Vercel e Hostinger. Deploy contínuo: **Vercel** (push no repo → build + deploy do `apps/web`) e **Hostinger** (deploy via Git do `apps/api`). Pendências concentradas em polish do site, traduções EN no seed e testes automatizados.

### URLs de produção

| Serviço | URL |
|---------|-----|
| Site (PT/EN) | https://maiconoliveiradev.com.br |
| API REST | https://admin.maiconoliveiradev.com.br/api/v1 |
| Painel admin | https://admin.maiconoliveiradev.com.br/login |

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
| Formulário de contato | ✅ Implementado | E-mail via SMTP + reCAPTCHA + honeypot |
| i18n PT/EN | ⚠️ ~90% | Falta `html lang` dinâmico |
| SEO por página | ⚠️ ~90% | Metadata + JSON-LD + `sitemap.ts` + `robots.ts` |
| Design system | ⚠️ ~75% | Dark + laranja ok; shadcn/ui não instalado |
| Seed `portfolio-data.md` | ✅ Implementado | Dados hardcoded no seeder; só PT |
| Docker local | ✅ Funcional | `docker compose up -d --build` |
| Deploy produção | ✅ Publicado | Vercel + Hostinger com DNS configurado |
| Deploy contínuo | ✅ Ativo | Vercel (auto) + Hostinger (Git) |
| Vercel Analytics | ✅ Implementado | `@vercel/analytics` no layout raiz |
| GitHub Actions (lint/test) | ❓ Opcional | Vercel já faz build; task 16 só para checks em PR |
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
| Deploy produção | `workflows/deploy-producao.md` | Vercel + Hostinger em produção |
| Deploy contínuo | — | Vercel (push → deploy web) + Hostinger (Git → API/admin) |
| E-mail contato | — | `ContactFormSubmitted` + `MAIL_*` |
| Sitemap / robots | — | `app/sitemap.ts`, `app/robots.ts` |
| reCAPTCHA contato | — | `ValidRecaptcha` + `RecaptchaCheckbox` |

---

## ⚠️ Parcial — polish v1

| Item | Situação | Próximo passo |
|------|----------|---------------|
| Reordenação admin | Campo `ordem` numérico | Drag-and-drop (opcional) |
| API skills | Omite `nivel` na resposta | Incluir no `SkillController` |
| URLs mídia projetos | Paths relativos na API | Resolver como em `ProfileController` |
| Home queries | `slice` no client | Usar `?limit=3` e filtro `destaque` na API |
| Seção redes na home | Links no hero + `ContactBand` | Seção dedicada (opcional) |
| Nav ativa no header | Não implementado | Task 13 |
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
| GitHub Actions (lint/test em PR) | Task 16 — opcional; deploy já coberto por Vercel + Hostinger |
| Otimização imagens | intervention/image |
| Filtro stack em `/projetos` | Fase 2 |
| Google Analytics | Vercel Analytics já cobre métricas básicas |
| `packages/ui-tokens` | Tokens CSS compartilhados |

---

## 🔧 Próximos passos recomendados

1. **Polish web** — `html lang` dinâmico e nav ativa no header (task 13)
2. **Gerar EN** — DeepL no admin para conteúdo bilíngue completo
3. **Testes API** — cobertura mínima dos endpoints públicos
4. **API skills** — expor `nivel` na resposta pública

---

## Tasks de agentes

Ver mapa de conclusão em [tasks/README.md](../tasks/README.md).
