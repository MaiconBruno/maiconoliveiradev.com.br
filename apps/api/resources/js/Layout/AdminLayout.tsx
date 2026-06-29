import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import FlashMessage from '../Components/FlashMessage';

interface AdminLayoutProps extends PropsWithChildren {
    title?: string;
}

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Projetos', href: '/admin/projects' },
    { label: 'Hero / Sobre', href: '/admin/profile/edit' },
    { label: 'Experiências', href: '/admin/experiences' },
    { label: 'Skills', href: '/admin/skills' },
    { label: 'Contato', href: '/admin/contact/edit' },
    { label: 'SEO', href: '/admin/seo' },
    { label: 'Formação', href: '/admin/educations' },
    { label: 'Certificações', href: '/admin/certifications' },
];

function isActive(url: string, href: string): boolean {
    const path = url.split('?')[0].replace(/\/$/, '') || '/';

    if (href === '/admin') {
        return path === '/admin';
    }

    return path === href || path.startsWith(`${href}/`);
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const { url } = usePage();

    return (
        <div className="flex min-h-screen bg-zinc-950 text-zinc-50">
            <aside className="flex w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950">
                <div className="flex items-center gap-3 border-b border-zinc-800 px-5 py-5">
                    <div className="h-8 w-1 rounded-full bg-gradient-to-b from-orange-500 to-orange-600" />
                    <span className="text-lg font-semibold tracking-tight">
                        Portfolio Admin
                    </span>
                </div>

                <nav className="flex-1 space-y-1 px-3 py-4">
                    {navItems.map((item) => {
                        const active = isActive(url, item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`block rounded-md border-l-2 px-3 py-2 text-sm transition duration-150 ${
                                    active
                                        ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                                        : 'border-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50'
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-zinc-800 p-4">
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="w-full rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-400 transition duration-150 hover:border-orange-500/50 hover:text-orange-400"
                    >
                        Sair
                    </Link>
                </div>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="border-b border-zinc-800 bg-zinc-900/50 px-8 py-4">
                    {title && (
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-50">
                            {title}
                        </h1>
                    )}
                </header>

                <main className="flex-1 px-8 py-8">
                    <FlashMessage />
                    {children}
                </main>
            </div>
        </div>
    );
}
