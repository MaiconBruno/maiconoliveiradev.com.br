import { getTranslations } from 'next-intl/server';
import { ChapterSection } from '@/components/home/ChapterSection';
import { ContactBand } from '@/components/home/ContactBand';
import { ExperienceLog } from '@/components/home/ExperienceLog';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeSectionNav } from '@/components/home/HomeSectionNav';
import { ProjectsBento } from '@/components/home/ProjectsBento';
import { ProofStrip } from '@/components/home/ProofStrip';
import { SkillsManifest } from '@/components/home/SkillsManifest';
import { JsonLd } from '@/components/JsonLd';
import { buildPersonJsonLd } from '@/lib/json-ld';
import { getSeoMetadata } from '@/lib/seo';
import { fetchApi, getSiteUrl } from '@/lib/utils';
import type { Contact, Education, Experience, Profile, Project, SkillGroup } from '@portfolio/types';

const HOME_EXPERIENCE_LIMIT = 3;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getSeoMetadata(locale, `/${locale}`, { page: 'home' });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const [profile, projects, allExperiences, skills, contact, education] = await Promise.all([
    fetchApi<Profile>('/profile', locale),
    fetchApi<Project[]>('/projects?featured=1', locale),
    fetchApi<Experience[]>('/experiences', locale),
    fetchApi<SkillGroup[]>('/skills', locale),
    fetchApi<Contact>('/contact', locale),
    fetchApi<Education[]>('/education', locale),
  ]);

  const experiences = allExperiences.slice(0, HOME_EXPERIENCE_LIMIT);
  const pageUrl = `${getSiteUrl()}/${locale}`;
  const jsonLd = buildPersonJsonLd({
    profile,
    experiences: allExperiences,
    contact,
    education,
    skills,
    pageUrl,
  });

  const navSections = [
    { id: 'brief', label: t('home.nav.brief') },
    { id: 'work', label: t('home.nav.work') },
    ...(experiences.length > 0 ? [{ id: 'track', label: t('home.nav.track') }] : []),
    ...(skills.some((g) => g.skills.some((s) => s.destaque))
      ? [{ id: 'stack', label: t('home.nav.stack') }]
      : []),
  ];

  return (
    <div className="relative">
      <JsonLd data={jsonLd} />
      <HomeSectionNav sections={navSections} ariaLabel={t('home.nav.ariaLabel')} />

      <HomeHero
        profile={profile}
        contact={contact}
        locale={locale}
        ctaPrimary={t('hero.contact')}
        ctaSecondary={t('hero.viewProjects')}
        dispatchLabel={t('home.dispatchLabel')}
        briefingLabel={t('home.briefing.label')}
        briefingRows={{
          base: t('home.briefing.base'),
          mode: t('home.briefing.mode'),
          tenure: t('home.briefing.tenure'),
        }}
      />

      <ProofStrip projects={projects} label={t('projects.metrics')} />

      <ChapterSection
        id="work"
        chapter="01"
        eyebrow={t('home.chapters.work.eyebrow')}
        title={t('sections.featuredProjects')}
        action={{ href: `/${locale}/projetos`, label: t('sections.viewAll') }}
      >
        <ProjectsBento
          projects={projects}
          locale={locale}
          viewCase={t('projects.viewCase')}
          emptyMessage={t('projects.empty')}
        />
      </ChapterSection>

      {experiences.length > 0 && (
        <ChapterSection
          id="track"
          chapter="02"
          eyebrow={t('home.chapters.track.eyebrow')}
          title={t('sections.experiences')}
          action={
            allExperiences.length > HOME_EXPERIENCE_LIMIT
              ? { href: `/${locale}/sobre#experiencias`, label: t('sections.viewMore') }
              : { href: `/${locale}/sobre`, label: t('sections.viewAll') }
          }
          fullBleed
        >
          <ExperienceLog
            experiences={experiences}
            locale={locale}
            labels={{
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
            }}
            totalCount={allExperiences.length}
            moreHref={
              allExperiences.length > HOME_EXPERIENCE_LIMIT
                ? `/${locale}/sobre#experiencias`
                : undefined
            }
            moreLabel={t('sections.viewMore')}
          />
        </ChapterSection>
      )}

      {skills.some((g) => g.skills.some((s) => s.destaque)) && (
        <ChapterSection
          id="stack"
          chapter="03"
          eyebrow={t('home.chapters.stack.eyebrow')}
          title={t('sections.skills')}
        >
          <SkillsManifest skills={skills} tickerLabel={t('home.stackTicker')} />
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
