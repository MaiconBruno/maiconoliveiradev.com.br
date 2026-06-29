# Changelog

Histórico de mudanças relevantes no projeto e na documentação `.cursor`.

## Formato

- `YYYY-MM-DD` — descrição breve do que mudou

## Entradas

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
