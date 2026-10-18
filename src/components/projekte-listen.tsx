'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { ProjektTabs } from '@/components/projekt-tabs';
import type { ProjektKarte } from '@/components/project-explorer';
import { cn } from '@/lib/utils';

const PHASEN = ['discover', 'define', 'develop', 'deliver'] as const;
type Phase = (typeof PHASEN)[number];
const NAME: Record<Phase, string> = { discover: 'Discover', define: 'Define', develop: 'Develop', deliver: 'Deliver' };

/* Gemeinsame Bausteine ------------------------------------------------- */

function useFilter(projekte: ProjektKarte[]) {
  const [filter, setFilter] = useState<Phase | null>(null);
  const liste = filter ? projekte.filter((p) => p.phasen.includes(filter)) : projekte;
  return { filter, setFilter, liste };
}

function Aufklapp({ offen, children }: { offen: boolean; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence initial={false}>
      {offen && (
        <motion.div
          initial={reduce ? false : { height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={reduce ? undefined : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FallstudieLink({ p, hell = false }: { p: ProjektKarte; hell?: boolean }) {
  if (!p.fallstudie) return null;
  return (
    <Link href={`/projekte/${p.id}`} className={cn('inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium', hell ? 'bg-white text-ink' : 'bg-ink text-white')}>
      Fallstudie lesen<ArrowUpRight className="size-4" aria-hidden />
    </Link>
  );
}

function Phasen({ p, hell = false }: { p: ProjektKarte; hell?: boolean }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {PHASEN.map((ph) => (
        <span
          key={ph}
          className={cn(
            'rounded-full px-2.5 py-0.5 text-[12px]',
            p.phasen.includes(ph)
              ? hell ? 'bg-white text-ink' : 'bg-ink text-white'
              : hell ? 'border border-white/20 text-white/40' : 'border border-foreground/15 text-foreground/35',
          )}
        >
          {NAME[ph]}
        </span>
      ))}
    </span>
  );
}

/* Variante A: Index ------------------------------------------------------
   Grosse Typografie, die Zeile wird beim Darüberfahren schwarz. */

/** Index-Liste: grosse Typografie, die Zeile wird beim Darüberfahren schwarz. */
export function ListeIndex({ projekte, tabs = true }: { projekte: ProjektKarte[]; tabs?: boolean }) {
  const { filter, setFilter, liste } = useFilter(projekte);
  const anzahl = (ph: Phase) => projekte.filter((p) => p.phasen.includes(ph)).length;
  const [offen, setOffen] = useState<string | null>(null);
  return (
    <div>
      {tabs && <ProjektTabs filter={filter} setFilter={setFilter} gesamt={projekte.length} anzahl={anzahl} treffer={liste.length} />}
      <ul className="border-t border-foreground">
        {liste.map((p) => {
          const auf = offen === p.id;
          return (
            <li key={p.id} className={cn('overflow-hidden border-b border-foreground/15 transition-[border-radius,background-color,border-color] duration-300', auf && 'my-2 rounded-[24px] border-transparent bg-ink')}>
              <button
                type="button"
                aria-expanded={auf}
                onClick={() => setOffen(auf ? null : p.id)}
                className={cn('group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-[24px] px-4 py-6 text-left transition-colors duration-300 md:grid-cols-[minmax(0,1fr)_14rem_auto] md:px-6', auf ? 'text-white' : 'hover:bg-ink hover:text-white')}
              >
                <span className="grid gap-1">
                  <span className="text-[clamp(1rem,1.82vw,1.4rem)] font-medium leading-tight tracking-tight">{p.titel}</span>
                  <span className="text-[14px] opacity-60">{p.kunde}</span>
                </span>
                <span className="hidden text-[14px] opacity-60 md:block">{p.zeitraum}</span>
                <span className={cn('grid size-10 place-items-center rounded-full border transition-transform duration-300', auf ? 'rotate-45 border-white/30' : 'border-current/20 group-hover:border-white/30')}>
                  <Plus className="size-4" aria-hidden />
                </span>
              </button>
              <Aufklapp offen={auf}>
                <div className="grid gap-6 px-4 pb-8 text-white md:grid-cols-2 md:px-6">
                  <div className="grid content-start gap-3 text-[15px] leading-relaxed">
                    <p className="text-white/80">{p.kurz}</p>
                    {p.ergebnis && <p><span className="text-white/50">Ergebnis</span><br />{p.ergebnis}</p>}
                  </div>
                  <div className="grid content-start gap-4 text-[15px]">
                    <p className="text-white/70">{p.rolle}</p>
                    <Phasen p={p} hell />
                    <FallstudieLink p={p} hell />
                  </div>
                </div>
              </Aufklapp>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
