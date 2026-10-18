import { Building, Building2, Car, CreditCard, Factory, FlaskConical, HeartPulse, Landmark, LayoutTemplate, MessagesSquare, MousePointerClick, Network, Route, Users, type LucideIcon } from 'lucide-react';

type Eintrag = { name: string; icon: LucideIcon };

const KUNDEN: Eintrag[] = [
  { name: 'Siemens', icon: Factory },
  { name: 'ADAC', icon: Car },
  { name: 'Bank Cler', icon: Landmark },
  { name: 'Retailbanking', icon: Building2 },
  { name: 'Privatkredite', icon: CreditCard },
  { name: 'Öffentliche Verwaltung', icon: Building },
  { name: 'Gesundheitswesen', icon: HeartPulse },
  { name: 'B2B-Plattformen', icon: Network },
];
const METHODEN: Eintrag[] = [
  { name: 'Usability-Tests', icon: MousePointerClick },
  { name: 'Interviews', icon: MessagesSquare },
  { name: 'Customer Journeys', icon: Route },
  { name: 'Wireframes', icon: LayoutTemplate },
  { name: 'Workshops', icon: Users },
  { name: 'Hypothesen', icon: FlaskConical },
];

function Reihe({ eintraege, reverse = false, dunkel = false }: { eintraege: Eintrag[]; reverse?: boolean; dunkel?: boolean }) {
  const reihe = [...eintraege, ...eintraege, ...eintraege];
  return (
    <ul className={`marquee-track marquee-slow flex w-max gap-3 ${reverse ? 'marquee-reverse' : ''}`}>
      {reihe.map((e, i) => {
        const Icon = e.icon;
        return (
          <li
            key={i}
            aria-hidden={i >= eintraege.length}
            className={
              dunkel
                ? 'group flex items-center gap-3 whitespace-nowrap rounded-2xl bg-ink py-3 pl-3 pr-6 text-[17px] font-medium text-white transition-transform duration-300 hover:-translate-y-1'
                : 'group flex items-center gap-3 whitespace-nowrap rounded-2xl border border-black/[0.06] bg-white/80 py-3 pl-3 pr-6 text-[17px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_30px_-18px_rgba(0,0,0,0.25)] backdrop-blur transition-transform duration-300 hover:-translate-y-1'
            }
          >
            <span className={dunkel ? 'grid size-9 place-items-center rounded-xl bg-white/10' : 'grid size-9 place-items-center rounded-xl bg-[#f0f0f0] transition-colors duration-300 group-hover:bg-ink group-hover:text-white'}>
              <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
            </span>
            {e.name}
          </li>
        );
      })}
    </ul>
  );
}

/** Zwei gegenläufige Reihen: oben Kunden und Branchen, unten Methoden. Halten beim Darüberfahren an. */
export function Banner() {
  return (
    <div aria-label="Kunden, Branchen und Methoden" className="pause-on-hover grid gap-3 overflow-hidden py-8 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <Reihe eintraege={KUNDEN} />
      <Reihe eintraege={METHODEN} reverse dunkel />
    </div>
  );
}
