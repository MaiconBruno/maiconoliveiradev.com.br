import Link from 'next/link';
import type { Project } from '@portfolio/types';
import { StorageImage } from '@/components/StorageImage';

function ProjectIndex({ n }: { n: number }) {
  return (
    <span className="font-mono text-xs text-zinc-600 md:text-sm">{String(n).padStart(2, '0')}</span>
  );
}

function ProjectCover({ project }: { project: Project }) {
  const cover = project.imagens?.[0];

  return (
    <div className="relative aspect-[2/1] max-h-[180px] shrink-0 overflow-hidden border-b border-zinc-800 bg-zinc-950 md:max-h-[200px]">
      {cover ? (
        <>
          <StorageImage
            path={cover}
            alt={project.titulo}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
        </>
      ) : (
        <div className="flex h-full min-h-[140px] items-center justify-center">
          <div className="bg-grid-pattern absolute inset-0 opacity-20" aria-hidden />
          <span className="relative font-mono text-xs uppercase tracking-[0.25em] text-zinc-700">
            {project.titulo}
          </span>
        </div>
      )}
    </div>
  );
}

export function ProjectCard({
  project,
  locale,
  label,
  index,
}: {
  project: Project;
  locale: string;
  label: string;
  index?: number;
}) {
  const highlight = project.destaques?.[0];

  return (
    <Link
      href={`/${locale}/projetos/${project.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] transition duration-200 hover:border-orange-500/40 hover:bg-zinc-900 hover:shadow-[0_0_32px_rgba(249,115,22,0.1)]"
    >
      <div
        className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-orange-500/80 via-orange-500/30 to-transparent opacity-0 transition group-hover:opacity-100"
        aria-hidden
      />

      <ProjectCover project={project} />

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {index !== undefined && <ProjectIndex n={index} />}
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-white transition group-hover:text-orange-400 md:text-xl">
              {project.titulo}
            </h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-500 md:text-base">
              {project.empresa && <span>{project.empresa}</span>}
              {project.periodo && (
                <>
                  {project.empresa && <span className="text-zinc-700">·</span>}
                  <span className="font-mono text-xs uppercase tracking-wider md:text-sm">
                    {project.periodo}
                  </span>
                </>
              )}
            </div>
          </div>
          {project.papel && (
            <span className="shrink-0 rounded-full border border-orange-500/20 bg-orange-500/10 px-2.5 py-1 text-xs text-orange-400 md:text-sm">
              {project.papel}
            </span>
          )}
        </div>

        {project.descricao && (
          <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400 md:text-base">
            {project.descricao}
          </p>
        )}

        {highlight && (
          <p className="border-l-2 border-orange-500/50 pl-3 text-sm text-zinc-300 md:text-base">
            {highlight}
          </p>
        )}

        {project.stack?.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-1">
            {project.stack.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1 font-mono text-xs text-zinc-500 md:text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <span className="mt-1 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-orange-500 md:text-sm">
          {label}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
