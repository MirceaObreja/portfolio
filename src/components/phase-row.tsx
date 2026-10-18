import { PHASEN } from '@/lib/content';
import { PHASEN_TEXT } from '@/lib/site';

export function PhaseRow({ lang = 'de' }: { lang?: 'de' | 'en' }) {
  return (
    <ol className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
      {PHASEN.map((p) => (
        <li key={p} className="grid content-start gap-1.5 border-t border-border pt-4">
          <span className="font-medium">{PHASEN_TEXT[lang][p].name}</span>
          <span className="text-[15px] leading-relaxed text-muted-foreground">{PHASEN_TEXT[lang][p].text}</span>
        </li>
      ))}
    </ol>
  );
}
