'use client';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

type Phase = 'discover' | 'define' | 'develop' | 'deliver';
type Text = Record<Phase, { name: string; text: string; methoden: string[] }>;
type Pt = [number, number];

const PHASEN: Phase[] = ['discover', 'define', 'develop', 'deliver'];

// Eckpunkte im Koordinatensystem 800 × 290 (unten Platz für die Beschriftung)
const START: Pt = [20, 110];
const MITTE: Pt = [400, 110];
const ENDE: Pt = [780, 110];

const HALVES: Record<Phase, string> = {
  discover: 'M20 110 L210 16 L210 204 Z',
  define: 'M210 16 L400 110 L210 204 Z',
  develop: 'M400 110 L590 16 L590 204 Z',
  deliver: 'M590 16 L780 110 L590 204 Z',
};
const BASIS: Record<Phase, string> = { discover: '#ececec', define: '#e2e2e2', develop: '#f7f7f7', deliver: '#efefef' };
const LABEL: Record<Phase, { x: string; y: string }> = {
  discover: { x: '18.4%', y: '49.5%' },
  define: { x: '34.1%', y: '49.5%' },
  develop: { x: '65.9%', y: '49.5%' },
  deliver: { x: '81.6%', y: '49.5%' },
};
export function DoubleDiamond({ texte, spaces, hint }: { texte: Text; spaces: [string, string]; hint: string }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<Phase | null>(null);
  const [pinned, setPinned] = useState<Phase | null>(null);
  const aktiv = hover ?? pinned;
  const toggle = (p: Phase) => setPinned((cur) => (cur === p ? null : p));
  const raum = aktiv ? (aktiv === 'discover' || aktiv === 'define' ? 0 : 1) : null;


  return (
    <div>
      {/* Problem- und Lösungsraum, mittig über dem jeweiligen Diamanten */}
      <div className="mb-3 grid grid-cols-2 text-center">
        {spaces.map((sp, i) => (
          <span
            key={sp}
            className={cn('text-[clamp(1rem,2.2vw,1.6rem)] font-medium tracking-tight transition-opacity duration-300', raum !== null && raum !== i && 'opacity-35')}
          >
            {sp}
          </span>
        ))}
      </div>

      <div className="relative" onMouseLeave={() => setHover(null)}>
        <svg viewBox="0 0 800 222" className="block h-auto w-full overflow-visible">

          {PHASEN.map((p) => (
            <path
              key={p}
              d={HALVES[p]}
              onMouseEnter={() => setHover(p)}
              onClick={() => toggle(p)}
              className="cursor-pointer transition-[fill] duration-200"
              fill={aktiv === p ? '#111111' : aktiv && PHASEN.indexOf(p) < PHASEN.indexOf(aktiv) ? 'color-mix(in srgb, var(--brand) 22%, white)' : BASIS[p]}
              aria-hidden
            />
          ))}
          {['M20 110 L210 16 L400 110 L210 204 Z', 'M400 110 L590 16 L780 110 L590 204 Z'].map((d, i) => (
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

          {/* Feine Hilfslinien von den Punkten zur Beschriftung */}
          {[START, MITTE, ENDE].map((p) => (
            <line key={'l' + p.join()} x1={p[0]} y1={p[1] + 8} x2={p[0]} y2={220} stroke="#9a9a9a" strokeWidth={1} strokeDasharray="2 4" vectorEffect="non-scaling-stroke" pointerEvents="none" />
          ))}
          {/* Punkte auf der Achse */}
          {[START, MITTE, ENDE].map((p) => (
            <circle key={p.join()} cx={p[0]} cy={p[1]} r={6} fill="#ffffff" stroke="#111111" strokeWidth={2} pointerEvents="none" />
          ))}

        </svg>

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
            style={{ left: LABEL[p].x, top: LABEL[p].y }}
            className={cn(
              'absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-1 py-1 text-[11px] font-medium tracking-tight transition-colors sm:px-2 sm:text-[15px] md:text-base',
              aktiv === p ? 'text-white' : 'text-foreground',
            )}
          >
            {texte[p].name}
          </button>
        ))}

        {/* Beschriftung direkt unter den drei Punkten */}
        <div aria-hidden className="pointer-events-none relative mt-2 h-5 text-[11px] text-muted-foreground sm:text-[14px]">
          <span className="absolute left-0 whitespace-nowrap">Ausgangslage</span>
          <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap">Problemdefinition</span>
          <span className="absolute right-0 whitespace-nowrap">Lösung</span>
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
