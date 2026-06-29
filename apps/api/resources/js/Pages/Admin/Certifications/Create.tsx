import { FormEvent } from 'react';
import { router, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layout/AdminLayout';
import CertificationForm from './CertificationForm';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        titulo: { pt: '', en: '' },
        emissor: '',
        ordem: 0,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/certifications');
    };

    return (
        <AdminLayout title="Nova certificação">
            <CertificationForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                submitLabel="Criar certificação"
                onSubmit={submit}
                onCancel={() => router.visit('/admin/certifications')}
            />
        </AdminLayout>
    );
}
