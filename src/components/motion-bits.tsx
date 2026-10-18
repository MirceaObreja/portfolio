'use client';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { cn } from '@/lib/utils';

/** Blendet Inhalte beim ersten Erscheinen im Bild weich ein. */
export function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Wort({ wort, progress, range }: { wort: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }}>{wort} </motion.span>;
}

/** Text, der sich beim Scrollen Wort für Wort aufhellt. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const woerter = text.split(' ');
  if (reduce) return <p className={className}>{text}</p>;
  return (
    <p ref={ref} className={cn(className)} aria-label={text}>
      <span aria-hidden>
        {woerter.map((w, i) => (
          <Wort key={i} wort={w} progress={scrollYProgress} range={[i / woerter.length, (i + 1) / woerter.length]} />
        ))}
      </span>
    </p>
  );
}

/** Farbfläche, die beim Hereinscrollen leicht wächst und deren Inhalt sich verschiebt. */
export function ParallaxPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { scale }}>
      <motion.div className="relative flex h-full flex-col justify-between" style={reduce ? undefined : { y }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Hintergrund, der langsamer scrollt als der Inhalt. */
export function ParallaxBg({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 220]);
  return <motion.div aria-hidden className={className} style={reduce ? undefined : { y }}>{children}</motion.div>;
}
