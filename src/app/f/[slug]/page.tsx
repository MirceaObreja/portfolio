import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CaseCards, Licht } from '@/components/case-cards';
import { Einstieg } from '@/components/hero';
import { Buehne } from '@/components/buehne';
import { ListeIndex } from '@/components/projekte-listen';
import { DoubleDiamond } from '@/components/double-diamond';
import { SectionTitle } from '@/components/section-title';
import { Flaeche } from '@/components/flaeche';
import { Reveal } from '@/components/motion-bits';
import { alleBewerbungen, alleProjekte } from '@/lib/content';
import { zuKarte } from '@/lib/karten';
import { KONTAKT, PHASEN_TEXT } from '@/lib/site';
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
    ? { fuer: `Für ${b.firma}`, art: 'Bewerbung', von: `von ${KONTAKT.name} als`, brief: 'Anschreiben', gruss: 'Freundliche Grüsse', staerken: 'Was ich mitbringe.', staerkenText: `Drei Punkte aus meiner Arbeit, die zur Stelle als ${b.stelle} passen.`, beob: `${ZAHL_DE[n] || 'Beobachtungen'}.`, beobText: 'Ich habe Ihr Angebot aus Kundensicht angeschaut. Die Punkte sind als Einstieg in ein erstes Gespräch gedacht.', proj: 'Passende Projekte.', projText: 'Eine Auswahl aus meiner Arbeit bei Merkle, die zu Ihrer Stelle passt.', weitere: 'Weitere Projekte', alle: 'Alle Projekte ansehen', arbeit: 'So arbeite ich.', arbeitText: 'Ich begleite Projekte durch alle vier Phasen, von der ersten Analyse bis zur Umsetzung.', spaces: ['Problem verstehen', 'Lösung entwickeln'] as [string, string], hint: 'Fahren Sie über eine Phase oder tippen Sie darauf, um zu sehen, was ich dort mache und welche Methoden ich einsetze.', foot: 'Ich freue mich auf ein Gespräch.', footText: 'Am einfachsten erreichen Sie mich per E-Mail. Ich antworte innert eines Arbeitstages.', mail: 'E-Mail schreiben', cta: 'Gespräch vereinbaren', lesen: 'Anschreiben lesen' }
    : { fuer: `For ${b.firma}`, art: 'Application', von: `by ${KONTAKT.name} for`, brief: 'Cover letter', gruss: 'Kind regards', staerken: 'What I bring.', staerkenText: `Three reasons why I fit the role of ${b.stelle}.`, beob: 'Observations.', beobText: 'From a customer’s point of view, without knowing your internal reasons. A starting point for a first conversation.', proj: 'Relevant projects.', projText: 'A selection of my work at Merkle that matches the role.', weitere: 'More projects', alle: 'See all projects', arbeit: 'How I work.', arbeitText: 'I take projects through all four phases, from the first interview to go-live.', spaces: ['Understand the problem', 'Develop the solution'] as [string, string], hint: 'Hover over or tap a phase to see what I do there and which methods I use.', foot: 'I look forward to talking.', footText: 'The easiest way to reach me is by email. I reply within one working day.', mail: 'Write an email', cta: 'Schedule a call', lesen: 'Read the letter' };

  const gespraech = `mailto:${KONTAKT.email}?subject=${encodeURIComponent(`${b.stelle} – ${b.firma}`)}`;
  const nav: [string, string][] = [
    ['#brief', t.brief],
    ['#staerken', t.staerken.replace(/\.$/, '')],
    ...(n > 0 ? [['#beobachtungen', l === 'de' ? 'Beobachtungen' : 'Observations'] as [string, string]] : []),
    ['#projekte', l === 'de' ? 'Projekte' : 'Projects'],
    ['#arbeitsweise', l === 'de' ? 'Arbeitsweise' : 'Approach'],
  ];

  return (
    <div lang={l}>
      <SiteHeader lang={l} eigene={nav} cta={{ label: t.cta, kurz: l === 'de' ? 'Gespräch' : 'Call', href: gespraech }} />
      <main>
        {/* Einstieg: dieselbe Stage wie die Startseite */}
        <Einstieg lang={l}>
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[14px] backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-salbei" aria-hidden />{t.fuer}
          </p>
          <h1 className="mt-6 font-light md:mt-8">
            <span className="block text-[15px] text-white/65 md:text-[clamp(1rem,1.5vw,1.4rem)]">{t.art} {t.von}</span>
            <span className="mt-3 block text-[clamp(2.1rem,9vw,3.2rem)] leading-[0.98] tracking-[-0.05em] md:mt-5 md:text-[clamp(2.4rem,4.6vw,5.2rem)]">{b.stelle}.</span>
          </h1>
          <div className="mt-auto flex flex-wrap gap-2.5 md:mt-9 md:gap-3">
            <a href="#brief" className="group/cta inline-flex h-12 items-center gap-2 rounded-full bg-white pl-4 pr-1.5 text-[15px] font-medium text-ink md:pl-5">
              {t.lesen}
              <span className="grid size-9 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover/cta:translate-y-0.5"><ArrowDown className="size-4" aria-hidden /></span>
            </a>
            <a href={gespraech} className="inline-flex h-12 items-center rounded-full border border-white/30 bg-white/5 px-4 text-[15px] text-white backdrop-blur-md transition-colors hover:bg-white/15 md:px-5">{t.cta}</a>
          </div>
        </Einstieg>

        {/* Anschreiben */}
        <section id="brief" className="container-page scroll-mt-20 pt-28 md:pt-40">
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
        <section id="staerken" className="container-page scroll-mt-20 pt-28 md:pt-40" aria-labelledby="st-h">
          <SectionTitle id="st-h" titel={t.staerken} text={t.staerkenText} />
          {/* Subgrid: Nummer, Titel und Text liegen in allen Kacheln auf gleicher Höhe */}
          <Reveal>
            <ul className="grid gap-x-5 md:grid-cols-3 md:grid-rows-[minmax(7rem,1fr)_auto_auto]">
              {b.staerken.map((s, i) => (
                <li key={s.titel} className="group relative isolate flex flex-col gap-0 max-md:mb-5 md:row-span-3 md:grid md:grid-rows-subgrid overflow-clip rounded-[28px] px-7 py-7 md:px-8 md:py-8">
                  <Flaeche i={i} />
                  <span className="relative text-[28px] font-light leading-none tracking-tight text-tinte/80">0{i + 1}</span>
                  <h3 className="relative self-start text-[clamp(1rem,1.4vw,1.225rem)] leading-tight tracking-tight max-md:mt-10">{s.titel}</h3>
                  <p className="relative pt-3 text-[15px] leading-relaxed text-foreground/75">{s.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Beobachtungen auf dunklen Lichtflächen */}
        {n > 0 && (
          <section id="beobachtungen" className="container-page scroll-mt-20 pt-28 md:pt-40" aria-labelledby="bo-h">
            <SectionTitle id="bo-h" titel={t.beob} text={t.beobText} />
            <Reveal>
              <ul className="grid gap-x-5 md:grid-cols-2 md:grid-rows-[minmax(9rem,1fr)_auto_auto]">
                {b.beobachtungen!.map((o, i) => (
                  <li key={o.titel} className="group relative isolate flex flex-col gap-0 max-md:mb-5 md:row-span-3 md:grid md:grid-rows-subgrid overflow-clip rounded-[28px] bg-nacht p-7 text-white md:p-10">
                    <div aria-hidden className="absolute inset-0 opacity-55"><Licht stil="lichter" i={i + 1} /></div>
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(31,43,51,0.75)_0%,rgba(31,43,51,0.55)_60%,rgba(31,43,51,0.3)_100%)]" />
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_75%_at_100%_0%,rgba(241,239,232,0.75)_0%,rgba(199,204,194,0.45)_30%,rgba(158,170,162,0.18)_55%,rgba(31,43,51,0)_78%)] transition-transform duration-1000 group-hover:scale-110" />
                    <span aria-hidden className="max-md:h-24" />
                    <h3 className="relative self-start text-[clamp(1.12rem,1.82vw,1.575rem)] font-medium leading-tight tracking-tight">{o.titel}</h3>
                    <p className="relative max-w-[48ch] pt-4 text-[16px] leading-relaxed text-white/90">{o.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        )}

        {/* Projekte */}
        <section id="projekte" className="container-page scroll-mt-20 pt-28 md:pt-40" aria-labelledby="pj-h">
          <SectionTitle id="pj-h" titel={t.proj} text={t.projText} />
          {cases.length > 0 && <CaseCards projekte={cases} lang={l} stil="sonne" />}
          {weitere.length > 0 && (
            <div className="mt-16">
              {cases.length > 0 && <h3 className="mb-5 text-xl">{t.weitere}</h3>}
              <ListeIndex projekte={weitere} tabs={false} />
            </div>
          )}
          <Link href="/#projekte" className="mt-10 inline-flex items-center gap-1.5 text-[15px] font-medium underline-offset-4 hover:underline">
            {t.alle}<ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </section>

        {/* Arbeitsweise: dunkle Bühne wie auf der Startseite */}
        <section id="arbeitsweise" className="container-page scroll-mt-20 pt-28 md:pt-40" aria-labelledby="aw-h">
          <Reveal>
            <Buehne i={0} ruhig className="rounded-[32px] px-5 pb-8 pt-10 md:rounded-[44px] md:px-14 md:pb-14 md:pt-16">
              <div className="mb-12 grid gap-5 md:mb-16 md:grid-cols-12">
                <h2 id="aw-h" className="text-[clamp(1.75rem,4.725vw,4.41rem)] font-medium leading-[0.9] tracking-[-0.045em] md:col-span-12">{t.arbeit}</h2>
                <p className="text-[17px] leading-relaxed text-white/90 md:col-span-8">{t.arbeitText}</p>
              </div>
              <DoubleDiamond dunkel texte={PHASEN_TEXT[l]} spaces={t.spaces} hint={t.hint} />
            </Buehne>
          </Reveal>
        </section>
      </main>
      <SiteFooter titel={t.foot} text={t.footText} button={t.mail} lang={l} />
    </div>
  );
}
