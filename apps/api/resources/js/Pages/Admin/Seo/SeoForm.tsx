import { FormEvent } from 'react';
import BilingualField from '../../../Components/BilingualField';
import GenerateAllEnButton from '../../../Components/GenerateAllEnButton';
import ImageUpload from '../../../Components/ImageUpload';

export interface SeoFormData {
    rota: string;
    title: { pt: string; en: string };
    description: { pt: string; en: string };
    og_title: { pt: string; en: string };
    og_description: { pt: string; en: string };
    og_image: string | null;
    remove_og_image: boolean;
    canonical: string;
    noindex: boolean;
}

interface SeoFormProps {
    data: SeoFormData;
    setData: <K extends keyof SeoFormData>(key: K, value: SeoFormData[K]) => void;
    errors: Partial<Record<string, string>>;
    processing: boolean;
    submitLabel: string;
    onSubmit: (e: FormEvent) => void;
    onCancel: () => void;
    rotaReadonly?: boolean;
    suggestedRoutes?: string[];
}

const inputClass =
    'w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-orange-500 focus:outline-none';

export default function SeoForm({
    data,
    setData,
    errors,
    processing,
    submitLabel,
    onSubmit,
    onCancel,
    rotaReadonly = false,
    suggestedRoutes = [],
}: SeoFormProps) {
    const ptFields: Record<string, string> = {};
    const existingEn: Record<string, string> = {};

    const track = (key: string, value: { pt: string; en: string }) => {
        if (value.pt.trim()) {
            ptFields[key] = value.pt;
            existingEn[key] = value.en;
        }
    };

    track('title', data.title);
    track('description', data.description);
    track('og_title', data.og_title);
    track('og_description', data.og_description);

    const handleAllTranslated = (translations: Record<string, string>) => {
        if (translations.title !== undefined) {
            setData('title', { ...data.title, en: translations.title });
        }
        if (translations.description !== undefined) {
            setData('description', { ...data.description, en: translations.description });
        }
        if (translations.og_title !== undefined) {
            setData('og_title', { ...data.og_title, en: translations.og_title });
        }
        if (translations.og_description !== undefined) {
            setData('og_description', {
                ...data.og_description,
                en: translations.og_description,
            });
        }
    };

    return (
        <form onSubmit={onSubmit} className="max-w-3xl space-y-6">
            <div className="flex justify-end">
                <GenerateAllEnButton
                    ptFields={ptFields}
                    existingEn={existingEn}
                    onTranslated={handleAllTranslated}
                />
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 space-y-4">
                <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-400">
                    Rota
                </h2>
                {rotaReadonly ? (
                    <p className="font-mono text-sm text-orange-400">{data.rota}</p>
                ) : (
                    <>
                        <input
                            type="text"
                            value={data.rota}
                            onChange={(e) => setData('rota', e.target.value)}
                            placeholder="/pt/projetos"
                            className={inputClass}
                            required
                        />
                        {errors.rota && (
                            <p className="text-sm text-red-400">{errors.rota}</p>
                        )}
                        {suggestedRoutes.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs text-zinc-500">Sugestões:</span>
                                {suggestedRoutes.map((route) => (
                                    <button
                                        key={route}
                                        type="button"
                                        onClick={() => setData('rota', route)}
                                        className="rounded-md border border-zinc-700 px-2 py-1 font-mono text-xs text-zinc-400 transition hover:border-orange-500/50 hover:text-orange-400"
                                    >
                                        {route}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 space-y-4">
                <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-400">
                    Meta tags
                </h2>
                <BilingualField
                    label="Title"
                    value={data.title}
                    onChange={(value) => setData('title', value)}
                    required
                    errors={{ pt: errors['title.pt'], en: errors['title.en'] }}
                />
                <BilingualField
                    label="Description"
                    value={data.description}
                    onChange={(value) => setData('description', value)}
                    multiline
                    rows={3}
                    errors={{
                        pt: errors['description.pt'],
                        en: errors['description.en'],
                    }}
                />
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 space-y-4">
                <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-400">
                    Open Graph
                </h2>
                <BilingualField
                    label="OG Title"
                    value={data.og_title}
                    onChange={(value) => setData('og_title', value)}
                    errors={{ pt: errors['og_title.pt'], en: errors['og_title.en'] }}
                />
                <BilingualField
                    label="OG Description"
                    value={data.og_description}
                    onChange={(value) => setData('og_description', value)}
                    multiline
                    rows={3}
                    errors={{
                        pt: errors['og_description.pt'],
                        en: errors['og_description.en'],
                    }}
                />
                <ImageUpload
                    label="OG Image"
                    folder="seo"
                    value={data.og_image}
                    onChange={(path) => {
                        setData('og_image', path);
                        setData('remove_og_image', path === null);
                    }}
                />
                {errors.og_image && (
                    <p className="text-sm text-red-400">{errors.og_image}</p>
                )}
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 space-y-4">
                <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-400">
                    Avançado
                </h2>
                <div>
                    <label className="mb-1 block text-sm text-zinc-400">Canonical URL</label>
                    <input
                        type="url"
                        value={data.canonical}
                        onChange={(e) => setData('canonical', e.target.value)}
                        placeholder="https://maiconoliveiradev.com.br/pt"
                        className={inputClass}
                    />
                    {errors.canonical && (
                        <p className="mt-1 text-sm text-red-400">{errors.canonical}</p>
                    )}
                </div>
                <label className="flex items-center gap-2 text-sm text-zinc-300">
                    <input
                        type="checkbox"
                        checked={data.noindex}
                        onChange={(e) => setData('noindex', e.target.checked)}
                        className="rounded border-zinc-600 bg-zinc-800 text-orange-500 focus:ring-orange-500"
                    />
                    Noindex (não indexar esta página)
                </label>
            </div>

            <div className="flex items-center gap-4">
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50"
                >
                    {submitLabel}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-sm text-zinc-400 hover:text-zinc-300"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}
