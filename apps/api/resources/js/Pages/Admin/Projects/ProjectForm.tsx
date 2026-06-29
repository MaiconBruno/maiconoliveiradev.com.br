import { FormEvent } from 'react';
import { Link, useForm } from '@inertiajs/react';
import BilingualField from '../../../Components/BilingualField';
import GenerateAllEnButton from '../../../Components/GenerateAllEnButton';
import ImageGalleryUpload from '../../../Components/ImageGalleryUpload';
import TagInput from '../../../Components/TagInput';
import {
    emptyBilingual,
    emptyProjectForm,
    ProjectFormData,
    ProjectRecord,
    projectToForm,
    STATUS_LABELS,
} from '../../../types/project';

interface ProjectFormProps {
    project?: ProjectRecord;
    destaqueCount: number;
    stackOptions?: string[];
}

const inputClass =
    'w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 focus:border-orange-500 focus:outline-none';

export default function ProjectForm({
    project,
    destaqueCount,
    stackOptions = [],
}: ProjectFormProps) {
    const isEdit = Boolean(project);
    const initialData = project ? projectToForm(project) : emptyProjectForm();

    const { data, setData, post, put, processing, errors } = useForm<ProjectFormData>(initialData);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        const options = { forceFormData: data.imagens_upload.length > 0 };

        if (isEdit && project) {
            put(`/admin/projects/${project.id}`, options);
        } else {
            post('/admin/projects', options);
        }
    };

    const addMetrica = () => {
        setData('metricas', [...data.metricas, { label: emptyBilingual(), valor: '' }]);
    };

    const removeMetrica = (index: number) => {
        setData(
            'metricas',
            data.metricas.filter((_, i) => i !== index)
        );
    };

    const updateMetrica = (
        index: number,
        field: 'label' | 'valor',
        value: { pt: string; en: string } | string
    ) => {
        const updated = [...data.metricas];
        if (field === 'label') {
            updated[index] = { ...updated[index], label: value as { pt: string; en: string } };
        } else {
            updated[index] = { ...updated[index], valor: value as string };
        }
        setData('metricas', updated);
    };

    const addDestaque = () => {
        setData('destaques', [...data.destaques, emptyBilingual()]);
    };

    const removeDestaque = (index: number) => {
        setData(
            'destaques',
            data.destaques.filter((_, i) => i !== index)
        );
    };

    const updateDestaque = (index: number, value: { pt: string; en: string }) => {
        const updated = [...data.destaques];
        updated[index] = value;
        setData('destaques', updated);
    };

    const destaqueDisabled = !data.destaque && destaqueCount >= 6;

    const collectTranslatablePt = (): Record<string, string> => {
        const fields: Record<string, string> = {};

        if (data.titulo.pt.trim()) fields.titulo = data.titulo.pt;
        if (data.papel.pt.trim()) fields.papel = data.papel.pt;
        if (data.descricao.pt.trim()) fields.descricao = data.descricao.pt;

        data.metricas.forEach((metrica, index) => {
            if (metrica.label.pt.trim()) {
                fields[`metricas.${index}.label`] = metrica.label.pt;
            }
        });

        data.destaques.forEach((destaque, index) => {
            if (destaque.pt.trim()) {
                fields[`destaques.${index}`] = destaque.pt;
            }
        });

        return fields;
    };

    const collectExistingEn = (): Record<string, string> => {
        const fields: Record<string, string> = {};

        if (data.titulo.en.trim()) fields.titulo = data.titulo.en;
        if (data.papel.en.trim()) fields.papel = data.papel.en;
        if (data.descricao.en.trim()) fields.descricao = data.descricao.en;

        data.metricas.forEach((metrica, index) => {
            if (metrica.label.en.trim()) {
                fields[`metricas.${index}.label`] = metrica.label.en;
            }
        });

        data.destaques.forEach((destaque, index) => {
            if (destaque.en.trim()) {
                fields[`destaques.${index}`] = destaque.en;
            }
        });

        return fields;
    };

    const handleAllTranslated = (translations: Record<string, string>) => {
        if (translations.titulo !== undefined) {
            setData('titulo', { ...data.titulo, en: translations.titulo });
        }
        if (translations.papel !== undefined) {
            setData('papel', { ...data.papel, en: translations.papel });
        }
        if (translations.descricao !== undefined) {
            setData('descricao', { ...data.descricao, en: translations.descricao });
        }

        const nextMetricas = data.metricas.map((metrica, index) => {
            const key = `metricas.${index}.label`;
            if (translations[key] === undefined) {
                return metrica;
            }
            return {
                ...metrica,
                label: { ...metrica.label, en: translations[key] },
            };
        });
        setData('metricas', nextMetricas);

        const nextDestaques = data.destaques.map((destaque, index) => {
            const key = `destaques.${index}`;
            if (translations[key] === undefined) {
                return destaque;
            }
            return { ...destaque, en: translations[key] };
        });
        setData('destaques', nextDestaques);
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

            <section className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                <h2 className="text-lg font-semibold text-zinc-50">Identificação</h2>

                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-zinc-300">
                            Slug <span className="text-orange-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.slug}
                            onChange={(e) =>
                                setData(
                                    'slug',
                                    e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                                )
                            }
                            className={inputClass}
                            placeholder="meu-projeto"
                            required
                        />
                        {errors.slug && <p className="mt-1 text-sm text-red-400">{errors.slug}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-zinc-300">
                            Ordem
                        </label>
                        <input
                            type="number"
                            min={0}
                            value={data.ordem}
                            onChange={(e) => setData('ordem', parseInt(e.target.value, 10) || 0)}
                            className={inputClass}
                        />
                        {errors.ordem && <p className="mt-1 text-sm text-red-400">{errors.ordem}</p>}
                    </div>
                </div>

                <BilingualField
                    label="Título"
                    value={data.titulo}
                    onChange={(v) => setData('titulo', v)}
                    required
                    errors={{ pt: errors['titulo.pt'], en: errors['titulo.en'] }}
                />

                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-zinc-300">
                            Empresa
                        </label>
                        <input
                            type="text"
                            value={data.empresa}
                            onChange={(e) => setData('empresa', e.target.value)}
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-zinc-300">
                            Período
                        </label>
                        <input
                            type="text"
                            value={data.periodo}
                            onChange={(e) => setData('periodo', e.target.value)}
                            className={inputClass}
                            placeholder="jun/2025 – atual"
                        />
                    </div>
                </div>

                <BilingualField
                    label="Papel"
                    value={data.papel}
                    onChange={(v) => setData('papel', v)}
                />

                <TagInput
                    label="Stack (tags, separadas por vírgula)"
                    value={data.stack}
                    onChange={(tags) => setData('stack', tags)}
                    placeholder="React, Node.js, Laravel..."
                    suggestions={stackOptions}
                    suggestionsLabel="Skills cadastradas"
                />

                <div>
                    <label className="mb-1 block text-sm font-medium text-zinc-300">URL</label>
                    <input
                        type="url"
                        value={data.url}
                        onChange={(e) => setData('url', e.target.value)}
                        className={inputClass}
                        placeholder="https://..."
                    />
                    {errors.url && <p className="mt-1 text-sm text-red-400">{errors.url}</p>}
                </div>
            </section>

            <section className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                <h2 className="text-lg font-semibold text-zinc-50">Conteúdo</h2>

                <BilingualField
                    label="Descrição (Markdown)"
                    value={data.descricao}
                    onChange={(v) => setData('descricao', v)}
                    multiline
                    rows={6}
                />

                <div>
                    <div className="mb-3 flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-300">Métricas</label>
                        <button
                            type="button"
                            onClick={addMetrica}
                            className="text-sm text-orange-400 hover:text-orange-300"
                        >
                            + Adicionar métrica
                        </button>
                    </div>
                    {data.metricas.length === 0 && (
                        <p className="text-sm text-zinc-500">Nenhuma métrica adicionada.</p>
                    )}
                    <div className="space-y-4">
                        {data.metricas.map((metrica, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-zinc-800 p-4"
                            >
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-xs text-zinc-500">
                                        Métrica {index + 1}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removeMetrica(index)}
                                        className="text-xs text-red-400 hover:text-red-300"
                                    >
                                        Remover
                                    </button>
                                </div>
                                <BilingualField
                                    label="Label"
                                    value={metrica.label}
                                    onChange={(v) => updateMetrica(index, 'label', v)}
                                    required
                                />
                                <div className="mt-3">
                                    <label className="mb-1 block text-sm text-zinc-400">Valor</label>
                                    <input
                                        type="text"
                                        value={metrica.valor}
                                        onChange={(e) =>
                                            updateMetrica(index, 'valor', e.target.value)
                                        }
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="mb-3 flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-300">Destaques</label>
                        <button
                            type="button"
                            onClick={addDestaque}
                            className="text-sm text-orange-400 hover:text-orange-300"
                        >
                            + Adicionar destaque
                        </button>
                    </div>
                    {data.destaques.length === 0 && (
                        <p className="text-sm text-zinc-500">Nenhum destaque adicionado.</p>
                    )}
                    <div className="space-y-4">
                        {data.destaques.map((destaque, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-zinc-800 p-4"
                            >
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-xs text-zinc-500">
                                        Destaque {index + 1}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removeDestaque(index)}
                                        className="text-xs text-red-400 hover:text-red-300"
                                    >
                                        Remover
                                    </button>
                                </div>
                                <BilingualField
                                    label="Texto"
                                    value={destaque}
                                    onChange={(v) => updateDestaque(index, v)}
                                    required
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <ImageGalleryUpload
                    existing={data.imagens_existentes}
                    uploads={data.imagens_upload}
                    onExistingChange={(paths) => setData('imagens_existentes', paths)}
                    onUploadsChange={(files) => setData('imagens_upload', files)}
                />
            </section>

            <section className="space-y-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
                <h2 className="text-lg font-semibold text-zinc-50">Publicação</h2>

                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-zinc-300">
                            Status
                        </label>
                        <select
                            value={data.status}
                            onChange={(e) =>
                                setData(
                                    'status',
                                    e.target.value as ProjectFormData['status']
                                )
                            }
                            className={inputClass}
                        >
                            {Object.entries(STATUS_LABELS).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        {errors.status && (
                            <p className="mt-1 text-sm text-red-400">{errors.status}</p>
                        )}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-zinc-300">
                            Publicado em
                        </label>
                        <input
                            type="datetime-local"
                            value={data.publicado_em}
                            onChange={(e) => setData('publicado_em', e.target.value)}
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <input
                        type="checkbox"
                        id="destaque"
                        checked={data.destaque}
                        disabled={destaqueDisabled}
                        onChange={(e) => setData('destaque', e.target.checked)}
                        className="mt-1 rounded border-zinc-600 bg-zinc-900 text-orange-500 focus:ring-orange-500"
                    />
                    <div>
                        <label htmlFor="destaque" className="text-sm font-medium text-zinc-300">
                            Destaque na home
                        </label>
                        <p className="text-xs text-zinc-500">
                            Máximo 6 projetos em destaque ({destaqueCount}/6 em uso)
                        </p>
                        {errors.destaque && (
                            <p className="mt-1 text-sm text-red-400">{errors.destaque}</p>
                        )}
                    </div>
                </div>
            </section>

            <div className="flex items-center gap-4">
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-md bg-orange-500 px-6 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50"
                >
                    {processing ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Criar projeto'}
                </button>
                <Link
                    href="/admin/projects"
                    className="text-sm text-zinc-400 hover:text-orange-400"
                >
                    Cancelar
                </Link>
            </div>
        </form>
    );
}
