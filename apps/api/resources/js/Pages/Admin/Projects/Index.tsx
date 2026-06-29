import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layout/AdminLayout';
import FlashMessage from '../../../Components/FlashMessage';
import { ProjectRecord } from '../../../types/project';

interface Props {
    projects: ProjectRecord[];
}

const STATUS_STYLES: Record<string, string> = {
    draft: 'bg-zinc-700/50 text-zinc-300',
    published: 'bg-green-500/10 text-green-400',
    archived: 'bg-zinc-700/50 text-zinc-400',
};

const STATUS_LABELS: Record<string, string> = {
    draft: 'Rascunho',
    published: 'Publicado',
    archived: 'Arquivado',
};

export default function Index({ projects }: Props) {
    const handleDelete = (project: ProjectRecord) => {
        if (
            !confirm(
                `Excluir o projeto "${project.titulo?.pt ?? project.slug}"? Esta ação não pode ser desfeita.`
            )
        ) {
            return;
        }
        router.delete(`/admin/projects/${project.id}`);
    };

    return (
        <AdminLayout title="Projetos">
            <FlashMessage />

            <div className="mb-4 flex justify-end">
                <Link
                    href="/admin/projects/create"
                    className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                >
                    Novo projeto
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg border border-zinc-800">
                <table className="min-w-full divide-y divide-zinc-800">
                    <thead className="bg-zinc-900">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-400">
                                Ordem
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-400">
                                Título
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-400">
                                Slug
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-400">
                                Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-400">
                                Destaque
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium uppercase text-zinc-400">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 bg-zinc-950">
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-sm text-zinc-500">
                                    Nenhum projeto cadastrado.
                                </td>
                            </tr>
                        )}
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td className="px-4 py-3 text-sm text-zinc-400">{project.ordem}</td>
                                <td className="px-4 py-3 text-sm text-zinc-50">
                                    {project.titulo?.pt ?? project.slug}
                                </td>
                                <td className="px-4 py-3 text-sm text-zinc-400">{project.slug}</td>
                                <td className="px-4 py-3 text-sm">
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs ${STATUS_STYLES[project.status] ?? STATUS_STYLES.draft}`}
                                    >
                                        {STATUS_LABELS[project.status] ?? project.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    {project.destaque ? (
                                        <span className="text-orange-400">★</span>
                                    ) : (
                                        <span className="text-zinc-600">—</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-right text-sm">
                                    <Link
                                        href={`/admin/projects/${project.id}/edit`}
                                        className="text-orange-400 hover:text-orange-300"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(project)}
                                        className="ml-4 text-red-400 hover:text-red-300"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
