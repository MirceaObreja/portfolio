import { ArrowDown } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { DoubleDiamond } from '@/components/double-diamond';
import { PHASEN_TEXT } from '@/lib/site';
import { CaseCards } from '@/components/case-cards';
import { ProjectExplorer } from '@/components/project-explorer';
import { Button } from '@/components/ui/button';
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
        <section className="container-page pt-14 md:pt-24">
          <p className="mb-6 text-[15px] text-muted-foreground">Mircea Obreja, Service Design und UX-Strategie</p>
          <h1 className="max-w-[15ch] text-[clamp(2.75rem,7.2vw,6rem)] font-medium tracking-[-0.045em]">
            Ich schaue mir digitale Strecken von Anfang bis Ende an und mache sie einfacher.
          </h1>
          <div className="mt-10 grid gap-8 md:grid-cols-12">
            <p className="text-lg md:col-span-6 md:col-start-7">
              Als Senior Experience Consultant bei Merkle frage ich, wo Leute aussteigen, was hinter dem Formular passiert und welche Abteilungen mitreden müssen. Aus den Antworten entwickle ich Konzepte, teste sie mit Nutzerinnen und Nutzern und begründe Entscheidungen mit Daten. Seit 2022 für Banken, B2B-Plattformen und die öffentliche Hand.
            </p>
            <div className="flex flex-wrap gap-3 md:col-span-6 md:col-start-7">
              <Button asChild size="lg"><a href="#fallstudien">Fallstudien ansehen<ArrowDown aria-hidden /></a></Button>
              <Button asChild size="lg" variant="outline"><a href="#kontakt">Kontakt</a></Button>
            </div>
          </div>
          <div className="mt-16 rounded-2xl border border-border bg-card p-6 md:mt-24 md:p-10">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl font-medium tracking-tight">So arbeite ich: entlang des Double Diamond</h2>
              <p className="text-[15px] text-muted-foreground">Meist durch alle vier Phasen</p>
            </div>
            <DoubleDiamond texte={PHASEN_TEXT.de} spaces={['Problem verstehen', 'Lösung entwickeln']} hint="Fahre über eine Phase oder tippe darauf, um zu sehen, was ich dort mache." />
          </div>
        </section>

        <section id="fallstudien" className="container-page pt-24 md:pt-32" aria-labelledby="fs-h">
          <h2 id="fs-h" className="mb-8 text-[clamp(2rem,3.6vw,3rem)] font-medium">Fallstudien</h2>
          <CaseCards projekte={cases} />
        </section>

        <section id="projekte" className="container-page pt-24 md:pt-32" aria-labelledby="pr-h">
          <div className="mb-8 grid gap-3 md:grid-cols-12">
            <h2 id="pr-h" className="text-[clamp(2rem,3.6vw,3rem)] font-medium md:col-span-6">Alle Projekte</h2>
            <p className="text-muted-foreground md:col-span-6 md:pt-3">Seit Mai 2022 bei Merkle. Filtere nach Phase, um die Projekte zu sehen, in denen ich diese Phase verantwortet habe.</p>
          </div>
          <ProjectExplorer projekte={projekte} />
        </section>

        <section id="ueber-mich" className="container-page pt-24 md:pt-32" aria-labelledby="um-h">
          <div className="grid gap-8 md:grid-cols-12">
            <h2 id="um-h" className="text-[clamp(2rem,3.6vw,3rem)] font-medium md:col-span-5">Über mich</h2>
            <div className="max-w-[64ch] md:col-span-7">
              <p className="mb-4 text-lg">Seit Mai 2022 arbeite ich bei Merkle in der Schweiz, zuerst als Experience Consultant, seit 2025 als Senior. In meinen Projekten beginne ich meist mit einem Schritt zurück: Ich verschaffe mir einen Überblick über die gesamte Journey, auch über Prozesse und Abhängigkeiten, die Nutzerinnen und Nutzer nie sehen. Danach strukturiere ich das Problem, leite Hypothesen ab und prüfe sie mit Research.</p>
              <p className="text-lg">Bei Siemens habe ich über zwei Jahre die UX auf einem B2B-Marktplatz verantwortet und ein kleines Team geführt. Kolleginnen und Kollegen holen mich dazu, wenn ein Problem verzwickt ist oder Research gebraucht wird.</p>
              <dl className="mt-10 grid gap-0">
                {FAKTEN.map(([dt, dd]) => (
                  <div key={dt} className="grid gap-1 border-t border-border py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                    <dt className="font-medium">{dt}</dt>
                    <dd className="text-muted-foreground">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
