import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';
import { FadeIn } from '@/components/FadeIn';
import { JsonLd } from '@/components/JsonLd';
import { buildContactJsonLd } from '@/lib/json-ld';
import { getSeoMetadata } from '@/lib/seo';
import { fetchApi, getSiteUrl } from '@/lib/utils';
import type { Contact, Profile } from '@portfolio/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getSeoMetadata(locale, `/${locale}/contato`, { page: 'contact' });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const [contact, profile] = await Promise.all([
    fetchApi<Contact>('/contact', locale),
    fetchApi<Profile>('/profile', locale),
  ]);

  const pageUrl = `${getSiteUrl()}/${locale}/contato`;
  const jsonLd = buildContactJsonLd({
    profile,
    contact,
    pageUrl,
    locale: locale as 'pt' | 'en',
    pageName: t('title'),
  });

  return (
    <div className="relative">
      <JsonLd data={jsonLd} />
      <section className="relative overflow-hidden border-b border-zinc-800/60">
        <div className="bg-grid-pattern pointer-events-none absolute inset-0" aria-hidden />
        <div
          className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl"
          aria-hidden
        />

        <span
          className="pointer-events-none absolute right-4 top-20 hidden select-none font-mono text-[clamp(5rem,16vw,10rem)] font-bold leading-none tracking-tighter text-zinc-900/90 md:right-8 lg:block"
          aria-hidden
        >
          04
        </span>

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-16 md:pb-16 md:pt-24">
          <FadeIn>
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-zinc-600">{t('eyebrow')}</p>
            <h1 className="mt-3 text-[clamp(2.25rem,6vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              {t('title')}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <ContactForm contact={contact} />
      </div>
    </div>
  );
}
