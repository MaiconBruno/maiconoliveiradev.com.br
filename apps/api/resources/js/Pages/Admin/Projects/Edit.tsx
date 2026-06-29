import AdminLayout from '../../../Layout/AdminLayout';
import ProjectForm from './ProjectForm';
import { ProjectRecord } from '../../../types/project';

interface Props {
    project: ProjectRecord;
    destaqueCount: number;
    stackOptions: string[];
}

export default function Edit({ project, destaqueCount, stackOptions }: Props) {
    return (
        <AdminLayout title={`Editar: ${project.titulo?.pt ?? project.slug}`}>
            <ProjectForm
                project={project}
                destaqueCount={destaqueCount}
                stackOptions={stackOptions}
            />
        </AdminLayout>
    );
}
