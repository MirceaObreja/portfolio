'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { DiamondMini } from '@/components/diamond-mini';
import type { ProjektKarte } from '@/components/project-explorer';
import { cn } from '@/lib/utils';

const PHASEN = ['discover', 'define', 'develop', 'deliver'] as const;
type Phase = (typeof PHASEN)[number];
const NAME: Record<Phase, string> = { discover: 'Discover', define: 'Define', develop: 'Develop', deliver: 'Deliver' };

function Details({ p }: { p: ProjektKarte }) {
  return (
    <div className="grid gap-3 pb-6 text-[15px] leading-relaxed">
      <p className="max-w-[62ch] text-foreground/80">{p.kurz}</p>
      {p.ergebnis && <p className="max-w-[62ch]"><span className="font-medium">Ergebnis:</span> {p.ergebnis}</p>}
      <p className="text-muted-foreground"><span className="font-medium text-foreground">Rolle:</span> {p.rolle}</p>
      {p.fallstudie && (
        <Link href={`/projekte/${p.id}`} className="inline-flex w-fit items-center gap-1 font-medium underline-offset-4 hover:underline">
          Fallstudie lesen<ArrowUpRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Variante 1: Phasen-Matrix. Jede Zeile zeigt als Balken, welche Phasen das Projekt abdeckt. */

export function ProjekteMatrix({ projekte }: { projekte: ProjektKarte[] }) {
  const [offen, setOffen] = useState<string | null>(null);
  const reduce = useReducedMotion();
  return (
    <div className="overflow-hidden rounded-[28px] bg-card">
      <div className="hidden grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))_2rem] items-end gap-3 border-b border-foreground/10 px-8 pb-4 pt-7 text-[14px] font-medium md:grid">
        <span className="text-muted-foreground">Projekt</span>
        {PHASEN.map((ph) => (
          <span key={ph} className="flex items-center gap-2">
            <DiamondMini phasen={[ph]} className="h-3 w-8" />
            <span>{NAME[ph]}</span>
          </span>
        ))}
        <span />
      </div>
      <ul>
        {projekte.map((p) => {
          const auf = offen === p.id;
          const idx = PHASEN.map((ph) => p.phasen.includes(ph));
          const first = idx.indexOf(true);
          const last = idx.lastIndexOf(true);
          return (
            <li key={p.id} className="border-b border-foreground/10 last:border-b-0">
              <button
                type="button"
                aria-expanded={auf}
                onClick={() => setOffen(auf ? null : p.id)}
                className="group grid w-full items-center gap-3 px-5 py-5 text-left transition-colors hover:bg-background/60 md:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))_2rem] md:px-8"
              >
                <span className="grid gap-0.5">
                  <span className="text-[13px] text-muted-foreground">{p.zeitraum}</span>
                  <span className="text-[17px] font-medium leading-snug">{p.titel}</span>
                  <span className="text-[14px] text-muted-foreground">{p.kunde}</span>
                </span>
                {/* Balken über die vier Phasen */}
                <span className="relative col-span-4 hidden h-full items-center md:grid md:grid-cols-4 md:gap-3" aria-label={`Phasen: ${PHASEN.filter((ph) => p.phasen.includes(ph)).map((ph) => NAME[ph]).join(', ')}`}>
                  {PHASEN.map((ph) => (
                    <span key={ph} className="h-px w-full bg-foreground/10" />
                  ))}
                  {first > -1 && (
                    <motion.span
                      className="absolute h-2.5 rounded-full bg-ink"
                      style={{ left: `calc(${(first / 4) * 100}% + 2px)`, width: `calc(${((last - first + 1) / 4) * 100}% - 14px)` }}
                      initial={reduce ? false : { scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
                    />
                  )}
                </span>
                <DiamondMini phasen={p.phasen} className="md:hidden" />
                <ChevronDown className={cn('hidden size-4 justify-self-end text-muted-foreground transition-transform md:block', auf && 'rotate-180')} aria-hidden />
              </button>
              <AnimatePresence initial={false}>
                {auf && (
                  <motion.div
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    className="overflow-hidden px-5 md:px-8"
                  >
                    <Details p={p} />
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

/* ---------------------------------------------------------------- */
/* Variante 2: Karten mit grossem Double Diamond pro Projekt. */

function DiamondGross({ phasen, className }: { phasen: string[]; className?: string }) {
  const H: Record<Phase, string> = {
    discover: 'M2 50 L50 2 L50 98 Z',
    define: 'M50 2 L98 50 L50 98 Z',
    develop: 'M102 50 L150 2 L150 98 Z',
    deliver: 'M150 2 L198 50 L150 98 Z',
  };
  return (
    <svg viewBox="0 0 200 100" className={className} aria-hidden>
      {PHASEN.map((ph, i) => (
        <motion.path
          key={ph}
          d={H[ph]}
          strokeWidth={1.5}
          strokeLinejoin="round"
          stroke="#111"
          variants={{
            rest: { fill: phasen.includes(ph) ? '#111111' : 'rgba(17,17,17,0)' },
            hover: { fill: phasen.includes(ph) ? '#111111' : 'rgba(17,17,17,0.06)', transition: { delay: i * 0.05 } },
          }}
        />
      ))}
    </svg>
  );
}

export function ProjekteKarten({ projekte }: { projekte: ProjektKarte[] }) {
  const [offen, setOffen] = useState<ProjektKarte | null>(null);
  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projekte.map((p) => (
          <motion.li key={p.id} initial="rest" animate="rest" whileHover="hover">
            <button
              type="button"
              onClick={() => setOffen(p)}
              className="flex h-full w-full flex-col rounded-[24px] bg-card p-6 text-left transition-shadow hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-[13px] text-muted-foreground">{p.zeitraum}</span>
                {p.fallstudie && <span className="rounded-full bg-ink px-2.5 py-0.5 text-[12px] font-medium text-white">Fallstudie</span>}
              </div>
              <DiamondGross phasen={p.phasen} className="my-8 h-auto w-full max-w-[220px] self-center" />
              <span className="text-[18px] font-medium leading-snug tracking-tight">{p.titel}</span>
              <span className="mt-1 text-[14px] text-muted-foreground">{p.kunde}</span>
              <span className="mt-4 flex flex-wrap gap-1.5">
                {p.phasen.map((ph) => (
                  <span key={ph} className="rounded-full border border-foreground/15 px-2.5 py-0.5 text-[12px]">{NAME[ph as Phase]}</span>
                ))}
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
      <AnimatePresence>
        {offen && (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOffen(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={offen.titel}
              className="max-h-[85vh] w-full max-w-xl overflow-auto rounded-[28px] bg-card p-7 md:p-9"
              initial={{ y: 20, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 10, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[13px] text-muted-foreground">{offen.kunde}, {offen.zeitraum}</p>
                  <h3 className="mt-1 text-2xl">{offen.titel}</h3>
                </div>
                <button type="button" onClick={() => setOffen(null)} className="rounded-full border border-foreground/15 px-3 py-1 text-[14px]">Schliessen</button>
              </div>
              <DiamondGross phasen={offen.phasen} className="mb-6 h-auto w-40" />
              <Details p={offen} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Variante 3: Ein grosser Double Diamond links, Projektliste rechts. Darüberfahren zeigt die Phasen, Klicken filtert. */

export function ProjekteDiamond({ projekte }: { projekte: ProjektKarte[] }) {
  const [hover, setHover] = useState<ProjektKarte | null>(null);
  const [filter, setFilter] = useState<Phase | null>(null);
  const [offen, setOffen] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const liste = filter ? projekte.filter((p) => p.phasen.includes(filter)) : projekte;
  const anzahl = (ph: Phase) => projekte.filter((p) => p.phasen.includes(ph)).length;
  const H: Record<Phase, string> = {
    discover: 'M4 100 L100 4 L100 196 Z',
    define: 'M100 4 L196 100 L100 196 Z',
    develop: 'M204 100 L300 4 L300 196 Z',
    deliver: 'M300 4 L396 100 L300 196 Z',
  };
  const LX: Record<Phase, number> = { discover: 66, define: 134, develop: 266, deliver: 334 };
  const gefuellt = (ph: Phase) => (hover ? hover.phasen.includes(ph) : filter === ph);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[28px] bg-card p-6 md:p-8">
          <svg viewBox="0 0 400 200" className="h-auto w-full overflow-visible">
            {PHASEN.map((ph) => (
              <g key={ph} onClick={() => setFilter(filter === ph ? null : ph)} className="cursor-pointer">
                <motion.path
                  d={H[ph]}
                  stroke="#111"
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  animate={{ fill: gefuellt(ph) ? '#111111' : 'rgba(17,17,17,0)' }}
                  transition={{ duration: reduce ? 0 : 0.25 }}
                />
                <text x={LX[ph]} y={96} textAnchor="middle" fontSize="13" fontWeight={500} fill={gefuellt(ph) ? '#fff' : '#111'} style={{ transition: 'fill .25s' }}>{NAME[ph]}</text>
                <text x={LX[ph]} y={116} textAnchor="middle" fontSize="11" fill={gefuellt(ph) ? 'rgba(255,255,255,0.7)' : '#767676'} style={{ transition: 'fill .25s' }}>{anzahl(ph)} Projekte</text>
              </g>
            ))}
          </svg>
          <div className="mt-5 min-h-[3.5rem] border-t border-foreground/10 pt-4 text-[15px]">
            {hover ? (
              <p><span className="font-medium">{hover.titel}</span><br /><span className="text-muted-foreground">{hover.phasen.map((ph) => NAME[ph as Phase]).join(', ')}</span></p>
            ) : filter ? (
              <p>
                {liste.length} Projekte mit {NAME[filter]}.{' '}
                <button type="button" onClick={() => setFilter(null)} className="underline underline-offset-4">Alle zeigen</button>
              </p>
            ) : (
              <p className="text-muted-foreground">Fahre über ein Projekt, um seine Phasen zu sehen. Klicke auf eine Phase, um zu filtern.</p>
            )}
          </div>
        </div>
      </div>

      <ul className="border-t border-foreground" onMouseLeave={() => setHover(null)}>
        {liste.map((p) => {
          const auf = offen === p.id;
          return (
            <li key={p.id} className="border-b border-foreground/10" onMouseEnter={() => setHover(p)}>
              <button
                type="button"
                aria-expanded={auf}
                onClick={() => setOffen(auf ? null : p.id)}
                onFocus={() => setHover(p)}
                className="group flex w-full items-center gap-4 py-5 text-left"
              >
                <span className="grid flex-1 gap-0.5">
                  <span className="text-[13px] text-muted-foreground">{p.zeitraum}</span>
                  <span className="text-[clamp(1.1rem,1.6vw,1.35rem)] font-medium leading-snug tracking-tight transition-transform duration-300 group-hover:translate-x-1.5">{p.titel}</span>
                  <span className="text-[14px] text-muted-foreground">{p.kunde}</span>
                </span>
                <DiamondMini phasen={p.phasen} />
                <ChevronDown className={cn('size-4 text-muted-foreground transition-transform', auf && 'rotate-180')} aria-hidden />
              </button>
              <AnimatePresence initial={false}>
                {auf && (
                  <motion.div
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <Details p={p} />
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
