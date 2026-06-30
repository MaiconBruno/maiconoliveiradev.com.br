import { getTranslations } from 'next-intl/server';
import { JsonLd } from '@/components/JsonLd';
import { ExperienceLog } from '@/components/home/ExperienceLog';
import { buildPersonJsonLd } from '@/lib/json-ld';
import { getSeoMetadata } from '@/lib/seo';
import { fetchApi, getSiteUrl } from '@/lib/utils';
import type { Certification, Contact, Education, Experience, Profile, SkillGroup } from '@portfolio/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getSeoMetadata(locale, `/${locale}/sobre`, { page: 'about' });
}

function experienceLabels(t: Awaited<ReturnType<typeof getTranslations>>) {
  return {
    logTitle: t('home.experience.logTitle'),
    entries: t('home.experience.entries'),
    present: t('home.experience.present'),
    remote: t('home.experience.remote'),
    onsite: t('home.experience.onsite'),
    hybrid: t('home.experience.hybrid'),
    active: t('home.experience.active'),
    mode: t('home.experience.mode'),
    stack: t('home.experience.stack'),
    scope: t('home.experience.scope'),
    more: t('home.experience.more'),
    progression: t('home.experience.progression'),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const [profile, experiences, skills, education, certifications, contact] = await Promise.all([
    fetchApi<Profile>('/profile', locale),
    fetchApi<Experience[]>('/experiences', locale),
    fetchApi<SkillGroup[]>('/skills', locale),
    fetchApi<Education[]>('/education', locale),
    fetchApi<Certification[]>('/certifications', locale),
    fetchApi<Contact>('/contact', locale),
  ]);

  const pageUrl = `${getSiteUrl()}/${locale}/sobre`;
  const jsonLd = buildPersonJsonLd({
    profile,
    experiences,
    contact,
    education,
    certifications,
    skills,
    pageUrl,
  });

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-8 text-3xl font-bold text-white">{t('about.title')}</h1>
        {profile.bio_longa && (
          <p className="mb-16 whitespace-pre-line leading-relaxed text-zinc-400">{profile.bio_longa}</p>
        )}

        <section id="experiencias" className="mb-16 scroll-mt-24">
          <h2 className="mb-8 text-xl font-semibold text-white">{t('about.experience')}</h2>
          <ExperienceLog
            experiences={experiences}
            locale={locale}
            labels={experienceLabels(t)}
            totalCount={experiences.length}
          />
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-xl font-semibold text-white">{t('about.education')}</h2>
          <ul className="space-y-4">
            {education.map((edu) => (
              <li
                key={`${edu.instituicao}-${edu.periodo}`}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-4"
              >
                <p className="font-medium text-white">{edu.grau}</p>
                <p className="text-sm text-zinc-400">
                  {edu.instituicao} · {edu.periodo}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-xl font-semibold text-white">{t('about.certifications')}</h2>
          <ul className="list-disc space-y-2 pl-5 text-zinc-400">
            {certifications.map((cert) => (
              <li key={cert.titulo}>{cert.titulo}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-8 text-xl font-semibold text-white">{t('sections.skills')}</h2>
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
    </>
  );
}
