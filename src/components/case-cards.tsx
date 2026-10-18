import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { DiamondMini } from '@/components/diamond-mini';
import { zeitraum, type Projekt, type Sprache } from '@/lib/content';
import { cn } from '@/lib/utils';

export function CaseCards({ projekte, lang = 'de' }: { projekte: Projekt[]; lang?: Sprache }) {
  const mehr = lang === 'de' ? 'Fallstudie lesen' : 'Read case study';
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {projekte.map((p, i) => {
        const gross = i === 0 && projekte.length !== 2;
        return (
          <li key={p.id} className={cn(gross && 'md:col-span-2')}>
            <Link
              href={`/projekte/${p.id}`}
              className={cn(
                'group flex h-full flex-col items-center rounded-[28px] bg-card px-6 pb-10 pt-12 text-center transition-transform duration-300 hover:scale-[1.01] md:px-12',
                gross && 'md:pb-16 md:pt-16',
              )}
            >
              <p className="text-[15px] font-semibold text-muted-foreground">{p.kunde}</p>
              <h3 className={cn('mt-3 max-w-[22ch] text-[clamp(1.6rem,3vw,2.4rem)]', gross && 'md:text-5xl')}>{p.titel}</h3>
              <p className="mt-4 max-w-[52ch] text-[17px] text-muted-foreground">{p.kurz}</p>
              <span className="mt-5 inline-flex items-center gap-0.5 text-[17px] text-brand group-hover:underline">
                {mehr}<ChevronRight className="size-4" aria-hidden />
              </span>
              <div className="mt-auto flex flex-col items-center gap-4 pt-10">
                {p.kennzahl && (
                  <p className={cn('max-w-[18ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-brand', gross && 'md:text-6xl md:max-w-[22ch]')}>
                    {p.kennzahl}
                  </p>
                )}
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <DiamondMini phasen={p.phasen} className="h-5 w-[54px]" />
                  <span>{zeitraum(p, lang)}</span>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
