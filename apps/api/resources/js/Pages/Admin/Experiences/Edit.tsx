import { Link } from '@inertiajs/react';
import AdminLayout from '../../../Layout/AdminLayout';
import ExperienceForm, { experienceToFormData } from './ExperienceForm';

interface Experience {
    id: number;
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
}

interface Props {
    experience: Experience;
}

export default function Edit({ experience }: Props) {
    return (
        <AdminLayout title={`Editar: ${experience.empresa}`}>
            <div className="mb-6">
                <Link
                    href="/admin/experiences"
                    className="text-sm text-orange-400 hover:text-orange-300"
                >
                    ← Voltar para lista
                </Link>
            </div>

            <ExperienceForm
                initialData={experienceToFormData(experience)}
                submitUrl={`/admin/experiences/${experience.id}`}
                method="put"
                submitLabel="Salvar alterações"
            />
        </AdminLayout>
    );
}
