import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layout/AdminLayout';

interface Education {
    id: number;
    grau: { pt: string | null; en: string | null };
    instituicao: string;
    periodo: string | null;
    status: { pt: string | null; en: string | null } | null;
    ordem: number;
}

interface Props {
    educations: Education[];
}

export default function Index({ educations }: Props) {
    const handleDelete = (education: Education) => {
        const label = education.grau?.pt ?? education.instituicao;
        if (!confirm(`Remover "${label}"?`)) {
            return;
        }
        router.delete(`/admin/educations/${education.id}`);
    };

    return (
        <AdminLayout title="Formação acadêmica">
            <div className="mb-4 flex justify-end">
                <Link
                    href="/admin/educations/create"
                    className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                >
                    Nova formação
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
                                Grau
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-400">
                                Instituição
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
                        {educations.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-sm text-zinc-500">
                                    Nenhuma formação cadastrada.
                                </td>
                            </tr>
                        ) : (
                            educations.map((education) => (
                                <tr key={education.id}>
                                    <td className="px-4 py-3 text-sm text-zinc-400">
                                        {education.ordem}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-zinc-50">
                                        {education.grau?.pt ?? '—'}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-zinc-400">
                                        {education.instituicao}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-zinc-400">
                                        {education.periodo ?? '—'}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        {education.status?.pt ? (
                                            <span className="rounded-full bg-orange-500/10 px-2 py-1 text-xs text-orange-400">
                                                {education.status.pt}
                                            </span>
                                        ) : (
                                            '—'
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-right text-sm">
                                        <Link
                                            href={`/admin/educations/${education.id}/edit`}
                                            className="text-orange-400 hover:text-orange-300"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(education)}
                                            className="ml-4 text-red-400 hover:text-red-300"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
