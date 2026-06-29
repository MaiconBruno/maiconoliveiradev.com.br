# Painel administrativo

## Stack do admin

| Camada | Tecnologia |
|--------|------------|
| Backend | Laravel (`apps/api`) |
| Frontend admin | **React** via **Inertia.js** |
| Build | Vite (incluso no Laravel) |
| Estilo | **Dark + laranja** — mesmo design system do site ([design-system.md](design-system.md)) |
| Auth | **Laravel Breeze** — e-mail + senha, **usuário admin único** |

## Divisão de rotas no Laravel

```
apps/api/
├── routes/
│   ├── web.php          # Admin: Inertia + React (/admin, login, CRUD)
│   └── api.php          # API pública JSON para Next.js (Vercel)
└── resources/js/
    ├── Pages/Admin/     # Páginas React do painel
    └── Components/
```

| Área | Protocolo | Consumidor |
|------|-----------|------------|
| `/admin/*` | Inertia (HTML + props JSON) | Browser — painel React |
| `/api/v1/*` | REST JSON | Next.js (Vercel) |

## O que o admin gerencia

**Todos os módulos** — detalhes em [content-models.md](content-models.md):

1. **Projetos** — CRUD, publicar/despublicar, imagens, stack, métricas  
2. **Hero / Sobre** — headline, bio, foto, CTAs  
3. **Experiências** — empresas, cargos, períodos, métricas  
4. **Skills** — tags e categorias  
5. **Contato e redes** — e-mail, LinkedIn, GitHub, etc.  
6. **SEO** — title, description, OG image por página  
7. **Formação acadêmica**  
8. **Certificações**  

### Campos bilíngues (PT-BR / EN)

- Cada campo traduzível: **tabs PT-BR | EN**
- Botão geral **Gerar EN** → DeepL API Free (traduz do PT-BR)
- EN **editável** após geração automática
- Detalhes: [i18n.md](i18n.md)

## Autenticação

| Item | Escolha |
|------|---------|
| Método | E-mail + senha |
| Pacote | **Laravel Breeze** (stack React/Inertia) |
| Usuários | **Único admin** (sem multi-tenant) |
| Rotas protegidas | `/admin/*` — middleware `auth` |
| Registro público | **Desabilitado** — seed do usuário admin no deploy |

### Bootstrap

- Usuário criado via seeder ou comando artisan no primeiro deploy
- Credenciais em `.env` ou definidas manualmente após seed

Mesmo deploy Hostinger que a API — Inertia serve o React compilado pelo Vite; não precisa de app Node separado no Premium.
