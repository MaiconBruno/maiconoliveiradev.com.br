import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';
import { ExperienceProgression } from '@/components/experience/ExperienceProgression';
import {
  formatEngagement,
  formatExperiencePeriod,
  isCurrentExperience,
} from '@/lib/experience-format';
import type { Experience, Metrica } from '@portfolio/types';

function LogPeriod({
  exp,
  locale,
  presentLabel,
}: {
  exp: Experience;
  locale: string;
  presentLabel: string;
}) {
  const period = formatExperiencePeriod(exp, locale, presentLabel);
  if (!period) return null;

  return (
    <span className="text-zinc-500">
      {period.startIso && <time dateTime={period.startIso}>{period.startLabel}</time>}
      <span aria-hidden> → </span>
      {period.isCurrent ? (
        <span className="text-orange-400">{period.endLabel}</span>
      ) : period.endIso ? (
        <time dateTime={period.endIso}>{period.endLabel}</time>
      ) : (
        <span>{period.endLabel}</span>
      )}
    </span>
  );
}

function LogSignals({ metrics }: { metrics: Metrica[] }) {
  if (metrics.length === 0) return null;

  return (
    <p className="leading-relaxed">
      <span className="text-zinc-600">signals:</span>{' '}
      {metrics.map((metric, index) => {
        const primary = metric.valor?.trim() || metric.label;
        const secondary = metric.valor?.trim() ? metric.label : null;

        return (
          <span key={`${primary}-${index}`}>
            {index > 0 && <span className="text-zinc-700"> · </span>}
            <span className="text-orange-400">{primary}</span>
            {secondary && <span className="text-zinc-500"> ({secondary})</span>}
          </span>
        );
      })}
    </p>
  );
}

function LogEntry({
  exp,
  locale,
  labels,
}: {
  exp: Experience;
  locale: string;
  labels: {
    present: string;
    remote: string;
    onsite: string;
    hybrid: string;
    active: string;
    mode: string;
    stack: string;
    scope: string;
    progression: string;
  };
}) {
  const current = isCurrentExperience(exp);
  const engagement = formatEngagement(exp.modelo, exp.tipo, labels);
  const hasProgression = Boolean(exp.progressao && exp.progressao.length > 1);

  return (
    <article aria-labelledby={`exp-entry-${exp.id}`}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[11px] leading-none">
        <span className={current ? 'text-orange-400' : 'text-zinc-600'} aria-hidden>
          {current ? '●' : '○'}
        </span>
        {current && (
          <span className="rounded border border-orange-500/25 bg-orange-500/10 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.15em] text-orange-400">
            {labels.active}
          </span>
        )}
        <span className="hidden text-zinc-800 sm:inline" aria-hidden>
          │
        </span>
        <LogPeriod exp={exp} locale={locale} presentLabel={labels.present} />
        <span className="text-zinc-800" aria-hidden>
          /
        </span>
        <span className="text-zinc-500">{exp.empresa}</span>
      </div>

      <h3
        id={`exp-entry-${exp.id}`}
        className="mt-4 text-xl font-semibold tracking-tight text-white md:text-2xl"
      >
        {exp.cargo}
      </h3>

      {hasProgression && exp.progressao && (
        <ExperienceProgression
          steps={exp.progressao}
          locale={locale}
          presentLabel={labels.present}
          label={labels.progression}
        />
      )}

      <div className="mt-4 space-y-2.5 border-l border-dashed border-zinc-800 pl-4 font-mono text-xs md:pl-5">
        {engagement && (
          <p>
            <span className="text-zinc-600">{labels.mode}:</span>{' '}
            <span className="text-zinc-400">{engagement}</span>
          </p>
        )}

        {exp.descricao && (
          <p className="font-sans text-sm leading-relaxed text-zinc-400">
            <span className="font-mono text-zinc-600">{labels.scope}:</span>{' '}
            {exp.descricao}
          </p>
        )}

        {exp.stack && exp.stack.length > 0 && (
          <p className="leading-relaxed">
            <span className="text-zinc-600">{labels.stack}:</span>{' '}
            <span className="text-zinc-500">{exp.stack.join(' · ')}</span>
          </p>
        )}

        {exp.metricas && exp.metricas.length > 0 && <LogSignals metrics={exp.metricas} />}
      </div>
    </article>
  );
}

export function ExperienceLog({
  experiences,
  locale,
  labels,
  moreHref,
  moreLabel,
  totalCount,
}: {
  experiences: Experience[];
  locale: string;
  labels: {
    logTitle: string;
    entries: string;
    present: string;
    remote: string;
    onsite: string;
    hybrid: string;
    active: string;
    mode: string;
    stack: string;
    scope: string;
    more: string;
    progression: string;
  };
  moreHref?: string;
  moreLabel?: string;
  totalCount?: number;
}) {
  if (experiences.length === 0) return null;

  const hasMore = totalCount != null ? totalCount > experiences.length : Boolean(moreHref);

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#08080a]">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
        <span>{labels.logTitle}</span>
        <span>
          {labels.entries}: {String(experiences.length).padStart(2, '0')}
          {totalCount != null && totalCount > experiences.length && (
            <span className="text-zinc-700"> / {String(totalCount).padStart(2, '0')}</span>
          )}
        </span>
      </div>

      <div className="divide-y divide-zinc-800/70">
        {experiences.map((exp, index) => (
          <FadeIn key={exp.id} delay={index * 0.06}>
            <div className="px-4 py-7 md:px-6 md:py-8">
              <LogEntry exp={exp} locale={locale} labels={labels} />
            </div>
          </FadeIn>
        ))}
      </div>

      {hasMore && moreHref && moreLabel && (
        <div className="flex items-center justify-between border-t border-zinc-800 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em]">
          <span className="text-zinc-600">{labels.more}</span>
          <Link
            href={moreHref}
            className="text-orange-400 transition hover:text-orange-300"
          >
            {moreLabel} →
          </Link>
        </div>
      )}
    </div>
  );
}
