import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layout/AdminLayout';

interface SeoMeta {
    id: number;
    rota: string;
    title: { pt: string | null; en: string | null };
    noindex: boolean;
    og_image_url: string | null;
}

interface Props {
    seoMetas: SeoMeta[];
}

export default function Index({ seoMetas }: Props) {
    const handleDelete = (seoMeta: SeoMeta) => {
        const label = seoMeta.title?.pt ?? seoMeta.rota;
        if (!confirm(`Remover SEO de "${label}" (${seoMeta.rota})?`)) {
            return;
        }
        router.delete(`/admin/seo/${seoMeta.id}`);
    };

    return (
        <AdminLayout title="SEO">
            <div className="mb-4 flex justify-end">
                <Link
                    href="/admin/seo/create"
                    className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                >
                    Nova rota
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg border border-zinc-800">
                <table className="min-w-full divide-y divide-zinc-800">
                    <thead className="bg-zinc-900">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-400">
                                Rota
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-400">
                                Title (PT)
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-400">
                                OG Image
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-400">
                                Noindex
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium uppercase text-zinc-400">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 bg-zinc-950">
                        {seoMetas.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-8 text-center text-sm text-zinc-500"
                                >
                                    Nenhuma rota SEO cadastrada.
                                </td>
                            </tr>
                        ) : (
                            seoMetas.map((seoMeta) => (
                                <tr key={seoMeta.id}>
                                    <td className="px-4 py-3 font-mono text-sm text-orange-400">
                                        {seoMeta.rota}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-zinc-50">
                                        {seoMeta.title?.pt ?? '—'}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-zinc-400">
                                        {seoMeta.og_image_url ? (
                                            <img
                                                src={seoMeta.og_image_url}
                                                alt=""
                                                className="h-8 w-8 rounded object-cover"
                                            />
                                        ) : (
                                            '—'
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        {seoMeta.noindex ? (
                                            <span className="rounded-full bg-red-500/10 px-2 py-1 text-xs text-red-400">
                                                Sim
                                            </span>
                                        ) : (
                                            <span className="text-zinc-500">Não</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-right text-sm">
                                        <Link
                                            href={`/admin/seo/${seoMeta.id}/edit`}
                                            className="text-orange-400 hover:text-orange-300"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(seoMeta)}
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
