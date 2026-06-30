import type { Experience, Progressao } from '@portfolio/types';

const MONTHS: Record<'pt' | 'en', string[]> = {
  pt: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

function resolveLocale(locale: string): 'pt' | 'en' {
  return locale === 'en' ? 'en' : 'pt';
}

export function isCurrentExperience(exp: Pick<Experience, 'periodo_fim'>): boolean {
  return !exp.periodo_fim;
}

export function formatExperienceMonth(value: string, locale: string): string | null {
  const match = value.match(/^(\d{4})-(\d{2})$/);
  if (!match) return value;

  const month = Number(match[2]);
  if (month < 1 || month > 12) return value;

  const lang = resolveLocale(locale);
  const months = MONTHS[lang];
  const separator = lang === 'pt' ? '/' : ' ';

  return `${months[month - 1]}${separator}${match[1]}`;
}

export type ExperiencePeriod = {
  display: string;
  isCurrent: boolean;
  startIso?: string;
  endIso?: string;
  startLabel?: string;
  endLabel?: string;
};

export function formatExperiencePeriod(
  exp: Pick<Experience, 'periodo_inicio' | 'periodo_fim'>,
  locale: string,
  presentLabel: string
): ExperiencePeriod | null {
  if (!exp.periodo_inicio) return null;

  const isCurrent = isCurrentExperience(exp);
  const startLabel = formatExperienceMonth(exp.periodo_inicio, locale) ?? exp.periodo_inicio;
  const endLabel = isCurrent
    ? presentLabel
    : (formatExperienceMonth(exp.periodo_fim!, locale) ?? exp.periodo_fim!);

  return {
    display: `${startLabel} — ${endLabel}`,
    isCurrent,
    startIso: exp.periodo_inicio,
    endIso: isCurrent ? undefined : exp.periodo_fim ?? undefined,
    startLabel,
    endLabel,
  };
}

export function formatEngagement(
  modelo: string | undefined,
  tipo: string | undefined,
  labels: { remote: string; onsite: string; hybrid: string }
): string | null {
  const parts: string[] = [];

  if (modelo) {
    const normalized = modelo.toLowerCase();
    if (normalized === 'remoto') parts.push(labels.remote);
    else if (normalized === 'presencial') parts.push(labels.onsite);
    else if (normalized === 'hibrido' || normalized === 'híbrido') parts.push(labels.hybrid);
    else parts.push(modelo.charAt(0).toUpperCase() + modelo.slice(1));
  }

  if (tipo) {
    parts.push(tipo === tipo.toUpperCase() ? tipo : tipo.charAt(0).toUpperCase() + tipo.slice(1));
  }

  return parts.length > 0 ? parts.join(' · ') : null;
}

function progressaoSortKey(step: Pick<Progressao, 'periodo_inicio' | 'periodo_fim'>): string {
  return step.periodo_fim ?? step.periodo_inicio ?? '';
}

export function sortProgressaoOldestFirst(steps: Progressao[]): Progressao[] {
  return [...steps].sort((a, b) => {
    const byStart = (a.periodo_inicio ?? '').localeCompare(b.periodo_inicio ?? '');
    if (byStart !== 0) return byStart;
    return progressaoSortKey(a).localeCompare(progressaoSortKey(b));
  });
}

export function sortProgressaoNewestFirst(steps: Progressao[]): Progressao[] {
  return sortProgressaoOldestFirst(steps).reverse();
}

export function getProgressaoStepNumber(
  step: Progressao,
  steps: Progressao[]
): number {
  const chronological = sortProgressaoOldestFirst(steps);
  const index = chronological.findIndex(
    (item) =>
      item.cargo === step.cargo &&
      item.periodo_inicio === step.periodo_inicio &&
      item.periodo_fim === step.periodo_fim
  );

  return index >= 0 ? index + 1 : 1;
}
