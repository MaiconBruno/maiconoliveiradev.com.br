import { Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '../../../Layout/AdminLayout';

interface Experience {
    id: number;
    empresa: string;
    cargo: { pt: string | null; en: string | null };
    periodo_inicio: string | null;
    periodo_fim: string | null;
    ordem: number;
    publicado: boolean;
}

interface Props {
    experiences: Experience[];
}

interface PageProps {
    flash: { success?: string; error?: string };
}

function formatPeriodo(inicio: string | null, fim: string | null): string {
    if (!inicio && !fim) {
        return '—';
    }
    if (!fim) {
        return `${inicio ?? '?'} – atual`;
    }
    return `${inicio ?? '?'} – ${fim}`;
}

export default function Index({ experiences }: Props) {
    const { flash } = usePage<PageProps>().props;

    const destroy = (id: number, empresa: string) => {
        if (!confirm(`Remover a experiência em "${empresa}"?`)) {
            return;
        }
        router.delete(`/admin/experiences/${id}`);
    };

    return (
        <AdminLayout title="Experiências">
            {flash?.success && (
                <div className="mb-4 rounded-lg border border-green-800 bg-green-950/50 px-4 py-3 text-sm text-green-400">
                    {flash.success}
                </div>
            )}

            <div className="mb-4 flex justify-end">
                <Link
                    href="/admin/experiences/create"
                    className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                >
                    Nova experiência
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
                                Empresa
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-400">
                                Cargo
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-400">
                                Período
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-400">
                                Status
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium uppercase text-zinc-400">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 bg-zinc-950">
                        {experiences.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-sm text-zinc-500">
                                    Nenhuma experiência cadastrada.
                                </td>
                            </tr>
                        )}
                        {experiences.map((experience) => (
                            <tr key={experience.id}>
                                <td className="px-4 py-3 text-sm text-zinc-400">{experience.ordem}</td>
                                <td className="px-4 py-3 text-sm text-zinc-50">{experience.empresa}</td>
                                <td className="px-4 py-3 text-sm text-zinc-300">
                                    {experience.cargo?.pt ?? '—'}
                                </td>
                                <td className="px-4 py-3 text-sm text-zinc-400">
                                    {formatPeriodo(
                                        experience.periodo_inicio,
                                        experience.periodo_fim
                                    )}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs ${
                                            experience.publicado
                                                ? 'bg-green-500/10 text-green-400'
                                                : 'bg-zinc-800 text-zinc-500'
                                        }`}
                                    >
                                        {experience.publicado ? 'Publicado' : 'Rascunho'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right text-sm">
                                    <Link
                                        href={`/admin/experiences/${experience.id}/edit`}
                                        className="text-orange-400 hover:text-orange-300"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => destroy(experience.id, experience.empresa)}
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
