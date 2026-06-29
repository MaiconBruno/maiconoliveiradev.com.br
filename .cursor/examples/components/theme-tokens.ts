/**
 * Tokens compartilhados — importar em tailwind.config de apps/web e apps/api
 * @see .cursor/docs/design-system.md
 */
export const portfolioTheme = {
  colors: {
    background: '#09090b',
    'background-elevated': '#18181b',
    'background-muted': '#27272a',
    foreground: '#fafafa',
    'foreground-muted': '#a1a1aa',
    border: '#27272a',
    accent: {
      DEFAULT: '#f97316',
      hover: '#ea580c',
      soft: '#fb923c',
      muted: 'rgba(249, 115, 22, 0.12)',
      glow: 'rgba(249, 115, 22, 0.25)',
    },
  },
  borderRadius: {
    DEFAULT: '0.5rem',
    lg: '0.75rem',
  },
  boxShadow: {
    glow: '0 0 24px rgba(249, 115, 22, 0.25)',
  },
};
