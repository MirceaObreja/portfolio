'use client';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

type Phase = 'discover' | 'define' | 'develop' | 'deliver';
const PHASEN: Phase[] = ['discover', 'define', 'develop', 'deliver'];
const NAME: Record<Phase, string> = { discover: 'Discover', define: 'Define', develop: 'Develop', deliver: 'Deliver' };

export type TabProps = {
  filter: Phase | null;
  setFilter: (p: Phase | null) => void;
  gesamt: number;
  treffer: number;
  anzahl: (p: Phase) => number;
};

const feder = { type: 'spring', stiffness: 420, damping: 34 } as const;


const items: (Phase | null)[] = [null, ...PHASEN];
const gross = 'text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium tracking-tight';

/* Linie gleitet, Anzahl erscheint nur beim Darüberfahren und bei der Auswahl. */
function TabsLinie({ filter, setFilter, gesamt, anzahl }: TabProps) {
  return (
    <div role="group" aria-label="Nach Phase filtern" className="flex flex-wrap gap-x-8 gap-y-3">
      {items.map((ph) => {
        const on = filter === ph;
        return (
          <button key={ph ?? 'alle'} type="button" aria-pressed={on} onClick={() => setFilter(ph)} className={cn('group relative pb-4 transition-colors', gross, on ? 'text-foreground' : 'text-foreground/35 hover:text-foreground/70')}>
            {ph ? NAME[ph] : 'Alle'}
            <sup className={cn('ml-1 text-[12px] font-normal tabular-nums transition-opacity duration-200', on ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')}>{ph ? anzahl(ph) : gesamt}</sup>
            {on && <motion.span layoutId="tab-linie" transition={feder} className="absolute inset-x-0 -bottom-[3px] h-[5px] bg-foreground" />}
          </button>
        );
      })}
    </div>
  );
}

/** Filter-Reiter für die Projektliste. */
export const ProjektTabs = TabsLinie;
