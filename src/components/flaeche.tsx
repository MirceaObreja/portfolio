// Feines Korn für die hellen Flächen, gleiches Prinzip wie bei den Fallstudien
const KORN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.12 0 0 0 0 0.17 0 0 0 0 0.2 0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const ORBS: [string, string, string, string][] = [
  ['-left-[18%] -top-[30%]', '#c7ccc2', '-right-[14%] -bottom-[35%]', '#9eaaa2'],
  ['-right-[20%] -top-[28%]', '#9eaaa2', '-left-[12%] -bottom-[30%]', '#c7ccc2'],
  ['left-[20%] -top-[40%]', '#c7ccc2', '-right-[22%] bottom-[-20%]', '#758a87'],
];

/** Heller Hintergrund mit weichen Farbflecken und Korn, angelehnt an die Fallstudien-Karten. */
export function Flaeche({ i }: { i: number }) {
  const [p1, c1, p2, c2] = ORBS[i % 3];
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,#f6f5f0_0%,#ebece5_55%,#dfe3dc_100%)]" />
      <div aria-hidden className={`pointer-events-none absolute aspect-square w-[80%] rounded-full blur-[40px] transition-transform duration-1000 group-hover:translate-x-3 ${p1}`} style={{ background: `radial-gradient(circle, ${c1} 0%, ${c1}99 40%, ${c1}00 70%)` }} />
      <div aria-hidden className={`pointer-events-none absolute aspect-square w-[65%] rounded-full opacity-70 blur-[40px] transition-transform duration-1000 group-hover:-translate-x-3 ${p2}`} style={{ background: `radial-gradient(circle, ${c2} 0%, ${c2}88 40%, ${c2}00 70%)` }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-multiply" style={{ backgroundImage: KORN, backgroundSize: '200px 200px' }} />
    </>
  );
}

