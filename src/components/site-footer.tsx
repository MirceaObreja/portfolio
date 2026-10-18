import { ArrowUpRight, Mail } from 'lucide-react';
import { KONTAKT } from '@/lib/site';
import { Button } from '@/components/ui/button';

export function SiteFooter({ titel = 'Lass uns sprechen.' }: { titel?: string }) {
  return (
    <footer id="kontakt" className="mt-28 border-t border-border bg-card">
      <div className="container-page grid gap-10 py-16 md:grid-cols-12 md:py-24">
        <h2 className="text-[clamp(2.5rem,6vw,4.75rem)] font-medium md:col-span-7">{titel}</h2>
        <div className="flex flex-col gap-4 md:col-span-5 md:items-start md:justify-end">
          <p className="select-all text-xl font-medium">{KONTAKT.email}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={`mailto:${KONTAKT.email}`}><Mail aria-hidden />E-Mail schreiben</a>
            </Button>
            <Button asChild variant="outline">
              <a href={KONTAKT.linkedin} rel="me noopener" target="_blank">LinkedIn<ArrowUpRight aria-hidden /></a>
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground md:col-span-12">{KONTAKT.name}, {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
