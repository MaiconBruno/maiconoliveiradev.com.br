import { FormEvent } from 'react';
import GenerateAllEnButton from '../../../Components/GenerateAllEnButton';
import LocaleField from '../../../Components/LocaleField';

export interface CertificationFormData {
    titulo: { pt: string; en: string };
    emissor: string;
    ordem: number;
}

interface CertificationFormProps {
    data: CertificationFormData;
    setData: <K extends keyof CertificationFormData>(
        key: K,
        value: CertificationFormData[K],
    ) => void;
    errors: Partial<Record<string, string>>;
    processing: boolean;
    submitLabel: string;
    onSubmit: (e: FormEvent) => void;
    onCancel: () => void;
}

export default function CertificationForm({
    data,
    setData,
    errors,
    processing,
    submitLabel,
    onSubmit,
    onCancel,
}: CertificationFormProps) {
    const ptFields = data.titulo.pt.trim() ? { titulo: data.titulo.pt } : {};
    const existingEn = data.titulo.en.trim() ? { titulo: data.titulo.en } : {};

    return (
        <form onSubmit={onSubmit} className="max-w-2xl space-y-6">
            <div className="flex justify-end">
                <GenerateAllEnButton
                    ptFields={ptFields}
                    existingEn={existingEn}
                    onTranslated={(translations) => {
                        if (translations.titulo !== undefined) {
                            setData('titulo', {
                                ...data.titulo,
                                en: translations.titulo,
                            });
                        }
                    }}
                />
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <LocaleField
                    label="Título"
                    value={data.titulo}
                    onChange={(titulo) => setData('titulo', titulo)}
                    error={errors['titulo.pt']}
                />
            </div>

            <div>
                <label className="mb-1 block text-sm text-zinc-400">Emissor</label>
                <input
                    type="text"
                    value={data.emissor}
                    onChange={(e) => setData('emissor', e.target.value)}
                    placeholder="Ex.: Google, SENAI"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
                />
                {errors.emissor && (
                    <p className="mt-1 text-sm text-red-400">{errors.emissor}</p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm text-zinc-400">Ordem</label>
                <input
                    type="number"
                    min={0}
                    value={data.ordem}
                    onChange={(e) => setData('ordem', parseInt(e.target.value, 10) || 0)}
                    className="w-32 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
                />
                {errors.ordem && (
                    <p className="mt-1 text-sm text-red-400">{errors.ordem}</p>
                )}
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
