import { getTranslations } from 'next-intl/server';
import { FadeIn } from '@/components/FadeIn';
import { ProjectCard } from '@/components/ProjectCard';
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
    <div className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="mb-12 text-3xl font-bold tracking-tight text-white">{t('projects.title')}</h1>
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
    </div>
  );
}
