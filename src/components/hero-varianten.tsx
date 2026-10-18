import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Counter } from '@/components/counter';
import { Licht } from '@/components/case-cards';
import { KONTAKT } from '@/lib/site';
import portrait from '../../public/images/fotos/portrait-bw.png';

const ZAHLEN: { wert?: number; suffix?: string; zeichen?: string; label: string }[] = [
  { wert: 4, suffix: '+', label: 'Jahre bei Merkle' },
  { wert: 14, suffix: '+', label: 'Firmen begleitet' },
  { zeichen: '∞', label: 'Post-its geklebt' },
];

const NAME = 'block whitespace-nowrap font-light leading-[0.86] tracking-[-0.06em]';

function Zahlen({ glas = false }: { glas?: boolean }) {
  return (
    <dl className="flex flex-wrap gap-3">
      {ZAHLEN.map((z) => (
        <div key={z.label} className={glas ? 'rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md' : ''}>
          <dt className="sr-only">{z.label}</dt>
          <dd className="text-[clamp(1.25rem,1.9vw,1.6rem)] font-medium leading-none tracking-tight">{z.zeichen ?? <Counter to={z.wert ?? 0} suffix={z.suffix} />}</dd>
          <p aria-hidden className="mt-1.5 max-w-[12ch] text-[12px] leading-snug text-white/60">{z.label}</p>
        </div>
      ))}
    </dl>
  );
}

function Buttons({ dunkel = false }: { dunkel?: boolean }) {
  return (
    <div className="flex flex-wrap gap-3">
      <a href="#kontakt" className={`group/cta inline-flex h-12 items-center gap-2 rounded-full pl-5 pr-1.5 text-[15px] font-medium ${dunkel ? 'bg-ink text-white' : 'bg-white text-ink'}`}>
        Kontaktiere mich
        <span className={`grid size-9 place-items-center rounded-full transition-transform duration-300 group-hover/cta:rotate-45 ${dunkel ? 'bg-white text-ink' : 'bg-ink text-white'}`}><ArrowUpRight className="size-4" aria-hidden /></span>
      </a>
      <a href="#fallstudien" className={`inline-flex h-12 items-center rounded-full border px-5 text-[15px] transition-colors ${dunkel ? 'border-nacht/25 text-nacht hover:bg-nacht/5' : 'border-white/25 text-white hover:bg-white/10'}`}>Fallstudien ansehen</a>
    </div>
  );
}

// Blendet die geraden Bildkanten des Porträts unten und seitlich weich aus
const KANTEN = '[mask-image:linear-gradient(to_top,transparent_0%,black_22%),linear-gradient(to_right,transparent_0%,black_14%,black_86%,transparent_100%)] [mask-composite:intersect]';

const SUB = 'Service Design und UX-Strategie. Ich mache digitale Strecken von Anfang bis Ende einfacher, mit Research statt Bauchgefühl.';

/** Variante A: Dunkle Fläche mit zwei Lichtern, Porträt rechts, wie auf der Bewerbungsseite. */
export function HeroPanel() {
  return (
    <section className="container-page pt-24 md:pt-28" aria-label="Einstieg">
      <div className="group relative isolate overflow-hidden rounded-[36px] bg-nacht text-white">
        <Licht stil="lichter" i={0} />
        <div className="relative z-10 grid min-h-[560px] md:min-h-[min(84vh,780px)] md:grid-cols-12">
          <div className="flex flex-col justify-between gap-12 p-7 md:col-span-7 md:p-12">
            <Zahlen glas />
            <div>
              <p className="text-[15px] text-white/60">Hallo, ich bin</p>
              <h1 className="mt-3">
                <span className={`${NAME} text-[clamp(3.25rem,8vw,8.5rem)]`}>Mircea</span>
                <span className={`${NAME} text-[clamp(3.25rem,8vw,8.5rem)]`}>Obreja</span>
              </h1>
              <p className="mt-6 max-w-[38ch] text-[17px] leading-relaxed text-white/70">{SUB}</p>
              <div className="mt-8"><Buttons /></div>
            </div>
          </div>
          <div className="relative hidden md:col-span-5 md:block">
            <Image src={portrait} alt={`Porträt von ${KONTAKT.name}`} priority sizes="40vw" className="absolute bottom-0 right-0 w-[min(40vw,600px)] max-w-none [mask-image:linear-gradient(to_right,transparent_0%,black_30%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Variante B: Randlos über die ganze Breite, heller Horizont unten, Name hinter dem Porträt. */
export function HeroVollbild() {
  return (
    <section className="group relative isolate -mt-24 overflow-hidden bg-nacht pt-24 text-white" aria-label="Einstieg">
      <Licht stil="horizont" i={0} />
      <div className="container-page relative flex min-h-[620px] flex-col md:min-h-[min(96vh,920px)]">
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-6 pt-10 md:pt-14">
          <p className="text-[15px] text-white/60">Hallo, ich bin</p>
          <Zahlen glas />
        </div>
        <h1 className="pointer-events-none absolute inset-x-0 top-[24%] z-0 text-center">
          <span className={`${NAME} text-[clamp(4rem,15vw,17rem)] text-white/90`}>Mircea Obreja</span>
        </h1>
        <Image src={portrait} alt={`Porträt von ${KONTAKT.name}`} priority sizes="60vw" className={`absolute bottom-0 left-1/2 z-10 w-[min(92vw,580px)] max-w-none -translate-x-1/2 ${KANTEN}`} />
        <div className="relative z-20 mt-auto grid gap-6 pb-10 md:grid-cols-12 md:pb-14">
          <p className="max-w-[28ch] text-[17px] leading-relaxed text-nacht md:col-span-3">{SUB}</p>
          <div className="md:col-span-3 md:col-start-10 md:flex md:items-end md:justify-end"><Buttons dunkel /></div>
        </div>
      </div>
    </section>
  );
}

/** Variante C: Name auf hellem Grund, rechts eine dunkle Karte mit aufsteigender Lichtkugel und Porträt. */
export function HeroKarte() {
  return (
    <section className="container-page pt-24 md:pt-28" aria-label="Einstieg">
      <div className="grid gap-5 md:min-h-[min(84vh,780px)] md:grid-cols-12">
        <div className="flex flex-col justify-between gap-12 py-4 md:col-span-6 md:py-8">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-nebel px-3.5 py-1.5 text-[14px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-eukalyptus" aria-hidden />Service Design seit 2022
          </p>
          <div>
            <p className="text-[15px] text-muted-foreground">Hallo, ich bin</p>
            <h1 className="mt-3">
              <span className={`${NAME} text-[clamp(3.25rem,8vw,8.5rem)]`}>Mircea</span>
              <span className={`${NAME} text-[clamp(3.25rem,8vw,8.5rem)]`}>Obreja</span>
            </h1>
            <p className="mt-6 max-w-[36ch] text-[17px] leading-relaxed text-foreground/75">{SUB}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#kontakt" className="group/cta inline-flex h-12 items-center gap-2 rounded-full bg-ink pl-5 pr-1.5 text-[15px] font-medium text-white">
                Kontaktiere mich
                <span className="grid size-9 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover/cta:rotate-45"><ArrowUpRight className="size-4" aria-hidden /></span>
              </a>
              <a href="#fallstudien" className="inline-flex h-12 items-center rounded-full border border-foreground/20 px-5 text-[15px] transition-colors hover:bg-foreground/5">Fallstudien ansehen</a>
            </div>
          </div>
        </div>
        <div className="group relative isolate min-h-[520px] overflow-hidden rounded-[36px] bg-nacht text-white md:col-span-6">
          <Licht stil="lichter" i={2} />
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-[52%] aspect-square w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[30px] transition-transform duration-1000 group-hover:scale-110" style={{ background: 'radial-gradient(circle, #c7ccc2 0%, rgba(158,170,162,0.7) 30%, rgba(117,138,135,0.35) 55%, rgba(31,43,51,0) 72%)' }} />
          <Image src={portrait} alt={`Porträt von ${KONTAKT.name}`} priority sizes="45vw" className={`absolute bottom-0 left-1/2 w-[min(92%,560px)] max-w-none -translate-x-1/2 ${KANTEN}`} />
          <div className="absolute left-6 top-6 z-10 md:left-8 md:top-8"><Zahlen glas /></div>
        </div>
      </div>
    </section>
  );
}
