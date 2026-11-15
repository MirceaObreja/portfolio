import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ZurueckLink } from '@/components/zurueck-link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { DiamondMini } from '@/components/diamond-mini';
import { Buehne } from '@/components/buehne';
import { Licht } from '@/components/licht';
import { KapitelNav } from '@/components/kapitel-nav';
import { Reveal } from '@/components/motion-bits';
import { fallstudien, zeitraum, PHASEN } from '@/lib/content';
import { PHASEN_TEXT } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return fallstudien().map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = fallstudien().find((x) => x.id === slug);
  return p ? { title: `${p.titel} – Mircea Obreja`, description: p.kurz } : {};
}

/** Zerlegt den Markdown-Text an den Zwischentiteln in Kapitel. */
function kapitelAus(body: string) {
  return body
    .split(/^## /m)
    .map((teil) => teil.trim())
    .filter(Boolean)
    .map((teil, i) => {
      const [titel, ...zeilen] = teil.split('\n');
      return { id: `kapitel-${i + 1}`, titel: titel.trim(), text: zeilen.join('\n').trim() };
    });
}

export default async function Fallstudie({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const alle = fallstudien();
  const p = alle.find((x) => x.id === slug);
  if (!p) notFound();
  const index = alle.findIndex((x) => x.id === slug);
  const andere = alle.filter((x) => x.id !== slug);
  const phasenText = PHASEN.filter((x) => p.phasen.includes(x)).map((x) => PHASEN_TEXT.de[x].name).join(', ');
  const kapitel = kapitelAus(p.body);
  const fakt = 'mb-2 text-[13px] text-white/60';

  return (
    <>
      <SiteHeader stage />
      <main>
        {/* Einstieg: dunkle Bühne wie auf der Startseite */}
        <section id="einstieg" aria-labelledby="fs-titel" className="-mt-24">
          <Buehne i={index} ruhig className="rounded-b-[32px] pt-24 md:rounded-b-[44px]">
            <div className="container-page flex min-h-[560px] flex-col pb-8 pt-6 md:min-h-[min(78svh,760px)] md:pb-12 md:pt-10">
              <ZurueckLink
                className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-2 text-[14px] text-white/85 backdrop-blur-md transition-colors hover:bg-white/15"
                bewerbung={<><ArrowLeft className="size-4" aria-hidden />Zurück zur Bewerbung</>}
              >
                <ArrowLeft className="size-4" aria-hidden />Alle Fallstudien
              </ZurueckLink>

              <div className="mt-auto grid gap-8 pt-14 md:grid-cols-12 md:items-end md:gap-6">
                <div className="md:col-span-7">
                  <p className="text-[15px] text-white/65 md:text-[clamp(1rem,1.5vw,1.4rem)]">{p.kunde}</p>
                  <h1 id="fs-titel" className="mt-3 text-[clamp(2rem,8.4vw,2.9rem)] font-light leading-[1] tracking-[-0.045em] md:mt-5 md:text-[clamp(2.3rem,4.2vw,4.6rem)]">{p.titel}</h1>
                </div>
                {p.kennzahl && (
                  <div className="rounded-[24px] border border-white/15 bg-nacht/45 p-6 backdrop-blur-md md:col-span-4 md:col-start-9 md:p-7">
                    <p className="text-[13px] text-white/60">Ergebnis</p>
                    <p className="mt-2 text-[clamp(1.15rem,1.7vw,1.5rem)] font-medium leading-snug tracking-tight">{p.kennzahl}</p>
                  </div>
                )}
              </div>

              <dl className="mt-8 grid gap-x-6 gap-y-6 border-t border-white/15 pt-6 text-[15px] sm:grid-cols-2 md:mt-12 md:grid-cols-12 md:pt-8">
                <div className="md:col-span-2"><dt className={fakt}>Zeitraum</dt><dd>{zeitraum(p)}</dd></div>
                <div className="md:col-span-3"><dt className={fakt}>Rolle</dt><dd className="text-white/90">{p.rolle}</dd></div>
                <div className="md:col-span-3">
                  <dt className={fakt}>Phasen</dt>
                  <dd className="flex items-center gap-3"><DiamondMini hell phasen={p.phasen} className="h-6 w-16" /><span className="text-white/90">{phasenText}</span></dd>
                </div>
                <div className="sm:col-span-2 md:col-span-4">
                  <dt className={fakt}>Methoden</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {p.methoden.map((m) => <span key={m} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[13px] text-white/90">{m}</span>)}
                  </dd>
                </div>
              </dl>
            </div>
          </Buehne>
        </section>

        {/* Kapitel: links das Inhaltsverzeichnis, rechts der Text */}
        <div className="container-page grid gap-10 pt-16 md:grid-cols-12 md:pt-28">
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-28"><KapitelNav kapitel={kapitel.map(({ id, titel }) => ({ id, titel }))} /></div>
          </aside>
          <article className="md:col-span-8 md:col-start-5">
            {kapitel.map((k, i) => {
              const ergebnis = i === kapitel.length - 1 && /ergebnis|result/i.test(k.titel);
              return ergebnis ? (
                <Reveal key={k.id}>
                  <section id={k.id} aria-labelledby={`${k.id}-h`} className="group relative isolate mt-6 scroll-mt-28 overflow-clip rounded-[28px] bg-nacht p-7 text-white md:mt-10 md:rounded-[36px] md:p-12">
                    <Licht stil="lichter" i={index + 1} />
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(31,43,51,0.6),rgba(31,43,51,0.3))]" />
                    <div className="relative">
                      <p className="text-[13px] tabular-nums text-white/60">0{i + 1}</p>
                      <h2 id={`${k.id}-h`} className="mt-2 text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium leading-tight tracking-[-0.03em]">{k.titel}</h2>
                      <div className="mt-6 max-w-[46ch] text-[clamp(1.15rem,1.7vw,1.5rem)] leading-snug tracking-tight text-white/95 [&_p]:mb-4 [&_p:last-child]:mb-0"><Markdown>{k.text}</Markdown></div>
                    </div>
                  </section>
                </Reveal>
              ) : (
                <section key={k.id} id={k.id} aria-labelledby={`${k.id}-h`} className="scroll-mt-28 border-b border-foreground/10 pb-12 pt-12 first:pt-0 md:pb-16 md:pt-16">
                  <p className="text-[13px] tabular-nums text-muted-foreground">0{i + 1}</p>
                  <h2 id={`${k.id}-h`} className="mt-2 text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium leading-tight tracking-[-0.03em]">{k.titel}</h2>
                  <div className="mt-6 max-w-[62ch] text-[18px] leading-[1.7] text-foreground/85 [&_p]:mb-4 [&_p:last-child]:mb-0"><Markdown>{k.text}</Markdown></div>
                </section>
              );
            })}
          </article>
        </div>

        {/* Weitere Fallstudien */}
        <nav aria-labelledby="weitere-h" className="container-page pt-24 md:pt-36">
          <h2 id="weitere-h" className="mb-8 text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium leading-tight tracking-[-0.03em] md:mb-10">Weitere Fallstudien</h2>
          <ul className="grid gap-5 md:grid-cols-2">
            {andere.map((a, i) => (
              <li key={a.id}>
                <Link href={`/projekte/${a.id}`} className="group relative isolate flex min-h-[260px] flex-col justify-between gap-10 overflow-clip rounded-[28px] bg-nacht p-7 text-white md:min-h-[320px] md:rounded-[36px] md:p-10">
                  <Licht stil="lichter" i={index + i + 2} />
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(31,43,51,0.6),rgba(31,43,51,0.3))]" />
                  <span className="relative flex items-start justify-between gap-4">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[14px] backdrop-blur-md">{a.kunde}</span>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight className="size-5" aria-hidden /></span>
                  </span>
                  <span className="relative">
                    <span className="block max-w-[22ch] text-[clamp(1.3rem,2.1vw,1.9rem)] font-medium leading-tight tracking-[-0.03em]">{a.titel}</span>
                    {a.kennzahl && <span className="mt-3 block max-w-[40ch] text-[15px] leading-relaxed text-white/80">{a.kennzahl}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
