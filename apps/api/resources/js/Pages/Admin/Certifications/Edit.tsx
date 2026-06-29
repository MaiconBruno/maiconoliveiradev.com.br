import { FormEvent } from 'react';
import { router, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layout/AdminLayout';
import CertificationForm from './CertificationForm';

interface Certification {
    id: number;
    titulo: { pt: string | null; en: string | null };
    emissor: string | null;
    ordem: number;
}

interface Props {
    certification: Certification;
}

export default function Edit({ certification }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        titulo: {
            pt: certification.titulo?.pt ?? '',
            en: certification.titulo?.en ?? '',
        },
        emissor: certification.emissor ?? '',
        ordem: certification.ordem,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/admin/certifications/${certification.id}`);
    };

    return (
        <AdminLayout title={`Editar: ${certification.titulo?.pt ?? 'Certificação'}`}>
            <CertificationForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                submitLabel="Salvar alterações"
                onSubmit={submit}
                onCancel={() => router.visit('/admin/certifications')}
            />
        </AdminLayout>
    );
}
