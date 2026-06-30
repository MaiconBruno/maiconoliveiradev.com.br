# Task 11 — Admin: Shell e navegação

**ID do agente:** `admin-shell`  
**Status:** ✅ Concluída (2026-06-30)  
**Depende de:** Rotas dos módulos (pode criar links antes das páginas existirem)

---

## Objetivo

Completar o **layout do painel**: menu dos 8 módulos, logout, flash messages e dashboard útil.

## Leitura obrigatória

- `.cursor/tasks/00-contexto-compartilhado.md`
- `.cursor/docs/admin-panel.md`
- `.cursor/docs/design-system.md`

## Escopo

### AdminLayout
- Menu lateral ou topo com links:
  1. Dashboard
  2. Projetos
  3. Hero / Sobre
  4. Experiências
  5. Skills
  6. Contato
  7. SEO
  8. Formação
  9. Certificações
- Link ativo por rota atual
- Botão **Sair** (POST logout)
- Design dark + laranja consistente

### Dashboard
- Remover texto "Painel em construção"
- Cards com contagem real: projetos, experiências, skills, etc.
- Atalhos para criar/editar

### Flash messages
- Componente para `success` / `error` do Inertia session

## Arquivos principais

```
apps/api/resources/js/Layout/AdminLayout.tsx
apps/api/resources/js/Pages/Admin/Dashboard.tsx
apps/api/resources/js/Components/FlashMessage.tsx     (criar)
apps/api/app/Http/Controllers/Admin/DashboardController.php
```

## Não mexer em

- Lógica CRUD dos módulos (só navegação e dashboard)

## Teste

```bash
# Navegar entre todos os links do menu após módulos implementados
# Logout redireciona para /login
```

## Critério de pronto

- [ ] Menu com 8 módulos + dashboard
- [ ] Logout funcional
- [ ] Dashboard com métricas reais do banco
- [ ] Flash messages visíveis após CRUD
