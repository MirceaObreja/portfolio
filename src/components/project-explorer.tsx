'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { DiamondMini } from '@/components/diamond-mini';
import { cn } from '@/lib/utils';

export type ProjektKarte = {
  id: string;
  titel: string;
  kunde: string;
  zeitraum: string;
  rolle: string;
  kurz: string;
  ergebnis?: string;
  tags: string[];
  phasen: string[];
  fallstudie: boolean;
};

const PHASEN = ['discover', 'define', 'develop', 'deliver'];
const name = (p: string) => p[0].toUpperCase() + p.slice(1);

export function ProjectExplorer({ projekte, filter = true, lang = 'de' }: { projekte: ProjektKarte[]; filter?: boolean; lang?: 'de' | 'en' }) {
  const [aktiv, setAktiv] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const liste = aktiv ? projekte.filter((p) => p.phasen.includes(aktiv)) : projekte;
  const t = lang === 'de'
    ? { alle: 'Alle', status: aktiv ? `${liste.length} von ${projekte.length} Projekten mit ${name(aktiv)}` : `${projekte.length} Projekte`, rolle: 'Rolle', ergebnis: 'Ergebnis', mehr: 'Fallstudie lesen' }
    : { alle: 'All', status: aktiv ? `${liste.length} of ${projekte.length} projects with ${name(aktiv)}` : `${projekte.length} projects`, rolle: 'Role', ergebnis: 'Result', mehr: 'Read case study' };

  return (
    <div>
      {filter && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div role="group" aria-label="Nach Phase filtern" className="flex flex-wrap gap-2">
            {[null, ...PHASEN].map((p) => {
              const on = aktiv === p;
              return (
                <button
                  key={p ?? 'alle'}
                  type="button"
                  aria-pressed={on}
                  aria-controls="projektliste"
                  onClick={() => setAktiv(p)}
                  className={cn(
                    'inline-flex h-9 items-center gap-2 rounded-full border px-4 text-[15px] transition-colors',
                    on ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:border-foreground/30',
                  )}
                >
                  {p && <DiamondMini phasen={[p]} className={cn('h-3 w-8', on && '[&_.fill-brand]:fill-primary-foreground [&_.fill-brand]:stroke-primary-foreground')} />}
                  {p ? name(p) : t.alle}
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="text-sm text-muted-foreground">{t.status}</p>
        </div>
      )}

      <Accordion type="single" collapsible id="projektliste" className="border-t border-foreground">
        <AnimatePresence initial={false} mode="popLayout">
          {liste.map((p) => (
            <motion.div
              key={p.id}
              data-phasen={p.phasen.join(' ')}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <AccordionItem value={p.id}>
                <AccordionTrigger className="hover:[&_.titel]:text-brand">
                  <span className="grid flex-1 items-center gap-x-6 gap-y-1 md:grid-cols-[11rem_1fr_auto]">
                    <span className="text-sm text-muted-foreground tabular-nums">{p.zeitraum}</span>
                    <span className="grid gap-0.5">
                      <span className="titel text-[17px] font-medium leading-snug transition-colors">{p.titel}</span>
                      <span className="text-[15px] text-muted-foreground">{p.kunde}</span>
                    </span>
                    <DiamondMini phasen={p.phasen} className="hidden md:block" />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="grid gap-3 md:pl-[calc(11rem+1.5rem)]">
                  <p className="max-w-[64ch]">{p.kurz}</p>
                  {p.ergebnis && <p className="max-w-[64ch]"><span className="font-medium">{t.ergebnis}:</span> {p.ergebnis}</p>}
                  <p className="max-w-[64ch] text-muted-foreground"><span className="font-medium text-foreground">{t.rolle}:</span> {p.rolle}</p>
                  <div className="flex items-center gap-3 md:hidden"><DiamondMini phasen={p.phasen} /></div>
                  <div className="mt-1 flex flex-wrap gap-1.5">{p.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
                  {p.fallstudie && <Link href={`/projekte/${p.id}`} className="mt-2 w-fit font-medium text-brand underline-offset-4 hover:underline">{t.mehr}</Link>}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </Accordion>
    </div>
  );
}
