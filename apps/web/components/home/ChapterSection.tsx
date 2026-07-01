import Link from 'next/link';
import { ReactNode } from 'react';
import { FadeIn } from '@/components/FadeIn';

type ChapterAction = {
  href: string;
  label: string;
  external?: boolean;
  download?: boolean;
};

function ChapterActionLink({ action }: { action: ChapterAction }) {
  const className =
    'relative shrink-0 font-mono text-xs uppercase tracking-wider text-orange-400 transition hover:text-orange-300';

  if (action.external) {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        {...(action.download ? { download: true } : {})}
        className={className}
      >
        {action.label} →
      </a>
    );
  }

  return (
    <Link href={action.href} className={className}>
      {action.label} →
    </Link>
  );
}

export function ChapterSection({
  id,
  chapter,
  eyebrow,
  title,
  action,
  secondaryAction,
  children,
  fullBleed = false,
  className = '',
}: {
  id: string;
  chapter: string;
  eyebrow: string;
  title: string;
  action?: ChapterAction;
  secondaryAction?: ChapterAction;
  children: ReactNode;
  fullBleed?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      <FadeIn className="mb-10 flex items-end justify-between gap-6 md:mb-12">
        <div className="relative">
          <span
            className="ghost-chapter pointer-events-none absolute -left-2 -top-8 select-none font-mono text-[5rem] font-bold leading-none text-zinc-900 md:-left-4 md:-top-12 md:text-[7rem]"
            aria-hidden
          >
            {chapter}
          </span>
          <p className="relative font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">
            {eyebrow}
          </p>
          <h2 className="relative mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {title}
          </h2>
        </div>
        {(action || secondaryAction) && (
          <div className="relative flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-5">
            {secondaryAction && <ChapterActionLink action={secondaryAction} />}
            {action && <ChapterActionLink action={action} />}
          </div>
        )}
      </FadeIn>
      {children}
    </>
  );

  if (fullBleed) {
    return (
      <section id={id} className={`border-y border-zinc-800/60 bg-zinc-900/20 ${className}`}>
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">{inner}</div>
      </section>
    );
  }

  return (
    <section id={id} className={`mx-auto max-w-7xl px-4 py-20 md:py-28 ${className}`}>
      {inner}
    </section>
  );
}
