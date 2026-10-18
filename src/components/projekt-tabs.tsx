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

/** Halbe Raute als Symbol der Phase. */
function Halb({ p, className }: { p: Phase; className?: string }) {
  const d: Record<Phase, string> = {
    discover: 'M1 12 L16 1 L16 23 Z',
    define: 'M16 1 L31 12 L16 23 Z',
    develop: 'M33 12 L48 1 L48 23 Z',
    deliver: 'M48 1 L63 12 L48 23 Z',
  };
  return (
    <svg viewBox="0 0 64 24" className={cn('h-3 w-8 shrink-0', className)} aria-hidden>
      {PHASEN.map((x) => (
        <path key={x} d={d[x]} strokeWidth={1.2} strokeLinejoin="round" stroke="currentColor" fill={x === p ? 'currentColor' : 'none'} opacity={x === p ? 1 : 0.35} />
      ))}
    </svg>
  );
}

function Status({ filter, treffer, gesamt }: Pick<TabProps, 'filter' | 'treffer' | 'gesamt'>) {
  return <p aria-live="polite" className="text-sm text-muted-foreground">{filter ? `${treffer} von ${gesamt} Projekten` : `${gesamt} Projekte`}</p>;
}

/* 1. Unterstrichen: grosse Textreiter, eine Linie gleitet zur Auswahl, Anzahl hochgestellt. */
function TabsLinie({ filter, setFilter, gesamt, anzahl }: TabProps) {
  const items: (Phase | null)[] = [null, ...PHASEN];
  return (
    <div role="group" aria-label="Nach Phase filtern" className="flex flex-wrap gap-x-8 gap-y-3">
      {items.map((ph) => {
        const on = filter === ph;
        return (
          <button key={ph ?? 'alle'} type="button" aria-pressed={on} onClick={() => setFilter(ph)} className={cn('relative pb-4 text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium tracking-tight transition-colors', on ? 'text-foreground' : 'text-foreground/35 hover:text-foreground/70')}>
            {ph ? NAME[ph] : 'Alle'}
            <sup className="ml-1 text-[12px] font-normal tabular-nums">{ph ? anzahl(ph) : gesamt}</sup>
            {on && <motion.span layoutId="tab-linie" transition={feder} className="absolute inset-x-0 -bottom-[3px] h-[5px] bg-foreground" />}
          </button>
        );
      })}
    </div>
  );
}

/* 2. Pille mit Phasen-Symbol: schwarze Pille gleitet unter die Auswahl. */
function TabsPille({ filter, setFilter, gesamt, treffer }: TabProps) {
  const items: (Phase | null)[] = [null, ...PHASEN];
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div role="group" aria-label="Nach Phase filtern" className="inline-flex max-w-full flex-wrap gap-1 rounded-full border border-foreground/10 bg-card p-1.5">
        {items.map((ph) => {
          const on = filter === ph;
          return (
            <button key={ph ?? 'alle'} type="button" aria-pressed={on} onClick={() => setFilter(ph)} className={cn('relative flex h-10 items-center gap-2 rounded-full px-4 text-[15px] transition-colors', on ? 'text-white' : 'text-foreground/70 hover:text-foreground')}>
              {on && <motion.span layoutId="tab-pille" transition={feder} className="absolute inset-0 rounded-full bg-ink" />}
              <span className="relative flex items-center gap-2">
                {ph && <Halb p={ph} />}
                {ph ? NAME[ph] : 'Alle'}
              </span>
            </button>
          );
        })}
      </div>
      <Status filter={filter} treffer={treffer} gesamt={gesamt} />
    </div>
  );
}

/* 3. Zahlenkacheln: fünf Felder mit grosser Anzahl, das gewählte wird schwarz. */
function TabsZahlen({ filter, setFilter, gesamt, anzahl }: TabProps) {
  const items: (Phase | null)[] = [null, ...PHASEN];
  return (
    <div role="group" aria-label="Nach Phase filtern" className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-5">
      {items.map((ph) => {
        const on = filter === ph;
        return (
          <button key={ph ?? 'alle'} type="button" aria-pressed={on} onClick={() => setFilter(ph)} className={cn('relative overflow-hidden rounded-[20px] p-5 text-left transition-colors', on ? 'text-white' : 'bg-card hover:bg-white/60')}>
            {on && <motion.span layoutId="tab-zahl" transition={feder} className="absolute inset-0 rounded-[20px] bg-ink" />}
            <span className="relative grid gap-3">
              <span className="text-[clamp(2rem,3.4vw,2.75rem)] font-medium leading-none tracking-tight tabular-nums">{ph ? anzahl(ph) : gesamt}</span>
              <span className={cn('flex items-center gap-2 text-[14px]', on ? 'text-white/70' : 'text-muted-foreground')}>
                {ph && <Halb p={ph} />}
                {ph ? NAME[ph] : 'Alle Projekte'}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* 4. Gruppiert nach Problem und Lösung, wie im Double Diamond. */
function TabsGruppen({ filter, setFilter, gesamt, treffer }: TabProps) {
  const gruppe = (titel: string, phasen: Phase[]) => (
    <div className="grid gap-2">
      <span className="text-[12px] text-muted-foreground">{titel}</span>
      <div className="flex gap-1.5">
        {phasen.map((ph) => {
          const on = filter === ph;
          return (
            <button key={ph} type="button" aria-pressed={on} onClick={() => setFilter(on ? null : ph)} className={cn('relative flex h-10 items-center gap-2 rounded-xl border px-4 text-[15px] transition-colors', on ? 'border-ink text-white' : 'border-foreground/15 bg-card hover:border-foreground/40')}>
              {on && <motion.span layoutId="tab-gruppe" transition={feder} className="absolute inset-0 rounded-[11px] bg-ink" />}
              <span className="relative flex items-center gap-2"><Halb p={ph} />{NAME[ph]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
      <div role="group" aria-label="Nach Phase filtern" className="flex flex-wrap items-end gap-6">
        <div className="grid gap-2">
          <span className="text-[12px] text-muted-foreground">Gesamt</span>
          <button type="button" aria-pressed={filter === null} onClick={() => setFilter(null)} className={cn('relative h-10 rounded-xl border px-4 text-[15px] transition-colors', filter === null ? 'border-ink text-white' : 'border-foreground/15 bg-card hover:border-foreground/40')}>
            {filter === null && <motion.span layoutId="tab-gruppe" transition={feder} className="absolute inset-0 rounded-[11px] bg-ink" />}
            <span className="relative">Alle</span>
          </button>
        </div>
        {gruppe('Problem verstehen', ['discover', 'define'])}
        <span aria-hidden className="mb-3 hidden h-px w-6 bg-foreground/30 sm:block" />
        {gruppe('Lösung entwickeln', ['develop', 'deliver'])}
      </div>
      <Status filter={filter} treffer={treffer} gesamt={gesamt} />
    </div>
  );
}

export const TABS = { linie: TabsLinie, pille: TabsPille, zahlen: TabsZahlen, gruppen: TabsGruppen, standard: TabsPille };
export type TabVariante = keyof typeof TABS;
