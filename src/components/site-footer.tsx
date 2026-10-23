import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react';
import Link from 'next/link';
import { KONTAKT } from '@/lib/site';

export function SiteFooter({ titel = 'Lass uns sprechen.', text = 'Du hast eine Frage zu einem Projekt oder möchtest dich austauschen? Schreib mir eine E-Mail.', button = 'E-Mail schreiben' }: { titel?: string; text?: string; button?: string }) {
  return (
    <footer id="kontakt" className="mt-32 overflow-hidden bg-ink text-white">
      <div className="container-page grid gap-12 pb-16 pt-24 md:grid-cols-12 md:pt-32">
        <h2 className="text-[clamp(2.275rem,6.3vw,5.95rem)] font-medium leading-[0.9] tracking-[-0.045em] md:col-span-8">{titel}</h2>
        <div className="flex flex-col justify-end gap-6 md:col-span-4">
          <p className="max-w-[34ch] text-[17px] leading-relaxed text-white/65">{text}</p>
          <p className="select-all text-xl">{KONTAKT.email}</p>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${KONTAKT.email}`} className="group inline-flex h-12 items-center gap-2 rounded-full bg-white pl-5 pr-1.5 text-[15px] font-medium text-ink">
              <Mail className="size-4" aria-hidden />{button}
              <span className="grid size-9 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight className="size-4" aria-hidden /></span>
            </a>
            <a href={KONTAKT.linkedin} rel="me noopener" target="_blank" className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-5 text-[15px] transition-colors hover:bg-white/10">
              LinkedIn<ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
      <div className="container-page flex flex-wrap items-center justify-between gap-4 mt-8 border-t border-white/10 py-6 text-sm text-white/50">
        <span className="flex flex-wrap gap-x-4 gap-y-1">
          <span>© {new Date().getFullYear()} {KONTAKT.name}</span>
          {/* Vorübergehend für die Demo, vor dem Livegang entfernen */}
          <Link href="/f/beispiel-energie-7k3m9q" className="underline underline-offset-4 transition-colors hover:text-white">Demo: Bewerbungsseite</Link>
        </span>
        <span>Konzipiert und entwickelt in St. Gallen.</span>
        <a href="#top" aria-label="Zurück zum Seitenanfang" title="Zurück zum Seitenanfang" className="group grid size-10 place-items-center rounded-full border border-white/20 transition-colors hover:border-white/50 hover:text-white">
          <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
        </a>
      </div>
    </footer>
  );
}
