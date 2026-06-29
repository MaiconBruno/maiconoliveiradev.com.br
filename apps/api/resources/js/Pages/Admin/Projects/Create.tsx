import AdminLayout from '../../../Layout/AdminLayout';
import ProjectForm from './ProjectForm';

interface Props {
    destaqueCount: number;
    stackOptions: string[];
}

export default function Create({ destaqueCount, stackOptions }: Props) {
    return (
        <AdminLayout title="Novo projeto">
            <ProjectForm destaqueCount={destaqueCount} stackOptions={stackOptions} />
        </AdminLayout>
    );
}
