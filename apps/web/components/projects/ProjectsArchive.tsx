import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';
import { StorageImage } from '@/components/StorageImage';
import type { Project } from '@portfolio/types';

function ProjectRow({
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
  const cover = project.imagens?.[0];
  const stackLine = project.stack?.slice(0, 6).join(' · ');

  return (
    <FadeIn delay={index * 0.04}>
      <Link
        href={`/${locale}/projetos/${project.slug}`}
        className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-zinc-800/70 px-4 py-6 transition last:border-b-0 hover:bg-zinc-900/40 md:grid-cols-[3rem_1fr_11rem_auto] md:gap-6 md:px-6 md:py-7"
      >
        <span className="font-mono text-sm text-zinc-600 md:text-base">
          {String(index).padStart(2, '0')}
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="text-lg font-semibold tracking-tight text-white transition group-hover:text-orange-400 md:text-xl">
              {project.titulo}
            </h2>
            {project.papel && (
              <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-2.5 py-0.5 text-xs text-orange-400 md:text-sm">
                {project.papel}
              </span>
            )}
          </div>

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

          {project.descricao && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400 md:text-base">
              {project.descricao}
            </p>
          )}

          {stackLine && (
            <p className="mt-3 truncate font-mono text-xs text-zinc-600 md:text-sm">{stackLine}</p>
          )}
        </div>

        <div className="relative hidden aspect-[4/3] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 md:block">
          {cover ? (
            <>
              <StorageImage
                path={cover}
                alt=""
                fill
                sizes="176px"
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent" />
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="bg-grid-pattern absolute inset-0 opacity-20" aria-hidden />
            </div>
          )}
        </div>

        <span className="font-mono text-xs uppercase tracking-wider text-orange-500/80 transition group-hover:text-orange-400 md:text-sm">
          <span className="hidden sm:inline">{label} </span>→
        </span>
      </Link>
    </FadeIn>
  );
}

export function ProjectsArchive({
  projects,
  locale,
  label,
}: {
  projects: Project[];
  locale: string;
  label: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/30">
      {projects.map((project, index) => (
        <ProjectRow
          key={project.id}
          project={project}
          locale={locale}
          index={index + 1}
          label={label}
        />
      ))}
    </div>
  );
}
