import { FormEvent } from 'react';
import { router, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layout/AdminLayout';
import SeoForm from './SeoForm';

interface SeoMeta {
    id: number;
    rota: string;
    title: { pt: string | null; en: string | null };
    description: { pt: string | null; en: string | null };
    og_title: { pt: string | null; en: string | null };
    og_description: { pt: string | null; en: string | null };
    og_image: string | null;
    og_image_url: string | null;
    canonical: string | null;
    noindex: boolean;
}

interface Props {
    seoMeta: SeoMeta;
}

export default function Edit({ seoMeta }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        rota: seoMeta.rota,
        title: {
            pt: seoMeta.title?.pt ?? '',
            en: seoMeta.title?.en ?? '',
        },
        description: {
            pt: seoMeta.description?.pt ?? '',
            en: seoMeta.description?.en ?? '',
        },
        og_title: {
            pt: seoMeta.og_title?.pt ?? '',
            en: seoMeta.og_title?.en ?? '',
        },
        og_description: {
            pt: seoMeta.og_description?.pt ?? '',
            en: seoMeta.og_description?.en ?? '',
        },
        og_image: seoMeta.og_image,
        remove_og_image: false,
        canonical: seoMeta.canonical ?? '',
        noindex: seoMeta.noindex,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/admin/seo/${seoMeta.id}`);
    };

    return (
        <AdminLayout title={`SEO: ${seoMeta.rota}`}>
            <SeoForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                submitLabel="Salvar alterações"
                onSubmit={submit}
                onCancel={() => router.visit('/admin/seo')}
                rotaReadonly
            />
        </AdminLayout>
    );
}
