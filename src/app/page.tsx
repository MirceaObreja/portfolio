import { ChevronRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { DoubleDiamond } from '@/components/double-diamond';
import { PHASEN_TEXT } from '@/lib/site';
import { CaseCards } from '@/components/case-cards';
import { ProjectExplorer } from '@/components/project-explorer';
import { Button } from '@/components/ui/button';
import { Aurora } from '@/components/aurora';
import { HeroTitle } from '@/components/hero-title';
import { Marquee } from '@/components/marquee';
import { alleProjekte, fallstudien } from '@/lib/content';
import { zuKarte } from '@/lib/karten';

const FAKTEN = [
  ['Werkzeuge', 'Figma, FigJam, Miro, Lookback, Testing Time, Google Analytics'],
  ['KI im Arbeitsalltag', 'Ich setze Claude und Microsoft Copilot täglich ein und baue mir eigene kleine KI-Tools für wiederkehrende Aufgaben. So bleibt mehr Zeit für Analyse und Konzept.'],
  ['Ausgleich', 'Fotografie. Nach einem Tag am Bildschirm schaue ich gern durch den Sucher.'],
];

export default function Home() {
  const projekte = alleProjekte().map((p) => zuKarte(p));
  const cases = fallstudien();
  return (
    <>
      <SiteHeader />
      <main>
        {process.env.PREVIEW_EXPORT && (
          <div className="container-page pt-4">
            <p className="rounded-xl border border-border bg-brand-soft px-4 py-3 text-[15px]">
              Nur in der Vorschau sichtbar: <a href="/f/beispiel-energie-7k3m9q/" className="font-medium text-brand underline underline-offset-4">Beispiel-Bewerbungsseite öffnen</a>
            </p>
          </div>
        )}
        <section className="relative isolate -mt-24 pt-24">
          <Aurora className="[mask-image:linear-gradient(#000_55%,transparent)]" />
          <div className="container-page pt-10 text-center md:pt-24">
            <p className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[14px] font-medium text-foreground/80">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              Service Design und UX-Strategie
            </p>
            <HeroTitle
              text="Digitale Strecken von Anfang bis Ende einfacher machen."
              className="mx-auto mt-7 max-w-[15ch] text-[clamp(3rem,8.4vw,7.25rem)] font-semibold leading-[0.98] tracking-[-0.038em]"
            />
            <p className="mx-auto mt-8 max-w-[54ch] text-[clamp(1.1rem,1.6vw,1.3rem)] leading-relaxed text-foreground/65">
              Ich bin Mircea Obreja, Senior Experience Consultant bei Merkle. Ich frage, wo Leute aussteigen, was hinter dem Formular passiert und welche Abteilungen mitreden müssen. Daraus entwickle ich Konzepte, teste sie mit Nutzerinnen und Nutzern und begründe Entscheidungen mit Daten.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <Button asChild size="lg" className="bg-brand text-white shadow-[0_10px_30px_-10px_rgba(0,113,227,0.7)] hover:bg-brand/90"><a href="#fallstudien">Fallstudien ansehen</a></Button>
              <a href="#kontakt" className="inline-flex items-center gap-0.5 text-[17px] text-brand hover:underline">Kontakt aufnehmen<ChevronRight className="size-4" aria-hidden /></a>
            </div>
            <div className="mx-auto mt-16 max-w-3xl md:mt-20">
              <Marquee items={['Siemens', 'ADAC', 'Bank Cler', 'Retailbanking', 'Privatkredite', 'Öffentliche Verwaltung', 'Gesundheitswesen', 'B2B-Plattformen']} />
            </div>

            <div className="glass mt-14 rounded-[32px] px-5 pb-8 pt-10 text-left md:mt-20 md:px-12 md:pb-12 md:pt-14">
              <div className="mb-10 text-center">
                <h2 className="text-[clamp(1.75rem,3.2vw,2.75rem)]">So arbeite ich.</h2>
                <p className="mx-auto mt-3 max-w-[50ch] text-[17px] text-foreground/65">Entlang des Double Diamond, meist durch alle vier Phasen.</p>
              </div>
              <DoubleDiamond texte={PHASEN_TEXT.de} spaces={['Problem verstehen', 'Lösung entwickeln']} hint="Fahre über eine Phase oder tippe darauf, um zu sehen, was ich dort mache." />
            </div>
          </div>
        </section>

        <section id="fallstudien" className="container-page pt-24 md:pt-32" aria-labelledby="fs-h">
          <h2 id="fs-h" className="mb-10 text-center text-[clamp(2.25rem,4.4vw,3.5rem)]">Fallstudien.</h2>
          <CaseCards projekte={cases} />
        </section>

        <section id="projekte" className="container-page pt-24 md:pt-32" aria-labelledby="pr-h">
          <div className="mb-10 text-center">
            <h2 id="pr-h" className="text-[clamp(2.25rem,4.4vw,3.5rem)]">Alle Projekte.</h2>
            <p className="mx-auto mt-3 max-w-[52ch] text-[17px] text-muted-foreground">Seit Mai 2022 bei Merkle. Filtere nach Phase, um die Projekte zu sehen, in denen ich diese Phase verantwortet habe.</p>
          </div>
          <ProjectExplorer projekte={projekte} />
        </section>

        <section id="ueber-mich" className="container-page pt-24 md:pt-32" aria-labelledby="um-h">
          <div className="rounded-[28px] bg-card px-6 py-12 md:px-16 md:py-16">
            <h2 id="um-h" className="text-center text-[clamp(2.25rem,4.4vw,3.5rem)]">Über mich.</h2>
            <div className="mx-auto mt-10 max-w-[64ch] text-[17px] leading-relaxed md:text-lg">
              <p className="mb-4">Seit Mai 2022 arbeite ich bei Merkle in der Schweiz, zuerst als Experience Consultant, seit 2025 als Senior. In meinen Projekten beginne ich meist mit einem Schritt zurück: Ich verschaffe mir einen Überblick über die gesamte Journey, auch über Prozesse und Abhängigkeiten, die Nutzerinnen und Nutzer nie sehen. Danach strukturiere ich das Problem, leite Hypothesen ab und prüfe sie mit Research.</p>
              <p>Bei Siemens habe ich über zwei Jahre die UX auf einem B2B-Marktplatz verantwortet und ein kleines Team geführt. Kolleginnen und Kollegen holen mich dazu, wenn ein Problem verzwickt ist oder Research gebraucht wird.</p>
            </div>
            <dl className="mx-auto mt-12 grid max-w-[900px] gap-5 md:grid-cols-3">
              {FAKTEN.map(([dt, dd]) => (
                <div key={dt} className="rounded-[20px] bg-background p-6">
                  <dt className="font-semibold">{dt}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
