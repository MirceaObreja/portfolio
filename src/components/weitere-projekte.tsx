'use client';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import type { ProjektKarte } from '@/components/project-explorer';
import { DiamondMini } from '@/components/diamond-mini';
import { Flaeche } from '@/components/flaeche';
import { cn } from '@/lib/utils';

type Sprache = 'de' | 'en';
const PHASEN = ['discover', 'define', 'develop', 'deliver'] as const;
const NAME: Record<string, string> = { discover: 'Discover', define: 'Define', develop: 'Develop', deliver: 'Deliver' };
const T = {
  de: { ergebnis: 'Ergebnis', rolle: 'Meine Rolle', mehr: 'Details', weniger: 'Weniger', zurueck: 'Zurück', weiter: 'Weiter' },
  en: { ergebnis: 'Result', rolle: 'My role', mehr: 'Details', weniger: 'Less', zurueck: 'Previous', weiter: 'Next' },
};

function Phasen({ p, hell = false }: { p: ProjektKarte; hell?: boolean }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {PHASEN.map((ph) => (
        <span
          key={ph}
          className={cn(
            'rounded-full px-2.5 py-0.5 text-[12px]',
            p.phasen.includes(ph)
              ? hell ? 'bg-white text-ink' : 'bg-ink text-white'
              : hell ? 'border border-white/20 text-white/40' : 'border border-foreground/15 text-foreground/35',
          )}
        >
          {NAME[ph]}
        </span>
      ))}
    </span>
  );
}

function Kopf({ p }: { p: ProjektKarte }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="rounded-[14px] bg-brand-soft px-3 py-1 text-[14px] font-semibold tracking-tight text-tinte">{p.kunde}</span>
      <span className="text-[13px] text-muted-foreground">{p.zeitraum}</span>
    </div>
  );
}

/* Variante A: Raster mit Karten. Alles Wichtige ist sofort sichtbar, Details klappen in der Karte auf. */
function Raster({ projekte, lang }: { projekte: ProjektKarte[]; lang: Sprache }) {
  const [offen, setOffen] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const t = T[lang];
  return (
    // Subgrid: Firma, Titel, Text und Button liegen in allen Karten einer Reihe auf gleicher Höhe
    <ul className="grid gap-x-5 md:grid-cols-2 lg:grid-cols-3">
      {projekte.map((p, i) => {
        const auf = offen === p.id;
        return (
          <li key={p.id} className="group relative isolate mb-5 row-span-4 grid grid-rows-subgrid overflow-hidden rounded-[28px] p-6 md:p-7">
            <Flaeche i={i} />
            <div className="relative flex items-start justify-between gap-4">
              <Kopf p={p} />
              <DiamondMini phasen={p.phasen} className="h-6 w-[64px] shrink-0" />
            </div>
            <h4 className="relative pt-6 text-[clamp(1.05rem,1.4vw,1.25rem)] font-medium leading-snug tracking-tight">{p.titel}</h4>
            <div className="relative">
            <p className="pt-3 text-[15px] leading-relaxed text-foreground/75">{p.kurz}</p>
            <AnimatePresence initial={false}>
              {auf && (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                  className="relative overflow-hidden"
                >
                  <div className="grid gap-3 pt-4 text-[15px]">
                    {p.ergebnis && <p><span className="block text-[13px] text-muted-foreground">{t.ergebnis}</span>{p.ergebnis}</p>}
                    <p><span className="block text-[13px] text-muted-foreground">{t.rolle}</span>{p.rolle}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
            <button
              type="button"
              aria-expanded={auf}
              onClick={() => setOffen(auf ? null : p.id)}
              className="relative inline-flex w-fit items-center gap-2 self-end pt-6 text-[14px] font-medium"
            >
              <span className={cn('grid size-8 place-items-center rounded-full bg-ink text-white transition-transform duration-300', auf && 'rotate-45')}>
                <Plus className="size-3.5" aria-hidden />
              </span>
              {auf ? t.weniger : t.mehr}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/* Variante B: Zeilen mit Vorschau. Firma, Titel und Kurzbeschrieb stehen in klaren Spalten, aufgeklappt erscheinen Ergebnis und Rolle. */
function Zeilen({ projekte, lang }: { projekte: ProjektKarte[]; lang: Sprache }) {
  const [offen, setOffen] = useState<string | null>(projekte[0]?.id ?? null);
  const reduce = useReducedMotion();
  const t = T[lang];
  return (
    <ul className="grid gap-3">
      {projekte.map((p) => {
        const auf = offen === p.id;
        return (
          <li key={p.id} className={cn('overflow-hidden rounded-[24px] transition-colors duration-300', auf ? 'bg-white' : 'bg-white/50 hover:bg-white')}>
            <button
              type="button"
              aria-expanded={auf}
              onClick={() => setOffen(auf ? null : p.id)}
              className="grid w-full gap-4 p-5 text-left md:grid-cols-[15rem_minmax(0,1fr)_auto] md:items-center md:gap-8 md:p-6"
            >
              <Kopf p={p} />
              <span className="grid gap-1.5">
                <span className="text-[clamp(1.05rem,1.4vw,1.25rem)] font-medium leading-snug tracking-tight">{p.titel}</span>
                <span className={cn('text-[15px] leading-relaxed text-muted-foreground', !auf && 'line-clamp-1')}>{p.kurz}</span>
              </span>
              <span className={cn('hidden size-10 place-items-center rounded-full border border-foreground/15 transition-transform duration-300 md:grid', auf && 'rotate-45 bg-ink text-white')}>
                <Plus className="size-4" aria-hidden />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {auf && (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-5 px-5 pb-6 text-[15px] md:grid-cols-[15rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-8 md:px-6">
                    <Phasen p={p} />
                    {p.ergebnis ? <p><span className="block text-[13px] text-muted-foreground">{t.ergebnis}</span>{p.ergebnis}</p> : <span />}
                    <p><span className="block text-[13px] text-muted-foreground">{t.rolle}</span>{p.rolle}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

/* Variante C: Karussell. Eine dunkle Karte pro Projekt mit allen Angaben, seitlich wischen oder mit Pfeilen blättern. */
function Karussell({ projekte, lang }: { projekte: ProjektKarte[]; lang: Sprache }) {
  const spur = useRef<HTMLUListElement>(null);
  const t = T[lang];
  const blaettern = (r: number) => {
    const el = spur.current;
    if (!el) return;
    const karte = el.querySelector('li');
    el.scrollBy({ left: r * ((karte?.clientWidth ?? 400) + 20), behavior: 'smooth' });
  };
  return (
    <div>
      <ul ref={spur} className="-mx-1 grid snap-x snap-mandatory auto-cols-[85%] grid-flow-col grid-rows-[auto_auto_auto_1fr] gap-x-5 overflow-x-auto px-1 pb-4 [scrollbar-width:none] sm:auto-cols-[60%] lg:auto-cols-[calc((100%-2.5rem)/3)] [&::-webkit-scrollbar]:hidden">
        {projekte.map((p, i) => (
          <li key={p.id} className="relative isolate row-span-4 grid snap-start grid-rows-subgrid overflow-hidden rounded-[28px] bg-nacht p-7 text-white">
            <div aria-hidden className={cn('pointer-events-none absolute -z-10 aspect-square w-[90%] rounded-full blur-[45px]', ['-right-[20%] -top-[30%]', '-left-[25%] -top-[25%]', 'left-[20%] -top-[40%]'][i % 3])} style={{ background: 'radial-gradient(circle, #758a87 0%, rgba(117,138,135,0.5) 40%, rgba(117,138,135,0) 70%)' }} />
            <div className="flex items-start justify-between gap-4">
              <span className="grid gap-1.5">
                <span className="w-fit rounded-[14px] bg-white/15 px-3 py-1 text-[14px] font-semibold tracking-tight backdrop-blur-md">{p.kunde}</span>
                <span className="text-[13px] text-white/60">{p.zeitraum}</span>
              </span>
              <DiamondMini phasen={p.phasen} className="h-6 w-[64px] shrink-0 [&_.fill-ink]:fill-white [&_.fill-ink]:stroke-white [&_path:not(.fill-ink)]:stroke-white/50" />
            </div>
            <h4 className="pt-8 text-[clamp(1.05rem,1.4vw,1.25rem)] font-medium leading-snug tracking-tight">{p.titel}</h4>
            <p className="pt-3 text-[15px] leading-relaxed text-white/70">{p.kurz}</p>
            {p.ergebnis ? (
              <p className="self-end pt-6 text-[15px]">
                <span className="block text-[13px] text-white/50">{t.ergebnis}</span>
                {p.ergebnis}
              </p>
            ) : <span />}
          </li>
        ))}
      </ul>
      <div className="mt-2 flex gap-2">
        <button type="button" onClick={() => blaettern(-1)} aria-label={t.zurueck} className="grid size-11 place-items-center rounded-full border border-foreground/15 transition-colors hover:bg-ink hover:text-white"><ArrowLeft className="size-4" aria-hidden /></button>
        <button type="button" onClick={() => blaettern(1)} aria-label={t.weiter} className="grid size-11 place-items-center rounded-full border border-foreground/15 transition-colors hover:bg-ink hover:text-white"><ArrowRight className="size-4" aria-hidden /></button>
      </div>
    </div>
  );
}

export type WeitereVariante = 'raster' | 'zeilen' | 'karussell';

export function WeitereProjekte({ projekte, lang = 'de', variante = 'raster' }: { projekte: ProjektKarte[]; lang?: Sprache; variante?: WeitereVariante }) {
  if (variante === 'zeilen') return <Zeilen projekte={projekte} lang={lang} />;
  if (variante === 'karussell') return <Karussell projekte={projekte} lang={lang} />;
  return <Raster projekte={projekte} lang={lang} />;
}
