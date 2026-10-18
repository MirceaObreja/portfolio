import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { DiamondMini } from '@/components/diamond-mini';
import { ParallaxPanel } from '@/components/motion-bits';
import { zeitraum, type Projekt, type Sprache } from '@/lib/content';

const FLAECHEN = [
  'bg-[radial-gradient(120%_120%_at_0%_0%,#758a87_0%,#354857_50%,#1f2b33_100%)]',
  'bg-[radial-gradient(120%_120%_at_100%_0%,#51686f_0%,#2b3c48_50%,#1f2b33_100%)]',
  'bg-[radial-gradient(120%_120%_at_0%_100%,#9eaaa2_0%,#51686f_45%,#1f2b33_100%)]',
];

export type FlaechenStil = 'verlauf' | 'sonne' | 'lichter' | 'horizont';

// Feines Korn als SVG-Rauschen, liegt über den weichen Farbflächen
const KORN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

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

export function CaseCards({ projekte, lang = 'de', stil = 'verlauf' }: { projekte: Projekt[]; lang?: Sprache; stil?: FlaechenStil }) {
  const mehr = lang === 'de' ? 'Fallstudie lesen' : 'Read case study';
  return (
    <ol className="grid gap-6">
      {projekte.map((p, i) => (
        <li key={p.id} className="md:sticky" style={{ top: `calc(6rem + ${i * 1.5}rem)` }}>
          <Link
            href={`/projekte/${p.id}`}
            className="group grid overflow-hidden rounded-[32px] bg-card p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_30px_80px_-40px_rgba(31,43,51,0.35)] md:grid-cols-2 md:p-4"
          >
            <div className="flex flex-col p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px]">
                <span className="font-semibold">{p.kunde}</span>
                <span className="text-muted-foreground">{zeitraum(p, lang)}</span>
              </div>
              <h3 className="mt-5 text-[clamp(1.75rem,3.2vw,2.75rem)]">{p.titel}</h3>
              <p className="mt-4 max-w-[46ch] text-[17px] leading-relaxed text-muted-foreground">{p.kurz}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-10 text-[17px] font-medium">
                <span className="grid size-9 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
                <span className="ml-1.5">{mehr}</span>
              </span>
            </div>
            <div className={`relative isolate min-h-[280px] overflow-hidden rounded-[24px] md:min-h-[440px] ${stil === 'verlauf' ? FLAECHEN[i % FLAECHEN.length] : 'bg-nacht'}`}>
            <Licht stil={stil} i={i} />
            <ParallaxPanel className={`relative z-10 h-full min-h-[280px] p-7 text-white md:min-h-[440px] md:p-10 ${stil === 'verlauf' ? '' : '[&>div]:justify-start [&>div]:gap-8'}`}>
              <DiamondMini phasen={p.phasen} className="relative h-7 w-[75px] [&_.fill-ink]:fill-white [&_.fill-ink]:stroke-white [&_path:not(.fill-ink)]:stroke-white/50" />
              {p.kennzahl && (
                <p className="relative max-w-[14ch] text-[clamp(2rem,4.2vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.03em]">{p.kennzahl}</p>
              )}
            </ParallaxPanel>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
