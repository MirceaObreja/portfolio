import { ArrowUp, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Buehne } from '@/components/buehne';
import { MailKopieren } from '@/components/mail-kopieren';
import { KONTAKT } from '@/lib/site';

/**
 * Footer als dunkle Bühne. Auf grossen Bildschirmen bleibt er am unteren Rand stehen
 * und kommt zum Vorschein, wenn der Inhalt mit seinen runden Ecken nach oben wegscrollt.
 */
export function SiteFooter({
  titel = 'Lass uns sprechen.',
  text = 'Du hast eine Frage zu einem Projekt oder möchtest dich austauschen? Schreib mir eine E-Mail.',
  button = 'E-Mail schreiben',
  lang = 'de',
}: {
  titel?: string;
  text?: string;
  button?: string;
  lang?: 'de' | 'en';
}) {
  return (
    <>
      {/* Sprungziel für «Schreib mir»: liegt im normalen Fluss, damit der Sprung ans Seitenende führt */}
      <div id="kontakt" aria-hidden className="relative z-[1] h-px" />
      <footer className="-mt-12 md:sticky md:bottom-0">
        <Buehne stil="ecke" className="pt-12">
          <div className="container-page grid gap-10 pb-14 pt-20 md:grid-cols-12 md:pb-20 md:pt-28">
            <h2 className="text-[clamp(2.275rem,6.3vw,5.95rem)] font-medium leading-[0.9] tracking-[-0.045em] md:col-span-7">{titel}</h2>
            <div className="flex flex-col justify-end gap-6 md:col-span-5">
              <p className="max-w-[38ch] text-[17px] leading-relaxed text-white/70">{text}</p>
              <MailKopieren email={KONTAKT.email} lang={lang} />
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${KONTAKT.email}`} className="group/cta inline-flex h-12 items-center gap-2 rounded-full bg-white pl-5 pr-1.5 text-[15px] font-medium text-ink">
                  {button}
                  <span className="grid size-9 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover/cta:rotate-45">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </a>
                <a href={KONTAKT.linkedin} rel="me noopener" target="_blank" className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 text-[15px] backdrop-blur-md transition-colors hover:bg-white/15">
                  LinkedIn
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </div>
            </div>
          </div>
          <div className="container-page flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6 text-sm text-white/55">
            <span className="flex flex-wrap gap-x-4 gap-y-1">
              <span>© {new Date().getFullYear()} {KONTAKT.name}</span>
              {/* Vorübergehend für die Demo, vor dem Livegang entfernen */}
              <Link href="/f/beispiel-energie-7k3m9q" className="underline underline-offset-4 transition-colors hover:text-white">Demo: Bewerbungsseite</Link>
            </span>
            <span>Konzipiert und entwickelt in St. Gallen.</span>
            <a href="#top" aria-label="Zurück zum Seitenanfang" title="Zurück zum Seitenanfang" className="group/top grid size-10 place-items-center rounded-full border border-white/20 transition-colors hover:border-white/50 hover:text-white">
              <ArrowUp className="size-4 transition-transform duration-300 group-hover/top:-translate-y-0.5" aria-hidden />
            </a>
          </div>
        </Buehne>
      </footer>
    </>
  );
}
