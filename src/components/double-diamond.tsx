'use client';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

type Phase = 'discover' | 'define' | 'develop' | 'deliver';
type Text = Record<Phase, { name: string; text: string; methoden: string[] }>;

const PHASEN: Phase[] = ['discover', 'define', 'develop', 'deliver'];
// Klassische Form: Die Diamanten berühren sich in der Mitte (Problemdefinition)
const HALVES: Record<Phase, string> = {
  discover: 'M4 100 L200 4 L200 196 Z',
  define: 'M200 4 L400 100 L200 196 Z',
  develop: 'M400 100 L600 4 L600 196 Z',
  deliver: 'M600 4 L796 100 L600 196 Z',
};
const BASIS: Record<Phase, string> = { discover: '#ececec', define: '#e2e2e2', develop: '#f7f7f7', deliver: '#efefef' };
const LABEL_X: Record<Phase, string> = { discover: '17.5%', define: '33%', develop: '67%', deliver: '82.5%' };
const BEWEGUNG: Record<Phase, string> = { discover: 'öffnen', define: 'fokussieren', develop: 'öffnen', deliver: 'fokussieren' };
const PUNKTE = [
  { x: '0.5%', label: 'Ausgangslage', align: 'left' },
  { x: '50%', label: 'Problemdefinition', align: 'center' },
  { x: '99.5%', label: 'Lösung', align: 'right' },
] as const;
const OUTLINES = ['M4 100 L200 4 L400 100 L200 196 Z', 'M400 100 L600 4 L796 100 L600 196 Z'];

export function DoubleDiamond({ texte, spaces, hint }: { texte: Text; spaces: [string, string]; hint: string }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<Phase | null>(null);
  const [pinned, setPinned] = useState<Phase | null>(null);
  const aktiv = hover ?? pinned;
  const toggle = (p: Phase) => setPinned((cur) => (cur === p ? null : p));
  const raum = aktiv ? (aktiv === 'discover' || aktiv === 'define' ? 0 : 1) : null;

  return (
    <div>
      {/* Problem- und Lösungsraum */}
      <div className="mb-4 grid grid-cols-2">
        {spaces.map((sp, i) => (
          <div key={sp} className={cn('flex items-baseline gap-2.5 pt-1 transition-opacity duration-300', raum !== null && raum !== i && 'opacity-40', i === 1 && 'justify-end text-right md:justify-start md:pl-6 md:text-left')}>
            <span className="text-[13px] tabular-nums text-muted-foreground">0{i + 1}</span>
            <span className="text-[clamp(1.05rem,2.2vw,1.6rem)] font-medium tracking-tight">{sp}</span>
          </div>
        ))}
      </div>

      <div className="relative" onMouseLeave={() => setHover(null)}>
        {/* Öffnen und Fokussieren über den Hälften */}
        <div aria-hidden className="mb-2 hidden grid-cols-4 text-center text-[12px] text-muted-foreground sm:grid">
          {PHASEN.map((p) => (
            <span key={p} className={cn('transition-colors', aktiv === p && 'text-foreground')}>{BEWEGUNG[p]}</span>
          ))}
        </div>
        <div className="relative">
          <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="block h-[170px] w-full overflow-visible sm:h-auto">
            <line x1="0" y1="100" x2="800" y2="100" stroke="#c9c9c9" strokeWidth={1} strokeDasharray="2 5" vectorEffect="non-scaling-stroke" />
            {PHASEN.map((p) => (
              <path
                key={p}
                d={HALVES[p]}
                onMouseEnter={() => setHover(p)}
                onClick={() => toggle(p)}
                className="cursor-pointer transition-[fill] duration-200"
                fill={aktiv === p ? '#111111' : BASIS[p]}
                aria-hidden
              />
            ))}
            {OUTLINES.map((d, i) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="#111111"
                strokeWidth={1.75}
                strokeLinejoin="round"
                pointerEvents="none"
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.15 + i * 0.5, duration: 1, ease: [0.65, 0, 0.35, 1] }}
              />
            ))}
          </svg>
          {/* Punkte auf der Achse */}
          {PUNKTE.map((pt) => (
            <span key={pt.label} aria-hidden className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-white" style={{ left: pt.x }} />
          ))}
          {PHASEN.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={pinned === p}
              aria-controls="phase-text"
              onMouseEnter={() => setHover(p)}
              onFocus={() => setHover(p)}
              onBlur={() => setHover(null)}
              onClick={() => toggle(p)}
              style={{ left: LABEL_X[p] }}
              className={cn(
                'absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-1 py-1 text-[12px] font-medium tracking-tight transition-colors sm:px-2 sm:text-[15px] md:text-base',
                aktiv === p ? 'text-white' : 'text-foreground',
              )}
            >
              {texte[p].name}
            </button>
          ))}
        </div>
        <div aria-hidden className="relative mt-3 h-5 text-[12px] text-muted-foreground sm:text-[13px]">
          {PUNKTE.map((pt) => (
            <span
              key={pt.label}
              className={cn('absolute top-0 whitespace-nowrap', pt.align === 'center' && '-translate-x-1/2', pt.align === 'right' && '-translate-x-full')}
              style={{ left: pt.x }}
            >
              {pt.label}
            </span>
          ))}
        </div>
      </div>

      <div id="phase-text" aria-live="polite" className="mt-8 min-h-[9.5rem] border-t border-foreground/10 pt-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={aktiv ?? 'hint'}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {aktiv ? (
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-10">
                <p className="max-w-[48ch]">
                  <span className="mb-1 block text-xl font-semibold tracking-tight">{texte[aktiv].name}</span>
                  {texte[aktiv].text}
                </p>
                <ul className="flex flex-wrap content-start gap-2" aria-label="Methoden">
                  {texte[aktiv].methoden.map((m, i) => (
                    <motion.li
                      key={m}
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.2 }}
                      className="rounded-full border border-foreground/15 bg-background px-3.5 py-1.5 text-[14px]"
                    >
                      {m}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-muted-foreground">{hint}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
