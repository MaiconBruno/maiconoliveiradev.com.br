import { getTranslations } from 'next-intl/server';
import { FadeIn } from '@/components/FadeIn';
import { getSeoMetadata } from '@/lib/seo';
import { fetchApi } from '@/lib/utils';
import type { Certification, Education, Experience, Profile, SkillGroup } from '@portfolio/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getSeoMetadata(locale, `/${locale}/sobre`, { page: 'about' });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const [profile, experiences, skills, education, certifications] = await Promise.all([
    fetchApi<Profile>('/profile', locale),
    fetchApi<Experience[]>('/experiences', locale),
    fetchApi<SkillGroup[]>('/skills', locale),
    fetchApi<Education[]>('/education', locale),
    fetchApi<Certification[]>('/certifications', locale),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-white">{t('about.title')}</h1>
      {profile.bio_longa && (
        <p className="mb-16 text-zinc-400 leading-relaxed whitespace-pre-line">{profile.bio_longa}</p>
      )}

      <section className="mb-16">
        <h2 className="mb-8 text-xl font-semibold text-white">{t('about.experience')}</h2>
        <div className="space-y-8 border-l-2 border-orange-500/50 pl-6">
          {experiences.map((exp) => (
            <FadeIn key={exp.id}>
              <h3 className="font-semibold text-white">{exp.cargo}</h3>
              <p className="text-orange-400">{exp.empresa}</p>
              <p className="mt-2 text-sm text-zinc-400">{exp.descricao}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-xl font-semibold text-white">{t('about.education')}</h2>
        <ul className="space-y-4">
          {education.map((edu, i) => (
            <li key={i} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
              <p className="font-medium text-white">{edu.grau}</p>
              <p className="text-sm text-zinc-400">{edu.instituicao} · {edu.periodo}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-xl font-semibold text-white">{t('about.certifications')}</h2>
        <ul className="list-disc space-y-2 pl-5 text-zinc-400">
          {certifications.map((cert, i) => (
            <li key={i}>{cert.titulo}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-8 text-xl font-semibold text-white">Skills</h2>
        {skills.map((group) => (
          <div key={group.categoria} className="mb-6">
            <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-orange-400">
              {group.categoria}
            </h3>
            <p className="text-zinc-400">{group.skills.map((s) => s.nome).join(' · ')}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
