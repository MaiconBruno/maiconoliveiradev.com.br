import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type DeviceMockupProps = {
  children: ReactNode;
  className?: string;
};

export function DeviceMockup({ children, className }: DeviceMockupProps) {
  return (
    <div className={cn('mx-auto w-full max-w-3xl', className)}>
      <div className="overflow-hidden rounded-t-[14px] border border-b-0 border-zinc-700/70 bg-gradient-to-b from-zinc-800 to-zinc-900 shadow-[0_0_60px_rgba(249,115,22,0.08)]">
        <div className="p-3 md:p-4">
          <div className="mb-3 flex items-center gap-1.5 px-0.5">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" aria-hidden />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" aria-hidden />
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500/70" aria-hidden />
            <span className="ml-3 flex-1 truncate rounded-md border border-zinc-700/60 bg-zinc-950/60 px-3 py-1 font-mono text-[10px] text-zinc-600">
              localhost:3000/preview
            </span>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-zinc-800 bg-zinc-950">
            {children}
          </div>
        </div>

        <div className="h-2 bg-gradient-to-b from-zinc-900 to-zinc-800" aria-hidden />
      </div>

      <div
        className="relative h-[18px] rounded-b-[14px] border border-t-0 border-zinc-700/70 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950"
        aria-hidden
      >
        <div className="absolute inset-x-0 top-0 h-px bg-zinc-600/25" />
        <div className="absolute bottom-[5px] left-1/2 h-[3px] w-14 -translate-x-1/2 rounded-full bg-zinc-700/50" />
      </div>
    </div>
  );
}
