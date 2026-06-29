# Project Memory

## Nome do projeto

Portfólio com painel administrativo

## Objetivo

Criar um portfólio online com **painel administrativo** para gerenciar:

- Projetos publicados no site
- Partes editáveis do conteúdo da página pública (seções configuráveis pelo admin)

## Escopo

- **Site público** (Vercel / Next.js): apresentação profissional, listagem de projetos, conteúdo vindo da API
- **Laravel na Hostinger**: API REST + painel admin (projetos e conteúdo editável)
- **MySQL** no hPanel Hostinger
- Fonte inicial de dados: `portfolio-data.md` (bootstrap / seed)

## Arquitetura

```
Vercel (Next.js)  →  API Laravel (Hostinger)  →  MySQL (Hostinger)
                         ↳ Admin (Inertia + React)
```

## Fontes de verdade

- `portfolio-data.md` — seed inicial do banco (deploy)
- `.cursor/context/`
- `.cursor/docs/`

## Status atual

- Documentação `.cursor` completa — ver `docs/readiness-checklist.md`
- Domínios: `maiconoliveiradev.com.br` / `admin.maiconoliveiradev.com.br`
- **Próximo passo:** gerar scaffold `apps/web` + `apps/api`
