'use client';
import { motion, useReducedMotion } from 'motion/react';

const HALVES = [
  'M4 90 L200 4 L200 176 Z',
  'M200 4 L396 90 L200 176 Z',
  'M404 90 L600 4 L600 176 Z',
  'M600 4 L796 90 L600 176 Z',
];

export function HeroDiamond({ labels }: { labels: [string, string] }) {
  const reduce = useReducedMotion();
  return (
    <div>
      <div className="mb-3 grid grid-cols-2 text-center text-sm text-muted-foreground">
        <span>{labels[0]}</span>
        <span>{labels[1]}</span>
      </div>
      <svg viewBox="0 0 800 180" className="h-auto w-full overflow-visible" aria-hidden>
        {HALVES.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            data-tint
            className="fill-brand"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={reduce ? { opacity: 0.06 } : { opacity: [0, 0.14, 0.06] }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 1.1 + i * 0.18, duration: 0.7, ease: 'easeOut' }}
          />
        ))}
        {['M4 90 L200 4 L396 90 L200 176 Z', 'M404 90 L600 4 L796 90 L600 176 Z'].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            data-draw
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.2 + i * 0.35, duration: 1, ease: [0.65, 0, 0.35, 1] }}
          />
        ))}
        <line x1="200" y1="4" x2="200" y2="176" className="stroke-[#c4c4c8]" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
        <line x1="600" y1="4" x2="600" y2="176" className="stroke-[#c4c4c8]" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
