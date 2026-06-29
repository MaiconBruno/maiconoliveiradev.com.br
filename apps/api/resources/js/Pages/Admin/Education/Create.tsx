import { FormEvent } from 'react';
import { router, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layout/AdminLayout';
import EducationForm from './EducationForm';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        grau: { pt: '', en: '' },
        instituicao: '',
        periodo: '',
        status: { pt: '', en: '' },
        ordem: 0,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/educations');
    };

    return (
        <AdminLayout title="Nova formação">
            <EducationForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                submitLabel="Criar formação"
                onSubmit={submit}
                onCancel={() => router.visit('/admin/educations')}
            />
        </AdminLayout>
    );
}
