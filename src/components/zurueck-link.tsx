'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

/* Führt wie «Zurück» zur Startseite, wenn man von dort kam (gleiche Scrollposition),
   sonst zum Abschnitt «Fallstudien». */
export function ZurueckLink({ className, children }: { className?: string; children: ReactNode }) {
  const router = useRouter();
  return (
    <Link
      href="/#fallstudien"
      className={className}
      onClick={(e) => {
        let kamVonStart = false;
        try { kamVonStart = sessionStorage.getItem('vorher') === '/'; } catch {}
        if (kamVonStart && window.history.length > 1) {
          e.preventDefault();
          router.back();
        }
      }}
    >
      {children}
    </Link>
  );
}
