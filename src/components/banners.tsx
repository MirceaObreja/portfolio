import { Building, Building2, Car, CreditCard, Factory, HeartPulse, Landmark, Network, type LucideIcon } from 'lucide-react';

const EINTRAEGE: { name: string; icon: LucideIcon }[] = [
  { name: 'Siemens', icon: Factory },
  { name: 'ADAC', icon: Car },
  { name: 'Bank Cler', icon: Landmark },
  { name: 'Retailbanking', icon: Building2 },
  { name: 'Privatkredite', icon: CreditCard },
  { name: 'Öffentliche Verwaltung', icon: Building },
  { name: 'Gesundheitswesen', icon: HeartPulse },
  { name: 'B2B-Plattformen', icon: Network },
];
const METHODEN = ['Usability-Tests', 'Interviews', 'Customer Journeys', 'Wireframes', 'Prototypen', 'Workshops', 'Web Analytics', 'Hypothesen'];

function Raute({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 24" className={className} aria-hidden>
      <path d="M1 12 L16 1 L31 12 L16 23Z M33 12 L48 1 L63 12 L48 23Z" fill="currentColor" />
    </svg>
  );
}

/** A: Zwei grosse Laufzeilen in Gegenrichtung, oben Kunden, unten Methoden als Kontur. */
export function BannerA() {
  const kunden = EINTRAEGE.map((e) => e.name);
  return (
    <div aria-label="Kunden, Branchen und Methoden" className="overflow-hidden border-y border-foreground/10 bg-card py-8">
      <div className="flex">
        <ul className="marquee-track marquee-slow flex w-max items-center gap-10 whitespace-nowrap text-[clamp(2.25rem,5vw,4.5rem)] font-light leading-none tracking-[-0.04em]">
          {[...kunden, ...kunden].map((t, i) => (
            <li key={i} aria-hidden={i >= kunden.length} className="flex items-center gap-10">{t}<Raute className="h-3 w-8 text-foreground/25" /></li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex">
        <ul className="marquee-track marquee-reverse marquee-slow flex w-max items-center gap-10 whitespace-nowrap text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_#161616]">
          {[...METHODEN, ...METHODEN].map((t, i) => (
            <li key={i} aria-hidden={i >= METHODEN.length} className="flex items-center gap-10">{t}<span className="size-2 rounded-full bg-foreground/25" /></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** B: Zwei gekreuzte Bänder wie Klebestreifen, schwarz und weiss. */
export function BannerB() {
  const kunden = EINTRAEGE.map((e) => e.name);
  return (
    <div aria-label="Kunden und Methoden" className="relative h-[200px] overflow-hidden md:h-[260px]">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[2.5deg] border-y border-foreground/15 bg-card py-4">
        <ul className="marquee-track marquee-reverse flex w-max items-center gap-8 whitespace-nowrap text-[clamp(1.25rem,2.4vw,2rem)] font-medium tracking-tight text-foreground/60">
          {[...METHODEN, ...METHODEN, ...METHODEN].map((t, i) => (
            <li key={i} aria-hidden className="flex items-center gap-8">{t}<span className="size-1.5 rounded-full bg-foreground/30" /></li>
          ))}
        </ul>
      </div>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 -rotate-[3deg] bg-ink py-5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]">
        <ul className="marquee-track flex w-max items-center gap-8 whitespace-nowrap text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-tight text-white">
          {[...kunden, ...kunden, ...kunden].map((t, i) => (
            <li key={i} aria-hidden={i >= kunden.length} className="flex items-center gap-8">{t}<Raute className="h-2.5 w-7 text-white/40" /></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** C: Kunden und Branchen als Etiketten mit Symbol, hält beim Darüberfahren an. */
export function BannerC() {
  const reihe = [...EINTRAEGE, ...EINTRAEGE];
  return (
    <div aria-label="Kunden und Branchen" className="pause-on-hover overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <ul className="marquee-track flex w-max gap-3">
        {reihe.map((e, i) => {
          const Icon = e.icon;
          return (
            <li key={i} aria-hidden={i >= EINTRAEGE.length} className="flex items-center gap-3 whitespace-nowrap rounded-full border border-foreground/10 bg-card py-2 pl-2 pr-5 text-[17px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-transform hover:-translate-y-0.5">
              <span className="grid size-10 place-items-center rounded-full bg-ink text-white"><Icon className="size-[18px]" aria-hidden /></span>
              {e.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
