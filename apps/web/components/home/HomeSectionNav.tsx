'use client';

import { useEffect, useRef, useState } from 'react';

type Section = {
  id: string;
  label: string;
};

const HEADER_OFFSET = 72;
const SCROLL_DURATION_MS = 800;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function scrollToSection(id: string, onComplete?: () => void) {
  const element = document.getElementById(id);
  if (!element) return;

  const targetY = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, targetY);
    onComplete?.();
    return;
  }

  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function animate(now: number) {
    const progress = Math.min((now - startTime) / SCROLL_DURATION_MS, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));

    if (progress < 1) {
      requestAnimationFrame(animate);
      return;
    }

    onComplete?.();
  }

  requestAnimationFrame(animate);
}

export function HomeSectionNav({
  sections,
  ariaLabel,
}: {
  sections: Section[];
  ariaLabel: string;
}) {
  const [active, setActive] = useState(sections[0]?.id ?? '');
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  function handleSectionClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    setActive(id);
    isScrollingRef.current = true;

    scrollToSection(id, () => {
      isScrollingRef.current = false;
      window.history.replaceState(null, '', `#${id}`);
    });
  }

  return (
    <nav
      aria-label={ariaLabel}
      className="pointer-events-none fixed top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      style={{ left: 'max(1rem, calc((100vw - min(100vw, 80rem)) / 2 - 10.5rem))' }}
    >
      <ol className="pointer-events-auto space-y-1 border-l border-zinc-800 pl-4">
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(event) => handleSectionClick(event, section.id)}
                className={`group flex items-center gap-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition ${
                  isActive ? 'text-orange-400' : 'text-zinc-600 hover:text-zinc-400'
                }`}
              >
                <span
                  className={`h-px transition-all ${
                    isActive ? 'w-4 bg-orange-500' : 'w-2 bg-zinc-700 group-hover:w-3'
                  }`}
                  aria-hidden
                />
                {section.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
