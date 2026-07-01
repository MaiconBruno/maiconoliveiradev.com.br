import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { FadeIn } from '@/components/FadeIn';
import { MarkdownContent } from '@/components/MarkdownContent';
import { ProjectGalleryCarousel } from '@/components/projects/ProjectGalleryCarousel';
import { getSeoMetadata, truncateDescription } from '@/lib/seo';
import { buildProjectGallery } from '@/lib/project-gallery';
import { fetchApi } from '@/lib/utils';
import type { Project } from '@portfolio/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const path = `/${locale}/projetos/${slug}`;

  let project: Project | null = null;
  try {
    project = await fetchApi<Project>(`/projects/${slug}`, locale);
  } catch {
    project = null;
  }

  return getSeoMetadata(locale, path, {
    page: 'project',
    overrides: project
      ? {
          title: `${project.titulo} — Maicon Oliveira`,
          description: truncateDescription(project.descricao),
          image: project.imagens?.[0] ?? null,
        }
      : undefined,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });

  let project: Project;
  try {
    project = await fetchApi<Project>(`/projects/${slug}`, locale);
  } catch {
    notFound();
  }

  const galleryItems = buildProjectGallery(project);
  const highlight = project.destaques?.[0];

  return (
    <article>
      <section className="relative overflow-hidden border-b border-zinc-800/60">
        <div className="bg-grid-pattern pointer-events-none absolute inset-0" aria-hidden />
        <div
          className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-orange-500/5 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 md:pb-24 md:pt-20">
          <FadeIn>
            <Link
              href={`/${locale}/projetos`}
              className="font-mono text-sm uppercase tracking-wider text-orange-400 hover:text-orange-300"
            >
              ← {t('back')}
            </Link>
          </FadeIn>

          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14 xl:gap-20">
            <FadeIn delay={0.06} className="min-w-0 order-2 lg:order-1">
              <p className="font-mono text-sm uppercase tracking-[0.25em] text-zinc-600">
                {t('preview')}
              </p>
              <h1 className="mt-3 text-[clamp(2.25rem,5.5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
                {project.titulo}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-base text-zinc-400">
                {project.empresa && <span>{project.empresa}</span>}
                {project.periodo && (
                  <>
                    {project.empresa && <span className="text-zinc-700">·</span>}
                    <span className="font-mono text-sm uppercase tracking-wider text-zinc-500">
                      {project.periodo}
                    </span>
                  </>
                )}
              </div>

              {project.papel && (
                <p className="mt-3 font-mono text-base text-orange-400 md:text-lg">{project.papel}</p>
              )}

              {highlight && (
                <p className="mt-6 border-l-2 border-orange-500/50 pl-4 text-base leading-relaxed text-zinc-300 md:text-lg">
                  {highlight}
                </p>
              )}

              {project.stack?.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-1.5 font-mono text-xs text-zinc-500 md:text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-base font-medium text-white transition hover:bg-orange-600"
                >
                  {t('viewLive')}
                  <span aria-hidden>→</span>
                </a>
              )}
            </FadeIn>

            <FadeIn delay={0.12} className="order-1 lg:order-2 lg:pt-4">
              <ProjectGalleryCarousel
                items={galleryItems}
                alt={project.titulo}
                labels={{
                  prev: t('carousel.prev'),
                  next: t('carousel.next'),
                  slide: t('carousel.slide'),
                }}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {(project.descricao || (project.metricas && project.metricas.length > 0)) && (
        <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div
            className={
              project.descricao && project.metricas && project.metricas.length > 0
                ? 'grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20'
                : project.descricao
                  ? 'max-w-3xl'
                  : undefined
            }
          >
            {project.descricao && (
              <FadeIn>
                <p className="font-mono text-sm uppercase tracking-[0.25em] text-zinc-600">
                  {t('overview')}
                </p>
                <div className="mt-6">
                  <MarkdownContent content={project.descricao} className="text-base md:text-lg" />
                </div>
              </FadeIn>
            )}

            {project.metricas && project.metricas.length > 0 && (
              <FadeIn delay={project.descricao ? 0.08 : 0}>
                {project.descricao && (
                  <p className="font-mono text-sm uppercase tracking-[0.25em] text-zinc-600">
                    {t('metrics')}
                  </p>
                )}
                <div
                  className={`grid gap-4 sm:grid-cols-2 ${project.descricao ? 'mt-6' : ''} ${
                    !project.descricao ? 'lg:grid-cols-2 xl:grid-cols-4' : ''
                  }`}
                >
                  {project.metricas.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-zinc-800 border-l-2 border-l-orange-500 bg-zinc-900/60 p-5"
                    >
                      <p className="text-xl font-medium leading-snug text-orange-400">{m.label}</p>
                      {m.valor ? (
                        <p className="mt-1.5 text-base text-zinc-400">{m.valor}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}
          </div>
        </section>
      )}
    </article>
  );
}
