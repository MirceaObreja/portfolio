import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Hero } from '@/components/hero';
import { DoubleDiamond } from '@/components/double-diamond';
import { CaseCards } from '@/components/case-cards';
import { ProjectExplorer } from '@/components/project-explorer';
import { Marquee } from '@/components/marquee';
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

        <div className="border-y border-foreground/10 bg-card py-5">
          <div className="container-page">
            <Marquee items={['Siemens', 'ADAC', 'Bank Cler', 'Retailbanking', 'Privatkredite', 'Öffentliche Verwaltung', 'Gesundheitswesen', 'B2B-Plattformen']} />
          </div>
        </div>

        <section className="container-page pt-28 md:pt-40" aria-label="Arbeitsweise in einem Satz">
          <ScrollText
            text="Ich verschaffe mir zuerst einen Überblick über die gesamte Journey, auch über Prozesse und Abhängigkeiten, die Nutzerinnen und Nutzer nie sehen. Danach strukturiere ich das Problem, leite Hypothesen ab und prüfe sie mit Research."
            className="max-w-[24ch] text-[clamp(2rem,4.4vw,4rem)] font-medium leading-[1.08] tracking-[-0.03em]"
          />
        </section>

        <section id="arbeitsweise" className="container-page pt-28 md:pt-40" aria-labelledby="aw-h">
          <SectionTitle id="aw-h" titel="Arbeitsweise." text="Ich arbeite entlang des Double Diamond und begleite Projekte meist durch alle vier Phasen. Fahre über eine Phase, um die Methoden zu sehen." />
          <Reveal>
            <div className="rounded-[32px] bg-card px-5 pb-8 pt-10 md:px-12 md:pb-12 md:pt-14">
              <DoubleDiamond texte={PHASEN_TEXT.de} spaces={['Problem verstehen', 'Lösung entwickeln']} hint="Fahre über eine Phase oder tippe darauf, um zu sehen, was ich dort mache und welche Methoden ich einsetze." />
            </div>
          </Reveal>
        </section>

        <section id="fallstudien" className="container-page pt-28 md:pt-40" aria-labelledby="fs-h">
          <SectionTitle id="fs-h" titel="Fallstudien." text="Drei Projekte, an denen sich zeigt, wie ich arbeite: von der Analyse bis zum messbaren Ergebnis." />
          <CaseCards projekte={cases} />
        </section>

        <section id="projekte" className="container-page pt-28 md:pt-40" aria-labelledby="pr-h">
          <SectionTitle id="pr-h" titel="Projekte." text="Alle Projekte seit Mai 2022. Filtere nach Phase, um die Projekte zu sehen, in denen ich diese Phase verantwortet habe." />
          <ProjectExplorer projekte={projekte} />
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
