import type { Project } from '@portfolio/types';

type Signal = {
  project: string;
  primary: string;
  secondary?: string;
};

function extractSignals(projects: Project[]): Signal[] {
  return projects.flatMap((project) => {
    const metric = project.metricas?.[0];
    if (!metric) return [];

    if (metric.valor?.trim()) {
      return [
        {
          project: project.titulo,
          primary: metric.valor,
          secondary: metric.label,
        },
      ];
    }

    return [
      {
        project: project.titulo,
        primary: metric.label,
      },
    ];
  });
}

export function ProofStrip({
  projects,
  label,
}: {
  projects: Project[];
  label: string;
}) {
  const signals = extractSignals(projects).slice(0, 5);
  if (signals.length === 0) return null;

  const loop = [...signals, ...signals];

  return (
    <div className="border-b border-zinc-800/60 bg-zinc-950/80">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-4">
        <span className="hidden shrink-0 border-r border-zinc-800 pr-6 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600 sm:block">
          {label}
        </span>
        <div className="ticker-mask relative min-w-0 flex-1 overflow-hidden">
          <div className="ticker-track flex w-max gap-8">
            {loop.map((signal, index) => (
              <div
                key={`${signal.project}-${index}`}
                className="flex shrink-0 items-baseline gap-3 whitespace-nowrap"
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">
                  {signal.project}
                </span>
                <span className="text-sm font-semibold text-orange-400">{signal.primary}</span>
                {signal.secondary && (
                  <span className="text-xs text-zinc-500">{signal.secondary}</span>
                )}
                <span className="text-zinc-800" aria-hidden>
                  /
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
