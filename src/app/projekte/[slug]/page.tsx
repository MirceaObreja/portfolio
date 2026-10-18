import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { DiamondMini } from '@/components/diamond-mini';
import { Badge } from '@/components/ui/badge';
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

export default async function Fallstudie({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const alle = fallstudien();
  const p = alle.find((x) => x.id === slug);
  if (!p) notFound();
  const andere = alle.filter((x) => x.id !== slug);
  const phasenText = PHASEN.filter((x) => p.phasen.includes(x)).map((x) => PHASEN_TEXT.de[x].name).join(', ');

  return (
    <>
      <SiteHeader />
      <main className="container-page">
        <Link href="/#fallstudien" className="mt-8 inline-flex items-center gap-2 text-[15px] text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden />Alle Fallstudien
        </Link>
        <header className="border-b border-foreground pb-12 pt-10 md:pb-16 md:pt-16">
          <p className="mb-5 font-medium text-muted-foreground">{p.kunde}</p>
          <h1 className="max-w-[20ch] text-[clamp(1.575rem,3.78vw,3.15rem)] tracking-[-0.04em]">{p.titel}</h1>
          {p.kennzahl && <p className="mt-8 text-[clamp(1rem,1.82vw,1.4rem)] font-medium tracking-tight text-brand">{p.kennzahl}</p>}
        </header>
        <div className="grid gap-10 pt-10 md:grid-cols-12 md:pt-14">
          <aside className="md:col-span-4">
            <dl className="grid gap-6 md:sticky md:top-24">
              <div><dt className="mb-1 text-sm text-muted-foreground">Zeitraum</dt><dd>{zeitraum(p)}</dd></div>
              <div><dt className="mb-1 text-sm text-muted-foreground">Rolle</dt><dd>{p.rolle}</dd></div>
              <div><dt className="mb-2 text-sm text-muted-foreground">Phasen</dt><dd className="grid gap-2"><DiamondMini phasen={p.phasen} className="h-8 w-[86px]" /><span>{phasenText}</span></dd></div>
              <div><dt className="mb-2 text-sm text-muted-foreground">Methoden</dt><dd className="flex flex-wrap gap-1.5">{p.methoden.map((m) => <Badge key={m}>{m}</Badge>)}</dd></div>
            </dl>
          </aside>
          <article className="max-w-[66ch] text-[18px] leading-[1.7] md:col-span-8 [&_h2]:mb-3 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-medium [&_h2:first-child]:mt-0 [&_p]:mb-4">
            <Markdown>{p.body}</Markdown>
          </article>
        </div>
        <nav aria-label="Weitere Fallstudien" className="mt-24 border-t border-foreground pt-8">
          <h2 className="mb-6 text-xl">Weitere Fallstudien</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {andere.map((a) => (
              <li key={a.id}>
                <Link href={`/projekte/${a.id}`} className="group grid h-full gap-2 rounded-[28px] bg-card p-6 transition-colors hover:border-foreground/25">
                  <span className="text-[15px] text-muted-foreground">{a.kunde}</span>
                  <span className="text-xl font-medium tracking-tight group-hover:text-brand">{a.titel}</span>
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
