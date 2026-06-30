import { FadeIn } from '@/components/FadeIn';
import { StackTicker } from '@/components/home/StackTicker';
import type { SkillGroup } from '@portfolio/types';

export function SkillsManifest({
  skills,
  tickerLabel,
}: {
  skills: SkillGroup[];
  tickerLabel: string;
}) {
  const featuredGroups = skills
    .map((group) => ({
      ...group,
      skills: group.skills.filter((s) => s.destaque),
    }))
    .filter((group) => group.skills.length > 0);

  if (featuredGroups.length === 0) return null;

  const tickerItems = featuredGroups.flatMap((g) => g.skills.map((s) => s.nome));

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d0d0f]">
        <div className="border-b border-zinc-800 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
          manifest.json
        </div>
        <div className="divide-y divide-zinc-800/80">
          {featuredGroups.map((group, index) => (
            <FadeIn key={group.categoria} delay={index * 0.05}>
              <div className="grid gap-4 p-5 md:grid-cols-[140px_1fr] md:gap-8 md:p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-orange-400/80">
                  {group.categoria}
                </h3>
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill?.nome}
                      className="font-mono text-sm text-zinc-300 before:mr-2 before:text-zinc-600 before:content-['›']"
                    >
                      {skill.nome}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
        <StackTicker items={tickerItems} label={tickerLabel} />
      </div>
    </>
  );
}
