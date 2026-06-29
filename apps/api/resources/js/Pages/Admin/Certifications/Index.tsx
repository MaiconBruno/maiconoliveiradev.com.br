import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layout/AdminLayout';

interface Certification {
    id: number;
    titulo: { pt: string | null; en: string | null };
    emissor: string | null;
    ordem: number;
}

interface Props {
    certifications: Certification[];
}

export default function Index({ certifications }: Props) {

    const handleDelete = (certification: Certification) => {
        const label = certification.titulo?.pt ?? 'esta certificação';
        if (!confirm(`Remover "${label}"?`)) {
            return;
        }
        router.delete(`/admin/certifications/${certification.id}`);
    };

    return (
        <AdminLayout title="Certificações">
            <div className="mb-4 flex justify-end">
                <Link
                    href="/admin/certifications/create"
                    className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                >
                    Nova certificação
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
                                Emissor
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium uppercase text-zinc-400">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 bg-zinc-950">
                        {certifications.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-sm text-zinc-500">
                                    Nenhuma certificação cadastrada.
                                </td>
                            </tr>
                        ) : (
                            certifications.map((certification) => (
                                <tr key={certification.id}>
                                    <td className="px-4 py-3 text-sm text-zinc-400">
                                        {certification.ordem}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-zinc-50">
                                        {certification.titulo?.pt ?? '—'}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-zinc-400">
                                        {certification.emissor ?? '—'}
                                    </td>
                                    <td className="px-4 py-3 text-right text-sm">
                                        <Link
                                            href={`/admin/certifications/${certification.id}/edit`}
                                            className="text-orange-400 hover:text-orange-300"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(certification)}
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
