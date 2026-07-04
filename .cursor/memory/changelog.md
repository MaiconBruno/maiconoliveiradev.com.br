# Changelog

Histórico de mudanças relevantes no projeto e na documentação `.cursor`.

## Formato

- `YYYY-MM-DD` — descrição breve do que mudou

## Entradas

### 2026-07-03

- **MVP em produção** — site na Vercel, API/admin na Hostinger com DNS configurado
- Formulário de contato com e-mail SMTP, reCAPTCHA e honeypot
- `sitemap.ts` e `robots.ts` no Next.js; Vercel Analytics integrado
- Documentação `.cursor/` revisada (memory, tasks, workflows, readiness-checklist)
- `design-system.md` — linguagem neutra (sem referências a recrutador)
- Pendências atualizadas: polish web (`html lang`, nav ativa), EN no seed, testes
- Deploy contínuo documentado: Vercel (web) + Hostinger Git (api); GitHub Actions opcional

### 2026-06-30

- **Documentação revisada** — status atual alinhado ao código em todos os `.md`
- **MVP ~85–90%:** API v1, admin 8 módulos, site 5 rotas, `packages/types`, Docker
- Campo `progressao` em experiências (sub-cargos na timeline)
- Campo `galeria` em projetos (capa + mídia image/video)
- `PortfolioDataSeeder` implementado (dados espelhando `portfolio-data.md`)
- Workflows de deploy Hostinger (`deploy-hostinger.sh`, `deploy-producao.md`)
- Pendências documentadas: e-mail contato, sitemap, CI/CD, polish web

### 2026-06-28

- Estrutura inicial `.cursor/` criada (skills, workflows, docs, context, examples, memory)
- Objetivo definido: portfólio com painel admin para projetos e conteúdo editável
- Stack definida: Next.js, PostgreSQL, Prisma, Laravel
- Plano de hospedagem: Hostinger Premium (restrições documentadas em `docs/hosting.md`)
- Arquitetura definida: Next.js (Vercel) + Laravel API/Admin + MySQL (Hostinger)
- Monorepo: `apps/web` + `apps/api` (ver `docs/monorepo.md`)
- Admin: Laravel + Inertia.js + React (ver `docs/admin-panel.md`)
- Módulos admin: projetos, hero, experiências, skills, contato, SEO (ver `docs/content-models.md`)
- Design site público: dark minimalista + acentos laranja (ver `docs/design-system.md`)
- Páginas públicas: 5 rotas; home com hero, projetos, 3 experiências, redes sociais (ver `docs/site-pages.md`)
- Contato: formulário (POST API + SMTP) + links diretos
- Auth admin: Laravel Breeze, e-mail + senha, usuário único (ver `docs/admin-panel.md`)
- Revisão completa das instruções; api-conventions, local-dev, rule, skill generate-portfolio
- **Scaffold gerado:** apps/api (Laravel 12) + apps/web (Next.js 15); build Next OK
- Seed: importar `portfolio-data.md` no primeiro deploy (ver `docs/seed.md`)
- Mídia: `storage/app/public` no Laravel (ver `docs/storage.md`)
- Animações: sutis com Framer Motion no site; admin sem motion scroll (ver `docs/design-system.md`)
- Design: dark + laranja unificado site + admin; regra 15% accent
