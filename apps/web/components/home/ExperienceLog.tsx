import { FadeIn } from '@/components/FadeIn';
import type { Experience } from '@portfolio/types';

function formatPeriod(exp: Experience) {
  const end = exp.periodo_fim ?? 'atual';
  if (exp.periodo_inicio) {
    return `${exp.periodo_inicio} — ${end}`;
  }
  return null;
}

export function ExperienceLog({ experiences }: { experiences: Experience[] }) {
  if (experiences.length === 0) return null;

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute left-[1.125rem] top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-orange-500/50 via-zinc-800 to-transparent md:block"
        aria-hidden
      />

      <div className="space-y-4">
        {experiences.map((exp, index) => {
          const period = formatPeriod(exp);
          return (
            <FadeIn key={exp.id} delay={index * 0.08}>
              <article className="relative grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 md:grid-cols-[auto_1fr] md:gap-8">
                <div className="flex items-start gap-4 md:flex-col md:items-center md:gap-2">
                  <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange-500/30 bg-zinc-950 font-mono text-xs text-orange-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {period && (
                    <span className="font-mono text-[11px] text-zinc-600 md:text-center md:text-[10px]">
                      {period}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">{exp.cargo}</h3>
                  <p className="mt-1 text-sm text-orange-400">{exp.empresa}</p>
                  {exp.modelo && (
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-zinc-600">
                      {exp.modelo}
                      {exp.tipo ? ` · ${exp.tipo}` : ''}
                    </p>
                  )}
                  {exp.descricao && (
                    <p className="mt-4 text-sm leading-relaxed text-zinc-400 line-clamp-3 md:line-clamp-2">
                      {exp.descricao}
                    </p>
                  )}
                </div>
              </article>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
