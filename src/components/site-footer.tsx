import { ArrowUpRight, Mail } from 'lucide-react';
import { KONTAKT } from '@/lib/site';
import { Button } from '@/components/ui/button';
import { Aurora } from '@/components/aurora';

export function SiteFooter({ titel = 'Lass uns sprechen.' }: { titel?: string }) {
  return (
    <footer id="kontakt" className="container-page mt-32 pb-10">
      <div className="relative isolate overflow-hidden rounded-[32px] px-6 py-20 md:py-28">
        <Aurora />
        <div className="glass mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-[28px] px-6 py-12 text-center md:px-12">
          <h2 className="text-[clamp(2.5rem,6vw,4.5rem)]">{titel}</h2>
          <p className="select-all text-xl text-foreground/70">{KONTAKT.email}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-brand text-white hover:bg-brand/90">
              <a href={`mailto:${KONTAKT.email}`}><Mail aria-hidden />E-Mail schreiben</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/80 bg-white/60">
              <a href={KONTAKT.linkedin} rel="me noopener" target="_blank">LinkedIn<ArrowUpRight aria-hidden /></a>
            </Button>
          </div>
        </div>
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">{KONTAKT.name}, {new Date().getFullYear()}</p>
    </footer>
  );
}
