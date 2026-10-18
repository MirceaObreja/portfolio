import { cn } from '@/lib/utils';

/** Weiche, langsam treibende Farbflächen als Hintergrund für Glasflächen. */
export function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('grain pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      <div className="orb-a absolute -left-[10%] top-[8%] h-[46vw] max-h-[620px] w-[46vw] max-w-[620px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,113,227,0.30),rgba(0,113,227,0)_68%)] blur-2xl" />
      <div className="orb-b absolute -right-[8%] top-[22%] h-[40vw] max-h-[560px] w-[40vw] max-w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.22),rgba(124,92,255,0)_68%)] blur-2xl" />
      <div className="orb-a absolute left-[30%] top-[52%] h-[34vw] max-h-[480px] w-[34vw] max-w-[480px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22),rgba(56,189,248,0)_68%)] blur-2xl [animation-delay:-9s]" />
    </div>
  );
}
