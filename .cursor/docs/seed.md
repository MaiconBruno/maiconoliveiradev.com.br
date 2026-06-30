# Seed — Bootstrap de conteúdo

## Decisão

No **primeiro deploy**, popular o MySQL automaticamente a partir de **`portfolio-data.md`** (fonte mestre na raiz do monorepo).

| Item | Valor |
|------|-------|
| Fonte | `portfolio-data.md` |
| Quando | Deploy inicial / `php artisan db:seed` |
| Idioma inicial | PT-BR preenchido; EN vazio ou gerado depois no admin |
| Regra | **Não fabricar** métricas, projetos ou fatos ausentes no arquivo |

---

## O que o seeder importa

| Módulo | Origem em `portfolio-data.md` |
|--------|-------------------------------|
| Hero / Sobre | Identidade, resumo profissional, contato |
| Projetos | Seção "Projetos (cards para portfólio)" |
| Experiências | Seção "Experiência profissional" |
| Skills | "Competências técnicas" |
| Contato | Tabela de contato + redes |
| SEO | Defaults por rota (`/pt`, `/en`, …) |
| Formação + certificações | Seções em `portfolio-data.md` |
| Admin | Usuário via `ADMIN_*` do `.env` |

---

## Comandos

```bash
cd apps/api
php artisan migrate --force
php artisan db:seed --force
```

Ou seeder dedicado:

```bash
php artisan db:seed --class=PortfolioDataSeeder
```

### Deploy Hostinger (primeira vez)

1. `migrate --force`
2. `db:seed --force` — importa `portfolio-data.md`
3. `storage:link` — uploads públicos

> Seeder deve ser **idempotente** ou usar flag `PORTFOLIO_SEED_ON_DEPLOY=true` apenas na primeira execução.

---

## Implementação

```
apps/api/database/seeders/
├── DatabaseSeeder.php           # AdminUserSeeder + PortfolioDataSeeder
├── AdminUserSeeder.php          # ADMIN_* do .env
└── PortfolioDataSeeder.php      # dados hardcoded espelhando portfolio-data.md
```

### Comportamento atual

- Dados espelham `portfolio-data.md` (hardcoded no seeder, não parser markdown dinâmico)
- Campos bilíngues: `{ "pt": "...", "en": null }` — EN via DeepL no admin
- Docker entrypoint: seed **somente se** `Project::count() === 0` (não sobrescreve edições)
- Flag deploy: `PORTFOLIO_SEED_ON_DEPLOY=true` no primeiro deploy Hostinger

---

## Pós-seed

- Admin pode editar, traduzir (Gerar EN) e publicar/despublicar
- Re-rodar seed em produção: **não sobrescrever** edições manuais (usar `firstOrCreate` por slug ou comando `portfolio:import --fresh` só em dev)

---

## Status

- [x] Decisão: seed automático no primeiro deploy
- [x] `PortfolioDataSeeder` implementado (dados hardcoded)
- [x] `AdminUserSeeder` via `ADMIN_*` do `.env`
- [x] Idempotência no Docker (só seed se banco vazio)
- [ ] Parser markdown dinâmico → models (opcional)
- [ ] Testes do seeder
