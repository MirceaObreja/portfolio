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
];

// Auf Desktop liegen die Stationen versetzt links und rechts der Linie und greifen ineinander.
const PUNKT_LINKS = 'md:left-auto md:-right-12 md:translate-x-1/2';
const PUNKT_RECHTS = 'md:-left-12';

function Station({ e, i }: { e: Eintrag; i: number }) {
  const reduce = useReducedMotion();
  const links = i % 2 === 0;
  const punkt = cn('absolute left-[11px] top-[0.4rem] size-4 -translate-x-1/2 rounded-full', links ? PUNKT_LINKS : PUNKT_RECHTS);
  return (
    <li className={cn('relative pl-12 md:row-span-2 md:pb-24 md:pl-0 md:last:pb-0', links ? 'md:col-start-1 md:text-right' : 'md:col-start-2')} style={{ gridRowStart: i + 1 }}>
      {e.aktuell && !reduce && (
        <motion.span
          aria-hidden
          className={cn(punkt, 'bg-eukalyptus')}
          animate={{ scale: [1, 2.4], opacity: [0.35, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <motion.span
        aria-hidden
        className={cn(punkt, 'z-10 border-2', e.aktuell ? 'border-eukalyptus' : 'border-tinte')}
        initial={reduce ? false : { scale: 0.4, backgroundColor: 'var(--stein)' }}
        whileInView={{ scale: 1, backgroundColor: e.aktuell ? 'var(--eukalyptus)' : 'var(--stein)' }}
        viewport={{ once: true, margin: '0px 0px -40% 0px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      />
      <motion.div
        initial={reduce ? false : { opacity: 0, x: links ? -32 : 32, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <p className={cn('flex items-center gap-3 text-[13px] text-muted-foreground', links && 'md:flex-row-reverse')}>
          <span className="text-[clamp(1.225rem,2.24vw,1.925rem)] font-light leading-none tracking-[-0.04em] text-foreground tabular-nums">{e.jahre}</span>
          {e.aktuell ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-eukalyptus/40 bg-eukalyptus/15 px-2.5 py-0.5 font-medium text-tinte">
              <span aria-hidden className="relative grid size-2 place-items-center">
                {!reduce && <span className="absolute inline-flex size-full animate-ping rounded-full bg-eukalyptus opacity-70" />}
                <span className="relative inline-flex size-2 rounded-full bg-eukalyptus" />
              </span>
              Aktuell
            </span>
          ) : (
            <span className={cn('rounded-full px-2.5 py-0.5', e.art === 'Beruf' ? 'bg-tinte text-white' : 'border border-nebel')}>{e.art}</span>
          )}
        </p>
        <p className="mt-3 text-[clamp(1.05rem,1.2vw,1.15rem)] font-medium leading-tight tracking-tight">{e.titel}</p>
        <p className="mt-0.5 text-[14px] text-muted-foreground">{e.ort}</p>
        {e.text && <p className={cn('mt-2 max-w-[44ch] text-[15px] leading-relaxed text-foreground/75', links && 'md:ml-auto')}>{e.text}</p>}
      </motion.div>
    </li>
  );
}

/** Werdegang als fliessender Zeitstrahl: Die Linie füllt sich beim Scrollen, die Stationen gleiten abwechselnd von links und rechts herein. */
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] });
  const fortschritt = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const hoehe = useTransform(fortschritt, (v) => `${v * 100}%`);

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute bottom-0 left-[11px] top-2 w-px -translate-x-1/2 bg-nebel md:left-1/2" />
      <motion.div aria-hidden className="absolute left-[11px] top-2 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-salbei via-eukalyptus to-tinte md:left-1/2" style={{ height: reduce ? '100%' : hoehe }}>
        {!reduce && <span className="absolute -bottom-3 left-1/2 size-6 -translate-x-1/2 rounded-full bg-eukalyptus/60 blur-md" />}
      </motion.div>

      <ol className="grid gap-y-20 md:grid-cols-2 md:gap-x-24 md:gap-y-12">
        {STATIONEN.map((e, i) => (
          <Station key={e.titel + e.jahre} e={e} i={i} />
        ))}
      </ol>
    </div>
  );
}
