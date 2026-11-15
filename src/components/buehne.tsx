'use client';
import { useRef } from 'react';
import { Licht, type FlaechenStil } from '@/components/licht';
import { cn } from '@/lib/utils';

/**
 * Dunkle Fläche mit Licht und Korn. Das ist das Material, das Hero, Arbeitsweise und Footer verbindet.
 * Ein weicher Lichtkegel folgt dem Mauszeiger.
 */
export function Buehne({
  children,
  className,
  stil = 'lichter',
  i = 0,
  kegel = true,
}: {
  children: React.ReactNode;
  className?: string;
  stil?: FlaechenStil;
  i?: number;
  kegel?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onPointerMove={
        kegel
          ? (e) => {
              const el = ref.current;
              if (!el || e.pointerType !== 'mouse') return;
              const r = el.getBoundingClientRect();
              el.style.setProperty('--mx', `${e.clientX - r.left}px`);
              el.style.setProperty('--my', `${e.clientY - r.top}px`);
            }
          : undefined
      }
      className={cn('group relative isolate overflow-clip bg-nacht text-white', className)}
    >
      <Licht stil={stil} i={i} />
      {kegel && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 motion-reduce:hidden"
          style={{ background: 'radial-gradient(560px circle at var(--mx, 50%) var(--my, 50%), rgba(199,204,194,0.14), rgba(199,204,194,0) 62%)' }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
