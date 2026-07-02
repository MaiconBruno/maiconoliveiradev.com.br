import Link from 'next/link';
import type { ReactNode } from 'react';
import { FadeIn } from '@/components/FadeIn';
import { StorageImage } from '@/components/StorageImage';
import type { Project } from '@portfolio/types';

const glassCard =
  'border border-zinc-800/70 bg-zinc-900/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md';

const glassCardHover =
  'transition duration-300 hover:border-orange-500/35 hover:bg-zinc-900/55 hover:shadow-[0_0_32px_rgba(249,115,22,0.1)]';

function ProjectIndex({ n }: { n: number }) {
  return <span className="font-mono text-xs text-zinc-600">{String(n).padStart(2, '0')}</span>;
}

function CardGlassBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.07]" aria-hidden />
      <div
        className="pointer-events-none absolute -right-16 top-0 h-36 w-36 rounded-full bg-orange-500/5 blur-3xl transition duration-500 group-hover:bg-orange-500/10"
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function ProjectCover({
  project,
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 66vw',
  className = 'aspect-[2/1] max-h-[170px] shrink-0 md:max-h-[185px]',
  compact = false,
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
  className?: string;
  compact?: boolean;
}) {
  const cover = project.imagens?.[0];

  return (
    <div className={`relative overflow-hidden border-b border-zinc-800 bg-zinc-950 ${className}`}>
      {cover ? (
        <>
          <StorageImage
            path={cover}
            alt={project.titulo}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/95 via-zinc-900/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-orange-500/5 opacity-0 transition duration-500 group-hover:opacity-100" />
        </>
      ) : (
        <div
          className={`flex h-full items-center justify-center ${compact ? 'min-h-[88px]' : 'min-h-[140px]'}`}
        >
          <div className="bg-grid-pattern absolute inset-0 opacity-20" aria-hidden />
          <span
            className={`relative font-mono uppercase tracking-[0.25em] text-zinc-700 ${
              compact ? 'text-[10px]' : 'text-xs'
            }`}
          >
            {project.titulo}
          </span>
        </div>
      )}
    </div>
  );
}

function FeaturedProjectCard({
  project,
  locale,
  index,
  label,
}: {
  project: Project;
  locale: string;
  index: number;
  label: string;
}) {
  const highlight = project.destaques?.[0];

  return (
    <Link
      href={`/${locale}/projetos/${project.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl ${glassCard} ${glassCardHover}`}
    >
      <div className="absolute left-0 top-0 z-10 h-full w-1 bg-gradient-to-b from-orange-500 via-orange-500/50 to-transparent" aria-hidden />

      <ProjectCover project={project} priority />

      <CardGlassBody className="flex flex-col gap-5 p-6 md:gap-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <ProjectIndex n={index} />
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white transition group-hover:text-orange-400">
              {project.titulo}
            </h3>
            {project.empresa && <p className="mt-2 text-sm text-zinc-500">{project.empresa}</p>}
          </div>
          {project.papel && (
            <span className="shrink-0 rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1 text-xs text-orange-400 backdrop-blur-sm">
              {project.papel}
            </span>
          )}
        </div>

        {project.descricao && (
          <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">{project.descricao}</p>
        )}

        {highlight && (
          <p className="border-l-2 border-orange-500/50 pl-3 text-sm text-zinc-300">{highlight}</p>
        )}

        {project.stack?.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-1">
            {project.stack.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-zinc-700/40 bg-zinc-950/40 px-2 py-0.5 font-mono text-[11px] text-zinc-500 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <span className="inline-flex items-center gap-2 border-t border-zinc-800/60 pt-5 font-mono text-xs uppercase tracking-wider text-orange-500">
          {label}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </CardGlassBody>
    </Link>
  );
}

function CompactProjectCard({
  project,
  locale,
  index,
  elevated = false,
}: {
  project: Project;
  locale: string;
  index: number;
  elevated?: boolean;
}) {
  return (
    <Link
      href={`/${locale}/projetos/${project.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl ${glassCard} ${glassCardHover} ${
        elevated ? 'bg-zinc-900/55' : 'bg-zinc-900/30'
      }`}
    >
      <ProjectCover
        project={project}
        compact
        sizes="(max-width: 640px) 50vw, 320px"
        className="aspect-[2.2/1] max-h-[100px] shrink-0 sm:max-h-[110px]"
      />

      <CardGlassBody className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div>
          <ProjectIndex n={index} />
          <h3 className="mt-3 text-lg font-semibold text-white transition group-hover:text-orange-400">
            {project.titulo}
          </h3>
          {project.empresa && <p className="mt-2 text-xs text-zinc-500">{project.empresa}</p>}
        </div>

        {project.stack?.length > 0 && (
          <p className="mt-auto truncate font-mono text-[11px] text-zinc-600">
            {project.stack.slice(0, 4).join(' · ')}
          </p>
        )}
      </CardGlassBody>
    </Link>
  );
}

export function ProjectsBento({
  projects,
  locale,
  viewCase,
  emptyMessage,
}: {
  projects: Project[];
  locale: string;
  viewCase: string;
  emptyMessage: string;
}) {
  const showcased = projects.filter((project) => project.destaque);

  if (showcased.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 px-6 py-16 text-center text-zinc-500">
        {emptyMessage}
      </p>
    );
  }

  const [main, ...rest] = showcased;

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-12">
      <FadeIn
        className={
          rest.length === 0
            ? 'md:col-span-2 lg:col-span-12'
            : 'md:col-span-2 lg:col-span-7 lg:row-span-2'
        }
      >
        <FeaturedProjectCard project={main} locale={locale} index={1} label={viewCase} />
      </FadeIn>

      {rest.slice(0, 2).map((project, i) => (
        <FadeIn key={project.id} delay={(i + 1) * 0.08} className="lg:col-span-5">
          <CompactProjectCard project={project} locale={locale} index={i + 2} elevated />
        </FadeIn>
      ))}

      {rest.slice(2).map((project, i) => (
        <FadeIn
          key={project.id}
          delay={(i + 3) * 0.08}
          className="md:col-span-1 lg:col-span-4 lg:row-start-3"
        >
          <CompactProjectCard project={project} locale={locale} index={i + 4} />
        </FadeIn>
      ))}
    </div>
  );
}
