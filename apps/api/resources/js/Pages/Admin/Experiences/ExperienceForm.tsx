import { FormEvent, useState } from 'react';
import { useForm } from '@inertiajs/react';
import GenerateAllEnButton from '../../../Components/GenerateAllEnButton';
import LocaleField from '../../../Components/LocaleField';

export interface BilingualField {
    pt: string;
    en: string;
}

export interface ResponsabilidadeItem {
    pt: string;
    en: string;
}

export interface MetricaItem {
    label: BilingualField;
    valor: string;
}

export interface ExperienceFormData {
    empresa: string;
    cargo: BilingualField;
    periodo_inicio: string;
    periodo_fim: string;
    modelo: string;
    tipo: string;
    descricao: BilingualField;
    responsabilidades: ResponsabilidadeItem[];
    stack: string[];
    metricas: MetricaItem[];
    ordem: number;
    publicado: boolean;
}

interface ExperienceFormProps {
    initialData: ExperienceFormData;
    submitUrl: string;
    method?: 'post' | 'put';
    submitLabel: string;
}

const inputClass =
    'w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-orange-500 focus:outline-none';
const labelClass = 'mb-1 block text-sm text-zinc-400';

function emptyResponsabilidade(): ResponsabilidadeItem {
    return { pt: '', en: '' };
}

function emptyMetrica(): MetricaItem {
    return { label: { pt: '', en: '' }, valor: '' };
}

export default function ExperienceForm({
    initialData,
    submitUrl,
    method = 'post',
    submitLabel,
}: ExperienceFormProps) {
    const { data, setData, post, put, processing, errors } = useForm(initialData);
    const [stackInput, setStackInput] = useState('');

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (method === 'put') {
            put(submitUrl);
        } else {
            post(submitUrl);
        }
    };

    const addStackTag = () => {
        const tag = stackInput.trim();
        if (!tag || data.stack.includes(tag)) {
            return;
        }
        setData('stack', [...data.stack, tag]);
        setStackInput('');
    };

    const removeStackTag = (index: number) => {
        setData(
            'stack',
            data.stack.filter((_, i) => i !== index)
        );
    };

    const addResponsabilidade = () => {
        setData('responsabilidades', [...data.responsabilidades, emptyResponsabilidade()]);
    };

    const removeResponsabilidade = (index: number) => {
        setData(
            'responsabilidades',
            data.responsabilidades.filter((_, i) => i !== index)
        );
    };

    const updateMetrica = (index: number, field: 'valor', value: string) => {
        const updated = [...data.metricas];
        updated[index] = { ...updated[index], valor: value };
        setData('metricas', updated);
    };

    const addMetrica = () => {
        setData('metricas', [...data.metricas, emptyMetrica()]);
    };

    const removeMetrica = (index: number) => {
        setData(
            'metricas',
            data.metricas.filter((_, i) => i !== index)
        );
    };

    const fieldError = (key: string) =>
        (errors as Record<string, string>)[key] ? (
            <p className="mt-1 text-sm text-red-400">{(errors as Record<string, string>)[key]}</p>
        ) : null;

    const collectTranslatablePt = (): Record<string, string> => {
        const fields: Record<string, string> = {};

        if (data.cargo.pt.trim()) fields.cargo = data.cargo.pt;
        if (data.descricao.pt.trim()) fields.descricao = data.descricao.pt;

        data.responsabilidades.forEach((item, index) => {
            if (item.pt.trim()) {
                fields[`responsabilidades.${index}`] = item.pt;
            }
        });

        data.metricas.forEach((item, index) => {
            if (item.label.pt.trim()) {
                fields[`metricas.${index}.label`] = item.label.pt;
            }
        });

        return fields;
    };

    const collectExistingEn = (): Record<string, string> => {
        const fields: Record<string, string> = {};

        if (data.cargo.en.trim()) fields.cargo = data.cargo.en;
        if (data.descricao.en.trim()) fields.descricao = data.descricao.en;

        data.responsabilidades.forEach((item, index) => {
            if (item.en.trim()) {
                fields[`responsabilidades.${index}`] = item.en;
            }
        });

        data.metricas.forEach((item, index) => {
            if (item.label.en.trim()) {
                fields[`metricas.${index}.label`] = item.label.en;
            }
        });

        return fields;
    };

    const handleAllTranslated = (translations: Record<string, string>) => {
        if (translations.cargo !== undefined) {
            setData('cargo', { ...data.cargo, en: translations.cargo });
        }
        if (translations.descricao !== undefined) {
            setData('descricao', { ...data.descricao, en: translations.descricao });
        }

        setData(
            'responsabilidades',
            data.responsabilidades.map((item, index) => {
                const key = `responsabilidades.${index}`;
                if (translations[key] === undefined) {
                    return item;
                }
                return { ...item, en: translations[key] };
            })
        );

        setData(
            'metricas',
            data.metricas.map((item, index) => {
                const key = `metricas.${index}.label`;
                if (translations[key] === undefined) {
                    return item;
                }
                return {
                    ...item,
                    label: { ...item.label, en: translations[key] },
                };
            })
        );
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <div className="flex justify-end">
                <GenerateAllEnButton
                    ptFields={collectTranslatablePt()}
                    existingEn={collectExistingEn()}
                    onTranslated={handleAllTranslated}
                />
            </div>

            <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="mb-4 text-lg font-semibold text-zinc-50">Identificação</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label className={labelClass}>Empresa</label>
                        <input
                            type="text"
                            value={data.empresa}
                            onChange={(e) => setData('empresa', e.target.value)}
                            className={inputClass}
                        />
                        {fieldError('empresa')}
                    </div>
                    <div className="md:col-span-2">
                        <LocaleField
                            label="Cargo"
                            value={data.cargo}
                            onChange={(cargo) => setData('cargo', cargo)}
                            error={(errors as Record<string, string>)['cargo.pt']}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Período início</label>
                        <input
                            type="text"
                            placeholder="2025-06"
                            value={data.periodo_inicio}
                            onChange={(e) => setData('periodo_inicio', e.target.value)}
                            className={inputClass}
                        />
                        {fieldError('periodo_inicio')}
                    </div>
                    <div>
                        <label className={labelClass}>Período fim (vazio = atual)</label>
                        <input
                            type="text"
                            placeholder="2025-06"
                            value={data.periodo_fim}
                            onChange={(e) => setData('periodo_fim', e.target.value)}
                            className={inputClass}
                        />
                        {fieldError('periodo_fim')}
                    </div>
                    <div>
                        <label className={labelClass}>Modelo</label>
                        <select
                            value={data.modelo}
                            onChange={(e) => setData('modelo', e.target.value)}
                            className={inputClass}
                        >
                            <option value="">Selecione</option>
                            <option value="remoto">Remoto</option>
                            <option value="hibrido">Híbrido</option>
                            <option value="presencial">Presencial</option>
                        </select>
                        {fieldError('modelo')}
                    </div>
                    <div>
                        <label className={labelClass}>Tipo</label>
                        <select
                            value={data.tipo}
                            onChange={(e) => setData('tipo', e.target.value)}
                            className={inputClass}
                        >
                            <option value="">Selecione</option>
                            <option value="CLT">CLT</option>
                            <option value="PJ">PJ</option>
                            <option value="contrato">Contrato</option>
                        </select>
                        {fieldError('tipo')}
                    </div>
                </div>
            </section>

            <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="mb-4 text-lg font-semibold text-zinc-50">Descrição</h2>
                <LocaleField
                    label="Descrição (Markdown)"
                    type="markdown"
                    rows={5}
                    value={data.descricao}
                    onChange={(descricao) => setData('descricao', descricao)}
                    error={(errors as Record<string, string>)['descricao.pt']}
                />
            </section>

            <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-zinc-50">Responsabilidades</h2>
                    <button
                        type="button"
                        onClick={addResponsabilidade}
                        className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 hover:border-orange-500 hover:text-orange-400"
                    >
                        Adicionar
                    </button>
                </div>
                {data.responsabilidades.length === 0 && (
                    <p className="text-sm text-zinc-500">Nenhuma responsabilidade adicionada.</p>
                )}
                <div className="space-y-4">
                    {data.responsabilidades.map((item, index) => (
                        <div
                            key={index}
                            className="rounded-lg border border-zinc-800 bg-zinc-950 p-4"
                        >
                            <LocaleField
                                label={`Responsabilidade ${index + 1}`}
                                value={item}
                                onChange={(value) => {
                                    const updated = [...data.responsabilidades];
                                    updated[index] = value;
                                    setData('responsabilidades', updated);
                                }}
                            />
                            <div className="mt-3 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => removeResponsabilidade(index)}
                                    className="text-sm text-red-400 hover:text-red-300"
                                >
                                    Remover
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="mb-4 text-lg font-semibold text-zinc-50">Stack</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={stackInput}
                        onChange={(e) => setStackInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                addStackTag();
                            }
                        }}
                        placeholder="Ex: React, Laravel..."
                        className={inputClass}
                    />
                    <button
                        type="button"
                        onClick={addStackTag}
                        className="shrink-0 rounded-md bg-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700"
                    >
                        Adicionar
                    </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                    {data.stack.map((tag, index) => (
                        <span
                            key={`${tag}-${index}`}
                            className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-400"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeStackTag(index)}
                                className="text-orange-300 hover:text-white"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            </section>

            <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-zinc-50">Métricas</h2>
                    <button
                        type="button"
                        onClick={addMetrica}
                        className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 hover:border-orange-500 hover:text-orange-400"
                    >
                        Adicionar
                    </button>
                </div>
                {data.metricas.length === 0 && (
                    <p className="text-sm text-zinc-500">Nenhuma métrica adicionada.</p>
                )}
                <div className="space-y-4">
                    {data.metricas.map((item, index) => (
                        <div
                            key={index}
                            className="grid gap-3 rounded-lg border border-zinc-800 bg-zinc-950 p-4 md:grid-cols-[1fr_200px_auto]"
                        >
                            <LocaleField
                                label={`Label da métrica ${index + 1}`}
                                value={item.label}
                                onChange={(label) => {
                                    const updated = [...data.metricas];
                                    updated[index] = { ...updated[index], label };
                                    setData('metricas', updated);
                                }}
                            />
                            <div>
                                <label className={labelClass}>Valor</label>
                                <input
                                    type="text"
                                    value={item.valor}
                                    onChange={(e) =>
                                        updateMetrica(index, 'valor', e.target.value)
                                    }
                                    className={inputClass}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeMetrica(index)}
                                className="self-end text-sm text-red-400 hover:text-red-300"
                            >
                                Remover
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="mb-4 text-lg font-semibold text-zinc-50">Publicação</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className={labelClass}>Ordem (menor = mais acima)</label>
                        <input
                            type="number"
                            min={0}
                            value={data.ordem}
                            onChange={(e) => setData('ordem', parseInt(e.target.value, 10) || 0)}
                            className={inputClass}
                        />
                        {fieldError('ordem')}
                    </div>
                    <div className="flex items-end">
                        <label className="flex cursor-pointer items-center gap-3">
                            <input
                                type="checkbox"
                                checked={data.publicado}
                                onChange={(e) => setData('publicado', e.target.checked)}
                                className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-orange-500 focus:ring-orange-500"
                            />
                            <span className="text-sm text-zinc-300">Publicado no site</span>
                        </label>
                    </div>
                </div>
            </section>

            <div className="flex justify-end gap-3">
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-md bg-orange-500 px-6 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50"
                >
                    {processing ? 'Salvando...' : submitLabel}
                </button>
            </div>
        </form>
    );
}

export function defaultExperienceFormData(): ExperienceFormData {
    return {
        empresa: '',
        cargo: { pt: '', en: '' },
        periodo_inicio: '',
        periodo_fim: '',
        modelo: '',
        tipo: '',
        descricao: { pt: '', en: '' },
        responsabilidades: [],
        stack: [],
        metricas: [],
        ordem: 0,
        publicado: true,
    };
}

export function experienceToFormData(experience: {
    empresa: string;
    cargo: { pt?: string | null; en?: string | null };
    periodo_inicio: string | null;
    periodo_fim: string | null;
    modelo: string | null;
    tipo: string | null;
    descricao: { pt?: string | null; en?: string | null } | null;
    responsabilidades: Array<{ pt?: string | null; en?: string | null }> | null;
    stack: string[] | null;
    metricas: Array<{
        label?: { pt?: string | null; en?: string | null };
        valor?: string | null;
    }> | null;
    ordem: number;
    publicado: boolean;
}): ExperienceFormData {
    return {
        empresa: experience.empresa,
        cargo: {
            pt: experience.cargo?.pt ?? '',
            en: experience.cargo?.en ?? '',
        },
        periodo_inicio: experience.periodo_inicio ?? '',
        periodo_fim: experience.periodo_fim ?? '',
        modelo: experience.modelo ?? '',
        tipo: experience.tipo ?? '',
        descricao: {
            pt: experience.descricao?.pt ?? '',
            en: experience.descricao?.en ?? '',
        },
        responsabilidades: (experience.responsabilidades ?? []).map((item) => ({
            pt: item.pt ?? '',
            en: item.en ?? '',
        })),
        stack: experience.stack ?? [],
        metricas: (experience.metricas ?? []).map((item) => ({
            label: {
                pt: item.label?.pt ?? '',
                en: item.label?.en ?? '',
            },
            valor: item.valor ?? '',
        })),
        ordem: experience.ordem,
        publicado: experience.publicado,
    };
}
