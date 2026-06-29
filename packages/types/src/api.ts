/** Campo bilíngue no banco (admin / seed). */
export type LocalizedString = { pt: string | null; en: string | null };

export type ProjectStatus = 'draft' | 'published' | 'archived';

export type CtaLinkRaw = {
  label: LocalizedString;
  url: string;
  externo?: boolean;
};

export type CtaLink = {
  label: string;
  url: string;
  externo?: boolean;
};

export type MetricaRaw = {
  label: LocalizedString | string;
  valor: string;
};

export type Metrica = {
  label: string;
  valor: string;
};

export type ContactLink = {
  label: string;
  url: string;
  icone?: string;
};

export type ApiValidationError = {
  message: string;
  errors: Record<string, string[]>;
};

export type ApiMessageResponse = {
  message: string;
};

// —— Raw (persistência / admin) ——

export type ProfileRaw = {
  id?: number;
  nome_completo: string;
  headline: LocalizedString;
  localizacao: string;
  modelo_trabalho: LocalizedString;
  anos_experiencia: string;
  bio_resumo: LocalizedString;
  bio_longa?: LocalizedString | null;
  foto?: string | null;
  cta_primario?: CtaLinkRaw | null;
  cta_secundario?: CtaLinkRaw | null;
  curriculo_pdf?: string | null;
};

export type ProjectRaw = {
  id: number;
  slug: string;
  titulo: LocalizedString;
  empresa?: string | null;
  periodo?: string | null;
  papel?: LocalizedString | null;
  stack: string[];
  url?: string | null;
  status: ProjectStatus;
  descricao?: LocalizedString | null;
  metricas?: MetricaRaw[] | null;
  destaques?: LocalizedString[] | null;
  imagens?: string[] | null;
  ordem?: number;
  destaque?: boolean;
  publicado_em?: string | null;
};

export type ExperienceRaw = {
  id: number;
  empresa: string;
  cargo: LocalizedString;
  periodo_inicio?: string | null;
  periodo_fim?: string | null;
  modelo?: string | null;
  tipo?: string | null;
  descricao?: LocalizedString | null;
  responsabilidades?: LocalizedString[] | null;
  stack?: string[] | null;
  metricas?: MetricaRaw[] | null;
  ordem?: number;
  publicado?: boolean;
};

export type SkillRaw = {
  id: number;
  nome: string;
  categoria: string;
  nivel?: string | null;
  ordem?: number;
  destaque?: boolean;
};

export type EducationRaw = {
  id: number;
  grau: LocalizedString;
  instituicao: string;
  periodo: string;
  status: LocalizedString;
  ordem?: number;
};

export type CertificationRaw = {
  id: number;
  titulo: LocalizedString;
  emissor?: string | null;
  ordem?: number;
};

export type SeoMetaRaw = {
  id?: number;
  rota: string;
  title: LocalizedString;
  description: LocalizedString;
  og_title?: LocalizedString | null;
  og_description?: LocalizedString | null;
  og_image?: string | null;
  canonical?: string | null;
  noindex?: boolean;
};

export type ContactRaw = {
  id?: number;
  email: string;
  telefone?: string | null;
  linkedin?: string | null;
  github?: string | null;
  portfolio?: string | null;
  outros?: ContactLink[] | null;
};

// —— Respostas GET /api/v1 (locale resolvido via Accept-Language) ——

export type Profile = {
  id?: number;
  nome_completo: string;
  headline: string;
  localizacao: string;
  modelo_trabalho: string;
  anos_experiencia: string;
  bio_resumo: string;
  bio_longa?: string;
  foto?: string | null;
  cta_primario?: CtaLink | null;
  cta_secundario?: CtaLink | null;
  curriculo_pdf?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type Project = {
  id: number;
  slug: string;
  titulo: string;
  empresa?: string;
  periodo?: string;
  papel?: string;
  stack: string[];
  url?: string;
  status?: ProjectStatus;
  descricao?: string;
  metricas?: Metrica[];
  destaques?: string[];
  imagens?: string[];
  ordem?: number;
  destaque?: boolean;
  publicado_em?: string | null;
  created_at?: string;
  updated_at?: string;
};

/** Lista (`GET /projects`) e detalhe (`GET /projects/{slug}`) usam o mesmo shape. */
export type ProjectListItem = Project;
export type ProjectDetail = Project;

export type Experience = {
  id: number;
  empresa: string;
  cargo: string;
  periodo_inicio?: string;
  periodo_fim?: string;
  modelo?: string;
  tipo?: string;
  descricao?: string;
  responsabilidades?: string[];
  stack?: string[];
  metricas?: Metrica[];
  ordem?: number;
  publicado?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Skill = {
  nome: string;
  destaque?: boolean;
};

export type SkillGroup = {
  categoria: string;
  skills: Skill[];
};

export type Education = {
  id?: number;
  grau: string;
  instituicao: string;
  periodo: string;
  status: string;
  ordem?: number;
};

export type Certification = {
  id?: number;
  titulo: string;
  emissor?: string;
  ordem?: number;
};

export type SeoMeta = {
  id?: number;
  rota: string;
  title: string;
  description: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  canonical?: string;
  noindex?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Contact = {
  id?: number;
  email: string;
  telefone?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  outros?: ContactLink[];
};
