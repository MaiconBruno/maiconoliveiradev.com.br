'use client';

import { useEffect, useState } from 'react';

type Section = {
  id: string;
  label: string;
};

export function HomeSectionNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
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

  return (
    <nav
      aria-label="Seções da página"
      className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ol className="pointer-events-auto space-y-1 border-l border-zinc-800 pl-4">
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
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
