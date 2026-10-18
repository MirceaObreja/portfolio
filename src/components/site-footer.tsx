import { ArrowUpRight, Mail } from 'lucide-react';
import { KONTAKT } from '@/lib/site';
import { Button } from '@/components/ui/button';

export function SiteFooter({ titel = 'Lass uns sprechen.' }: { titel?: string }) {
  return (
    <footer id="kontakt" className="container-page mt-32 pb-10">
      <div className="flex flex-col items-center gap-6 rounded-[28px] bg-card px-6 py-16 text-center md:py-24">
        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)]">{titel}</h2>
        <p className="select-all text-xl text-muted-foreground">{KONTAKT.email}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-brand text-white hover:bg-brand/90">
            <a href={`mailto:${KONTAKT.email}`}><Mail aria-hidden />E-Mail schreiben</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={KONTAKT.linkedin} rel="me noopener" target="_blank">LinkedIn<ArrowUpRight aria-hidden /></a>
          </Button>
        </div>
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">{KONTAKT.name}, {new Date().getFullYear()}</p>
    </footer>
  );
}
