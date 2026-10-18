'use client';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

type Eintrag = { jahre: string; titel: string; ort: string; art: 'Beruf' | 'Ausbildung'; text?: string; aktuell?: boolean };

const STATIONEN: Eintrag[] = [
  { jahre: '2025 – heute', titel: 'Senior Experience Consultant', ort: 'Merkle, St. Gallen', art: 'Beruf', aktuell: true, text: 'Research und Konzeption für Banken, Mobilität und Gesundheitswesen. Bis April 2026 UX-Lead auf dem Siemens Xcelerator Marketplace.' },
  { jahre: '2022 – 2025', titel: 'Experience Consultant', ort: 'Merkle, St. Gallen', art: 'Beruf', text: 'Research, Konzepte und Prototypen für Banking, B2B-Plattformen und öffentliche Verwaltung. Ab 2024 im Siemens-Team.' },
  { jahre: '2021 – 2022', titel: 'Praktikum UX Design und UX Research', ort: 'Sunrise UPC, Zürich', art: 'Beruf' },
  { jahre: '2018 – 2021', titel: 'B. Sc. Digital Business Management', ort: 'Bachelorstudium', art: 'Ausbildung', text: 'Module unter anderem Design Thinking, Behavioral Economics, Innovation Management, Psychologie, Usability Testing, Projektmanagement und Kommunikation.' },
  { jahre: '2020', titel: 'Praktikum Marketing, Sales und Social Media', ort: 'Einstoffen, St. Gallen', art: 'Beruf' },
  { jahre: '2016 – 2017', titel: 'Technische Matura', ort: 'GBS St. Gallen', art: 'Ausbildung' },
];

function Station({ e, i }: { e: Eintrag; i: number }) {
  const reduce = useReducedMotion();
  const links = i % 2 === 0;
  return (
    <li className="relative grid md:grid-cols-2 md:gap-20">
      {/* Punkt auf der Linie */}
      <motion.span
        aria-hidden
        className="absolute left-[11px] top-3 z-10 size-[18px] -translate-x-1/2 rounded-full border-2 border-tinte bg-background md:left-1/2"
        initial={reduce ? false : { scale: 0.4, backgroundColor: 'var(--stein)' }}
        whileInView={{ scale: 1, backgroundColor: e.aktuell ? 'var(--tinte)' : 'var(--stein)' }}
        viewport={{ once: true, margin: '0px 0px -45% 0px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      />
      {e.aktuell && !reduce && (
        <motion.span
          aria-hidden
          className="absolute left-[11px] top-3 size-[18px] -translate-x-1/2 rounded-full bg-tinte md:left-1/2"
          animate={{ scale: [1, 2.4], opacity: [0.35, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <motion.div
        className={cn('pl-12 md:pl-0', links ? 'md:col-start-1 md:text-right' : 'md:col-start-2')}
        initial={reduce ? false : { opacity: 0, x: links ? -40 : 40, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <p className={cn('flex items-center gap-3 text-[13px] text-muted-foreground', links && 'md:justify-end')}>
          <span className={cn('rounded-full px-2.5 py-0.5', e.art === 'Beruf' ? 'bg-tinte text-white' : 'border border-nebel')}>{e.art}</span>
          {e.aktuell && <span>Aktuell</span>}
        </p>
        <p className="mt-3 text-[clamp(2.25rem,4.6vw,4rem)] font-light leading-none tracking-[-0.04em] tabular-nums">{e.jahre}</p>
        <p className="mt-4 text-[clamp(1.2rem,1.8vw,1.5rem)] font-medium leading-tight tracking-tight">{e.titel}</p>
        <p className="mt-1 text-[15px] text-muted-foreground">{e.ort}</p>
        {e.text && <p className={cn('mt-3 max-w-[46ch] text-[15px] leading-relaxed text-foreground/75', links && 'md:ml-auto')}>{e.text}</p>}
      </motion.div>
    </li>
  );
}

/** Werdegang als fliessender Zeitstrahl: Die Linie füllt sich beim Scrollen, die Stationen gleiten abwechselnd von links und rechts herein. */
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.55'] });
  const fortschritt = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const hoehe = useTransform(fortschritt, (v) => `${v * 100}%`);

  return (
    <div ref={ref} className="relative">
      {/* Linie: blass im Hintergrund, darüber der gefüllte Teil mit leuchtender Spitze */}
      <div aria-hidden className="absolute bottom-0 left-[11px] top-3 w-px -translate-x-1/2 bg-nebel md:left-1/2" />
      <motion.div aria-hidden className="absolute left-[11px] top-3 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-salbei via-eukalyptus to-tinte md:left-1/2" style={{ height: reduce ? '100%' : hoehe }}>
        {!reduce && <span className="absolute -bottom-3 left-1/2 size-6 -translate-x-1/2 rounded-full bg-eukalyptus/60 blur-md" />}
      </motion.div>

      <ol className="grid gap-20 md:gap-28">
        {STATIONEN.map((e, i) => (
          <Station key={e.titel + e.jahre} e={e} i={i} />
        ))}
      </ol>
    </div>
  );
}
