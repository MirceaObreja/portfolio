'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { ProjektTabs } from '@/components/projekt-tabs';
import type { ProjektKarte } from '@/components/project-explorer';
import { cn } from '@/lib/utils';
import { DiamondMini } from '@/components/diamond-mini';

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


/* Inhalt der aufgeklappten Zeile, vier Varianten -------------------------- */

export type DetailVariante = 'a' | 'b' | 'c' | 'd';
const WEISS_RAUTE = '[&_.fill-ink]:fill-white [&_.fill-ink]:stroke-white [&_path:not(.fill-ink)]:stroke-white/45';

function Label({ children }: { children: React.ReactNode }) {
  return <span className="mb-1.5 block text-[12px] uppercase tracking-[0.08em] text-white/45">{children}</span>;
}

/** Phasen als vier Segmente, aktive hell. */
function PhasenBalken({ p }: { p: ProjektKarte }) {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {PHASEN.map((ph) => {
        const an = p.phasen.includes(ph);
        return (
          <div key={ph} className="grid gap-1.5">
            <span className={cn('h-1.5 rounded-full', an ? 'bg-white' : 'bg-white/15')} />
            <span className={cn('text-[12px]', an ? 'text-white' : 'text-white/35')}>{NAME[ph]}</span>
          </div>
        );
      })}
    </div>
  );
}

function Detail({ p, variante }: { p: ProjektKarte; variante: DetailVariante }) {
  // A: Drei Spalten mit Überschriften, Ergebnis in der Mitte hervorgehoben
  if (variante === 'a') {
    return (
      <div className="grid gap-8 border-t border-white/10 px-4 pb-8 pt-6 text-[15px] leading-relaxed text-white md:grid-cols-3 md:gap-10 md:px-6">
        <div><Label>Ausgangslage</Label><p className="text-white/80">{p.kurz}</p></div>
        <div><Label>Ergebnis</Label><p className="text-[clamp(1.05rem,1.4vw,1.25rem)] font-medium leading-snug">{p.ergebnis ?? '–'}</p></div>
        <div className="grid content-start gap-5">
          <div><Label>Meine Rolle</Label><p className="text-white/80">{p.rolle}</p></div>
          <PhasenBalken p={p} />
          <FallstudieLink p={p} hell />
        </div>
      </div>
    );
  }
  // B: Ergebnis gross links, Kontext rechts
  if (variante === 'b') {
    return (
      <div className="grid gap-8 px-4 pb-8 pt-2 text-white md:grid-cols-12 md:px-6">
        <div className="md:col-span-5">
          <DiamondMini phasen={p.phasen} className={cn('h-6 w-[64px]', WEISS_RAUTE)} />
          <p className="mt-5 text-[clamp(1.25rem,2vw,1.75rem)] font-medium leading-tight tracking-tight">{p.ergebnis ?? p.kurz}</p>
          <div className="mt-6"><FallstudieLink p={p} hell /></div>
        </div>
        <div className="grid content-start gap-5 text-[15px] leading-relaxed md:col-span-6 md:col-start-7">
          {p.ergebnis && <p className="text-white/80">{p.kurz}</p>}
          <p className="text-white/60">{p.rolle}</p>
          <Phasen p={p} hell />
        </div>
      </div>
    );
  }
  // C: Steckbrief mit Zeilen und Bezeichnungen links
  if (variante === 'c') {
    const zeilen: [string, React.ReactNode][] = [
      ['Ausgangslage', p.kurz],
      ...(p.ergebnis ? [['Ergebnis', <span key="e" className="font-medium">{p.ergebnis}</span>] as [string, React.ReactNode]] : []),
      ['Meine Rolle', p.rolle],
      ['Phasen', <Phasen key="p" p={p} hell />],
      ['Zeitraum', p.zeitraum],
    ];
    return (
      <div className="px-4 pb-6 text-[15px] leading-relaxed text-white md:px-6">
        <dl className="border-t border-white/10">
          {zeilen.map(([k, v]) => (
            <div key={k} className="grid gap-1 border-b border-white/10 py-3.5 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-6">
              <dt className="text-[13px] text-white/45 md:pt-0.5">{k}</dt>
              <dd className="text-white/85">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="pt-5"><FallstudieLink p={p} hell /></div>
      </div>
    );
  }
  // D: Drei helle Kacheln im dunklen Panel, Phasen als Balken darunter
  return (
    <div className="grid gap-3 px-3 pb-4 text-[15px] leading-relaxed md:px-4">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-[18px] bg-white/[0.07] p-5 text-white"><Label>Ausgangslage</Label><p className="text-white/80">{p.kurz}</p></div>
        <div className="rounded-[18px] bg-white p-5 text-ink"><span className="mb-1.5 block text-[12px] uppercase tracking-[0.08em] text-ink/50">Ergebnis</span><p className="font-medium">{p.ergebnis ?? '–'}</p></div>
        <div className="rounded-[18px] bg-white/[0.07] p-5 text-white"><Label>Meine Rolle</Label><p className="text-white/80">{p.rolle}</p></div>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-4 rounded-[18px] bg-white/[0.07] p-5">
        <div className="w-full max-w-md"><PhasenBalken p={p} /></div>
        <FallstudieLink p={p} hell />
      </div>
    </div>
  );
}

/* Variante A: Index ------------------------------------------------------
   Grosse Typografie, die Zeile wird beim Darüberfahren schwarz. */

/** Index-Liste: grosse Typografie, die Zeile wird beim Darüberfahren schwarz. */
export function ListeIndex({ projekte, tabs = true, detail = 'a' }: { projekte: ProjektKarte[]; tabs?: boolean; detail?: DetailVariante }) {
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
                <Detail p={p} variante={detail} />
              </Aufklapp>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
