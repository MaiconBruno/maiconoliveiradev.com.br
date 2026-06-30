import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';

export function ContactBand({
  locale,
  eyebrow,
  formLink,
  email,
}: {
  locale: string;
  eyebrow: string;
  formLink: string;
  email: string;
}) {
  return (
    <section id="contact" className="border-t border-zinc-800/60">
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-16">
        <FadeIn className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">{eyebrow}</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <a
              href={`mailto:${email}`}
              className="font-mono text-sm text-zinc-300 transition hover:text-orange-400 md:text-base"
            >
              {email}
            </a>
            <Link
              href={`/${locale}/contato`}
              className="text-sm text-zinc-500 transition hover:text-orange-400"
            >
              {formLink} →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
