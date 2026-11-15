'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Führt zurück an den Ort, von dem man kam: Startseite oder Bewerbungsseite, jeweils an die
 * vorherige Scrollposition. Ohne bekannte Herkunft geht es zum Abschnitt «Fallstudien».
 */
export function ZurueckLink({ className, children, bewerbung }: { className?: string; children: ReactNode; bewerbung: ReactNode }) {
  const router = useRouter();
  const [herkunft, setHerkunft] = useState<string | null>(null);
  useEffect(() => {
    try { setHerkunft(sessionStorage.getItem('herkunft')); } catch {}
  }, []);
  const vonBewerbung = !!herkunft && herkunft.startsWith('/f/');

  return (
    <Link
      href={vonBewerbung ? herkunft : '/#fallstudien'}
      className={className}
      onClick={(e) => {
        let vorher: string | null = null;
        try { vorher = sessionStorage.getItem('vorher'); } catch {}
        if (vorher && vorher === herkunft && window.history.length > 1) {
          e.preventDefault();
          router.back();
        }
      }}
    >
      {vonBewerbung ? bewerbung : children}
    </Link>
  );
}
