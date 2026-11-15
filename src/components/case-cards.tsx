import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { DiamondMini } from '@/components/diamond-mini';
import { ParallaxPanel } from '@/components/motion-bits';
import { zeitraum, type Projekt, type Sprache } from '@/lib/content';
import { Korn, Licht, type FlaechenStil } from '@/components/licht';

export { Licht, type FlaechenStil };

const FLAECHEN = [
  'bg-[radial-gradient(120%_120%_at_0%_0%,#758a87_0%,#354857_50%,#1f2b33_100%)]',
  'bg-[radial-gradient(120%_120%_at_100%_0%,#51686f_0%,#2b3c48_50%,#1f2b33_100%)]',
  'bg-[radial-gradient(120%_120%_at_0%_100%,#9eaaa2_0%,#51686f_45%,#1f2b33_100%)]',
];

export function CaseCards({ projekte, lang = 'de', stil = 'verlauf' }: { projekte: Projekt[]; lang?: Sprache; stil?: FlaechenStil }) {
  const mehr = lang === 'de' ? 'Fallstudie lesen' : 'Read case study';
  return (
    <ol className="grid gap-6 md:gap-[12vh]">
      {projekte.map((p, i) => (
        <li key={p.id} className="md:sticky" style={{ top: `calc(6rem + ${i * 1.5}rem)` }}>
          <Link
            href={`/projekte/${p.id}`}
            className="group grid overflow-hidden rounded-[32px] bg-card p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_30px_80px_-40px_rgba(31,43,51,0.35)] md:grid-cols-2 md:p-4"
          >
            <div className="flex flex-col p-6 md:p-10">
              <div className="flex flex-col items-start gap-2">
                <span className="rounded-full bg-brand-soft px-3.5 py-1.5 text-[clamp(0.95rem,1.1vw,1.05rem)] font-semibold tracking-tight text-tinte">{p.kunde}</span>
                <span className="text-[14px] text-muted-foreground">{zeitraum(p, lang)}</span>
              </div>
              <h3 className="mt-5 text-[clamp(1.225rem,2.24vw,1.925rem)]">{p.titel}</h3>
              <p className="mt-4 max-w-[46ch] text-[17px] leading-relaxed text-muted-foreground">{p.kurz}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-10 text-[17px] font-medium">
                <span className="grid size-9 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
                <span className="ml-1.5">{mehr}</span>
              </span>
            </div>
            <div className={`relative isolate min-h-[280px] overflow-clip rounded-[24px] md:min-h-[min(62vh,600px)] ${stil === 'verlauf' ? FLAECHEN[i % FLAECHEN.length] : 'bg-nacht'}`}>
            <Licht stil={stil} i={i} />
            {stil === 'verlauf' && <Korn />}
            <ParallaxPanel className={`relative z-10 h-full min-h-[280px] p-7 text-white md:min-h-[min(62vh,600px)] md:p-10 ${stil === 'verlauf' ? '' : '[&>div]:justify-start [&>div]:gap-8'}`}>
              <DiamondMini phasen={p.phasen} className="relative h-7 w-[75px] [&_.fill-ink]:fill-white [&_.fill-ink]:stroke-white [&_path:not(.fill-ink)]:stroke-white/50" />
              {p.kennzahl && (
                <p className="relative max-w-[14ch] text-[clamp(1.4rem,2.94vw,2.625rem)] font-semibold leading-[1.02] tracking-[-0.03em]">{p.kennzahl}</p>
              )}
            </ParallaxPanel>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
