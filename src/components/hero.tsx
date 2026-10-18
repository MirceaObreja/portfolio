import Image from 'next/image';
import { Counter } from '@/components/counter';
import portrait from '../../public/images/fotos/portrait-bw.png';

const ZAHLEN: { wert?: number; suffix?: string; zeichen?: string; label: string }[] = [
  { wert: 4, suffix: '+', label: 'Jahre bei Merkle' },
  { wert: 14, suffix: '+', label: 'Firmen begleitet' },
  { zeichen: '∞', label: 'Post-its geklebt' },
];

export function Hero() {
  return (
    <section className="relative -mt-24 overflow-hidden pt-24" aria-labelledby="hero-h">
      <div className="container-page relative grid min-h-[min(92vh,880px)] grid-cols-1 md:grid-cols-12">
        {/* Seitenbeschriftung, nur Desktop */}
        <div aria-hidden className="absolute left-0 top-28 hidden h-[60%] flex-col items-center gap-4 text-[13px] text-muted-foreground lg:flex">
          <span className="[writing-mode:vertical-rl] rotate-180">Service Design</span>
          <span className="w-px flex-1 bg-foreground/20" />
          <span className="[writing-mode:vertical-rl] rotate-180">seit 2022</span>
        </div>

        <div className="relative z-10 flex flex-col pt-10 md:col-span-7 md:pt-16 lg:pl-14">
          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            {ZAHLEN.map((z) => (
              <div key={z.label}>
                <dt className="sr-only">{z.label}</dt>
                <dd className="text-[clamp(1.4rem,2.38vw,1.925rem)] font-medium leading-none tracking-tight">{z.zeichen ?? <Counter to={z.wert ?? 0} suffix={z.suffix} />}</dd>
                <p aria-hidden className="mt-2 max-w-[12ch] text-[13px] leading-snug text-muted-foreground">{z.label}</p>
              </div>
            ))}
          </dl>

          <h1 id="hero-h" className="mt-auto pt-16">
            <span className="block text-[17px] font-medium text-muted-foreground"><span className="word" style={{ animationDelay: '80ms' }}>Hallo, ich bin</span></span>
            <span className="block whitespace-nowrap text-[clamp(3.675rem,9.1vw,9.45rem)] font-light leading-[0.86] tracking-[-0.06em]"><span className="word" style={{ animationDelay: '160ms' }}>Mircea</span></span>
            <span className="block whitespace-nowrap text-[clamp(3.675rem,9.1vw,9.45rem)] font-light leading-[0.86] tracking-[-0.06em]"><span className="word" style={{ animationDelay: '260ms' }}>Obreja</span></span>
          </h1>
          <div className="mt-8 pb-10 md:pb-14">
            <p className="max-w-[34ch] text-[17px] leading-relaxed text-foreground/75">
              <span className="text-foreground">— Service Design und UX-Strategie.</span> Ich mache digitale Strecken von Anfang bis Ende einfacher, mit Research statt Bauchgefühl.
            </p>
          </div>
        </div>

        <div className="relative md:col-span-5">
          <Image
            src={portrait}
            alt="Porträt von Mircea Obreja"
            priority
            sizes="(min-width: 768px) 45vw, 90vw"
            className="relative bottom-0 mx-auto w-[min(88vw,420px)] md:absolute md:right-0 md:w-[min(46vw,620px)] md:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
