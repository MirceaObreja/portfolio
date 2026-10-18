import { ArrowUpRight, Mail } from 'lucide-react';
import { KONTAKT } from '@/lib/site';

export function SiteFooter({ titel = 'Lass uns sprechen.' }: { titel?: string }) {
  return (
    <footer id="kontakt" className="mt-32 overflow-hidden bg-ink text-white">
      <div className="container-page grid gap-12 pb-16 pt-24 md:grid-cols-12 md:pt-32">
        <h2 className="text-[clamp(3.25rem,9vw,8.5rem)] font-medium leading-[0.9] tracking-[-0.045em] md:col-span-8">{titel}</h2>
        <div className="flex flex-col justify-end gap-6 md:col-span-4">
          <p className="max-w-[34ch] text-[17px] leading-relaxed text-white/65">Du hast Fragen zu einem Projekt oder möchtest über eine Zusammenarbeit sprechen? Schreib mir.</p>
          <p className="select-all text-xl">{KONTAKT.email}</p>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${KONTAKT.email}`} className="group inline-flex h-12 items-center gap-2 rounded-full bg-white pl-5 pr-1.5 text-[15px] font-medium text-ink">
              <Mail className="size-4" aria-hidden />E-Mail schreiben
              <span className="grid size-9 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight className="size-4" aria-hidden /></span>
            </a>
            <a href={KONTAKT.linkedin} rel="me noopener" target="_blank" className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-5 text-[15px] transition-colors hover:bg-white/10">
              LinkedIn<ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
      <div aria-hidden className="relative select-none overflow-hidden border-t border-white/10 py-6">
        <div className="marquee-track flex w-max gap-16 whitespace-nowrap text-[clamp(4rem,12vw,11rem)] font-light leading-none tracking-[-0.05em] text-white/[0.08]">
          {Array.from({ length: 4 }).map((_, i) => <span key={i}>Mircea Obreja</span>)}
        </div>
      </div>
      <div className="container-page flex flex-wrap justify-between gap-4 border-t border-white/10 py-6 text-sm text-white/50">
        <span>{KONTAKT.name}, {new Date().getFullYear()}</span>
        <span>St. Gallen, Schweiz</span>
      </div>
    </footer>
  );
}
