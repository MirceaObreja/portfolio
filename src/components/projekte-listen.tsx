'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { DiamondMini } from '@/components/diamond-mini';
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

function Filter({ filter, setFilter, anzahl, gesamt, dunkel = false }: { filter: Phase | null; setFilter: (p: Phase | null) => void; anzahl: number; gesamt: number; dunkel?: boolean }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
      <div role="group" aria-label="Nach Phase filtern" className={cn('inline-flex max-w-full flex-wrap gap-1 rounded-full p-1', dunkel ? 'bg-white/10' : 'bg-muted')}>
        {[null, ...PHASEN].map((ph) => {
          const on = filter === ph;
          return (
            <button
              key={ph ?? 'alle'}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(ph)}
              className={cn(
                'h-8 rounded-full px-4 text-[14px] transition-all',
                dunkel
                  ? on ? 'bg-white font-medium text-ink' : 'text-white/70 hover:text-white'
                  : on ? 'bg-card font-medium shadow-[0_1px_4px_rgba(0,0,0,0.12)]' : 'text-foreground/70 hover:text-foreground',
              )}
            >
              {ph ? NAME[ph] : 'Alle'}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className={cn('text-sm', dunkel ? 'text-white/60' : 'text-muted-foreground')}>{filter ? `${anzahl} von ${gesamt} Projekten` : `${gesamt} Projekte`}</p>
    </div>
  );
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

export function ListeIndex({ projekte }: { projekte: ProjektKarte[] }) {
  const { filter, setFilter, liste } = useFilter(projekte);
  const [offen, setOffen] = useState<string | null>(null);
  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} anzahl={liste.length} gesamt={projekte.length} />
      <ul className="border-t border-foreground">
        {liste.map((p, i) => {
          const auf = offen === p.id;
          return (
            <li key={p.id} className="border-b border-foreground/15">
              <button
                type="button"
                aria-expanded={auf}
                onClick={() => setOffen(auf ? null : p.id)}
                className={cn('group grid w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-4 px-3 py-6 text-left transition-colors duration-300 md:grid-cols-[3.5rem_minmax(0,1fr)_14rem_auto] md:px-5', auf ? 'bg-ink text-white' : 'hover:bg-ink hover:text-white')}
              >
                <span className="text-[13px] tabular-nums opacity-50">{String(i + 1).padStart(2, '0')}</span>
                <span className="grid gap-1">
                  <span className="text-[clamp(1.25rem,2.6vw,2rem)] font-medium leading-tight tracking-tight">{p.titel}</span>
                  <span className="text-[14px] opacity-60">{p.kunde}</span>
                </span>
                <span className="hidden text-[14px] opacity-60 md:block">{p.zeitraum}</span>
                <span className={cn('grid size-10 place-items-center rounded-full border transition-transform duration-300', auf ? 'rotate-45 border-white/30' : 'border-current/20 group-hover:border-white/30')}>
                  <Plus className="size-4" aria-hidden />
                </span>
              </button>
              <Aufklapp offen={auf}>
                <div className="grid gap-6 bg-ink px-3 pb-8 text-white md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1fr)] md:px-5">
                  <span className="hidden md:block" />
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

/* Variante B: Einzelne Karten ------------------------------------------
   Jedes Projekt eine eigene Karte, aufgeklappt mit Details in Spalten. */

export function ListeKarten({ projekte }: { projekte: ProjektKarte[] }) {
  const { filter, setFilter, liste } = useFilter(projekte);
  const [offen, setOffen] = useState<string | null>(null);
  const reduce = useReducedMotion();
  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} anzahl={liste.length} gesamt={projekte.length} />
      <ul className="grid gap-2.5">
        <AnimatePresence initial={false} mode="popLayout">
          {liste.map((p) => {
            const auf = offen === p.id;
            return (
              <motion.li
                key={p.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                className={cn('overflow-hidden rounded-[22px] bg-card transition-shadow duration-300', auf ? 'shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)]' : 'hover:shadow-[0_12px_30px_-20px_rgba(0,0,0,0.3)]')}
              >
                <button type="button" aria-expanded={auf} onClick={() => setOffen(auf ? null : p.id)} className="flex w-full items-center gap-5 px-6 py-5 text-left">
                  <DiamondMini phasen={p.phasen} className="h-6 w-16" />
                  <span className="grid flex-1 gap-0.5">
                    <span className="text-[17px] font-medium leading-snug">{p.titel}</span>
                    <span className="text-[14px] text-muted-foreground">{p.kunde}, {p.zeitraum}</span>
                  </span>
                  {p.fallstudie && <span className="hidden rounded-full bg-muted px-3 py-1 text-[12px] font-medium sm:inline">Fallstudie</span>}
                  <span className={cn('grid size-9 shrink-0 place-items-center rounded-full bg-muted transition-transform duration-300', auf && 'rotate-45 bg-ink text-white')}>
                    <Plus className="size-4" aria-hidden />
                  </span>
                </button>
                <Aufklapp offen={auf}>
                  <div className="grid gap-4 border-t border-foreground/10 px-6 pb-6 pt-5 md:grid-cols-3 md:gap-8">
                    <div className="md:col-span-2">
                      <p className="text-[13px] text-muted-foreground">Worum es ging</p>
                      <p className="mt-1 text-[15px] leading-relaxed">{p.kurz}</p>
                    </div>
                    <div className="grid content-start gap-4">
                      {p.ergebnis && (
                        <div>
                          <p className="text-[13px] text-muted-foreground">Ergebnis</p>
                          <p className="mt-1 text-[15px] font-medium leading-snug">{p.ergebnis}</p>
                        </div>
                      )}
                      <FallstudieLink p={p} />
                    </div>
                    <div className="md:col-span-3"><Phasen p={p} /></div>
                  </div>
                </Aufklapp>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}

/* Variante C: Tabelle ---------------------------------------------------
   Kompakte Spalten mit Phasen als Punkte, ruhig und gut zu überblicken. */

export function ListeTabelle({ projekte }: { projekte: ProjektKarte[] }) {
  const { filter, setFilter, liste } = useFilter(projekte);
  const [offen, setOffen] = useState<string | null>(null);
  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} anzahl={liste.length} gesamt={projekte.length} />
      <div className="overflow-hidden rounded-[24px] bg-card">
        <div className="hidden grid-cols-[8.5rem_minmax(0,1fr)_minmax(0,0.7fr)_repeat(4,2.75rem)_2.5rem] items-center gap-3 border-b border-foreground/10 px-6 py-3.5 text-[12px] text-muted-foreground md:grid">
          <span>Zeitraum</span>
          <span>Projekt</span>
          <span>Kunde</span>
          {PHASEN.map((ph) => <span key={ph} className="text-center">{NAME[ph].slice(0, 3)}</span>)}
          <span />
        </div>
        <ul>
          {liste.map((p) => {
            const auf = offen === p.id;
            return (
              <li key={p.id} className="border-b border-foreground/10 last:border-b-0">
                <button
                  type="button"
                  aria-expanded={auf}
                  onClick={() => setOffen(auf ? null : p.id)}
                  className={cn('grid w-full items-center gap-x-3 gap-y-1 px-6 py-4 text-left transition-colors md:grid-cols-[8.5rem_minmax(0,1fr)_minmax(0,0.7fr)_repeat(4,2.75rem)_2.5rem]', auf ? 'bg-muted/60' : 'hover:bg-muted/40')}
                >
                  <span className="text-[13px] tabular-nums text-muted-foreground">{p.zeitraum}</span>
                  <span className="text-[15px] font-medium leading-snug">{p.titel}</span>
                  <span className="text-[14px] text-muted-foreground">{p.kunde}</span>
                  {PHASEN.map((ph) => (
                    <span key={ph} className="hidden justify-center md:flex" aria-label={p.phasen.includes(ph) ? NAME[ph] : undefined}>
                      <span className={cn('size-2.5 rounded-full', p.phasen.includes(ph) ? 'bg-ink' : 'bg-foreground/15')} />
                    </span>
                  ))}
                  <span className="hidden justify-end md:flex">
                    <Plus className={cn('size-4 text-muted-foreground transition-transform', auf && 'rotate-45')} aria-hidden />
                  </span>
                </button>
                <Aufklapp offen={auf}>
                  <div className="grid gap-4 bg-muted/60 px-6 pb-6 md:grid-cols-[8.5rem_minmax(0,1fr)_minmax(0,0.7fr)] md:gap-3">
                    <span className="hidden md:block" />
                    <p className="text-[15px] leading-relaxed">{p.kurz}</p>
                    <div className="grid content-start gap-3 text-[14px]">
                      {p.ergebnis && <p className="font-medium">{p.ergebnis}</p>}
                      <FallstudieLink p={p} />
                    </div>
                  </div>
                </Aufklapp>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* Variante D: Register --------------------------------------------------
   Links die Projekte als Register, rechts die Details des gewählten Projekts. */

export function ListeRegister({ projekte }: { projekte: ProjektKarte[] }) {
  const { filter, setFilter, liste } = useFilter(projekte);
  const [wahl, setWahl] = useState<string>(projekte[0]?.id ?? '');
  const reduce = useReducedMotion();
  const p = liste.find((x) => x.id === wahl) ?? liste[0];
  return (
    <div className="rounded-[28px] bg-ink p-4 text-white md:p-6">
      <div className="px-2 pt-2"><Filter filter={filter} setFilter={setFilter} anzahl={liste.length} gesamt={projekte.length} dunkel /></div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <ul role="tablist" aria-label="Projekte" aria-orientation="vertical" className="grid content-start gap-1">
          {liste.map((x) => {
            const on = p?.id === x.id;
            return (
              <li key={x.id} role="presentation">
                <button
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setWahl(x.id)}
                  className={cn('relative flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors', on ? 'text-ink' : 'text-white/70 hover:bg-white/5 hover:text-white')}
                >
                  {on && <motion.span layoutId="register-aktiv" className="absolute inset-0 rounded-2xl bg-white" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  <span className="relative grid flex-1 gap-0.5">
                    <span className="text-[15px] font-medium leading-snug">{x.titel}</span>
                    <span className={cn('text-[12px]', on ? 'text-ink/60' : 'text-white/40')}>{x.kunde}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div role="tabpanel" className="min-h-[24rem] rounded-[22px] bg-white/[0.06] p-6 md:p-8">
          <AnimatePresence mode="wait" initial={false}>
            {p && (
              <motion.div key={p.id} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.2 }} className="grid gap-6">
                <div>
                  <p className="text-[13px] text-white/50">{p.kunde}, {p.zeitraum}</p>
                  <h3 className="mt-2 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight">{p.titel}</h3>
                </div>
                <p className="max-w-[56ch] text-[16px] leading-relaxed text-white/80">{p.kurz}</p>
                {p.ergebnis && (
                  <div className="rounded-2xl bg-white/[0.06] p-5">
                    <p className="text-[13px] text-white/50">Ergebnis</p>
                    <p className="mt-1 text-lg font-medium leading-snug">{p.ergebnis}</p>
                  </div>
                )}
                <Phasen p={p} hell />
                <FallstudieLink p={p} hell />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
