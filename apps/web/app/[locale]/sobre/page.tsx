import { getTranslations } from 'next-intl/server';
import { CertificationsPanel, EducationPanel } from '@/components/about/AboutPanels';
import { FadeIn } from '@/components/FadeIn';
import { MarkdownContent } from '@/components/MarkdownContent';
import { ChapterSection } from '@/components/home/ChapterSection';
import { ContactBand } from '@/components/home/ContactBand';
import { ExperienceLog } from '@/components/home/ExperienceLog';
import { SkillsManifest } from '@/components/home/SkillsManifest';
import { JsonLd } from '@/components/JsonLd';
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
    signals: t('home.experience.signals'),
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

  const hasEducation = education.length > 0;
  const hasCertifications = certifications.length > 0;
  const hasSkills = skills.some((g) => g.skills.length > 0);

  let chapterIndex = 0;
  const nextChapter = () => String(++chapterIndex).padStart(2, '0');

  return (
    <div className="relative">
      <JsonLd data={jsonLd} />

      <section className="relative overflow-hidden border-b border-zinc-800/60">
        <div className="bg-grid-pattern pointer-events-none absolute inset-0" aria-hidden />
        <div
          className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl"
          aria-hidden
        />

        <span
          className="pointer-events-none absolute right-4 top-20 hidden select-none font-mono text-[clamp(5rem,16vw,10rem)] font-bold leading-none tracking-tighter text-zinc-900/90 md:right-8 lg:block"
          aria-hidden
        >
          03
        </span>

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-16 md:pb-16 md:pt-24">
          <FadeIn>
            <h1 className="text-[clamp(2.25rem,6vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              {t('about.title')}
            </h1>
            {profile.bio_longa && (
              <div className="mt-8 max-w-3xl">
                <MarkdownContent content={profile.bio_longa} className="text-base md:text-lg" />
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {experiences.length > 0 && (
        <ChapterSection
          id="experiencias"
          chapter={nextChapter()}
          eyebrow={t('about.chapters.track.eyebrow')}
          title={t('about.experience')}
          fullBleed
          className="scroll-mt-24"
        >
          <ExperienceLog
            experiences={experiences}
            locale={locale}
            labels={experienceLabels(t)}
            totalCount={experiences.length}
          />
        </ChapterSection>
      )}

      {hasEducation && (
        <ChapterSection
          id="formacao"
          chapter={nextChapter()}
          eyebrow={t('about.chapters.education.eyebrow')}
          title={t('about.education')}
        >
          <EducationPanel education={education} panelLabel={t('about.panels.education')} />
        </ChapterSection>
      )}

      {hasCertifications && (
        <ChapterSection
          id="certificacoes"
          chapter={nextChapter()}
          eyebrow={t('about.chapters.certs.eyebrow')}
          title={t('about.certifications')}
        >
          <CertificationsPanel
            certifications={certifications}
            panelLabel={t('about.panels.certifications')}
          />
        </ChapterSection>
      )}

      {hasSkills && (
        <ChapterSection
          id="skills"
          chapter={nextChapter()}
          eyebrow={t('about.chapters.stack.eyebrow')}
          title={t('sections.skills')}
        >
          <SkillsManifest
            skills={skills}
            tickerLabel={t('home.stackTicker')}
            featuredOnly={false}
          />
        </ChapterSection>
      )}

      <ContactBand
        locale={locale}
        eyebrow={t('home.contactBand.eyebrow')}
        formLink={t('home.contactBand.formLink')}
        email={contact.email}
      />
    </div>
  );
}
