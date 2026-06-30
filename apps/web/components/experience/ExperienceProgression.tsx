import {
  formatExperiencePeriod,
  getProgressaoStepNumber,
  sortProgressaoNewestFirst,
} from '@/lib/experience-format';
import type { Progressao } from '@portfolio/types';

export function ExperienceProgression({
  steps,
  locale,
  presentLabel,
  label,
}: {
  steps: Progressao[];
  locale: string;
  presentLabel: string;
  label: string;
}) {
  if (steps.length < 2) return null;

  const displaySteps = sortProgressaoNewestFirst(steps);

  return (
    <div className="mt-5">
      <p className="font-mono text-xs text-zinc-600">{label}:</p>
      <ol className="mt-3">
        {displaySteps.map((step, displayIndex) => {
          const isPeak = displayIndex === 0;
          const stepNumber = getProgressaoStepNumber(step, steps);
          const period = formatExperiencePeriod(
            {
              periodo_inicio: step.periodo_inicio,
              periodo_fim: step.periodo_fim,
            },
            locale,
            presentLabel
          );

          return (
            <li
              key={`${step.cargo}-${step.periodo_inicio}-${displayIndex}`}
              className="relative pl-6"
            >
              {displayIndex < displaySteps.length - 1 && (
                <span
                  className="absolute left-[7px] top-5 h-[calc(100%-0.25rem)] w-px bg-gradient-to-b from-orange-500/40 via-zinc-800 to-zinc-700"
                  aria-hidden
                />
              )}
              <span
                className={`absolute left-0 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
                  isPeak ? 'border-orange-500 bg-orange-500/15' : 'border-zinc-600 bg-zinc-900'
                }`}
                aria-hidden
              >
                {isPeak && <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />}
              </span>

              <div className={displayIndex < displaySteps.length - 1 ? 'pb-5' : 'pb-1'}>
                <p className="font-mono text-[10px] leading-none text-zinc-600">
                  step_{String(stepNumber).padStart(2, '0')}
                  {period && (
                    <>
                      <span className="text-zinc-800"> · </span>
                      <span className="text-zinc-500">
                        {period.startIso && (
                          <time dateTime={period.startIso}>{period.startLabel}</time>
                        )}
                        <span aria-hidden> → </span>
                        {period.isCurrent ? (
                          <span className="text-orange-400/90">{period.endLabel}</span>
                        ) : period.endIso ? (
                          <time dateTime={period.endIso}>{period.endLabel}</time>
                        ) : (
                          <span>{period.endLabel}</span>
                        )}
                      </span>
                    </>
                  )}
                </p>
                <p
                  className={`mt-1.5 text-sm leading-snug ${
                    isPeak ? 'font-medium text-white' : 'text-zinc-400'
                  }`}
                >
                  {step.cargo}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
