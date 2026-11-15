'use client';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/** Inhaltsverzeichnis einer Fallstudie: bleibt beim Lesen stehen und markiert das aktuelle Kapitel. */
export function KapitelNav({ kapitel }: { kapitel: { id: string; titel: string }[] }) {
  const [aktiv, setAktiv] = useState(kapitel[0]?.id);

  useEffect(() => {
    let frame = 0;
    const messen = () => {
      frame = 0;
      let treffer = kapitel[0]?.id;
      for (const k of kapitel) {
        const el = document.getElementById(k.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) treffer = k.id;
      }
      setAktiv(treffer);
    };
    const beiScroll = () => {
      if (!frame) frame = requestAnimationFrame(messen);
    };
    messen();
    window.addEventListener('scroll', beiScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', beiScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [kapitel]);

  return (
    <nav aria-label="Kapitel" className="hidden md:block">
      <ol className="grid gap-1 border-l border-foreground/10">
        {kapitel.map((k, i) => {
          const an = aktiv === k.id;
          return (
            <li key={k.id}>
              <a
                href={`#${k.id}`}
                aria-current={an ? 'location' : undefined}
                className={cn(
                  '-ml-px flex items-baseline gap-3 border-l-2 py-1.5 pl-4 text-[15px] transition-colors',
                  an ? 'border-tinte text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                <span className="text-[12px] tabular-nums opacity-60">0{i + 1}</span>
                {k.titel}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
