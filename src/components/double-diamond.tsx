'use client';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

type Phase = 'discover' | 'define' | 'develop' | 'deliver';
type Text = Record<Phase, { name: string; text: string }>;

const PHASEN: Phase[] = ['discover', 'define', 'develop', 'deliver'];
const HALVES: Record<Phase, string> = {
  discover: 'M4 100 L200 4 L200 196 Z',
  define: 'M200 4 L396 100 L200 196 Z',
  develop: 'M404 100 L600 4 L600 196 Z',
  deliver: 'M600 4 L796 100 L600 196 Z',
};
// Schwerpunkt der Dreiecke in Prozent der Breite, für die Beschriftung
const LABEL_X: Record<Phase, string> = { discover: '17%', define: '33.2%', develop: '66.8%', deliver: '83%' };
const OUTLINES = ['M4 100 L200 4 L396 100 L200 196 Z', 'M404 100 L600 4 L796 100 L600 196 Z'];

export function DoubleDiamond({ texte, spaces, hint }: { texte: Text; spaces: [string, string]; hint: string }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<Phase | null>(null);
  const [pinned, setPinned] = useState<Phase | null>(null);
  const aktiv = hover ?? pinned;
  const toggle = (p: Phase) => setPinned((cur) => (cur === p ? null : p));
  const view = { once: true, amount: 0.4 } as const;

  return (
    <div>
      <div className="mb-3 grid grid-cols-2 text-center text-sm text-muted-foreground">
        <span>{spaces[0]}</span>
        <span>{spaces[1]}</span>
      </div>

      <div className="relative" onMouseLeave={() => setHover(null)}>
        <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="block h-[190px] w-full overflow-visible sm:h-auto">
          {PHASEN.map((p) => (
            <path
              key={p}
              d={HALVES[p]}
              onMouseEnter={() => setHover(p)}
              onClick={() => toggle(p)}
              className="cursor-pointer fill-brand transition-[fill-opacity] duration-200"
              style={{ fillOpacity: aktiv === p ? 1 : 0.05 }}
              aria-hidden
            />
          ))}
          {OUTLINES.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinejoin="round"
              pointerEvents="none"
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={view}
              transition={{ delay: 0.15 + i * 0.35, duration: 1, ease: [0.65, 0, 0.35, 1] }}
            />
          ))}
          <path d="M200 4 L200 196 M600 4 L600 196" stroke="#c4c4c8" strokeWidth={1.5} strokeDasharray="4 6" vectorEffect="non-scaling-stroke" pointerEvents="none" />
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

      <div id="phase-text" aria-live="polite" className="mt-6 min-h-[5.5rem] border-t border-border pt-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={aktiv ?? 'hint'}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
          >
            {aktiv ? (
              <p className="max-w-[60ch]">
                <span className="mr-2 font-medium text-brand">{texte[aktiv].name}</span>
                {texte[aktiv].text}
              </p>
            ) : (
              <p className="text-muted-foreground">{hint}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
