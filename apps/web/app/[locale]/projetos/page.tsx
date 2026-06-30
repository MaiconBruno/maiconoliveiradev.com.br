import { getTranslations } from 'next-intl/server';
import { FadeIn } from '@/components/FadeIn';
import { ProjectsArchive } from '@/components/projects/ProjectsArchive';
import { getSeoMetadata } from '@/lib/seo';
import { fetchApi } from '@/lib/utils';
import type { Project } from '@portfolio/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getSeoMetadata(locale, `/${locale}/projetos`, { page: 'projects' });
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const projects = await fetchApi<Project[]>('/projects', locale);

  return (
    <div className="relative">
      <section className="relative overflow-hidden border-b border-zinc-800/60">
        <div className="bg-grid-pattern pointer-events-none absolute inset-0" aria-hidden />
        <div
          className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-16 md:pb-16 md:pt-24">
          <FadeIn>
            <span
              className="pointer-events-none mb-6 block select-none font-mono text-[clamp(4rem,14vw,8rem)] font-bold leading-none tracking-tighter text-zinc-900/90"
              aria-hidden
            >
              {String(projects.length).padStart(2, '0')}
            </span>
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-zinc-600">
              {t('projects.eyebrow')}
            </p>
            <h1 className="mt-3 text-[clamp(2.25rem,6vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              {t('projects.title')}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
              {t('projects.subtitle')}
            </p>
            {projects.length > 0 && (
              <p className="mt-6 font-mono text-sm text-zinc-600 md:text-base">
                {t('projects.count', { count: projects.length })}
              </p>
            )}
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        {projects.length === 0 ? (
          <FadeIn>
            <p className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 px-6 py-16 text-center text-base text-zinc-500 md:text-lg">
              {t('projects.empty')}
            </p>
          </FadeIn>
        ) : (
          <ProjectsArchive
            projects={projects}
            locale={locale}
            label={t('projects.viewCase')}
          />
        )}
      </div>
    </div>
  );
}
