import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Hero } from '@/components/hero';
import { DoubleDiamond } from '@/components/double-diamond';
import { CaseCards } from '@/components/case-cards';
import { Banner } from '@/components/banners';
import { ListeIndex } from '@/components/projekte-listen';

function Variante({ name, text }: { name: string; text: string }) {
  return (
    <div className="mb-4 mt-20 flex flex-wrap items-center gap-3 first:mt-0">
      <span className="rounded-full bg-brand px-3 py-1 text-[13px] font-medium text-white">{name}</span>
      <span className="text-[14px] text-muted-foreground">{text}</span>
    </div>
  );
}
import { AboutTiles } from '@/components/about-tiles';
import { SectionTitle } from '@/components/section-title';
import { Timeline } from '@/components/timeline';
import { Reveal, ScrollText } from '@/components/motion-bits';
import { PHASEN_TEXT } from '@/lib/site';
import { alleProjekte, fallstudien } from '@/lib/content';
import { zuKarte } from '@/lib/karten';

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

        <Hero />

        <Banner />

        <section className="container-page pt-28 md:pt-40" aria-label="Arbeitsweise in einem Satz">
          <ScrollText
            text="Ich verschaffe mir zuerst einen Überblick über die gesamte Journey, auch über Prozesse und Abhängigkeiten, die Nutzerinnen und Nutzer nie sehen. Danach strukturiere ich das Problem, leite Hypothesen ab und prüfe sie mit Research."
            className="max-w-[24ch] text-[clamp(2rem,4.4vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em]"
          />
        </section>

        <section id="arbeitsweise" className="container-page pt-28 md:pt-40" aria-labelledby="aw-h">
          <SectionTitle id="aw-h" titel="Arbeitsweise." text="Ich arbeite entlang des Double Diamond: Im ersten Diamanten verstehe ich das Problem, im zweiten entwickle ich die Lösung. Fahre über eine Phase, um die Methoden zu sehen." />
          <Reveal>
            <div className="rounded-[32px] bg-card px-5 pb-8 pt-10 md:px-12 md:pb-12 md:pt-14">
              <DoubleDiamond texte={PHASEN_TEXT.de} spaces={['Problem verstehen', 'Lösung entwickeln']} hint="Fahre über eine Phase oder tippe darauf, um zu sehen, was ich dort mache und welche Methoden ich einsetze." />
            </div>
          </Reveal>
        </section>

        <section id="fallstudien" className="container-page pt-28 md:pt-40" aria-labelledby="fs-h">
          <SectionTitle id="fs-h" titel="Fallstudien." text="Drei Projekte, an denen sich zeigt, wie ich arbeite: von der Analyse bis zum messbaren Ergebnis." />
          <Variante name="Fläche: Verlauf" text="Bisherige Variante" />
          <CaseCards projekte={cases} stil="verlauf" />
          <Variante name="Fläche: Sonne" text="Grosse, weiche Lichtkugel mit Korn, steigt von unten auf" />
          <CaseCards projekte={cases} stil="sonne" />
          <Variante name="Fläche: Zwei Lichter" text="Zwei unscharfe Farbflecken, die sich überlagern" />
          <CaseCards projekte={cases} stil="lichter" />
          <Variante name="Fläche: Horizont" text="Verlauf wie in der Dämmerung, mit hellem Schein am unteren Rand" />
          <CaseCards projekte={cases} stil="horizont" />
        </section>

        <section id="projekte" className="container-page pt-28 md:pt-40" aria-labelledby="pr-h">
          <SectionTitle id="pr-h" titel="Projekte." text="Alle Projekte seit Mai 2022, jeweils mit den Phasen des Double Diamond, die ich verantwortet habe." />
          <Variante name="Tabs 1" text="Linie gleitet, Anzahl nur beim Darüberfahren und bei der Auswahl" />
          <ListeIndex projekte={projekte} tabs="linie" />
          <Variante name="Tabs 2" text="Farbiger Punkt vor dem gewählten Reiter" />
          <ListeIndex projekte={projekte} tabs="punkt" />
          <Variante name="Tabs 3" text="Leuchtmarker gleitet hinter das gewählte Wort" />
          <ListeIndex projekte={projekte} tabs="marker" />
          <Variante name="Tabs 4" text="Schrägstriche als Trenner, Phasen-Symbol klappt auf" />
          <ListeIndex projekte={projekte} tabs="symbol" />
        </section>

        <section id="werdegang" className="container-page pt-28 md:pt-40" aria-labelledby="wg-h">
          <SectionTitle id="wg-h" titel="Werdegang." text="Vom Studium in Digital Business Management über ein UX-Praktikum bei Sunrise UPC zu Merkle." />
          <Timeline />
        </section>

        <section id="ueber-mich" className="container-page pt-28 md:pt-40" aria-labelledby="um-h">
          <SectionTitle id="um-h" titel="Über mich." />
          <Reveal className="grid gap-8 md:grid-cols-12">
            <p className="text-[clamp(1.35rem,2.2vw,1.9rem)] font-medium leading-snug tracking-tight md:col-span-7">
              Seit Mai 2022 arbeite ich bei Merkle in St. Gallen, zuerst als Experience Consultant, seit 2025 als Senior. Ich arbeite für Banken, B2B-Plattformen und die öffentliche Hand.
            </p>
            <p className="text-[17px] leading-relaxed text-muted-foreground md:col-span-5">
              Bei Siemens habe ich über zwei Jahre die UX auf einem B2B-Marktplatz verantwortet und ein kleines Team geführt. Kolleginnen und Kollegen holen mich dazu, wenn ein Problem verzwickt ist oder Research gebraucht wird.
            </p>
          </Reveal>
          <AboutTiles />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
