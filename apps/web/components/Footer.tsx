'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-zinc-500">
        © {year} Maicon Oliveira. {t('rights')}
      </div>
    </footer>
  );
}
