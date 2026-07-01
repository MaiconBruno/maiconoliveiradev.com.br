'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import type { GalleryMedia } from '@portfolio/types';
import { DeviceMockup } from '@/components/projects/DeviceMockup';
import { StorageMedia } from '@/components/StorageMedia';
import { cn } from '@/lib/utils';

type ProjectGalleryCarouselProps = {
  items: GalleryMedia[];
  alt: string;
  labels: {
    prev: string;
    next: string;
    slide: string;
  };
  className?: string;
};

export function ProjectGalleryCarousel({
  items,
  alt,
  labels,
  className,
}: ProjectGalleryCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = items.length;
  const hasMultiple = count > 1;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex((next + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (!hasMultiple) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => goTo(index + 1), 6000);
    return () => window.clearInterval(timer);
  }, [goTo, hasMultiple, index]);

  if (count === 0) {
    return (
      <DeviceMockup className={className}>
        <div className="flex h-full items-center justify-center bg-zinc-950">
          <div className="bg-grid-pattern absolute inset-0 opacity-30" aria-hidden />
          <span className="relative font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-700">
            preview
          </span>
        </div>
      </DeviceMockup>
    );
  }

  const current = items[index];

  return (
    <div className={cn('relative', className)}>
      <DeviceMockup>
        <div className="relative h-full overflow-hidden bg-zinc-950">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${current.path}-${index}`}
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -48 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <StorageMedia item={current} alt={`${alt} — ${index + 1}`} fill priority={index === 0} />
            </motion.div>
          </AnimatePresence>
        </div>
      </DeviceMockup>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label={labels.prev}
            className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-700 bg-zinc-900/90 p-2.5 text-zinc-400 shadow-lg backdrop-blur-sm transition hover:border-orange-500/40 hover:text-orange-400"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label={labels.next}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 rounded-full border border-zinc-700 bg-zinc-900/90 p-2.5 text-zinc-400 shadow-lg backdrop-blur-sm transition hover:border-orange-500/40 hover:text-orange-400"
          >
            <ChevronIcon direction="right" />
          </button>

          <div
            className="mt-5 flex items-center justify-center gap-2"
            role="tablist"
            aria-label={labels.slide}
          >
            {items.map((item, i) => (
              <button
                key={item.path}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`${labels.slide} ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === index ? 'w-8 bg-orange-500' : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={direction === 'left' ? 'mr-0.5' : 'ml-0.5'}
    >
      <path
        d={direction === 'left' ? 'M10 3L5 8l5 5' : 'M6 3l5 5-5 5'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
