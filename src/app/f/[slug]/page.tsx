import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CaseCards } from '@/components/case-cards';
import { ProjectExplorer } from '@/components/project-explorer';
import { DoubleDiamond } from '@/components/double-diamond';
import { alleBewerbungen, alleProjekte } from '@/lib/content';
import { zuKarte } from '@/lib/karten';
import { KONTAKT, PHASEN_TEXT } from '@/lib/site';

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

const ZAHL = ['', 'Eine Beobachtung', 'Zwei Beobachtungen', 'Drei Beobachtungen', 'Vier Beobachtungen'];

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
    ? { fuer: `Für ${b.firma}`, h1: `Bewerbung als ${b.stelle}`, gruss: 'Freundliche Grüsse', staerken: 'Was ich mitbringe', beob: `${ZAHL[n] || 'Beobachtungen'} zu Ihrem Angebot`, beobText: 'Aus Sicht eines Kunden und ohne Kenntnis Ihrer internen Gründe. Als Ausgangspunkt für ein erstes Gespräch.', proj: 'Passende Projekte', weitere: 'Weitere Projekte', alle: 'Alle Projekte ansehen', arbeit: 'So arbeite ich', spaces: ['Problem verstehen', 'Lösung entwickeln'] as [string, string], hint: 'Fahren Sie über eine Phase oder tippen Sie darauf, um zu sehen, was ich dort mache und welche Methoden ich einsetze.', foot: 'Ich freue mich auf ein Gespräch.' }
    : { fuer: `For ${b.firma}`, h1: `Application for ${b.stelle}`, gruss: 'Kind regards', staerken: 'What I bring', beob: 'Observations on your product', beobText: 'From a customer’s point of view, without knowing your internal reasons. A starting point for a first conversation.', proj: 'Relevant projects', weitere: 'More projects', alle: 'See all projects', arbeit: 'How I work', spaces: ['Understand the problem', 'Develop the solution'] as [string, string], hint: 'Hover over or tap a phase to see what I do there and which methods I use.', foot: 'I look forward to talking.' };

  return (
    <div lang={l}>
      <SiteHeader nav={false} lang={l} />
      <main>
        <section className="container-page pt-14 md:pt-24">
          <p className="mb-6 inline-flex rounded-full bg-brand-soft px-3 py-1 text-[15px] font-medium text-brand">{t.fuer}</p>
          <h1 className="max-w-[16ch] text-[clamp(2.75rem,7vw,5.75rem)] tracking-[-0.045em]">{t.h1}</h1>
          <div className="mt-12 grid md:grid-cols-12">
            <div className="max-w-[62ch] text-lg md:col-span-7 md:col-start-6 [&_p]:mb-4">
              {b.anrede && <p>{b.anrede}</p>}
              <Markdown>{b.body}</Markdown>
              <p className="mt-8">{t.gruss}<br /><span className="font-medium">{KONTAKT.name}</span></p>
            </div>
          </div>
        </section>

        <section className="container-page pt-24 md:pt-32" aria-labelledby="st-h">
          <h2 id="st-h" className="mb-8 text-[clamp(2rem,3.6vw,3rem)]">{t.staerken}</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {b.staerken.map((s) => (
              <li key={s.titel} className="grid content-start gap-3 rounded-[28px] bg-card p-6 md:p-8">
                <h3 className="text-xl tracking-tight">{s.titel}</h3>
                <p className="text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {n > 0 && (
          <section className="container-page pt-24 md:pt-32" aria-labelledby="bo-h">
            <div className="mb-8 grid gap-3 md:grid-cols-12">
              <h2 id="bo-h" className="text-[clamp(2rem,3.6vw,3rem)] md:col-span-6">{t.beob}</h2>
              <p className="text-muted-foreground md:col-span-6 md:pt-3">{t.beobText}</p>
            </div>
            <ul className="grid gap-5 md:grid-cols-2">
              {b.beobachtungen!.map((o) => (
                <li key={o.titel} className="grid content-start gap-2 rounded-[28px] bg-card p-6 md:p-8">
                  <h3 className="text-xl tracking-tight">{o.titel}</h3>
                  <p className="text-muted-foreground">{o.text}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="container-page pt-24 md:pt-32" aria-labelledby="pj-h">
          <h2 id="pj-h" className="mb-8 text-[clamp(2rem,3.6vw,3rem)]">{t.proj}</h2>
          {cases.length > 0 && <CaseCards projekte={cases} lang={l} />}
          {weitere.length > 0 && (
            <div className="mt-14">
              {cases.length > 0 && <h3 className="mb-4 text-xl">{t.weitere}</h3>}
              <ProjectExplorer projekte={weitere} filter={false} lang={l} />
            </div>
          )}
          <Link href="/#projekte" className="mt-8 inline-block font-medium text-brand underline-offset-4 hover:underline">{t.alle}</Link>
        </section>

        <section className="container-page pt-24 md:pt-32" aria-labelledby="aw-h">
          <div className="rounded-[28px] bg-card p-6 md:p-10">
            <h2 id="aw-h" className="mb-8 text-xl tracking-tight">{t.arbeit}</h2>
            <DoubleDiamond texte={PHASEN_TEXT[l]} spaces={t.spaces} hint={t.hint} />
          </div>
        </section>
      </main>
      <SiteFooter titel={t.foot} />
    </div>
  );
}
