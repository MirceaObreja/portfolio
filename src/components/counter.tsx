'use client';
import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

/** Zahl, die beim ersten Erscheinen von 0 hochzählt. */
export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [wert, setWert] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.2, 0.7, 0.2, 1], onUpdate: (v) => setWert(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {wert}
      {suffix}
    </span>
  );
}
