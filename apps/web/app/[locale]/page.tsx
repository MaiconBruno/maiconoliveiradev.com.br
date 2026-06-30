import { getTranslations } from 'next-intl/server';
import { ChapterSection } from '@/components/home/ChapterSection';
import { ContactBand } from '@/components/home/ContactBand';
import { ExperienceLog } from '@/components/home/ExperienceLog';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeSectionNav } from '@/components/home/HomeSectionNav';
import { ProjectsBento } from '@/components/home/ProjectsBento';
import { ProofStrip } from '@/components/home/ProofStrip';
import { SkillsManifest } from '@/components/home/SkillsManifest';
import { getSeoMetadata } from '@/lib/seo';
import { fetchApi } from '@/lib/utils';
import type { Contact, Experience, Profile, Project, SkillGroup } from '@portfolio/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getSeoMetadata(locale, `/${locale}`, { page: 'home' });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const [profile, projects, experiences, skills, contact] = await Promise.all([
    fetchApi<Profile>('/profile', locale),
    fetchApi<Project[]>('/projects?featured=1', locale),
    fetchApi<Experience[]>('/experiences?limit=3', locale),
    fetchApi<SkillGroup[]>('/skills', locale),
    fetchApi<Contact>('/contact', locale),
  ]);

  const navSections = [
    { id: 'brief', label: t('home.nav.brief') },
    { id: 'work', label: t('home.nav.work') },
    ...(experiences.length > 0 ? [{ id: 'track', label: t('home.nav.track') }] : []),
    ...(skills.some((g) => g.skills.some((s) => s.destaque))
      ? [{ id: 'stack', label: t('home.nav.stack') }]
      : []),
    { id: 'contact', label: t('home.nav.contact') },
  ];

  return (
    <div className="relative">
      <HomeSectionNav sections={navSections} />

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

      <ProofStrip projects={projects} label={t('home.proofStrip')} />

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
          action={{ href: `/${locale}/sobre`, label: t('sections.viewAll') }}
          fullBleed
        >
          <ExperienceLog experiences={experiences} />
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
