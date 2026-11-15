export type FlaechenStil = 'verlauf' | 'sonne' | 'lichter' | 'horizont' | 'ecke';

// Feines Korn als SVG-Rauschen, liegt über den weichen Farbflächen
export const KORN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Feines Korn als eigene Ebene. */
export function Korn({ className = 'opacity-[0.38]' }: { className?: string }) {
  return <div aria-hidden className={`pointer-events-none absolute inset-0 mix-blend-overlay ${className}`} style={{ backgroundImage: KORN, backgroundSize: '220px 220px' }} />;
}

/** Weiche Lichtflächen in den Farben der Palette, als Ebenen hinter dem Inhalt einer dunklen Fläche. */
export function Licht({ stil, i }: { stil: FlaechenStil; i: number }) {
  if (stil === 'verlauf') {
    return <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-white/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />;
  }
  const korn = <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.38] mix-blend-overlay" style={{ backgroundImage: KORN, backgroundSize: '220px 220px' }} />;
  if (stil === 'sonne') {
    const pos = ['left-1/2 -translate-x-1/2', 'left-[62%] -translate-x-1/2', 'left-[36%] -translate-x-1/2'][i % 3];
    return (
      <>
        <div aria-hidden className={`pointer-events-none absolute -bottom-[62%] aspect-square w-[105%] rounded-full blur-[14px] transition-transform duration-1000 group-hover:scale-[1.05] ${pos}`} style={{ background: 'radial-gradient(circle at 50% 50%, #f1efe8 0%, #dcdfd6 28%, #c7ccc2 42%, #9eaaa2 54%, #758a87 62%, rgba(81,104,111,0.6) 67%, rgba(31,43,51,0) 72%)' }} />
        {korn}
      </>
    );
  }
  if (stil === 'ecke') {
    // Für breite, niedrige Flächen: Licht fällt von oben rechts ein, unten links ein schwacher Gegenschein
    return (
      <>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(52% 120% at 92% -18%, rgba(158,170,162,0.7) 0%, rgba(117,138,135,0.5) 32%, rgba(81,104,111,0.22) 60%, rgba(31,43,51,0) 82%), radial-gradient(38% 90% at -4% 112%, rgba(81,104,111,0.6) 0%, rgba(53,72,87,0.3) 45%, rgba(31,43,51,0) 78%)',
          }}
        />
        {korn}
      </>
    );
  }
  if (stil === 'lichter') {
    const a = [['-left-[20%] -top-[25%]', '-right-[15%] -bottom-[20%]'], ['-right-[20%] -top-[20%]', '-left-[10%] -bottom-[25%]'], ['left-[10%] -top-[35%]', '-right-[25%] bottom-[0%]']][i % 3];
    return (
      <>
        <div aria-hidden className={`pointer-events-none absolute aspect-square w-[85%] rounded-full blur-[45px] transition-transform duration-1000 group-hover:translate-x-4 ${a[0]}`} style={{ background: 'radial-gradient(circle, #758a87 0%, rgba(117,138,135,0.6) 40%, rgba(117,138,135,0) 70%)' }} />
        <div aria-hidden className={`pointer-events-none absolute aspect-square w-[60%] rounded-full blur-[40px] mix-blend-screen transition-transform duration-1000 group-hover:-translate-x-4 ${a[1]}`} style={{ background: 'radial-gradient(circle, #c7ccc2 0%, rgba(158,170,162,0.55) 40%, rgba(158,170,162,0) 70%)' }} />
        {korn}
      </>
    );
  }
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, #1f2b33 0%, #24333c 40%, #3c5260 62%, #758a87 80%, #9eaaa2 92%, #c7ccc2 100%)' }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-[18%] left-1/2 h-[45%] w-[90%] -translate-x-1/2 rounded-[50%] blur-[35px] transition-transform duration-1000 group-hover:scale-110" style={{ background: 'radial-gradient(closest-side, rgba(241,239,232,0.85), rgba(241,239,232,0))' }} />
      {korn}
    </>
  );
}

