import { FormEvent } from 'react';
import GenerateAllEnButton from '../../../Components/GenerateAllEnButton';
import LocaleField from '../../../Components/LocaleField';

export interface EducationFormData {
    grau: { pt: string; en: string };
    instituicao: string;
    periodo: string;
    status: { pt: string; en: string };
    ordem: number;
}

interface EducationFormProps {
    data: EducationFormData;
    setData: <K extends keyof EducationFormData>(
        key: K,
        value: EducationFormData[K],
    ) => void;
    errors: Partial<Record<string, string>>;
    processing: boolean;
    submitLabel: string;
    onSubmit: (e: FormEvent) => void;
    onCancel: () => void;
}

export default function EducationForm({
    data,
    setData,
    errors,
    processing,
    submitLabel,
    onSubmit,
    onCancel,
}: EducationFormProps) {
    const ptFields: Record<string, string> = {};
    const existingEn: Record<string, string> = {};

    if (data.grau.pt.trim()) {
        ptFields.grau = data.grau.pt;
        existingEn.grau = data.grau.en;
    }
    if (data.status.pt.trim()) {
        ptFields.status = data.status.pt;
        existingEn.status = data.status.en;
    }

    const handleAllTranslated = (translations: Record<string, string>) => {
        if (translations.grau !== undefined) {
            setData('grau', { ...data.grau, en: translations.grau });
        }
        if (translations.status !== undefined) {
            setData('status', { ...data.status, en: translations.status });
        }
    };

    return (
        <form onSubmit={onSubmit} className="max-w-2xl space-y-6">
            <div className="flex justify-end">
                <GenerateAllEnButton
                    ptFields={ptFields}
                    existingEn={existingEn}
                    onTranslated={handleAllTranslated}
                />
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <LocaleField
                    label="Grau / Curso"
                    value={data.grau}
                    onChange={(grau) => setData('grau', grau)}
                    placeholder="Ex.: Tecnólogo em Análise e Desenvolvimento de Sistemas"
                    error={errors['grau.pt']}
                />
            </div>

            <div>
                <label className="mb-1 block text-sm text-zinc-400">Instituição</label>
                <input
                    type="text"
                    value={data.instituicao}
                    onChange={(e) => setData('instituicao', e.target.value)}
                    placeholder="Ex.: Universidade Estácio de Sá (UNESA)"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
                />
                {errors.instituicao && (
                    <p className="mt-1 text-sm text-red-400">{errors.instituicao}</p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm text-zinc-400">Período</label>
                <input
                    type="text"
                    value={data.periodo}
                    onChange={(e) => setData('periodo', e.target.value)}
                    placeholder="Ex.: jan/2024 – jun/2026"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
                />
                {errors.periodo && (
                    <p className="mt-1 text-sm text-red-400">{errors.periodo}</p>
                )}
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <LocaleField
                    label="Status"
                    value={data.status}
                    onChange={(status) => setData('status', status)}
                    placeholder="Ex.: Concluído, Em andamento"
                    error={errors['status.pt']}
                />
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
