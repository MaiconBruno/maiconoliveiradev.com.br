import { Link } from '@inertiajs/react';
import AdminLayout from '../../../Layout/AdminLayout';
import ExperienceForm, { defaultExperienceFormData } from './ExperienceForm';

export default function Create() {
    return (
        <AdminLayout title="Nova experiência">
            <div className="mb-6">
                <Link
                    href="/admin/experiences"
                    className="text-sm text-orange-400 hover:text-orange-300"
                >
                    ← Voltar para lista
                </Link>
            </div>

            <ExperienceForm
                initialData={defaultExperienceFormData()}
                submitUrl="/admin/experiences"
                method="post"
                submitLabel="Criar experiência"
            />
        </AdminLayout>
    );
}
