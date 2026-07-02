import { FadeIn } from '@/components/FadeIn';
import type { Certification, Education } from '@portfolio/types';

export function EducationPanel({
  education,
  panelLabel,
}: {
  education: Education[];
  panelLabel: string;
}) {
  if (education.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d0d0f]">
      <div className="border-b border-zinc-800 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
        {panelLabel}
      </div>
      <div className="divide-y divide-zinc-800/80">
        {education.map((edu, index) => (
          <FadeIn key={`${edu.instituicao}-${edu.periodo}`} delay={index * 0.05}>
            <div className="grid gap-2 p-5 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8 md:p-6">
              <div>
                <p className="font-medium text-white">{edu.grau}</p>
                <p className="mt-1 font-mono text-sm text-zinc-500">{edu.instituicao}</p>
              </div>
              <p className="font-mono text-xs uppercase tracking-wider text-orange-400/80">{edu.periodo}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

export function CertificationsPanel({
  certifications,
  panelLabel,
}: {
  certifications: Certification[];
  panelLabel: string;
}) {
  if (certifications.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d0d0f]">
      <div className="border-b border-zinc-800 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
        {panelLabel}
      </div>
      <ul className="divide-y divide-zinc-800/80">
        {certifications.map((cert, index) => (
          <FadeIn key={cert.titulo} delay={index * 0.05}>
            <li className="flex items-baseline gap-3 p-5 font-mono text-sm text-zinc-300 before:text-orange-400/60 before:content-['›'] md:p-6">
              {cert.titulo}
            </li>
          </FadeIn>
        ))}
      </ul>
    </div>
  );
}
