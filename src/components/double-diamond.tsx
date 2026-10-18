'use client';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';

type Phase = 'discover' | 'define' | 'develop' | 'deliver';
type Text = Record<Phase, { name: string; text: string; methoden: string[] }>;

const PHASEN: Phase[] = ['discover', 'define', 'develop', 'deliver'];
// Dreiecke als Prozentwerte der Bühne (Seitenverhältnis 4:1)
const CLIP: Record<Phase, string> = {
  discover: 'polygon(0.5% 50%, 25% 2%, 25% 98%)',
  define: 'polygon(25% 2%, 49.5% 50%, 25% 98%)',
  develop: 'polygon(50.5% 50%, 75% 2%, 75% 98%)',
  deliver: 'polygon(75% 2%, 99.5% 50%, 75% 98%)',
};
// Helle Glasflächen mit leichtem Lichtverlauf, damit die Facetten plastisch wirken
const FACETTE: Record<Phase, string> = {
  discover: 'linear-gradient(120deg, #ffffff 0%, #f0f0f0 60%, #e2e2e2 100%)',
  define: 'linear-gradient(240deg, #fafafa 0%, #e6e6e6 60%, #d4d4d4 100%)',
  develop: 'linear-gradient(120deg, #ffffff 0%, #ededed 60%, #dedede 100%)',
  deliver: 'linear-gradient(240deg, #fafafa 0%, #e4e4e4 60%, #d1d1d1 100%)',
};
const AKTIV = 'linear-gradient(135deg, #4a4a4a 0%, #1c1c1c 55%, #050505 100%)';
const LABEL_X: Record<Phase, string> = { discover: '17%', define: '33.2%', develop: '66.8%', deliver: '83%' };
const OUTLINES = ['M4 100 L200 4 L396 100 L200 196 Z', 'M404 100 L600 4 L796 100 L600 196 Z'];

export function DoubleDiamond({ texte, spaces, hint }: { texte: Text; spaces: [string, string]; hint: string }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<Phase | null>(null);
  const [pinned, setPinned] = useState<Phase | null>(null);
  const aktiv = hover ?? pinned;
  const toggle = (p: Phase) => setPinned((cur) => (cur === p ? null : p));

  // Neigung folgt der Maus, gefedert
  const stage = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 120, damping: 18 });
  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !stage.current) return;
    const r = stage.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 18);
  };
  const onLeave = () => { rx.set(0); ry.set(0); setHover(null); };

  return (
    <div>
      <div className="mb-3 grid grid-cols-2 text-center text-sm text-muted-foreground">
        <span>{spaces[0]}</span>
        <span>{spaces[1]}</span>
      </div>

      <div ref={stage} className="relative [perspective:1100px]" onPointerMove={onMove} onPointerLeave={onLeave}>
        <motion.div
          className="relative h-[190px] w-full [transform-style:preserve-3d] sm:h-auto sm:aspect-[4/1]"
          style={reduce ? undefined : { rotateX, rotateY }}
          initial={reduce ? false : { rotateX: 28, opacity: 0, y: 30 }}
          whileInView={{ rotateX: 16, opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {/* Grundplatte: leichter Schatten auf dem Boden */}
          <div aria-hidden className="absolute inset-x-[4%] bottom-[-14%] h-[30%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(20,40,90,0.18),transparent)] blur-md [transform:translateZ(-40px)]" />

          {PHASEN.map((p) => {
            const on = aktiv === p;
            return (
              <motion.div
                key={p}
                className="absolute inset-0 [transform-style:preserve-3d]"
                style={{ filter: on ? 'drop-shadow(0 18px 24px rgba(0,0,0,0.35))' : 'drop-shadow(0 6px 10px rgba(20,40,90,0.08))' }}
                animate={reduce ? undefined : { z: on ? 56 : aktiv ? -6 : 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              >
                <div
                  aria-hidden
                  onMouseEnter={() => setHover(p)}
                  onClick={() => toggle(p)}
                  className="absolute inset-0 cursor-pointer transition-[opacity,background] duration-300"
                  style={{ clipPath: CLIP[p], background: on ? AKTIV : FACETTE[p], opacity: aktiv && !on ? 0.5 : 1 }}
                />
              </motion.div>
            );
          })}

          <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible [transform:translateZ(1px)]">
            {OUTLINES.map((d, i) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.85}
                strokeWidth={2}
                strokeLinejoin="round"
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 0.2 + i * 0.3, duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
              />
            ))}
            <path d="M200 4 L200 196 M600 4 L600 196" stroke="#b8bcc6" strokeWidth={1.5} strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
          </svg>

          {PHASEN.map((p) => (
            <motion.button
              key={p}
              type="button"
              aria-pressed={pinned === p}
              aria-controls="phase-text"
              onMouseEnter={() => setHover(p)}
              onFocus={() => setHover(p)}
              onBlur={() => setHover(null)}
              onClick={() => toggle(p)}
              style={{ left: LABEL_X[p] }}
              animate={reduce ? undefined : { z: aktiv === p ? 80 : 12 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className={cn(
                'absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-1 py-1 text-[12px] font-medium tracking-tight transition-colors sm:px-2 sm:text-[15px] md:text-base',
                aktiv === p ? 'text-white' : 'text-foreground',
              )}
            >
              {texte[p].name}
            </motion.button>
          ))}
        </motion.div>
      </div>

      <div id="phase-text" aria-live="polite" className="mt-10 min-h-[9.5rem] border-t border-black/[0.06] pt-6">
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
                      initial={reduce ? false : { opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.04 * i, duration: 0.2 }}
                      className="rounded-full border border-white/80 bg-white/70 px-3.5 py-1.5 text-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
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
