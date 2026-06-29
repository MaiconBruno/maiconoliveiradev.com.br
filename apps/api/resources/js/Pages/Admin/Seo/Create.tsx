import { FormEvent } from 'react';
import { router, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layout/AdminLayout';
import SeoForm from './SeoForm';

interface Props {
    suggestedRoutes: string[];
}

export default function Create({ suggestedRoutes }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        rota: suggestedRoutes[0] ?? '',
        title: { pt: '', en: '' },
        description: { pt: '', en: '' },
        og_title: { pt: '', en: '' },
        og_description: { pt: '', en: '' },
        og_image: null as string | null,
        remove_og_image: false,
        canonical: '',
        noindex: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/seo');
    };

    return (
        <AdminLayout title="Nova rota SEO">
            <SeoForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                submitLabel="Criar"
                onSubmit={submit}
                onCancel={() => router.visit('/admin/seo')}
                suggestedRoutes={suggestedRoutes}
            />
        </AdminLayout>
    );
}
