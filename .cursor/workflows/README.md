# Workflows

> Fluxos operacionais do projeto (desenvolvimento, deploy, produção).

| Workflow | Quando usar | Status |
|----------|-------------|--------|
| [local-dev.md](local-dev.md) | Desenvolvimento local com Docker | ✅ Testado |
| [deploy-initial.md](deploy-initial.md) | Primeiro deploy Vercel + Hostinger | ✅ Concluído |
| [deploy-hostinger.md](deploy-hostinger.md) | API + admin na Hostinger (detalhado) | ✅ Script pronto |
| [deploy-producao.md](deploy-producao.md) | Deploy contínuo na `main` | ✅ Vercel + Hostinger Git |

## Ordem recomendada

1. **Local** — `docker compose up -d --build` ([local-dev.md](local-dev.md))
2. **Hostinger** — MySQL, Git, `.env` persistente ([deploy-hostinger.md](deploy-hostinger.md))
3. **Vercel** — site Next.js ([deploy-initial.md](deploy-initial.md))
4. **Produção** — push na `main`: Vercel deploya o web; Hostinger puxa o api via Git ([deploy-producao.md](deploy-producao.md))
