import { Reveal } from '@/components/motion-bits';
import { cn } from '@/lib/utils';

/** Grosser Abschnittstitel mit kurzer Einordnung rechts daneben. */
export function SectionTitle({ id, titel, text, className }: { id: string; titel: string; text?: string; className?: string }) {
  return (
    <Reveal className={cn('mb-12 grid gap-5 md:mb-16 md:grid-cols-12', className)}>
      <h2 id={id} className="text-[clamp(1.75rem,4.725vw,4.41rem)] font-medium leading-[0.9] tracking-[-0.045em] md:col-span-12">
        {titel}
      </h2>
      {text && <p className="text-[17px] leading-relaxed text-muted-foreground md:col-span-9">{text}</p>}
    </Reveal>
  );
}
