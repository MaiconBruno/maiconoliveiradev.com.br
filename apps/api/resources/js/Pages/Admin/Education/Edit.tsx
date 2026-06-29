import { FormEvent } from 'react';
import { router, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layout/AdminLayout';
import EducationForm from './EducationForm';

interface Education {
    id: number;
    grau: { pt: string | null; en: string | null };
    instituicao: string;
    periodo: string | null;
    status: { pt: string | null; en: string | null } | null;
    ordem: number;
}

interface Props {
    education: Education;
}

export default function Edit({ education }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        grau: {
            pt: education.grau?.pt ?? '',
            en: education.grau?.en ?? '',
        },
        instituicao: education.instituicao,
        periodo: education.periodo ?? '',
        status: {
            pt: education.status?.pt ?? '',
            en: education.status?.en ?? '',
        },
        ordem: education.ordem,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/admin/educations/${education.id}`);
    };

    return (
        <AdminLayout title={`Editar: ${education.grau?.pt ?? education.instituicao}`}>
            <EducationForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                submitLabel="Salvar alterações"
                onSubmit={submit}
                onCancel={() => router.visit('/admin/educations')}
            />
        </AdminLayout>
    );
}
