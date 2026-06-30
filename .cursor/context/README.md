# Contexto do projeto

> Contexto persistente para o agente: domínio, público-alvo, tom, restrições e fontes de verdade.

**Status (2026-06-30):** MVP funcional em desenvolvimento local. Ver [readiness-checklist.md](../docs/readiness-checklist.md).

## Produto

Portfólio profissional com **painel administrativo**:

| Área | Função | Status |
|------|--------|--------|
| Site público | Apresentação, listagem de projetos, conteúdo editável | ✅ 5 rotas PT/EN |
| Painel admin | Gerenciar 8 módulos | ✅ CRUD completo |

## Hospedagem

- **Plano:** Hostinger Premium Web Hosting
- **Limitações:** sem Node.js/Next.js gerenciado; sem PostgreSQL nativo
- Detalhes: [hosting.md](../docs/hosting.md)

## Stack (produção)

| Camada | Tecnologia | Hospedagem |
|--------|------------|------------|
| Site público | **Next.js 15** | **Vercel** |
| API + painel admin | **Laravel 12** | **Hostinger Premium** |
| Banco de dados | **MySQL 8** | **Hostinger** (hPanel) |
| ORM (Laravel) | **Eloquent** | — |
| Admin UI | **Inertia.js + React** | Hostinger (`apps/api`) |
| Tipos compartilhados | **`@portfolio/types`** | Monorepo |

## Domínios

| Subdomínio / rota | Destino |
|-------------------|---------|
| `maiconoliveiradev.com.br` (+ `www`) | Vercel (site público Next.js) |
| `admin.maiconoliveiradev.com.br` | Hostinger (Laravel API + painel admin) |

## Design (site público)

- **Dark minimalista** com acentos **laranja**
- Tailwind CSS + componentes custom (shadcn/ui planejado, não instalado)
- Páginas: home, projetos, projeto/[slug], sobre, contato — ver [site-pages.md](../docs/site-pages.md)
- Detalhes visuais: [design-system.md](../docs/design-system.md)

## Fonte de conteúdo

`portfolio-data.md` — perfil, experiências, projetos e métricas confirmadas (**não fabricar dados**).

## Dev local

```bash
docker compose up -d --build
```

| Serviço | URL |
|---------|-----|
| Site | http://localhost:3000/pt |
| Admin | http://localhost:8000/login |
| API | http://localhost:8000/api/v1/profile |
