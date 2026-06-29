import { Link } from '@inertiajs/react';
import AdminLayout from '../../Layout/AdminLayout';

interface Stats {
    projects: number;
    projectsPublished: number;
    experiences: number;
    experiencesPublished: number;
    skills: number;
    certifications: number;
    education: number;
    seo: number;
    profileConfigured: boolean;
    contactConfigured: boolean;
}

interface Props {
    stats: Stats;
}

interface StatCard {
    label: string;
    count: number | string;
    detail?: string;
    href: string;
    actionLabel: string;
    creatable?: boolean;
}

export default function Dashboard({ stats }: Props) {
    const cards: StatCard[] = [
        {
            label: 'Projetos',
            count: stats.projects,
            detail: `${stats.projectsPublished} publicados`,
            href: '/admin/projects',
            actionLabel: 'Gerenciar',
            creatable: true,
        },
        {
            label: 'Experiências',
            count: stats.experiences,
            detail: `${stats.experiencesPublished} publicadas`,
            href: '/admin/experiences',
            actionLabel: 'Gerenciar',
            creatable: true,
        },
        {
            label: 'Skills',
            count: stats.skills,
            href: '/admin/skills',
            actionLabel: 'Gerenciar',
            creatable: true,
        },
        {
            label: 'Certificações',
            count: stats.certifications,
            href: '/admin/certifications',
            actionLabel: 'Gerenciar',
            creatable: true,
        },
        {
            label: 'Formação',
            count: stats.education,
            href: '/admin/educations',
            actionLabel: 'Gerenciar',
            creatable: true,
        },
        {
            label: 'SEO',
            count: stats.seo,
            detail: 'páginas configuradas',
            href: '/admin/seo',
            actionLabel: 'Gerenciar',
            creatable: true,
        },
        {
            label: 'Hero / Sobre',
            count: stats.profileConfigured ? 'OK' : '—',
            detail: stats.profileConfigured ? 'Perfil configurado' : 'Ainda não configurado',
            href: '/admin/profile/edit',
            actionLabel: stats.profileConfigured ? 'Editar' : 'Configurar',
        },
        {
            label: 'Contato',
            count: stats.contactConfigured ? 'OK' : '—',
            detail: stats.contactConfigured ? 'Contato configurado' : 'Ainda não configurado',
            href: '/admin/contact/edit',
            actionLabel: stats.contactConfigured ? 'Editar' : 'Configurar',
        },
    ];

    return (
        <AdminLayout title="Dashboard">
            <p className="mb-6 text-sm text-zinc-400">
                Visão geral do conteúdo do portfólio. Use os atalhos para criar ou editar cada módulo.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className="flex flex-col rounded-lg border border-zinc-800 bg-zinc-900 p-5"
                    >
                        <p className="text-sm text-zinc-400">{card.label}</p>
                        <p className="mt-2 text-3xl font-bold text-orange-500">{card.count}</p>
                        {card.detail && (
                            <p className="mt-1 text-sm text-zinc-500">{card.detail}</p>
                        )}
                        <div className="mt-4 flex gap-2">
                            <Link
                                href={card.href}
                                className="inline-flex items-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition duration-150 hover:bg-orange-600"
                            >
                                {card.actionLabel}
                            </Link>
                            {card.creatable && (
                                <Link
                                    href={`${card.href}/create`}
                                    className="inline-flex items-center rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition duration-150 hover:border-orange-500/50 hover:text-orange-400"
                                >
                                    Novo
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
