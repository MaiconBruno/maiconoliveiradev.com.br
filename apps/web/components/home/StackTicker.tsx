export function StackTicker({ items, label }: { items: string[]; label: string }) {
  if (items.length === 0) return null;

  const loop = [...items, ...items];

  return (
    <div className="flex items-center border-t border-zinc-800/40 py-3">
      <span className="shrink-0 pl-4 font-mono text-[10px] uppercase tracking-[0.2em] text-orange-500/60">
        {label}
      </span>
      <div className="ticker-mask min-w-0 flex-1 overflow-hidden">
        <div className="ticker-track-slow flex w-max gap-10">
          {loop.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-zinc-600"
            >
              {item}
              <span className="ml-10 text-zinc-800" aria-hidden>
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
