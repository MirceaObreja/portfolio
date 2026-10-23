import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { HeroPanel, HeroVollbild, HeroKarte } from '@/components/hero-varianten';
import { DoubleDiamond } from '@/components/double-diamond';
import { CaseCards } from '@/components/case-cards';
import { Banner } from '@/components/banners';
import { ListeIndex } from '@/components/projekte-listen';

import { AboutTiles } from '@/components/about-tiles';
import { SectionTitle } from '@/components/section-title';
import { Timeline } from '@/components/timeline';
import { Reveal, ScrollText } from '@/components/motion-bits';
import { PHASEN_TEXT } from '@/lib/site';
import { alleProjekte, fallstudien } from '@/lib/content';
import { zuKarte } from '@/lib/karten';

function Variante({ name, text }: { name: string; text: string }) {
  return (
    <div className="container-page mt-6 flex flex-wrap items-center gap-3 pb-10">
      <span className="rounded-full bg-brand px-3 py-1 text-[13px] font-medium text-white">{name}</span>
      <span className="text-[14px] text-muted-foreground">{text}</span>
    </div>
  );
}

export default function Home() {
  const projekte = alleProjekte().map((p) => zuKarte(p));
  const cases = fallstudien();
  return (
    <>
      <SiteHeader />
      <main>
        {process.env.PREVIEW_EXPORT && (
          <div className="container-page pt-4">
            <p className="rounded-xl border border-border bg-card px-4 py-3 text-[15px]">
              Nur in der Vorschau sichtbar: <a href="/f/beispiel-energie-7k3m9q/" className="font-medium underline underline-offset-4">Beispiel-Bewerbungsseite öffnen</a>
            </p>
          </div>
        )}

        {/* Vorübergehend: drei Varianten für den Einstieg */}
        <HeroVollbild />
        <Variante name="Header A: Vollbild" text="Randlos, Name hinter dem Porträt, heller Horizont unten" />
        <HeroPanel />
        <Variante name="Header B: Panel" text="Wie auf der Bewerbungsseite, Zahlen als Glas-Chips" />
        <HeroKarte />
        <Variante name="Header C: Karte" text="Name auf hellem Grund, Porträt in dunkler Karte mit Lichtkugel" />

        <Banner />

        <section className="container-page pt-28 md:pt-40" aria-label="Arbeitsweise in einem Satz">
          <ScrollText
            text="Bevor ich etwas gestalte, will ich die ganze Journey verstehen, auch die Prozesse und Abhängigkeiten im Hintergrund, die Nutzerinnen und Nutzer nie zu sehen bekommen. Dann strukturiere ich das Problem, formuliere Hypothesen und prüfe sie mit Research."
            className="text-[clamp(1.4rem,3.08vw,2.8rem)] font-medium leading-[1.08] tracking-[-0.03em]"
          />
        </section>

        <section id="arbeitsweise" className="container-page pt-28 md:pt-40" aria-labelledby="aw-h">
          <SectionTitle id="aw-h" titel="Arbeitsweise." text="Ich arbeite nach dem Double Diamond, einem Prozessmodell, das auf den Prinzipien des Design Thinking aufbaut. Es hilft mir, komplexe Probleme strukturiert zu lösen. Im ersten Diamanten suche ich das eigentliche Problem, im zweiten die passende Lösung." />
          <Reveal>
            <div className="rounded-[32px] bg-card px-5 pb-8 pt-10 md:px-12 md:pb-12 md:pt-14">
              <DoubleDiamond texte={PHASEN_TEXT.de} spaces={['Problem verstehen', 'Lösung entwickeln']} hint="Fahre über eine Phase oder tippe darauf, um zu sehen, was ich dort mache und welche Methoden ich einsetze." />
            </div>
          </Reveal>
        </section>

        <section id="fallstudien" className="container-page pt-28 md:pt-40" aria-labelledby="fs-h">
          <SectionTitle id="fs-h" titel="Fallstudien." text="Drei Projekte im Detail, von der Analyse bis zum messbaren Ergebnis." />
          <CaseCards projekte={cases} />
        </section>

        <section id="projekte" className="container-page pt-28 md:pt-40" aria-labelledby="pr-h">
          <SectionTitle id="pr-h" titel="Projekte." text="Eine Auswahl meiner Projekte seit Mai 2022, jeweils mit den Phasen des Double Diamond, die ich verantwortet habe." />
          <ListeIndex projekte={projekte} />
        </section>

        <section id="werdegang" className="container-page pt-28 md:pt-40" aria-labelledby="wg-h">
          <SectionTitle id="wg-h" titel="Werdegang." text="Vom Studium in Digital Business Management über ein UX-Praktikum bei Sunrise UPC zu Merkle in St. Gallen." />
          <Timeline />
        </section>

        <section id="ueber-mich" className="container-page pt-28 md:pt-40" aria-labelledby="um-h">
          <SectionTitle id="um-h" titel="Über mich." />
          <Reveal className="grid gap-8 md:grid-cols-12">
            <p className="text-[clamp(1.35rem,2.2vw,1.9rem)] font-medium leading-snug tracking-tight md:col-span-7">
              Ich bin Mircea und arbeite seit Mai 2022 bei Merkle in St. Gallen, seit 2025 als Senior Experience Consultant. Meine Projekte kommen aus dem Banking, von B2B-Plattformen und aus der öffentlichen Verwaltung.
            </p>
            <p className="text-[17px] leading-relaxed text-muted-foreground md:col-span-5">
              Als Experience Consultant arbeite ich zwischen Kunde, Design und Entwicklung. Ich schaue mir an, wie Menschen ein digitales Angebot nutzen, entwickle daraus ein Konzept und prüfe es mit Tests, bevor es gestaltet und gebaut wird. Im Büro holen mich Kolleginnen und Kollegen oft dazu, wenn ein Problem verzwickt ist oder es Research braucht.
            </p>
          </Reveal>
          <AboutTiles />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
