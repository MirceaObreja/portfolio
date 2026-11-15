'use client';
import { useState } from 'react';
import { Hero, type StageVariante } from '@/components/hero';

const NAMEN: Record<StageVariante, string> = { a: 'A  Name klein, Text gross', b: 'B  Rolle als Titel', c: 'C  Aussage als Titel' };

/** Vorübergehend: Umschalter für die drei Stage-Varianten. */
export function HeroWahl() {
  const [v, setV] = useState<StageVariante>('a');
  return (
    <>
      <Hero key={v} variante={v} />
      <div className="fixed bottom-3 right-3 z-50 flex md:bottom-5 md:left-5 md:right-auto gap-1 rounded-full border border-white/20 bg-nacht/80 p-1 text-[13px] text-white shadow-lg backdrop-blur-md">
        {(Object.keys(NAMEN) as StageVariante[]).map((k) => (
          <button key={k} type="button" onClick={() => { setV(k); window.scrollTo({ top: 0, behavior: 'auto' }); }} aria-pressed={v === k} className={`rounded-full px-3.5 py-2 transition-colors ${v === k ? 'bg-white text-ink' : 'hover:bg-white/15'}`}>
            <span className="md:hidden">{k.toUpperCase()}</span><span className="max-md:hidden">{NAMEN[k]}</span>
          </button>
        ))}
      </div>
    </>
  );
}
