import { cn } from '@/lib/utils';

const ORDER = ['discover', 'define', 'develop', 'deliver'] as const;
const PATHS: Record<(typeof ORDER)[number], string> = {
  discover: 'M1 12 L16 1 L16 23 Z',
  define: 'M16 1 L31 12 L16 23 Z',
  develop: 'M33 12 L48 1 L48 23 Z',
  deliver: 'M48 1 L63 12 L48 23 Z',
};

export function DiamondMini({ phasen, className }: { phasen: string[]; className?: string }) {
  const label = 'Phasen: ' + ORDER.filter((p) => phasen.includes(p)).map((p) => p[0].toUpperCase() + p.slice(1)).join(', ');
  return (
    <svg viewBox="0 0 64 24" role="img" aria-label={label} className={cn('h-[18px] w-12 shrink-0 overflow-visible', className)}>
      {ORDER.map((p) => (
        <path
          key={p}
          d={PATHS[p]}
          strokeWidth={1.2}
          strokeLinejoin="round"
          className={phasen.includes(p) ? 'fill-brand stroke-brand' : 'fill-transparent stroke-[#c4c4c8]'}
        />
      ))}
    </svg>
  );
}
