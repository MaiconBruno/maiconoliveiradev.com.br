import { FormEvent } from 'react';
import { Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layout/AdminLayout';

interface Props {
    categoryLabels: Record<string, string>;
    nivelLabels: Record<string, string>;
}

const inputClass =
    'w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-orange-500 focus:outline-none';

function fieldError(errors: Record<string, string>, key: string): string | undefined {
    return errors[key];
}

export default function Create({ categoryLabels, nivelLabels }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        nome: '',
        categoria: Object.keys(categoryLabels)[0] ?? 'linguagens',
        nivel: '',
        ordem: 0,
        destaque: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/skills');
    };

    return (
        <AdminLayout title="Nova skill">
            <form onSubmit={submit} className="max-w-xl space-y-6">
                <section className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                    <div>
                        <label className="mb-1 block text-sm text-zinc-400">Nome *</label>
                        <input
                            type="text"
                            value={data.nome}
                            onChange={(e) => setData('nome', e.target.value)}
                            className={inputClass}
                            placeholder="Ex: React, Laravel, PostgreSQL"
                            required
                        />
                        {fieldError(errors, 'nome') && (
                            <p className="mt-1 text-sm text-red-400">{fieldError(errors, 'nome')}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm text-zinc-400">Categoria *</label>
                        <select
                            value={data.categoria}
                            onChange={(e) => setData('categoria', e.target.value)}
                            className={inputClass}
                        >
                            {Object.entries(categoryLabels).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        {fieldError(errors, 'categoria') && (
                            <p className="mt-1 text-sm text-red-400">{fieldError(errors, 'categoria')}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm text-zinc-400">
                            Nível <span className="text-zinc-600">(opcional)</span>
                        </label>
                        <select
                            value={data.nivel}
                            onChange={(e) => setData('nivel', e.target.value)}
                            className={inputClass}
                        >
                            <option value="">— Sem nível —</option>
                            {Object.entries(nivelLabels).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        {fieldError(errors, 'nivel') && (
                            <p className="mt-1 text-sm text-red-400">{fieldError(errors, 'nivel')}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm text-zinc-400">Ordem *</label>
                        <input
                            type="number"
                            min={0}
                            value={data.ordem}
                            onChange={(e) => setData('ordem', parseInt(e.target.value, 10) || 0)}
                            className={inputClass}
                        />
                        {fieldError(errors, 'ordem') && (
                            <p className="mt-1 text-sm text-red-400">{fieldError(errors, 'ordem')}</p>
                        )}
                    </div>

                    <label className="flex cursor-pointer items-center gap-3">
                        <input
                            type="checkbox"
                            checked={data.destaque}
                            onChange={(e) => setData('destaque', e.target.checked)}
                            className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-sm text-zinc-300">
                            Destaque na home e página sobre
                        </span>
                    </label>
                </section>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-orange-500 px-6 py-2.5 font-medium text-white transition hover:bg-orange-600 disabled:opacity-50"
                    >
                        Criar skill
                    </button>
                    <Link
                        href="/admin/skills"
                        className="text-sm text-zinc-400 hover:text-orange-400"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
