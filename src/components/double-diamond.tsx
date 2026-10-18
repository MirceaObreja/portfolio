'use client';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

type Phase = 'discover' | 'define' | 'develop' | 'deliver';
type Text = Record<Phase, { name: string; text: string; methoden: string[] }>;

const PHASEN: Phase[] = ['discover', 'define', 'develop', 'deliver'];
const HALVES: Record<Phase, string> = {
  discover: 'M6 100 L200 6 L200 194 Z',
  define: 'M200 6 L394 100 L200 194 Z',
  develop: 'M406 100 L600 6 L600 194 Z',
  deliver: 'M600 6 L794 100 L600 194 Z',
};
const LABEL_X: Record<Phase, string> = { discover: '17%', define: '33.2%', develop: '66.8%', deliver: '83%' };
const OUTLINES = ['M6 100 L200 6 L394 100 L200 194 Z', 'M406 100 L600 6 L794 100 L600 194 Z'];

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
      <div className="mb-5 grid grid-cols-2 gap-3">
        {spaces.map((s, i) => (
          <div key={s} className={cn('flex items-baseline gap-3 border-t-2 pt-3 transition-colors duration-300', raum === i ? 'border-ink' : 'border-foreground/15')}>
            <span className="text-[13px] tabular-nums text-muted-foreground">0{i + 1}</span>
            <span className="text-[clamp(1rem,2vw,1.4rem)] font-medium tracking-tight">{s}</span>
          </div>
        ))}
      </div>

      <div className="relative" onMouseLeave={() => setHover(null)}>
        {/* Hinterlegung der beiden Räume */}
        <div aria-hidden className="absolute inset-0 grid grid-cols-2 gap-3">
          <div className={cn('rounded-[20px] transition-colors duration-300', raum === 0 ? 'bg-[#ebebeb]' : 'bg-background')} />
          <div className={cn('rounded-[20px] transition-colors duration-300', raum === 1 ? 'bg-[#ebebeb]' : 'bg-background')} />
        </div>
        <div className="relative px-2 py-5 md:px-4 md:py-8">
          <div className="relative">
            <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="block h-[170px] w-full overflow-visible sm:h-auto">
              {PHASEN.map((p) => (
                <path
                  key={p}
                  d={HALVES[p]}
                  onMouseEnter={() => setHover(p)}
                  onClick={() => toggle(p)}
                  className="cursor-pointer transition-[fill] duration-200"
                  fill={aktiv === p ? '#111111' : '#ffffff'}
                  aria-hidden
                />
              ))}
              {OUTLINES.map((d, i) => (
                <motion.path
                  key={d}
                  d={d}
                  fill="none"
                  stroke="#111111"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  pointerEvents="none"
                  initial={reduce ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: 0.15 + i * 0.35, duration: 1, ease: [0.65, 0, 0.35, 1] }}
                />
              ))}
              <path d="M200 6 L200 194 M600 6 L600 194" stroke="#9a9a9a" strokeWidth={1.5} strokeDasharray="4 6" vectorEffect="non-scaling-stroke" pointerEvents="none" />
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
