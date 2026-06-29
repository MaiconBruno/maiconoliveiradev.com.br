import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layout/AdminLayout';

interface Skill {
    id: number;
    nome: string;
    categoria: string;
    nivel: string | null;
    ordem: number;
    destaque: boolean;
}

interface Props {
    skills: Skill[];
    categoryLabels: Record<string, string>;
}

export default function Index({ skills, categoryLabels }: Props) {
    const grouped = Object.keys(categoryLabels).reduce<Record<string, Skill[]>>((acc, key) => {
        const items = skills.filter((s) => s.categoria === key);
        if (items.length > 0) {
            acc[key] = items;
        }
        return acc;
    }, {});

    const uncategorized = skills.filter((s) => !(s.categoria in categoryLabels));
    if (uncategorized.length > 0) {
        grouped['outros'] = uncategorized;
    }

    const destroy = (skill: Skill) => {
        if (!confirm(`Remover a skill "${skill.nome}"?`)) {
            return;
        }
        router.delete(`/admin/skills/${skill.id}`);
    };

    return (
        <AdminLayout title="Skills">
            <div className="mb-4 flex justify-end">
                <Link
                    href="/admin/skills/create"
                    className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                >
                    Nova skill
                </Link>
            </div>

            <div className="space-y-8">
                {Object.entries(grouped).map(([categoria, items]) => (
                    <section key={categoria}>
                        <h2 className="mb-3 text-lg font-semibold text-orange-400">
                            {categoryLabels[categoria] ?? categoria}
                            <span className="ml-2 text-sm font-normal text-zinc-500">
                                ({items.length})
                            </span>
                        </h2>

                        <div className="overflow-hidden rounded-lg border border-zinc-800">
                            <table className="min-w-full divide-y divide-zinc-800">
                                <thead className="bg-zinc-900">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-400">
                                            Nome
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-400">
                                            Nível
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase text-zinc-400">
                                            Ordem
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
                                    {items.map((skill) => (
                                        <tr key={skill.id}>
                                            <td className="px-4 py-3 text-sm font-medium text-zinc-50">
                                                {skill.nome}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-zinc-400">
                                                {skill.nivel ?? '—'}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-zinc-400">
                                                {skill.ordem}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {skill.destaque ? (
                                                    <span className="rounded-full bg-orange-500/10 px-2 py-1 text-xs text-orange-400">
                                                        Sim
                                                    </span>
                                                ) : (
                                                    <span className="text-zinc-600">—</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-right text-sm">
                                                <Link
                                                    href={`/admin/skills/${skill.id}/edit`}
                                                    className="text-orange-400 hover:text-orange-300"
                                                >
                                                    Editar
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => destroy(skill)}
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
                    </section>
                ))}

                {skills.length === 0 && (
                    <p className="text-center text-sm text-zinc-500">
                        Nenhuma skill cadastrada.{' '}
                        <Link href="/admin/skills/create" className="text-orange-400 hover:text-orange-300">
                            Criar a primeira
                        </Link>
                    </p>
                )}
            </div>
        </AdminLayout>
    );
}
