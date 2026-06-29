import { FormEvent } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AdminLayout from '../../../Layout/AdminLayout';

type OutroLink = {
    label: string;
    url: string;
    icone?: string | null;
};

interface Contact {
    id: number;
    email: string;
    telefone: string | null;
    linkedin: string | null;
    github: string | null;
    portfolio: string | null;
    outros: OutroLink[] | null;
}

interface Props {
    contact: Contact;
}

interface PageProps {
    flash: {
        success?: string;
        error?: string;
    };
}

const inputClass =
    'w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-orange-500 focus:outline-none';

function fieldError(errors: Record<string, string>, key: string): string | undefined {
    return errors[key];
}

export default function Edit({ contact }: Props) {
    const { flash } = usePage<PageProps>().props;

    const { data, setData, put, processing, errors } = useForm({
        email: contact.email,
        telefone: contact.telefone ?? '',
        linkedin: contact.linkedin ?? '',
        github: contact.github ?? '',
        portfolio: contact.portfolio ?? '',
        outros: contact.outros ?? [],
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put('/admin/contact');
    };

    const addOutro = () => {
        setData('outros', [...data.outros, { label: '', url: '', icone: '' }]);
    };

    const removeOutro = (index: number) => {
        setData(
            'outros',
            data.outros.filter((_, i) => i !== index)
        );
    };

    const updateOutro = (index: number, field: keyof OutroLink, value: string) => {
        const updated = data.outros.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setData('outros', updated);
    };

    return (
        <AdminLayout title="Contato e redes">
            {flash.success && (
                <div className="mb-6 rounded-lg border border-green-800 bg-green-950/50 px-4 py-3 text-sm text-green-400">
                    {flash.success}
                </div>
            )}

            <form onSubmit={submit} className="max-w-2xl space-y-6">
                <section className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                    <h2 className="text-lg font-semibold text-zinc-50">Canais principais</h2>

                    <div>
                        <label className="mb-1 block text-sm text-zinc-400">E-mail *</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={inputClass}
                            required
                        />
                        {fieldError(errors, 'email') && (
                            <p className="mt-1 text-sm text-red-400">{fieldError(errors, 'email')}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm text-zinc-400">Telefone</label>
                        <input
                            type="text"
                            value={data.telefone}
                            onChange={(e) => setData('telefone', e.target.value)}
                            className={inputClass}
                            placeholder="+55 11 99999-9999"
                        />
                        {fieldError(errors, 'telefone') && (
                            <p className="mt-1 text-sm text-red-400">{fieldError(errors, 'telefone')}</p>
                        )}
                    </div>
                </section>

                <section className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                    <h2 className="text-lg font-semibold text-zinc-50">Redes e links</h2>

                    <div>
                        <label className="mb-1 block text-sm text-zinc-400">LinkedIn</label>
                        <input
                            type="url"
                            value={data.linkedin}
                            onChange={(e) => setData('linkedin', e.target.value)}
                            className={inputClass}
                            placeholder="https://linkedin.com/in/..."
                        />
                        {fieldError(errors, 'linkedin') && (
                            <p className="mt-1 text-sm text-red-400">{fieldError(errors, 'linkedin')}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm text-zinc-400">GitHub</label>
                        <input
                            type="url"
                            value={data.github}
                            onChange={(e) => setData('github', e.target.value)}
                            className={inputClass}
                            placeholder="https://github.com/..."
                        />
                        {fieldError(errors, 'github') && (
                            <p className="mt-1 text-sm text-red-400">{fieldError(errors, 'github')}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm text-zinc-400">Portfólio</label>
                        <input
                            type="url"
                            value={data.portfolio}
                            onChange={(e) => setData('portfolio', e.target.value)}
                            className={inputClass}
                            placeholder="https://maiconoliveiradev.com.br"
                        />
                        {fieldError(errors, 'portfolio') && (
                            <p className="mt-1 text-sm text-red-400">{fieldError(errors, 'portfolio')}</p>
                        )}
                    </div>
                </section>

                <section className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-zinc-50">Outros links</h2>
                        <button
                            type="button"
                            onClick={addOutro}
                            className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-orange-500 hover:text-orange-400"
                        >
                            + Adicionar
                        </button>
                    </div>

                    {data.outros.length === 0 && (
                        <p className="text-sm text-zinc-500">Nenhum link extra cadastrado.</p>
                    )}

                    {data.outros.map((item, index) => (
                        <div
                            key={index}
                            className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-950/50 p-4"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-zinc-400">Link {index + 1}</span>
                                <button
                                    type="button"
                                    onClick={() => removeOutro(index)}
                                    className="text-sm text-red-400 hover:text-red-300"
                                >
                                    Remover
                                </button>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-zinc-400">Rótulo</label>
                                <input
                                    type="text"
                                    value={item.label}
                                    onChange={(e) => updateOutro(index, 'label', e.target.value)}
                                    className={inputClass}
                                    placeholder="Ex: Twitter, Dev.to"
                                />
                                {fieldError(errors, `outros.${index}.label`) && (
                                    <p className="mt-1 text-sm text-red-400">
                                        {fieldError(errors, `outros.${index}.label`)}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-zinc-400">URL</label>
                                <input
                                    type="url"
                                    value={item.url}
                                    onChange={(e) => updateOutro(index, 'url', e.target.value)}
                                    className={inputClass}
                                    placeholder="https://..."
                                />
                                {fieldError(errors, `outros.${index}.url`) && (
                                    <p className="mt-1 text-sm text-red-400">
                                        {fieldError(errors, `outros.${index}.url`)}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm text-zinc-400">
                                    Ícone <span className="text-zinc-600">(opcional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={item.icone ?? ''}
                                    onChange={(e) => updateOutro(index, 'icone', e.target.value)}
                                    className={inputClass}
                                    placeholder="Ex: twitter, globe"
                                />
                                {fieldError(errors, `outros.${index}.icone`) && (
                                    <p className="mt-1 text-sm text-red-400">
                                        {fieldError(errors, `outros.${index}.icone`)}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </section>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-orange-500 px-6 py-2.5 font-medium text-white transition hover:bg-orange-600 disabled:opacity-50"
                    >
                        Salvar
                    </button>
                    {processing && <span className="text-sm text-zinc-500">Salvando...</span>}
                </div>
            </form>
        </AdminLayout>
    );
}
