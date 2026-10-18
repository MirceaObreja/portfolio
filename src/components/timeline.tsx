import { Reveal } from '@/components/motion-bits';

type Eintrag = { jahre: string; titel: string; ort: string; text?: string };

const BERUF: Eintrag[] = [
  { jahre: '2025 – heute', titel: 'Senior Experience Consultant', ort: 'Merkle, St. Gallen', text: 'Research und Konzeption für Banken, Mobilität und Gesundheitswesen. Bis April 2026 UX-Lead auf dem Siemens Xcelerator Marketplace.' },
  { jahre: '2022 – 2025', titel: 'Experience Consultant', ort: 'Merkle, St. Gallen', text: 'Research, Konzepte und Prototypen für Banking, B2B-Plattformen und öffentliche Verwaltung. Ab 2024 im Siemens-Team.' },
  { jahre: '2021 – 2022', titel: 'Praktikum UX Design und UX Research', ort: 'Sunrise UPC, Zürich' },
  { jahre: '2020', titel: 'Praktikum Marketing, Sales und Social Media', ort: 'Einstoffen, St. Gallen' },
];

const AUSBILDUNG: Eintrag[] = [
  { jahre: '2018 – 2021', titel: 'B. Sc. Digital Business Management', ort: 'Bachelorstudium', text: 'Module unter anderem Design Thinking, Behavioral Economics, Innovation Management, Psychologie, Usability Testing, Projektmanagement und Kommunikation.' },
  { jahre: '2016 – 2017', titel: 'Technische Matura', ort: 'GBS St. Gallen' },
];

function Liste({ titel, eintraege }: { titel: string; eintraege: Eintrag[] }) {
  return (
    <div>
      <h3 className="mb-2 text-[15px] font-medium text-muted-foreground">{titel}</h3>
      <ol>
        {eintraege.map((e, i) => (
          <Reveal key={e.titel + e.jahre} delay={i * 0.06}>
            <li className="group grid gap-1 border-t border-foreground/15 py-6 transition-colors hover:border-foreground md:grid-cols-[11rem_1fr] md:gap-8">
              <span className="text-[15px] tabular-nums text-muted-foreground">{e.jahre}</span>
              <div>
                <p className="text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-tight tracking-tight">{e.titel}</p>
                <p className="mt-1 text-[15px] text-muted-foreground">{e.ort}</p>
                {e.text && <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-foreground/70">{e.text}</p>}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export function Timeline() {
  return (
    <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
      <Liste titel="Berufserfahrung" eintraege={BERUF} />
      <Liste titel="Ausbildung" eintraege={AUSBILDUNG} />
    </div>
  );
}
