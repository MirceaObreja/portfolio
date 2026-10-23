import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { ArrowUpRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CaseCards, Licht } from '@/components/case-cards';
import { WeitereProjekte } from '@/components/weitere-projekte';
import { DoubleDiamond } from '@/components/double-diamond';
import { SectionTitle } from '@/components/section-title';
import { Flaeche } from '@/components/flaeche';
import { Reveal } from '@/components/motion-bits';
import { alleBewerbungen, alleProjekte } from '@/lib/content';
import { zuKarte } from '@/lib/karten';
import { KONTAKT, PHASEN_TEXT } from '@/lib/site';
import portrait from '../../../../public/images/fotos/portrait-bw.png';
import unterschrift from '../../../../public/images/unterschrift.png';

export const dynamicParams = false;
export function generateStaticParams() {
  return alleBewerbungen().map((b) => ({ slug: b.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = alleBewerbungen().find((x) => x.id === slug);
  return {
    title: b ? `${b.firma}: ${b.sprache === 'de' ? 'Bewerbung' : 'Application'} – ${KONTAKT.name}` : KONTAKT.name,
    robots: { index: false, follow: false },
  };
}

const ZAHL_DE = ['', 'Eine Beobachtung', 'Zwei Beobachtungen', 'Drei Beobachtungen', 'Vier Beobachtungen'];

export default async function Bewerbung({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = alleBewerbungen().find((x) => x.id === slug);
  if (!b) notFound();
  const l = b.sprache;
  const alle = alleProjekte();
  const auswahl = b.projekte
    ? b.projekte.map((id) => alle.find((p) => p.id === id)).filter((p) => p !== undefined)
    : alle.filter((p) => !b.branchen || p.branchen.some((x) => b.branchen!.includes(x)));
  const cases = auswahl.filter((p) => p.fallstudie);
  const weitere = auswahl.filter((p) => !p.fallstudie).map((p) => zuKarte(p, l));
  const n = b.beobachtungen?.length ?? 0;
  const t = l === 'de'
    ? { fuer: `Für ${b.firma}`, art: 'Bewerbung', von: `von ${KONTAKT.name}`, brief: 'Anschreiben', gruss: 'Freundliche Grüsse', staerken: 'Was ich mitbringe.', staerkenText: `Drei Gründe, warum ich zur Stelle als ${b.stelle} passe.`, beob: `${ZAHL_DE[n] || 'Beobachtungen'}.`, beobText: 'Aus Sicht eines Kunden und ohne Kenntnis Ihrer internen Gründe. Als Ausgangspunkt für ein erstes Gespräch.', proj: 'Passende Projekte.', projText: 'Eine Auswahl aus meiner Arbeit bei Merkle, die zu Ihrer Stelle passt.', weitere: 'Weitere Projekte', alle: 'Alle Projekte ansehen', arbeit: 'So arbeite ich.', arbeitText: 'Ich begleite Projekte durch alle vier Phasen, vom ersten Interview bis zum Go-live.', spaces: ['Problem verstehen', 'Lösung entwickeln'] as [string, string], hint: 'Fahren Sie über eine Phase oder tippen Sie darauf, um zu sehen, was ich dort mache und welche Methoden ich einsetze.', foot: 'Ich freue mich auf ein Gespräch.', footText: 'Am einfachsten erreichen Sie mich per E-Mail. Ich melde mich innert eines Arbeitstages.', mail: 'E-Mail schreiben', cta: 'Gespräch vereinbaren', lesen: 'Anschreiben lesen' }
    : { fuer: `For ${b.firma}`, art: 'Application', von: `by ${KONTAKT.name}`, brief: 'Cover letter', gruss: 'Kind regards', staerken: 'What I bring.', staerkenText: `Three reasons why I fit the role of ${b.stelle}.`, beob: 'Observations.', beobText: 'From a customer’s point of view, without knowing your internal reasons. A starting point for a first conversation.', proj: 'Relevant projects.', projText: 'A selection of my work at Merkle that matches the role.', weitere: 'More projects', alle: 'See all projects', arbeit: 'How I work.', arbeitText: 'I take projects through all four phases, from the first interview to go-live.', spaces: ['Understand the problem', 'Develop the solution'] as [string, string], hint: 'Hover over or tap a phase to see what I do there and which methods I use.', foot: 'I look forward to talking.', footText: 'The easiest way to reach me is by email. I reply within one working day.', mail: 'Write an email', cta: 'Schedule a call', lesen: 'Read the letter' };

  return (
    <div lang={l}>
      <SiteHeader nav={false} lang={l} />
      <main>
        {/* Einstieg: dunkle Fläche mit Lichtverlauf und Porträt */}
        <section className="container-page pt-24 md:pt-28">
          <div className="group relative isolate overflow-hidden rounded-[36px] bg-nacht text-white">
            <Licht stil="lichter" i={0} />
            <div className="relative z-10 grid min-h-[520px] md:min-h-[min(82vh,760px)] md:grid-cols-12">
              <div className="flex flex-col justify-between gap-12 p-7 md:col-span-7 md:p-12">
                <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[14px] backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-salbei" aria-hidden />{t.fuer}
                </p>
                <div>
                  <p className="text-[15px] text-white/60">{t.art} {t.von}</p>
                  <h1 className="mt-4 text-[clamp(2.1rem,5.25vw,5.075rem)] font-light leading-[0.92] tracking-[-0.05em]">{b.stelle}.</h1>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <a href={`mailto:${KONTAKT.email}?subject=${encodeURIComponent(`${b.stelle} – ${b.firma}`)}`} className="group/cta inline-flex h-12 items-center gap-2 rounded-full bg-white pl-5 pr-1.5 text-[15px] font-medium text-ink">
                      {t.cta}
                      <span className="grid size-9 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover/cta:rotate-45"><ArrowUpRight className="size-4" aria-hidden /></span>
                    </a>
                    <a href="#brief" className="inline-flex h-12 items-center rounded-full border border-white/25 px-5 text-[15px] transition-colors hover:bg-white/10">{t.lesen}</a>
                  </div>
                </div>
              </div>
              <div className="relative hidden md:col-span-5 md:block">
                <Image src={portrait} alt={`Porträt von ${KONTAKT.name}`} priority sizes="40vw" className="absolute bottom-0 right-0 w-[min(40vw,560px)] max-w-none opacity-95 [mask-image:linear-gradient(to_right,transparent_0%,black_30%)]" />
              </div>
            </div>
          </div>
        </section>

        {/* Anschreiben */}
        <section id="brief" className="container-page scroll-mt-28 pt-28 md:pt-40">
          <Reveal className="grid gap-8 md:grid-cols-12">
            <p className="text-[14px] text-muted-foreground md:col-span-3">{t.brief}</p>
            <div className="max-w-[60ch] text-[clamp(1.15rem,1.6vw,1.375rem)] leading-[1.55] md:col-span-8 md:col-start-5 [&_p]:mb-5">
              {b.anrede && <p>{b.anrede}</p>}
              <Markdown>{b.body}</Markdown>
              <p className="mt-10">{t.gruss}</p>
              <Image src={unterschrift} alt={`Unterschrift ${KONTAKT.name}`} className="mt-3 h-auto w-[min(60vw,220px)]" />
              <p className="mt-2 text-[15px] text-muted-foreground">{KONTAKT.name}</p>
            </div>
          </Reveal>
        </section>

        {/* Stärken auf hellen Kornflächen */}
        <section className="container-page pt-28 md:pt-40" aria-labelledby="st-h">
          <SectionTitle id="st-h" titel={t.staerken} text={t.staerkenText} />
          {/* Subgrid: Nummer, Titel und Text liegen in allen Kacheln auf gleicher Höhe */}
          <Reveal>
            <ul className="grid gap-x-5 md:grid-cols-3 md:grid-rows-[minmax(7rem,1fr)_auto_auto]">
              {b.staerken.map((s, i) => (
                <li key={s.titel} className="group relative isolate flex flex-col gap-0 max-md:mb-5 md:row-span-3 md:grid md:grid-rows-subgrid overflow-hidden rounded-[28px] px-7 py-7 md:px-8 md:py-8">
                  <Flaeche i={i} />
                  <span className="relative text-[14px] text-tinte/70">0{i + 1}</span>
                  <h3 className="relative self-start text-[clamp(1rem,1.4vw,1.225rem)] leading-tight tracking-tight max-md:mt-10">{s.titel}</h3>
                  <p className="relative pt-3 text-[15px] leading-relaxed text-foreground/75">{s.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Beobachtungen auf dunklen Lichtflächen */}
        {n > 0 && (
          <section className="container-page pt-28 md:pt-40" aria-labelledby="bo-h">
            <SectionTitle id="bo-h" titel={t.beob} text={t.beobText} />
            <Reveal>
              <ul className="grid gap-x-5 md:grid-cols-2 md:grid-rows-[minmax(9rem,1fr)_auto_auto]">
                {b.beobachtungen!.map((o, i) => (
                  <li key={o.titel} className="group relative isolate flex flex-col gap-0 max-md:mb-5 md:row-span-3 md:grid md:grid-rows-subgrid overflow-hidden rounded-[28px] bg-nacht p-7 text-white md:p-10">
                    <Licht stil="lichter" i={i + 1} />
                    <span aria-hidden className="max-md:h-24" />
                    <h3 className="relative self-start text-[clamp(1.12rem,1.82vw,1.575rem)] font-medium leading-tight tracking-tight">{o.titel}</h3>
                    <p className="relative max-w-[48ch] pt-4 text-[16px] leading-relaxed text-white/75">{o.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        )}

        {/* Projekte */}
        <section className="container-page pt-28 md:pt-40" aria-labelledby="pj-h">
          <SectionTitle id="pj-h" titel={t.proj} text={t.projText} />
          {cases.length > 0 && <CaseCards projekte={cases} lang={l} stil="sonne" />}
          {weitere.length > 0 && (
            <div className="mt-16">
              {cases.length > 0 && <h3 className="mb-5 text-xl">{t.weitere}</h3>}
              {/* Vorübergehend: drei Varianten zur Auswahl */}
              {([['raster', 'Variante A: Raster', 'Karten mit Firma, Titel und Kurzbeschrieb, Details klappen in der Karte auf'], ['zeilen', 'Variante B: Zeilen', 'Klare Spalten mit Vorschau, aufgeklappt Phasen, Ergebnis und Rolle'], ['karussell', 'Variante C: Karussell', 'Dunkle Karten zum Durchblättern, alle Angaben sichtbar']] as const).map(([v, name, text]) => (
                <div key={v} className="mb-16">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-brand px-3 py-1 text-[13px] font-medium text-white">{name}</span>
                    <span className="text-[14px] text-muted-foreground">{text}</span>
                  </div>
                  <WeitereProjekte projekte={weitere} lang={l} variante={v} />
                </div>
              ))}
            </div>
          )}
          <Link href="/#projekte" className="mt-10 inline-flex items-center gap-1.5 text-[15px] font-medium underline-offset-4 hover:underline">
            {t.alle}<ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </section>

        {/* Arbeitsweise */}
        <section className="container-page pt-28 md:pt-40" aria-labelledby="aw-h">
          <SectionTitle id="aw-h" titel={t.arbeit} text={t.arbeitText} />
          <Reveal className="rounded-[32px] bg-white p-6 md:p-12">
            <DoubleDiamond texte={PHASEN_TEXT[l]} spaces={t.spaces} hint={t.hint} />
          </Reveal>
        </section>
      </main>
      <SiteFooter titel={t.foot} text={t.footText} button={t.mail} />
    </div>
  );
}
