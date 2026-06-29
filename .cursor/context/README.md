# Contexto do projeto

> Contexto persistente para o agente: domínio, público-alvo, tom, restrições e fontes de verdade.

## Produto

Portfólio profissional com **painel administrativo**:

| Área | Função |
|------|--------|
| Site público | Apresentação, listagem de projetos, conteúdo editável |
| Painel admin | Gerenciar 8 módulos (projetos, hero, exp., skills, contato, SEO, formação, cert.) |

## Hospedagem

- **Plano:** Hostinger Premium Web Hosting
- **Limitações:** sem Node.js/Next.js gerenciado; sem PostgreSQL nativo
- Detalhes: [hosting.md](../docs/hosting.md)

## Stack (produção)

| Camada | Tecnologia | Hospedagem |
|--------|------------|------------|
| Site público | **Next.js** | **Vercel** |
| API + painel admin | **Laravel** | **Hostinger Premium** |
| Banco de dados | **MySQL** | **Hostinger** (hPanel) |
| ORM (Laravel) | **Eloquent** | — |
| Admin UI | **Inertia.js + React** | Hostinger (`apps/api`) |

## Domínios (planejado)

| Subdomínio / rota | Destino |
|-------------------|---------|
| `maiconoliveiradev.com.br` (+ `www`) | Vercel (site público Next.js) |
| `admin.maiconoliveiradev.com.br` | Hostinger (Laravel API + painel admin) |

## Design (site público)

- **Dark minimalista** com acentos **laranja**
- Tailwind CSS + shadcn/ui
- Páginas: home, projetos, projeto/[slug], sobre, contato — ver [site-pages.md](../docs/site-pages.md)
- Detalhes visuais: [design-system.md](../docs/design-system.md)

`portfolio-data.md` — perfil, experiências, projetos e métricas confirmadas (não fabricar dados).
