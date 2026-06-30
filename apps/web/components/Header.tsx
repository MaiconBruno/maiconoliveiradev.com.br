'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === 'pt' ? 'en' : 'pt';
  const switchedPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const links = [
    { href: `/${locale}/projetos`, label: t('projects') },
    { href: `/${locale}/sobre`, label: t('about') },
    { href: `/${locale}/contato`, label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href={`/${locale}`} className="text-lg font-bold text-white">
          MO<span className="text-orange-500">.</span>
        </Link>
        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition hover:text-orange-400"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={switchedPath}
            className={cn(
              'rounded-md border border-zinc-700 px-2 py-1 text-xs font-medium uppercase',
              'text-orange-400 transition hover:border-orange-500/50'
            )}
          >
            {otherLocale}
          </Link>
        </nav>
      </div>
    </header>
  );
}
