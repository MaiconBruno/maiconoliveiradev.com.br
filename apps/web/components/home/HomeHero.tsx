import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';
import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/icons/SocialIcons';
import { StorageImage } from '@/components/StorageImage';
import type { Contact, Profile } from '@portfolio/types';

function localeUrl(locale: string, url: string, externo?: boolean) {
  if (externo || url.startsWith('http')) return url;
  return `/${locale}${url.startsWith('/') ? url : `/${url}`}`;
}

function ContextBriefing({
  profile,
  briefingLabel,
  rows,
}: {
  profile: Profile;
  briefingLabel: string;
  rows: { base: string; mode: string; tenure: string };
}) {
  const items = [
    { key: rows.base, value: profile.localizacao },
    { key: rows.mode, value: profile.modelo_trabalho },
    { key: rows.tenure, value: profile.anos_experiencia },
  ];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 backdrop-blur-sm">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange-400/80">
        {briefingLabel}
      </p>
      <dl className="mt-4 space-y-3">
        {items.map((row) => (
          <div key={row.key} className="flex items-baseline justify-between gap-4 border-b border-zinc-800/80 pb-3 last:border-0 last:pb-0">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-zinc-600">{row.key}</dt>
            <dd className="text-right text-sm text-zinc-300">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function HomeHero({
  profile,
  contact,
  locale,
  ctaPrimary,
  ctaSecondary,
  dispatchLabel,
  briefingLabel,
  briefingRows,
}: {
  profile: Profile;
  contact: Contact;
  locale: string;
  ctaPrimary: string;
  ctaSecondary: string;
  dispatchLabel: string;
  briefingLabel: string;
  briefingRows: { base: string; mode: string; tenure: string };
}) {
  const nameParts = profile.nome_completo.trim().split(/\s+/);
  const firstName = nameParts[0] ?? profile.nome_completo;
  const surname = nameParts.slice(1).join(' ');

  const primary = profile.cta_primario ?? {
    label: ctaPrimary,
    url: '/contato',
    externo: false,
  };
  const secondary = profile.cta_secundario ?? {
    label: ctaSecondary,
    url: '/projetos',
    externo: false,
  };

  return (
    <section id="brief" className="relative overflow-hidden border-b border-zinc-800/60">
      <div className="bg-grid-pattern pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-orange-500/5 blur-3xl" aria-hidden />

      <span
        className="pointer-events-none absolute right-4 top-24 hidden select-none font-mono text-[clamp(6rem,18vw,14rem)] font-bold leading-none tracking-tighter text-zinc-900/90 md:right-8 lg:block"
        aria-hidden
      >
        {profile.anos_experiencia}
      </span>

      <p
        className="dispatch-vertical pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-700 lg:block xl:hidden"
        aria-hidden
      >
        {dispatchLabel}
      </p>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 md:pb-28 md:pt-24">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            {profile.localizacao}
            <span className="mx-2 text-zinc-700">/</span>
            {profile.modelo_trabalho}
            <span className="mx-2 text-zinc-700">/</span>
            {profile.anos_experiencia}
          </p>
        </FadeIn>

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1fr_340px] lg:gap-10 xl:grid-cols-[1fr_380px]">
          <div className="min-w-0">
            <FadeIn delay={0.06}>
              <h1 className="text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white">
                {firstName}
                {surname && (
                  <span className="mt-1 block text-[0.55em] font-semibold tracking-[-0.03em] text-zinc-500">
                    {surname}
                  </span>
                )}
              </h1>
            </FadeIn>

            <FadeIn delay={0.12}>
              <p className="mt-8 max-w-2xl font-mono text-sm leading-relaxed text-orange-400 md:text-base">
                {profile.headline}
              </p>
            </FadeIn>

            <FadeIn delay={0.18}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
                {profile.bio_resumo}
              </p>
            </FadeIn>

            <FadeIn delay={0.24} className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={localeUrl(locale, primary.url, primary.externo)}
                className="rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
                {...(primary.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {primary.label}
              </Link>
              <Link
                href={localeUrl(locale, secondary.url, secondary.externo)}
                className="rounded-lg border border-zinc-700 px-6 py-3 font-medium text-zinc-300 transition hover:border-orange-500/50 hover:text-white"
                {...(secondary.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {secondary.label}
              </Link>
            </FadeIn>

            <FadeIn delay={0.3} className="mt-10 flex flex-wrap items-center gap-5 border-t border-zinc-800/80 pt-8">
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500 transition hover:text-orange-400"
                >
                  <LinkedInIcon className="h-4 w-4 shrink-0" />
                  LinkedIn
                </a>
              )}
              {contact.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500 transition hover:text-orange-400"
                >
                  <GitHubIcon className="h-4 w-4 shrink-0" />
                  GitHub
                </a>
              )}
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500 transition hover:text-orange-400"
              >
                <MailIcon className="h-4 w-4 shrink-0" />
                {contact.email}
              </a>
            </FadeIn>
          </div>

          <div className="flex flex-col gap-5">
            {profile.foto && (
              <FadeIn delay={0.14} className="relative mx-auto w-full max-w-sm lg:mx-0">
                <div className="absolute -left-3 -top-3 h-full w-full rounded-2xl border border-orange-500/30" aria-hidden />
                <div className="photo-scanline relative aspect-square overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
                  <StorageImage
                    path={profile.foto}
                    alt={profile.nome_completo}
                    fill
                    priority
                    sizes="(max-width: 1024px) 320px, 380px"
                    className="object-cover grayscale-[25%] transition duration-500 hover:grayscale-0"
                  />
                </div>
              </FadeIn>
            )}
            <FadeIn delay={0.2}>
              <ContextBriefing profile={profile} briefingLabel={briefingLabel} rows={briefingRows} />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
