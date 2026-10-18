'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { DiamondMini } from '@/components/diamond-mini';
import type { ProjektKarte } from '@/components/project-explorer';
import { cn } from '@/lib/utils';

const PHASEN = ['discover', 'define', 'develop', 'deliver'] as const;
type Phase = (typeof PHASEN)[number];
const NAME: Record<Phase, string> = { discover: 'Discover', define: 'Define', develop: 'Develop', deliver: 'Deliver' };
const H: Record<Phase, string> = {
  discover: 'M4 100 L200 4 L200 196 Z',
  define: 'M200 4 L400 100 L200 196 Z',
  develop: 'M400 100 L600 4 L600 196 Z',
  deliver: 'M600 4 L796 100 L600 196 Z',
};
const LX: Record<Phase, string> = { discover: '17.5%', define: '33%', develop: '67%', deliver: '82.5%' };

/** Projektliste links, rechts ein Double Diamond, der die Phasen des gewählten Projekts zeigt. */
export function ProjekteSplit({ projekte }: { projekte: ProjektKarte[] }) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Phase | null>(null);
  const [offen, setOffen] = useState<string>('');
  const [hover, setHover] = useState<string | null>(null);
  const liste = filter ? projekte.filter((p) => p.phasen.includes(filter)) : projekte;
  const aktivId = hover ?? (offen || null);
  const aktiv = projekte.find((p) => p.id === aktivId) ?? null;
  const anzahl = (ph: Phase) => projekte.filter((p) => p.phasen.includes(ph)).length;
  const gefuellt = (ph: Phase) => (aktiv ? aktiv.phasen.includes(ph) : filter === ph);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
      {/* Liste */}
      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div role="group" aria-label="Nach Phase filtern" className="inline-flex max-w-full flex-wrap gap-1 rounded-full bg-muted p-1">
            {[null, ...PHASEN].map((ph) => {
              const on = filter === ph;
              return (
                <button
                  key={ph ?? 'alle'}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(ph)}
                  className={cn('h-8 rounded-full px-4 text-[14px] transition-all', on ? 'bg-card font-medium shadow-[0_1px_4px_rgba(0,0,0,0.12)]' : 'text-foreground/70 hover:text-foreground')}
                >
                  {ph ? NAME[ph] : 'Alle'}
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="text-sm text-muted-foreground">{filter ? `${liste.length} von ${projekte.length} Projekten` : `${projekte.length} Projekte`}</p>
        </div>

        <Accordion type="single" collapsible value={offen} onValueChange={setOffen} className="rounded-[28px] bg-card px-5 md:px-7" onMouseLeave={() => setHover(null)}>
          <AnimatePresence initial={false} mode="popLayout">
            {liste.map((p) => (
              <motion.div
                key={p.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.12 } }}
                onMouseEnter={() => setHover(p.id)}
              >
                <AccordionItem value={p.id} className="border-foreground/10 [&:last-child]:border-b-0">
                  <AccordionTrigger className="hover:[&_.titel]:translate-x-1">
                    <span className="grid flex-1 gap-0.5">
                      <span className="text-[13px] text-muted-foreground">{p.zeitraum}</span>
                      <span className="titel text-[17px] font-medium leading-snug transition-transform duration-300">{p.titel}</span>
                      <span className="text-[14px] text-muted-foreground">{p.kunde}</span>
                    </span>
                    <DiamondMini phasen={p.phasen} className={cn('transition-opacity', aktivId && aktivId !== p.id && 'opacity-30')} />
                  </AccordionTrigger>
                  <AccordionContent className="grid gap-3 text-[15px] leading-relaxed">
                    <p className="max-w-[62ch] text-foreground/80">{p.kurz}</p>
                    {p.ergebnis && <p className="max-w-[62ch]"><span className="font-medium">Ergebnis:</span> {p.ergebnis}</p>}
                    <p className="text-muted-foreground"><span className="font-medium text-foreground">Rolle:</span> {p.rolle}</p>
                    <div className="flex flex-wrap gap-1.5">{p.tags.map((t) => <Badge key={t}>{t}</Badge>)}</div>
                    {p.fallstudie && (
                      <Link href={`/projekte/${p.id}`} className="inline-flex w-fit items-center gap-1 font-medium underline-offset-4 hover:underline">
                        Fallstudie lesen<ArrowUpRight className="size-4" aria-hidden />
                      </Link>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </Accordion>
      </div>

      {/* Visualisierung */}
      <aside className="hidden lg:block">
        <div className="sticky top-28 rounded-[28px] bg-ink p-8 text-white">
          <p className="mb-6 text-[13px] text-white/50">{aktiv ? 'Phasen in diesem Projekt' : filter ? `Projekte mit ${NAME[filter]}` : 'Projekte pro Phase'}</p>
          <div className="relative">
            <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="h-[210px] w-full overflow-visible" aria-hidden>
              <line x1="0" y1="100" x2="800" y2="100" stroke="rgba(255,255,255,0.2)" strokeDasharray="2 5" vectorEffect="non-scaling-stroke" />
              {PHASEN.map((ph) => (
                <motion.path
                  key={ph}
                  d={H[ph]}
                  stroke="#ffffff"
                  strokeWidth={1.5}
                  vectorEffect="non-scaling-stroke"
                  strokeLinejoin="round"
                  animate={{ fill: gefuellt(ph) ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.04)' }}
                  transition={{ duration: reduce ? 0 : 0.3 }}
                />
              ))}
            </svg>
            {PHASEN.map((ph) => (
              <span key={ph} className="absolute top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center text-center" style={{ left: LX[ph] }}>
                <span className={cn('text-[12px] font-medium transition-colors duration-300', gefuellt(ph) ? 'text-ink' : 'text-white')}>{NAME[ph]}</span>
                {!aktiv && <span className={cn('text-[11px] transition-colors duration-300', gefuellt(ph) ? 'text-ink/60' : 'text-white/50')}>{anzahl(ph)}</span>}
              </span>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 border-t border-white/10 pt-5 text-[13px] text-white/50">
            <span>Problem verstehen</span>
            <span className="text-right">Lösung entwickeln</span>
          </div>
          <div className="mt-6 min-h-[6.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={aktiv?.id ?? 'leer'} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.18 }}>
                {aktiv ? (
                  <>
                    <p className="text-xl font-medium leading-snug tracking-tight">{aktiv.titel}</p>
                    <p className="mt-1 text-[14px] text-white/55">{aktiv.kunde}</p>
                    {aktiv.ergebnis && <p className="mt-4 text-[15px] leading-relaxed text-white/80">{aktiv.ergebnis}</p>}
                  </>
                ) : (
                  <p className="text-[15px] leading-relaxed text-white/60">Fahre über ein Projekt, um zu sehen, welche Phasen ich darin verantwortet habe.</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </aside>
    </div>
  );
}
