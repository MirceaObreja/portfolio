import Link from 'next/link';
import { DiamondMini } from '@/components/diamond-mini';
import { zeitraum, type Projekt, type Sprache } from '@/lib/content';

export function CaseCards({ projekte, lang = 'de' }: { projekte: Projekt[]; lang?: Sprache }) {
  return (
    <ul className="grid gap-4">
      {projekte.map((p) => (
        <li key={p.id}>
          <Link
            href={`/projekte/${p.id}`}
            className="group grid gap-8 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/25 md:grid-cols-12 md:p-10"
          >
            <div className="grid content-start gap-4 md:col-span-7">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px]">
                <span className="font-medium">{p.kunde}</span>
                <span className="text-muted-foreground">{zeitraum(p, lang)}</span>
              </div>
              <h3 className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-medium transition-colors group-hover:text-brand">{p.titel}</h3>
              <p className="max-w-[58ch] text-muted-foreground">{p.kurz}</p>
            </div>
            <div className="flex flex-col justify-between gap-6 border-t border-border pt-6 md:col-span-5 md:border-t-0 md:border-l md:pt-0 md:pl-10">
              {p.kennzahl && <p className="text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-tight tracking-tight text-brand">{p.kennzahl}</p>}
              <DiamondMini phasen={p.phasen} className="h-7 w-[75px]" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
