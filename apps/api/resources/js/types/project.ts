export interface BilingualString {
    pt: string;
    en: string;
}

export interface ProjectMetric {
    label: BilingualString;
    valor: string;
}

export interface ProjectFormData {
    slug: string;
    titulo: BilingualString;
    empresa: string;
    periodo: string;
    papel: BilingualString;
    stack: string[];
    url: string;
    status: 'draft' | 'published' | 'archived';
    descricao: BilingualString;
    metricas: ProjectMetric[];
    destaques: BilingualString[];
    imagens_existentes: string[];
    imagens_upload: File[];
    ordem: number;
    destaque: boolean;
    publicado_em: string;
}

export interface ProjectRecord {
    id: number;
    slug: string;
    titulo: BilingualString;
    empresa: string | null;
    periodo: string | null;
    papel: BilingualString | null;
    stack: string[] | null;
    url: string | null;
    status: 'draft' | 'published' | 'archived';
    descricao: BilingualString | null;
    metricas: ProjectMetric[] | null;
    destaques: BilingualString[] | null;
    imagens: string[] | null;
    ordem: number;
    destaque: boolean;
    publicado_em: string | null;
}

export const emptyBilingual = (): BilingualString => ({ pt: '', en: '' });

export const emptyProjectForm = (): ProjectFormData => ({
    slug: '',
    titulo: emptyBilingual(),
    empresa: '',
    periodo: '',
    papel: emptyBilingual(),
    stack: [],
    url: '',
    status: 'draft',
    descricao: emptyBilingual(),
    metricas: [],
    destaques: [],
    imagens_existentes: [],
    imagens_upload: [],
    ordem: 0,
    destaque: false,
    publicado_em: '',
});

export const projectToForm = (project: ProjectRecord): ProjectFormData => ({
    slug: project.slug,
    titulo: {
        pt: project.titulo?.pt ?? '',
        en: project.titulo?.en ?? '',
    },
    empresa: project.empresa ?? '',
    periodo: project.periodo ?? '',
    papel: {
        pt: project.papel?.pt ?? '',
        en: project.papel?.en ?? '',
    },
    stack: project.stack ?? [],
    url: project.url ?? '',
    status: project.status,
    descricao: {
        pt: project.descricao?.pt ?? '',
        en: project.descricao?.en ?? '',
    },
    metricas: (project.metricas ?? []).map((m) => ({
        label: {
            pt: m.label?.pt ?? '',
            en: m.label?.en ?? '',
        },
        valor: m.valor ?? '',
    })),
    destaques: (project.destaques ?? []).map((d) => ({
        pt: d.pt ?? '',
        en: d.en ?? '',
    })),
    imagens_existentes: project.imagens ?? [],
    imagens_upload: [],
    ordem: project.ordem,
    destaque: project.destaque,
    publicado_em: project.publicado_em
        ? project.publicado_em.slice(0, 16)
        : '',
});

export const STATUS_LABELS: Record<ProjectFormData['status'], string> = {
    draft: 'Rascunho',
    published: 'Publicado',
    archived: 'Arquivado',
};
