import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { FadeIn } from '@/components/FadeIn';
import { ProjectCard } from '@/components/ProjectCard';
import { StorageImage } from '@/components/StorageImage';
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
    fetchApi<Project[]>('/projects?featured=1&limit=6', locale),
    fetchApi<Experience[]>('/experiences?limit=3', locale),
    fetchApi<SkillGroup[]>('/skills', locale),
    fetchApi<Contact>('/contact', locale),
  ]);

  const featuredSkills = skills
    .flatMap((g) => g.skills.filter((s) => s.destaque).map((s) => s.nome))
    .slice(0, 12);

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <FadeIn className="mb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-8 h-1 w-24 rounded bg-gradient-to-r from-orange-500 to-orange-600" />
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl md:tracking-[-0.02em]">
              {profile.nome_completo}
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-orange-400">{profile.headline}</p>
            <p className="mt-6 max-w-2xl leading-relaxed text-zinc-400">{profile.bio_resumo}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/${locale}/projetos`}
                className="rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
              >
                {t('hero.viewProjects')}
              </Link>
              <Link
                href={`/${locale}/contato`}
                className="rounded-lg border border-zinc-700 px-6 py-3 font-medium text-zinc-300 transition hover:border-orange-500/50"
              >
                {t('hero.contact')}
              </Link>
            </div>
          </div>
          {profile.foto && (
            <div className="relative mx-auto h-56 w-56 shrink-0 overflow-hidden rounded-2xl border border-zinc-800 shadow-[0_0_24px_rgba(249,115,22,0.15)] lg:mx-0 lg:h-72 lg:w-72">
              <StorageImage
                path={profile.foto}
                alt={profile.nome_completo}
                fill
                priority
                sizes="288px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </FadeIn>

      <section className="mb-24">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight text-white">
          {t('sections.featuredProjects')}
        </h2>
        {projects.length === 0 ? (
          <p className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/50 px-6 py-12 text-center text-zinc-500">
            {t('projects.empty')}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 0.08}>
                <ProjectCard project={project} locale={locale} label={t('projects.viewCase')} />
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      <section className="mb-24">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-white">{t('sections.experiences')}</h2>
          <Link href={`/${locale}/sobre`} className="text-sm text-orange-400 hover:text-orange-300">
            {t('sections.viewAll')} →
          </Link>
        </div>
        <div className="space-y-6 border-l-2 border-orange-500/50 pl-6">
          {experiences.map((exp) => (
            <FadeIn key={exp.id}>
              <h3 className="font-semibold text-white">{exp.cargo}</h3>
              <p className="text-sm text-orange-400">{exp.empresa}</p>
              <p className="mt-2 text-sm text-zinc-400 line-clamp-3">{exp.descricao}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {featuredSkills.length > 0 && (
        <section className="mb-24">
          <h2 className="mb-8 text-2xl font-semibold text-white">{t('sections.skills')}</h2>
          <div className="flex flex-wrap gap-2">
            {featuredSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-sm text-orange-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-8 text-2xl font-semibold text-white">{t('sections.social')}</h2>
        <div className="flex flex-wrap gap-4">
          {contact.linkedin && (
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-orange-400">
              LinkedIn
            </a>
          )}
          {contact.github && (
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-orange-400">
              GitHub
            </a>
          )}
          <a href={`mailto:${contact.email}`} className="text-zinc-400 hover:text-orange-400">
            {contact.email}
          </a>
        </div>
      </section>
    </div>
  );
}
