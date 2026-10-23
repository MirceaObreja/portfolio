'use client';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

type Phase = 'discover' | 'define' | 'develop' | 'deliver';
type Text = Record<Phase, { name: string; text: string; methoden: string[] }>;
type Pt = [number, number];

const PHASEN: Phase[] = ['discover', 'define', 'develop', 'deliver'];

// Jeder Diamant wird vom linken Punkt aus oben und unten gleichzeitig gezeichnet, zuerst der erste, dann der zweite
const KONTUR = [
  ['M20 110 L210 16 L400 110', 'M20 110 L210 204 L400 110'],
  ['M400 110 L590 16 L780 110', 'M400 110 L590 204 L780 110'],
];
const DAUER = 0.9;
const START_ZEIT = [0.2, 0.2 + DAUER + 0.15];

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
const BASIS: Record<Phase, string> = { discover: '#e8e8e1', define: '#dfe1da', develop: '#f6f5f0', deliver: '#ecece5' };
const LABEL: Record<Phase, { x: string; y: string }> = {
  discover: { x: '18.33%', y: '49.55%' },
  define: { x: '34.17%', y: '49.55%' },
  develop: { x: '65.83%', y: '49.55%' },
  deliver: { x: '81.67%', y: '49.55%' },
};
export function DoubleDiamond({ texte, spaces, hint }: { texte: Text; spaces: [string, string]; hint: string }) {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const sichtbar = useInView(svgRef, { once: true, amount: 0.4 }) || !!reduce;
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
            className={cn('text-[clamp(1rem,1.54vw,1.12rem)] font-medium tracking-tight transition-opacity duration-300', raum !== null && raum !== i && 'opacity-35')}
          >
            {sp}
          </span>
        ))}
      </div>

      <div className="relative" onMouseLeave={() => setHover(null)}>
        {/* Beschriftungen beziehen sich nur auf die Grafik, damit sie genau in der Mitte jeder Hälfte liegen */}
        <div className="relative">
        <svg ref={svgRef} viewBox="0 0 800 222" className="block h-auto w-full overflow-visible">
          {/* Flächen erscheinen, sobald die Kontur des jeweiligen Diamanten fertig ist */}
          {[0, 1].map((d) => (
            <motion.g
              key={'f' + d}
              initial={reduce ? false : { opacity: 0 }}
              animate={sichtbar ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: START_ZEIT[d] + DAUER * 0.75, duration: 0.5 }}
            >
              {PHASEN.slice(d * 2, d * 2 + 2).map((p) => (
                <path
                  key={p}
                  d={HALVES[p]}
                  onMouseEnter={() => setHover(p)}
                  onClick={() => toggle(p)}
                  className="cursor-pointer transition-[fill] duration-200"
                  fill={aktiv === p ? 'var(--tinte)' : aktiv && PHASEN.indexOf(p) < PHASEN.indexOf(aktiv) ? 'var(--salbei)' : BASIS[p]}
                  aria-hidden
                />
              ))}
            </motion.g>
          ))}
          {KONTUR.map((paar, d) =>
            paar.map((pfad) => (
              <motion.path
                key={pfad}
                d={pfad}
                fill="none"
                stroke="var(--nacht)"
                strokeWidth={1.75}
                strokeLinejoin="round"
                strokeLinecap="round"
                pointerEvents="none"
                initial={reduce ? false : { pathLength: 0 }}
                animate={sichtbar ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ delay: START_ZEIT[d], duration: DAUER, ease: [0.65, 0, 0.35, 1] }}
              />
            )),
          )}

          {/* Feine Hilfslinien von den Punkten zur Beschriftung */}
          {[START, MITTE, ENDE].map((p, i) => (
            <motion.line
              key={'l' + p.join()}
              x1={p[0]} y1={p[1] + 8} x2={p[0]} y2={220}
              stroke="var(--salbei)" strokeWidth={1} strokeDasharray="2 4" vectorEffect="non-scaling-stroke" pointerEvents="none"
              initial={reduce ? false : { opacity: 0 }}
              animate={sichtbar ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: [0.2, START_ZEIT[1], START_ZEIT[1] + DAUER][i], duration: 0.4 }}
            />
          ))}
          {/* Punkte erscheinen, wenn die Linie sie erreicht */}
          {[START, MITTE, ENDE].map((p, i) => (
            <motion.circle
              key={p.join()}
              cx={p[0]} cy={p[1]} r={6}
              fill="#ffffff" stroke="var(--nacht)" strokeWidth={2} pointerEvents="none"
              style={{ transformOrigin: `${p[0]}px ${p[1]}px` }}
              initial={reduce ? false : { scale: 0 }}
              animate={sichtbar ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: [0.1, START_ZEIT[1] - 0.1, START_ZEIT[1] + DAUER - 0.05][i], type: 'spring', stiffness: 400, damping: 18 }}
            />
          ))}
        </svg>

        {PHASEN.map((p) => (
          <motion.button
            key={p}
            initial={reduce ? false : { opacity: 0 }}
            animate={sichtbar ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: START_ZEIT[PHASEN.indexOf(p) < 2 ? 0 : 1] + DAUER * 0.75, duration: 0.5 }}
            type="button"
            aria-pressed={pinned === p}
            aria-controls="phase-text"
            onMouseEnter={() => setHover(p)}
            onFocus={() => setHover(p)}
            onBlur={() => setHover(null)}
            onClick={() => toggle(p)}
            style={{ left: LABEL[p].x, top: LABEL[p].y }}
            className={cn(
              'absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-1 py-1 leading-none text-[11px] font-medium tracking-tight transition-colors sm:px-2 sm:text-[15px] md:text-base',
              aktiv === p ? 'text-white' : 'text-foreground',
            )}
          >
            {texte[p].name}
          </motion.button>
        ))}

        </div>

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
