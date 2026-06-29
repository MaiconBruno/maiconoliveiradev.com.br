import { FormEvent, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import GenerateAllEnButton from '../../../Components/GenerateAllEnButton';
import ImageUpload from '../../../Components/ImageUpload';
import LocaleField from '../../../Components/LocaleField';
import AdminLayout from '../../../Layout/AdminLayout';

type Bilingual = {
    pt: string;
    en: string;
};

type Cta = {
    label: Bilingual;
    url: string;
    externo: boolean;
};

interface Profile {
    id: number;
    nome_completo: string;
    headline: Bilingual;
    localizacao: string | null;
    modelo_trabalho: Bilingual;
    anos_experiencia: string | null;
    bio_resumo: Bilingual;
    bio_longa: Bilingual;
    foto: string | null;
    foto_url: string | null;
    cta_primario: Cta;
    cta_secundario: Cta;
    curriculo_pdf: string | null;
    curriculo_pdf_url: string | null;
}

interface Props {
    profile: Profile;
}

const inputClass =
    'w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-orange-500 focus:outline-none';

function fieldError(errors: Record<string, string>, key: string): string | undefined {
    return errors[key];
}

function CtaFields({
    title,
    value,
    onChange,
    errors,
    fieldKey,
}: {
    title: string;
    value: Cta;
    onChange: (value: Cta) => void;
    errors: Record<string, string>;
    fieldKey: string;
}) {
    return (
        <div className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
            <h3 className="text-sm font-semibold text-zinc-300">{title}</h3>

            <LocaleField
                label="Rótulo do botão"
                value={value.label}
                onChange={(label) => onChange({ ...value, label })}
                error={fieldError(errors, `${fieldKey}.label.pt`)}
            />

            <div>
                <label className="mb-1 block text-sm text-zinc-400">URL</label>
                <input
                    type="text"
                    value={value.url}
                    onChange={(e) => onChange({ ...value, url: e.target.value })}
                    className={inputClass}
                    placeholder="/contato ou https://..."
                />
                {fieldError(errors, `${fieldKey}.url`) && (
                    <p className="mt-1 text-sm text-red-400">{fieldError(errors, `${fieldKey}.url`)}</p>
                )}
            </div>

            <label className="flex items-center gap-2 text-sm text-zinc-400">
                <input
                    type="checkbox"
                    checked={value.externo}
                    onChange={(e) => onChange({ ...value, externo: e.target.checked })}
                    className="rounded border-zinc-600 bg-zinc-800 text-orange-500 focus:ring-orange-500"
                />
                Abrir em nova aba (link externo)
            </label>
        </div>
    );
}

export default function Edit({ profile }: Props) {
    const pdfInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, put, processing, errors } = useForm({
        nome_completo: profile.nome_completo,
        headline: profile.headline,
        localizacao: profile.localizacao ?? '',
        modelo_trabalho: profile.modelo_trabalho,
        anos_experiencia: profile.anos_experiencia ?? '',
        bio_resumo: profile.bio_resumo,
        bio_longa: profile.bio_longa,
        foto: profile.foto,
        cta_primario: profile.cta_primario,
        cta_secundario: profile.cta_secundario,
        curriculo_pdf_file: null as File | null,
        remove_curriculo_pdf: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();

        put('/admin/profile', {
            forceFormData: Boolean(data.curriculo_pdf_file),
            preserveScroll: true,
        });
    };

    const ptFields: Record<string, string> = {};
    const existingEn: Record<string, string> = {};

    const track = (key: string, value: Bilingual) => {
        if (value.pt.trim()) {
            ptFields[key] = value.pt;
            existingEn[key] = value.en;
        }
    };

    track('headline', data.headline);
    track('modelo_trabalho', data.modelo_trabalho);
    track('bio_resumo', data.bio_resumo);
    track('bio_longa', data.bio_longa);
    track('cta_primario.label', data.cta_primario.label);
    track('cta_secundario.label', data.cta_secundario.label);

    const handleAllTranslated = (translations: Record<string, string>) => {
        if (translations.headline !== undefined) {
            setData('headline', { ...data.headline, en: translations.headline });
        }
        if (translations.modelo_trabalho !== undefined) {
            setData('modelo_trabalho', {
                ...data.modelo_trabalho,
                en: translations.modelo_trabalho,
            });
        }
        if (translations.bio_resumo !== undefined) {
            setData('bio_resumo', { ...data.bio_resumo, en: translations.bio_resumo });
        }
        if (translations.bio_longa !== undefined) {
            setData('bio_longa', { ...data.bio_longa, en: translations.bio_longa });
        }
        if (translations['cta_primario.label'] !== undefined) {
            setData('cta_primario', {
                ...data.cta_primario,
                label: {
                    ...data.cta_primario.label,
                    en: translations['cta_primario.label'],
                },
            });
        }
        if (translations['cta_secundario.label'] !== undefined) {
            setData('cta_secundario', {
                ...data.cta_secundario,
                label: {
                    ...data.cta_secundario.label,
                    en: translations['cta_secundario.label'],
                },
            });
        }
    };

    return (
        <AdminLayout title="Hero / Sobre">
            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <div className="flex justify-end">
                    <GenerateAllEnButton
                        ptFields={ptFields}
                        existingEn={existingEn}
                        onTranslated={handleAllTranslated}
                    />
                </div>

                <section className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                    <h2 className="text-lg font-semibold text-zinc-50">Hero</h2>

                    <div>
                        <label className="mb-1 block text-sm text-zinc-400">Nome completo *</label>
                        <input
                            type="text"
                            value={data.nome_completo}
                            onChange={(e) => setData('nome_completo', e.target.value)}
                            className={inputClass}
                            required
                        />
                        {fieldError(errors, 'nome_completo') && (
                            <p className="mt-1 text-sm text-red-400">{fieldError(errors, 'nome_completo')}</p>
                        )}
                    </div>

                    <LocaleField
                        label="Headline *"
                        value={data.headline}
                        onChange={(headline) => setData('headline', headline)}
                        error={fieldError(errors, 'headline.pt')}
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm text-zinc-400">Localização</label>
                            <input
                                type="text"
                                value={data.localizacao}
                                onChange={(e) => setData('localizacao', e.target.value)}
                                className={inputClass}
                                placeholder="Rio de Janeiro, RJ · Brasil"
                            />
                            {fieldError(errors, 'localizacao') && (
                                <p className="mt-1 text-sm text-red-400">{fieldError(errors, 'localizacao')}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm text-zinc-400">Anos de experiência</label>
                            <input
                                type="text"
                                value={data.anos_experiencia}
                                onChange={(e) => setData('anos_experiencia', e.target.value)}
                                className={inputClass}
                                placeholder="8+"
                            />
                            {fieldError(errors, 'anos_experiencia') && (
                                <p className="mt-1 text-sm text-red-400">{fieldError(errors, 'anos_experiencia')}</p>
                            )}
                        </div>
                    </div>

                    <LocaleField
                        label="Modelo de trabalho"
                        value={data.modelo_trabalho}
                        onChange={(modelo_trabalho) => setData('modelo_trabalho', modelo_trabalho)}
                        error={fieldError(errors, 'modelo_trabalho.pt')}
                    />

                    <ImageUpload
                        label="Foto de perfil"
                        folder="profile"
                        value={data.foto}
                        onChange={(path) => setData('foto', path)}
                    />
                    {fieldError(errors, 'foto') && (
                        <p className="text-sm text-red-400">{fieldError(errors, 'foto')}</p>
                    )}

                    <CtaFields
                        title="CTA primário"
                        value={data.cta_primario}
                        onChange={(cta_primario) => setData('cta_primario', cta_primario)}
                        errors={errors}
                        fieldKey="cta_primario"
                    />

                    <CtaFields
                        title="CTA secundário"
                        value={data.cta_secundario}
                        onChange={(cta_secundario) => setData('cta_secundario', cta_secundario)}
                        errors={errors}
                        fieldKey="cta_secundario"
                    />
                </section>

                <section className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                    <h2 className="text-lg font-semibold text-zinc-50">Sobre</h2>

                    <LocaleField
                        label="Bio resumo"
                        type="markdown"
                        rows={6}
                        value={data.bio_resumo}
                        onChange={(bio_resumo) => setData('bio_resumo', bio_resumo)}
                        error={fieldError(errors, 'bio_resumo.pt')}
                    />

                    <LocaleField
                        label="Bio longa"
                        type="markdown"
                        rows={8}
                        value={data.bio_longa}
                        onChange={(bio_longa) => setData('bio_longa', bio_longa)}
                        error={fieldError(errors, 'bio_longa.pt')}
                    />

                    <div className="space-y-2">
                        <span className="block text-sm font-medium text-zinc-300">Currículo (PDF)</span>

                        {profile.curriculo_pdf_url && !data.remove_curriculo_pdf && !data.curriculo_pdf_file && (
                            <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/50 px-4 py-3">
                                <a
                                    href={profile.curriculo_pdf_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-orange-400 hover:text-orange-300"
                                >
                                    Ver currículo atual
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setData('remove_curriculo_pdf', true)}
                                    className="text-sm text-red-400 hover:text-red-300"
                                >
                                    Remover
                                </button>
                            </div>
                        )}

                        {(!profile.curriculo_pdf_url || data.remove_curriculo_pdf || data.curriculo_pdf_file) && (
                            <div
                                onClick={() => pdfInputRef.current?.click()}
                                className="flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-900/50 px-4 py-4 text-center transition hover:border-orange-500/60"
                            >
                                <p className="text-sm text-zinc-300">
                                    {data.curriculo_pdf_file
                                        ? data.curriculo_pdf_file.name
                                        : 'Clique para selecionar um PDF'}
                                </p>
                                <p className="mt-1 text-xs text-zinc-500">Máx. 5 MB</p>
                            </div>
                        )}

                        <input
                            ref={pdfInputRef}
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                setData('curriculo_pdf_file', file);
                                if (file) {
                                    setData('remove_curriculo_pdf', false);
                                }
                            }}
                        />

                        {fieldError(errors, 'curriculo_pdf_file') && (
                            <p className="text-sm text-red-400">{fieldError(errors, 'curriculo_pdf_file')}</p>
                        )}
                    </div>
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
