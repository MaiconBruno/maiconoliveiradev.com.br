# Design system — Dark + Laranja

Identidade visual unificada: **site público** (Next.js) e **painel admin** (Inertia + React).

## Princípio (psicologia das cores + UX)

| Objetivo | Como aplicar |
|----------|--------------|
| Chamar atenção do recrutador | Hierarquia clara + **laranja só em pontos de ação** (CTA, métricas, links ativos) |
| Transmitir senioridade tech | Fundo **dark** limpo, tipografia forte, pouco ruído |
| Memorável sem amadorismo | Laranja em **~10–15%** da UI — nunca fundos grandes laranja |
| Confiança | Contraste AA, consistência de tokens entre site e admin |

---

## Tokens (compartilhados)

Usar em `apps/web` e `apps/api` (Tailwind `theme.extend` ou CSS variables).

```css
:root {
  /* Superfícies */
  --background:        #09090b;   /* zinc-950 */
  --background-elevated: #18181b;   /* zinc-900 — cards, sidebar */
  --background-muted:    #27272a;   /* zinc-800 — inputs, hover */

  /* Texto */
  --foreground:          #fafafa;   /* zinc-50 */
  --foreground-muted:    #a1a1aa;   /* zinc-400 */
  --foreground-subtle:   #71717a;   /* zinc-500 */

  /* Bordas */
  --border:              #27272a;
  --border-focus:        #f97316;

  /* Accent — laranja */
  --accent:              #f97316;   /* orange-500 — CTAs, ícones ativos */
  --accent-hover:        #ea580c;   /* orange-600 */
  --accent-soft:         #fb923c;   /* orange-400 — texto pequeno, links */
  --accent-muted:        rgba(249, 115, 22, 0.12);
  --accent-glow:         rgba(249, 115, 22, 0.25);

  /* Semânticas */
  --success:             #22c55e;
  --warning:             #eab308;
  --destructive:         #ef4444;

  /* Raios e sombras */
  --radius:              0.5rem;
  --radius-lg:           0.75rem;
  --shadow-glow:         0 0 24px var(--accent-glow);
}
```

### Tailwind mapping

| Token | Classe Tailwind |
|-------|-----------------|
| Fundo página | `bg-zinc-950` |
| Card | `bg-zinc-900 border border-zinc-800` |
| CTA primário | `bg-orange-500 hover:bg-orange-600 text-white` |
| CTA secundário | `border border-zinc-700 hover:border-orange-500/50` |
| Link | `text-orange-400 hover:text-orange-300` |
| Badge stack | `bg-orange-500/10 text-orange-400 border-orange-500/20` |
| Focus ring | `ring-2 ring-orange-500 ring-offset-2 ring-offset-zinc-950` |

---

## Regra dos 15% (laranja)

**Usar laranja em:**
- Botões primários (Contato, Ver projetos, Salvar, Publicar)
- Links e item de nav ativo
- Métricas em destaque (número ou borda esquerda)
- Toggle PT/EN ativo
- Ícones de ação no admin
- Focus states e tab ativa (PT-BR / EN)
- Linha/gradiente sutil no hero (`h-1 w-24 bg-gradient-to-r from-orange-500 to-orange-600`)

**Não usar laranja em:**
- Fundos de seção inteira
- Parágrafos longos de corpo
- Mais de um CTA primário competindo na mesma dobra

---

## Tipografia

| Uso | Fonte | Peso |
|-----|-------|------|
| Display / H1 | **Geist** ou **Inter** | 700 |
| H2–H3 | Geist / Inter | 600 |
| Body | Geist / Inter | 400–500 |
| Stack / código | **Geist Mono** ou JetBrains Mono | 400 |

- `letter-spacing`: levemente negativo em headlines grandes (`-0.02em`)
- Line-height generoso no body (`1.6–1.75`) — leitura rápida para recrutador

---

## Site público (`apps/web`)

### Layout

| Área | Tratamento |
|------|------------|
| **Navbar** | `bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50` — fixa |
| **Hero** | Headline branca + sublinhado/ barra laranja + CTA primário laranja |
| **Seções** | Espaçamento generoso (`py-20–24`); títulos com `text-zinc-50` |
| **Cards projeto** | `bg-zinc-900` + hover: `border-orange-500/30 shadow-glow` + scale `1.02` |
| **Experiências** | Timeline com ponto/linha laranja; 3 cards na home |
| **Skills** | Pills `accent-muted` |
| **Redes sociais** | Ícones zinc-400 → hover laranja |
| **Footer** | `bg-zinc-950 border-t border-zinc-800` |

### Animações (Framer Motion)

- Fade-in + `y: 24 → 0` ao scroll (`viewport: { once: true }`)
- Stagger em grids (`0.08s` entre itens)
- Hover: transição `200ms` — sem bounce
- **`prefers-reduced-motion`**: `animate` desligado

### UI kit

**Tailwind CSS** + **shadcn/ui** (tema dark customizado com tokens acima)

---

## Painel admin (`apps/api`)

Mesma marca, **menos ornamentação** — foco em formulários e tabelas.

| Área | Tratamento |
|------|------------|
| **Login** | Card central `bg-zinc-900`; logo/nome com accent laranja |
| **Sidebar** | `bg-zinc-950` · item ativo: `bg-orange-500/10 text-orange-400 border-l-2 border-orange-500` |
| **Header** | `bg-zinc-900/50` · botão **Gerar EN** em laranja outline |
| **Forms** | Inputs `bg-zinc-800 border-zinc-700` · focus `border-orange-500` |
| **Tabs PT-BR / EN** | Tab ativa: underline/borda laranja |
| **Tabelas** | Zebrado sutil `hover:bg-zinc-800/50` · status publicado: badge verde; rascunho: zinc |
| **Botão Salvar** | Primário laranja · Destructive vermelho |

**Sem** animações de scroll no admin — só transições CSS `150ms`.

---

## Componentes compartilhados (opcional)

Monorepo: `packages/ui-tokens/` com `tailwind.preset.js` exportando cores e fontes para web e api.

---

## Acessibilidade

- Texto principal sobre `zinc-950`: `#fafafa` (AA)
- Laranja em texto `< 18px`: usar `orange-400` (`#fb923c`)
- Botão primário laranja: texto **branco**, não preto
- Focus visível em todos os interativos
- `prefers-reduced-motion` respeitado no site

---

## Referência rápida — impacto no recrutador

```
[ Hero — nome + headline + barra laranja + CTA laranja ]  ← 3s de atenção
[ Projetos — cards dark, hover glow, métricas em laranja ]
[ 3 experiências — linha temporal laranja ]
[ Skills — pills discretas ]
[ Redes + Contato — CTA final laranja ]
```

O olhar segue: **nome → CTA → projetos → prova social (métricas)** — laranja marca cada parada.
