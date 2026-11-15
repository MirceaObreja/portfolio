'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { ListeIndex } from '@/components/projekte-listen';
import { ProjektTabs } from '@/components/projekt-tabs';
import { DiamondMini } from '@/components/diamond-mini';
import { Licht } from '@/components/licht';
import { Flaeche } from '@/components/flaeche';
import type { ProjektKarte } from '@/components/project-explorer';
import { cn } from '@/lib/utils';

const PHASEN = ['discover', 'define', 'develop', 'deliver'] as const;
type Phase = (typeof PHASEN)[number];
const NAME: Record<Phase, string> = { discover: 'Discover', define: 'Define', develop: 'Develop', deliver: 'Deliver' };
type Props = { projekte: ProjektKarte[] };

function useFilter(projekte: ProjektKarte[]) {
  const [filter, setFilter] = useState<Phase | null>(null);
  const liste = filter ? projekte.filter((p) => p.phasen.includes(filter)) : projekte;
  const anzahl = (ph: Phase) => projekte.filter((p) => p.phasen.includes(ph)).length;
  return { filter, setFilter, liste, anzahl };
}

const phasenText = (p: ProjektKarte) => PHASEN.filter((x) => p.phasen.includes(x)).map((x) => NAME[x]).join(', ');

function Fallstudie({ p, hell = false }: { p: ProjektKarte; hell?: boolean }) {
  if (!p.fallstudie) return null;
  return (
    <Link href={`/projekte/${p.id}`} className={cn('inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium', hell ? 'bg-white text-ink' : 'bg-ink text-white')}>
      Fallstudie lesen<ArrowUpRight className="size-4" aria-hidden />
    </Link>
  );
}

const marke = 'mb-1.5 block text-[12px] uppercase tracking-[0.08em]';

/* B: Liste links, dunkle Bühne rechts ------------------------------------ */

function Geteilt({ projekte }: Props) {
  const { filter, setFilter, liste, anzahl } = useFilter(projekte);
  const [wahl, setWahl] = useState(projekte[0]?.id);
  const reduce = useReducedMotion();
  const p = liste.find((x) => x.id === wahl) ?? liste[0];
  return (
    <div>
      <ProjektTabs filter={filter} setFilter={setFilter} gesamt={projekte.length} anzahl={anzahl} treffer={liste.length} />
      <div className="grid gap-6 border-t border-foreground pt-6 md:grid-cols-12 md:gap-8">
        <ul className="md:col-span-5">
          {liste.map((x) => {
            const an = p?.id === x.id;
            return (
              <li key={x.id}>
                <button
                  type="button"
                  aria-pressed={an}
                  onMouseEnter={() => setWahl(x.id)}
                  onFocus={() => setWahl(x.id)}
                  onClick={() => setWahl(x.id)}
                  className={cn('group flex w-full items-center justify-between gap-4 rounded-[18px] px-4 py-3.5 text-left transition-colors duration-200', an ? 'bg-white shadow-[0_1px_2px_rgba(31,43,51,0.06),0_10px_24px_-14px_rgba(31,43,51,0.3)]' : 'hover:bg-white/60')}
                >
                  <span className="grid gap-0.5">
                    <span className={cn('text-[clamp(0.95rem,1.25vw,1.1rem)] font-medium leading-snug tracking-tight', !an && 'text-foreground/70')}>{x.titel}</span>
                    <span className="text-[13px] text-muted-foreground">{x.kunde}</span>
                  </span>
                  <ArrowUpRight className={cn('size-4 shrink-0 transition-all duration-300', an ? 'rotate-45 opacity-100' : 'opacity-0')} aria-hidden />
                </button>
              </li>
            );
          })}
        </ul>
        {p && (
          <div className="md:col-span-7">
            <div className="group relative isolate overflow-clip rounded-[28px] bg-nacht text-white md:sticky md:top-28 md:rounded-[36px]">
              <Licht stil="lichter" i={liste.indexOf(p)} />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(31,43,51,0.7),rgba(31,43,51,0.35))]" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={p.id}
                  aria-live="polite"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="relative grid min-h-[440px] content-between gap-10 p-7 md:min-h-[520px] md:p-10"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 text-[14px] text-white/70">
                      <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-white backdrop-blur-md">{p.kunde}</span>
                      <span>{p.zeitraum}</span>
                    </div>
                    <h3 className="mt-8 max-w-[22ch] text-[clamp(1.4rem,2.4vw,2.2rem)] font-medium leading-tight tracking-[-0.03em]">{p.titel}</h3>
                    <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-white/80">{p.kurz}</p>
                  </div>
                  <div className="grid gap-6 border-t border-white/15 pt-6 sm:grid-cols-2">
                    <div>
                      <span className={cn(marke, 'text-white/50')}>Ergebnis</span>
                      <p className="text-[clamp(1.05rem,1.4vw,1.25rem)] font-medium leading-snug">{p.ergebnis ?? '–'}</p>
                    </div>
                    <div className="grid content-start gap-4">
                      <div>
                        <span className={cn(marke, 'text-white/50')}>Meine Rolle</span>
                        <p className="text-[15px] leading-relaxed text-white/85">{p.rolle}</p>
                      </div>
                      <div className="flex items-center gap-3 text-[14px] text-white/85"><DiamondMini hell phasen={p.phasen} className="h-5 w-14" />{phasenText(p)}</div>
                      <Fallstudie p={p} hell />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* C: Kacheln, die sich an Ort und Stelle öffnen ----------------------------- */

function Kacheln({ projekte }: Props) {
  const { filter, setFilter, liste, anzahl } = useFilter(projekte);
  const [offen, setOffen] = useState<string | null>(null);
  const reduce = useReducedMotion();
  return (
    <div>
      <ProjektTabs filter={filter} setFilter={setFilter} gesamt={projekte.length} anzahl={anzahl} treffer={liste.length} />
      <ul className="grid gap-5 border-t border-foreground pt-6 sm:grid-cols-2 lg:grid-cols-3">
        {liste.map((p, i) => {
          const auf = offen === p.id;
          return (
            <li key={p.id} className="group relative isolate flex min-h-[340px] flex-col overflow-clip rounded-[28px]">
              <Flaeche i={i} />
              <button type="button" aria-expanded={auf} onClick={() => setOffen(auf ? null : p.id)} className="relative flex flex-1 flex-col justify-between gap-8 p-7 text-left">
                <span className="flex items-start justify-between gap-4">
                  <span className="grid gap-1 text-[14px] text-foreground/70"><span className="font-medium text-foreground">{p.kunde}</span>{p.zeitraum}</span>
                  <span className={cn('relative z-20 grid size-10 shrink-0 place-items-center rounded-full border transition-[transform,color,border-color] duration-300', auf ? 'rotate-45 border-white/30 text-white' : 'border-foreground/20')}><Plus className="size-4" aria-hidden /></span>
                </span>
                <span className="grid gap-4">
                  <span className="text-[clamp(1.1rem,1.5vw,1.35rem)] font-medium leading-tight tracking-tight">{p.titel}</span>
                  <span className="flex items-center gap-3 text-[13px] text-foreground/70"><DiamondMini phasen={p.phasen} className="h-5 w-14" />{phasenText(p)}</span>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {auf && (
                  <motion.div
                    initial={reduce ? false : { y: '100%' }}
                    animate={{ y: 0 }}
                    exit={reduce ? undefined : { y: '100%' }}
                    transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                    className="absolute inset-0 z-10 flex flex-col justify-end gap-5 overflow-y-auto bg-nacht p-7 pr-16 text-white"
                    onClick={() => setOffen(null)}
                  >
                    <div><span className={cn(marke, 'text-white/50')}>Aufgabe</span><p className="text-[14px] leading-relaxed text-white/80">{p.kurz}</p></div>
                    <div><span className={cn(marke, 'text-white/50')}>Ergebnis</span><p className="text-[16px] font-medium leading-snug">{p.ergebnis ?? '–'}</p></div>
                    <div><span className={cn(marke, 'text-white/50')}>Meine Rolle</span><p className="text-[14px] leading-relaxed text-white/80">{p.rolle}</p></div>
                    <Fallstudie p={p} hell />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* D: Tabelle, Ergebnis ohne Klick sichtbar ---------------------------------- */

function Tabelle({ projekte }: Props) {
  const { filter, setFilter, liste, anzahl } = useFilter(projekte);
  const [offen, setOffen] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const spalten = 'md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_5.5rem_2.5rem]';
  return (
    <div>
      <ProjektTabs filter={filter} setFilter={setFilter} gesamt={projekte.length} anzahl={anzahl} treffer={liste.length} />
      <div className={cn('hidden gap-6 border-t border-foreground px-5 py-3 text-[12px] uppercase tracking-[0.08em] text-muted-foreground md:grid', spalten)}>
        <span>Projekt</span><span>Ergebnis</span><span>Phasen</span><span />
      </div>
      <ul className="max-md:border-t max-md:border-foreground">
        {liste.map((p) => {
          const auf = offen === p.id;
          return (
            <li key={p.id} className={cn('border-t border-foreground/12 transition-[background-color,border-radius,margin] duration-300', auf && 'my-2 rounded-[24px] border-transparent bg-white shadow-[0_1px_2px_rgba(31,43,51,0.06),0_18px_40px_-24px_rgba(31,43,51,0.35)]')}>
              <button type="button" aria-expanded={auf} onClick={() => setOffen(auf ? null : p.id)} className={cn('grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-3 rounded-[24px] px-5 py-5 text-left transition-colors', spalten, !auf && 'hover:bg-white/60')}>
                <span className="grid gap-1">
                  <span className="text-[clamp(1rem,1.35vw,1.2rem)] font-medium leading-snug tracking-tight">{p.titel}</span>
                  <span className="text-[13px] text-muted-foreground">{p.kunde} · {p.zeitraum}</span>
                </span>
                <span className="text-[15px] leading-snug text-foreground/80 max-md:col-span-2 max-md:row-start-2">{p.ergebnis ?? '–'}</span>
                <span className="max-md:hidden"><DiamondMini phasen={p.phasen} className="h-6 w-16" /></span>
                <span className={cn('grid size-9 place-items-center rounded-full border border-foreground/20 transition-transform duration-300 max-md:col-start-2 max-md:row-start-1', auf && 'rotate-45')}><Plus className="size-4" aria-hidden /></span>
              </button>
              <AnimatePresence initial={false}>
                {auf && (
                  <motion.div initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={reduce ? undefined : { height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }} className="overflow-hidden">
                    <div className="grid gap-6 border-t border-foreground/10 px-5 pb-7 pt-5 text-[15px] leading-relaxed md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_8rem] md:gap-6">
                      <div><span className={cn(marke, 'text-muted-foreground')}>Aufgabe</span><p className="text-foreground/80">{p.kurz}</p></div>
                      <div className="grid content-start gap-4"><div><span className={cn(marke, 'text-muted-foreground')}>Meine Rolle</span><p className="text-foreground/80">{p.rolle}</p></div><Fallstudie p={p} /></div>
                      <div><span className={cn(marke, 'text-muted-foreground')}>Phasen</span><p className="text-foreground/80">{phasenText(p)}</p></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* Umschalter (vorübergehend) --------------------------------------------- */

const VARIANTEN = { a: 'A  Liste (bisher)', b: 'B  Geteilt', c: 'C  Kacheln', d: 'D  Tabelle' } as const;
type V = keyof typeof VARIANTEN;

/** Die geteilte Ansicht braucht Breite: auf schmalen Bildschirmen wird die Liste gezeigt. */
function GeteiltOderListe({ projekte }: Props) {
  const [breit, setBreit] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const setzen = () => setBreit(mq.matches);
    setzen();
    mq.addEventListener('change', setzen);
    return () => mq.removeEventListener('change', setzen);
  }, []);
  return breit ? <Geteilt projekte={projekte} /> : <ListeIndex projekte={projekte} />;
}

export function ProjekteWahl({ projekte }: Props) {
  const [v, setV] = useState<V>('b');
  return (
    <>
      <div className="mb-10 flex w-fit flex-wrap gap-1 rounded-full border border-foreground/15 bg-white/70 p-1 text-[13px]">
        {(Object.keys(VARIANTEN) as V[]).map((k) => (
          <button key={k} type="button" aria-pressed={v === k} onClick={() => setV(k)} className={cn('rounded-full px-3.5 py-2 transition-colors', v === k ? 'bg-ink text-white' : 'hover:bg-white')}>
            {VARIANTEN[k]}
          </button>
        ))}
      </div>
      {v === 'a' && <ListeIndex projekte={projekte} />}
      {v === 'b' && <GeteiltOderListe projekte={projekte} />}
      {v === 'c' && <Kacheln projekte={projekte} />}
      {v === 'd' && <Tabelle projekte={projekte} />}
    </>
  );
}
