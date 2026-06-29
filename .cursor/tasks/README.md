# Tasks para agentes paralelos

Cada arquivo `NN-*.md` é um prompt **autocontido** para um agente Cursor executar uma feature restante do portfólio.

## Como usar

1. Abra um chat/agente novo por task
2. Cole o conteúdo completo do arquivo `.md` como prompt inicial
3. O agente deve ler os docs listados em **Leitura obrigatória** antes de codar
4. Testar com `docker compose up -d` (site `:3000`, admin `:8000`)

## Ordem sugerida

| Onda | Tasks | Paralelo |
|------|-------|----------|
| 1 | `10`, `01`, `14`, `11`, `12` | Sim |
| 2 | `02`–`08` | Sim (após `01` ou em paralelo se seguir padrão do Bloco 1) |
| 3 | `09`, `13` | Após forms dos módulos |
| 4 | `15` | Após MVP estável |
| 5 | `16` | Opcional, após deploy |

## Credenciais locais

- Admin: http://localhost:8000/login — `devmaiconrodrigues@gmail.com` / `admin123456`
- Site: http://localhost:3000/pt

## Mapa de dependências

```
10-upload ──┬──► 01-projects ──┬──► 02–08 (módulos admin)
            │                  ├──► 11-shell
            │                  └──► 09-i18n-ui
            └──► 13-web-polish

06-admin-seo ──► 12-web-seo

14-types (independente)

09 + 12 + 13 ──► 15-deploy ──► 16-ci-cd
```
