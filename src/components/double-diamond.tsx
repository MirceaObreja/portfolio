'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, animate, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

type Phase = 'discover' | 'define' | 'develop' | 'deliver';
type Text = Record<Phase, { name: string; text: string; methoden: string[] }>;
type Pt = [number, number];

const PHASEN: Phase[] = ['discover', 'define', 'develop', 'deliver'];

// Eckpunkte im Koordinatensystem 800 × 290 (unten Platz für die Beschriftung)
const START: Pt = [20, 110];
const OBEN1: Pt = [210, 16];
const MITTE: Pt = [400, 110];
const OBEN2: Pt = [590, 16];
const ENDE: Pt = [780, 110];

const HALVES: Record<Phase, string> = {
  discover: 'M20 110 L210 16 L210 204 Z',
  define: 'M210 16 L400 110 L210 204 Z',
  develop: 'M400 110 L590 16 L590 204 Z',
  deliver: 'M590 16 L780 110 L590 204 Z',
};
const BASIS: Record<Phase, string> = { discover: '#ececec', define: '#e2e2e2', develop: '#f7f7f7', deliver: '#efefef' };
const LABEL: Record<Phase, { x: string; y: string }> = {
  discover: { x: '18.4%', y: '37.9%' },
  define: { x: '34.1%', y: '37.9%' },
  develop: { x: '65.9%', y: '37.9%' },
  deliver: { x: '81.6%', y: '37.9%' },
};
// Weg des Pfeils entlang der Oberkante, vom Start bis zum Ende der gewählten Phase
const WEG: Record<Phase, Pt[]> = {
  discover: [START, OBEN1],
  define: [START, OBEN1, MITTE],
  develop: [START, OBEN1, MITTE, OBEN2],
  deliver: [START, OBEN1, MITTE, OBEN2, ENDE],
};

// Handgezeichnete Pfeile von der Beschriftung zu den drei Punkten
const SKIZZE = [
  { d: 'M78 262 C 70 226, 26 206, 22 128', kopf: 'M13 141 L22 126 L31 139' },
  { d: 'M396 262 C 380 224, 414 180, 400 128', kopf: 'M391 140 L400 125 L409 139' },
  { d: 'M724 262 C 734 226, 780 206, 778 128', kopf: 'M769 140 L778 125 L787 139' },
];

function laenge(a: Pt, b: Pt) {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

/** Liefert den Teilweg bis zum Anteil t sowie Position und Richtung der Pfeilspitze. */
function teilweg(pts: Pt[], t: number) {
  const seg = pts.slice(1).map((p, i) => laenge(pts[i], p));
  const total = seg.reduce((a, b) => a + b, 0);
  let rest = total * t;
  const out: Pt[] = [pts[0]];
  for (let i = 0; i < seg.length; i++) {
    const [a, b] = [pts[i], pts[i + 1]];
    if (rest >= seg[i]) {
      out.push(b);
      rest -= seg[i];
      if (i === seg.length - 1) return { out, spitze: b, winkel: Math.atan2(b[1] - a[1], b[0] - a[0]) };
      continue;
    }
    const k = rest / seg[i];
    const p: Pt = [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
    out.push(p);
    return { out, spitze: p, winkel: Math.atan2(b[1] - a[1], b[0] - a[0]) };
  }
  return { out, spitze: pts[0], winkel: 0 };
}

export function DoubleDiamond({ texte, spaces, hint }: { texte: Text; spaces: [string, string]; hint: string }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<Phase | null>(null);
  const [pinned, setPinned] = useState<Phase | null>(null);
  const aktiv = hover ?? pinned;
  const toggle = (p: Phase) => setPinned((cur) => (cur === p ? null : p));
  const raum = aktiv ? (aktiv === 'discover' || aktiv === 'define' ? 0 : 1) : null;

  // Fortschritt des wandernden Pfeils
  const [prog, setProg] = useState(0);
  useEffect(() => {
    if (!aktiv) {
      setProg(0);
      return;
    }
    if (reduce) {
      setProg(1);
      return;
    }
    setProg(0);
    const c = animate(0, 1, { duration: 0.32 * (WEG[aktiv].length - 1) + 0.15, ease: [0.45, 0, 0.2, 1], onUpdate: setProg });
    return () => c.stop();
  }, [aktiv, reduce]);

  const pfeil = aktiv ? teilweg(WEG[aktiv], prog) : null;

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
        <svg viewBox="0 0 800 290" className="block h-auto w-full overflow-visible">
          <defs>
            <filter id="dd-rauh">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="4" />
              <feDisplacementMap in="SourceGraphic" scale="2.2" />
            </filter>
          </defs>

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

          {/* Wandernder Pfeil entlang der Oberkante */}
          {pfeil && (
            <g pointerEvents="none">
              <polyline
                points={pfeil.out.map((p) => p.join(',')).join(' ')}
                fill="none"
                stroke="var(--brand)"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M-12 -8 L2 0 L-12 8"
                fill="none"
                stroke="var(--brand)"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
                transform={`translate(${pfeil.spitze[0]} ${pfeil.spitze[1]}) rotate(${(pfeil.winkel * 180) / Math.PI})`}
              />
            </g>
          )}

          {/* Punkte auf der Achse */}
          {[START, MITTE, ENDE].map((p) => (
            <circle key={p.join()} cx={p[0]} cy={p[1]} r={6} fill="#ffffff" stroke="#111111" strokeWidth={2} pointerEvents="none" />
          ))}

          {/* Handgezeichnete Hinweispfeile */}
          <g filter="url(#dd-rauh)" pointerEvents="none">
            {SKIZZE.map((s, i) => (
              <g key={s.d}>
                <motion.path
                  d={s.d}
                  fill="none"
                  stroke="#555555"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: 1.3 + i * 0.2, duration: 0.6, ease: 'easeOut' }}
                />
                <motion.path
                  d={s.kopf}
                  fill="none"
                  stroke="#555555"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: 1.85 + i * 0.2, duration: 0.2 }}
                />
              </g>
            ))}
          </g>
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

        {/* Beschriftung der drei Punkte, wie von Hand notiert */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 text-[11px] text-foreground/70 sm:text-[14px]">
          <span className="absolute bottom-0 left-[10%] -translate-x-1/2 whitespace-nowrap italic">Ausgangslage</span>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap italic">Problemdefinition</span>
          <span className="absolute bottom-0 left-[90.5%] -translate-x-1/2 whitespace-nowrap italic">Lösung</span>
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
