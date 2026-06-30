import Link from 'next/link';
import type { Project } from '@portfolio/types';
import { StorageImage } from '@/components/StorageImage';

export function ProjectCard({
  project,
  locale,
  label,
}: {
  project: Project;
  locale: string;
  label: string;
}) {
  const cover = project.imagens?.[0];

  return (
    <Link
      href={`/${locale}/projetos/${project.slug}`}
      className="group block overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition duration-200 hover:scale-[1.02] hover:border-orange-500/30 hover:shadow-[0_0_24px_rgba(249,115,22,0.15)]"
    >
      {cover && (
        <div className="relative aspect-[2/1] max-h-[160px] overflow-hidden border-b border-zinc-800">
          <StorageImage
            path={cover}
            alt={project.titulo}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="transition duration-200 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white transition group-hover:text-orange-400">
          {project.titulo}
        </h3>
        {project.empresa && <p className="mt-1 text-sm text-zinc-500">{project.empresa}</p>}
        {project.stack?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-orange-500/20 bg-orange-500/10 px-2 py-0.5 text-xs text-orange-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <span className="mt-4 inline-block text-sm text-orange-500">{label} →</span>
      </div>
    </Link>
  );
}
