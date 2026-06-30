import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FadeIn } from '@/components/FadeIn';
import { MarkdownContent } from '@/components/MarkdownContent';
import { StorageImage } from '@/components/StorageImage';
import { getSeoMetadata, truncateDescription } from '@/lib/seo';
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

  let project: Project;
  try {
    project = await fetchApi<Project>(`/projects/${slug}`, locale);
  } catch {
    notFound();
  }

  const heroImage = project.imagens?.[0];
  const galleryImages = project.imagens?.slice(heroImage ? 1 : 0) ?? [];

  return (
    <article className="mx-auto max-w-4xl px-4 py-20">
      <FadeIn>
        <Link href={`/${locale}/projetos`} className="text-sm text-orange-400 hover:text-orange-300">
          ← Projetos
        </Link>
      </FadeIn>

      {heroImage && (
        <FadeIn className="relative mt-8 aspect-[21/9] overflow-hidden rounded-xl border border-zinc-800">
          <StorageImage
            path={heroImage}
            alt={project.titulo}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </FadeIn>
      )}

      <FadeIn delay={0.08}>
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-white md:tracking-[-0.02em]">
          {project.titulo}
        </h1>
        {project.empresa && <p className="mt-2 text-lg text-zinc-400">{project.empresa}</p>}
        {project.papel && <p className="mt-1 text-orange-400">{project.papel}</p>}
      </FadeIn>

      {project.stack?.length > 0 && (
        <FadeIn delay={0.12} className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-sm text-orange-400"
            >
              {tag}
            </span>
          ))}
        </FadeIn>
      )}

      {project.descricao && (
        <FadeIn delay={0.16} className="mt-10">
          <MarkdownContent content={project.descricao} />
        </FadeIn>
      )}

      {project.metricas && project.metricas.length > 0 && (
        <FadeIn delay={0.2} className="mt-10 grid gap-4 sm:grid-cols-2">
          {project.metricas.map((m) => (
            <div
              key={m.label}
              className="rounded-lg border border-zinc-800 border-l-2 border-l-orange-500 bg-zinc-900 p-4"
            >
              <p className="text-2xl font-bold text-orange-500">{m.label}</p>
              {m.valor ? <p className="text-sm text-zinc-400">{m.valor}</p> : null}
            </div>
          ))}
        </FadeIn>
      )}

      {galleryImages.length > 0 && (
        <FadeIn delay={0.24} className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-white">Galeria</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {galleryImages.map((img, index) => (
              <div
                key={`${img}-${index}`}
                className="relative aspect-video overflow-hidden rounded-xl border border-zinc-800"
              >
                <StorageImage
                  path={img}
                  alt={`${project.titulo} — ${index + 2}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      {project.url && (
        <FadeIn delay={0.28}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block rounded-lg bg-orange-500 px-6 py-3 text-white transition hover:bg-orange-600"
          >
            Ver projeto →
          </a>
        </FadeIn>
      )}
    </article>
  );
}
