import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { DiamondMini } from '@/components/diamond-mini';
import { ParallaxPanel } from '@/components/motion-bits';
import { zeitraum, type Projekt, type Sprache } from '@/lib/content';

const FLAECHEN = [
  'bg-[radial-gradient(120%_120%_at_0%_0%,#3a3a3a_0%,#1a1a1a_45%,#0b0b0b_100%)]',
  'bg-[radial-gradient(120%_120%_at_100%_0%,#353535_0%,#181818_45%,#0b0b0b_100%)]',
  'bg-[radial-gradient(120%_120%_at_0%_100%,#383838_0%,#191919_50%,#0b0b0b_100%)]',
];

export function CaseCards({ projekte, lang = 'de' }: { projekte: Projekt[]; lang?: Sprache }) {
  const mehr = lang === 'de' ? 'Fallstudie lesen' : 'Read case study';
  return (
    <ol className="grid gap-6">
      {projekte.map((p, i) => (
        <li key={p.id} className="md:sticky" style={{ top: `calc(6rem + ${i * 1.5}rem)` }}>
          <Link
            href={`/projekte/${p.id}`}
            className="group grid overflow-hidden rounded-[32px] bg-card p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_30px_80px_-40px_rgba(20,40,90,0.35)] md:grid-cols-2 md:p-4"
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
            <ParallaxPanel className={`relative min-h-[280px] overflow-hidden rounded-[24px] p-7 text-white md:min-h-[440px] md:p-10 ${FLAECHEN[i % FLAECHEN.length]}`}>
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-white/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />
              <DiamondMini phasen={p.phasen} className="relative h-7 w-[75px] [&_.fill-ink]:fill-white [&_.fill-ink]:stroke-white [&_path:not(.fill-ink)]:stroke-white/50" />
              {p.kennzahl && (
                <p className="relative max-w-[14ch] text-[clamp(2rem,4.2vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.03em]">{p.kennzahl}</p>
              )}
            </ParallaxPanel>
          </Link>
        </li>
      ))}
    </ol>
  );
}
