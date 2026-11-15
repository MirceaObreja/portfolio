'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SCHLUESSEL = 'sy:';
// Nach einem Klick auf einen Link wird nicht mehr gespeichert: der Inhalt wechselt, und die Seite wird dabei kürzer
let eingefroren = false;

/**
 * Seitenwechsel ohne Scrollfahrt: Beim Zurückgehen wird nicht animiert gescrollt, und die
 * Position der Seite davor wird wiederhergestellt, auch wenn deren Inhalt erst nachlädt.
 */
export function ScrollRuhe() {
  const pfad = usePathname();

  // Herkunft merken (für «Zurück»-Links auf Fallstudien)
  useEffect(() => {
    eingefroren = false;
    try {
      const aktuell = sessionStorage.getItem('pfad');
      if (aktuell !== pfad) {
        sessionStorage.setItem('vorher', aktuell ?? '');
        sessionStorage.setItem('pfad', pfad);
        if (pfad === '/' || pfad.startsWith('/f/')) sessionStorage.setItem('herkunft', pfad);
      }
    } catch {}
  }, [pfad]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let frame = 0;
    let wiederherstellen = 0;
    const html = document.documentElement;

    // Scrollposition je Pfad laufend speichern
    const speichern = () => {
      if (frame || eingefroren) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (eingefroren) return;
        try { sessionStorage.setItem(SCHLUESSEL + location.pathname, String(Math.round(window.scrollY))); } catch {}
      });
    };

    const klick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]');
      if (!a || eingefroren) return;
      const href = a.getAttribute('href') ?? '';
      if (!href.startsWith('/') || href.startsWith('/#') || a.getAttribute('target') === '_blank') return;
      try { sessionStorage.setItem(SCHLUESSEL + location.pathname, String(Math.round(window.scrollY))); } catch {}
      eingefroren = true;
    };

    const stopp = () => {
      wiederherstellen++;
    };

    const zurueck = () => {
      html.style.scrollBehavior = 'auto';
      clearTimeout(timer);
      timer = setTimeout(() => { html.style.scrollBehavior = ''; }, 1800);

      // Position der Seite davor setzen, bis der Inhalt hoch genug ist
      const lauf = ++wiederherstellen;
      const start = performance.now();
      const versuch = () => {
        if (lauf !== wiederherstellen) return;
        let ziel = NaN;
        try { ziel = Number(sessionStorage.getItem(SCHLUESSEL + location.pathname)); } catch {}
        if (!Number.isFinite(ziel) || ziel <= 0) return;
        if (Math.abs(window.scrollY - ziel) > 2) window.scrollTo({ top: ziel, behavior: 'auto' });
        if (Math.abs(window.scrollY - ziel) > 2 && performance.now() - start < 1500) requestAnimationFrame(versuch);
      };
      // Erst nach dem Rendern der Zielseite
      setTimeout(versuch, 30);
    };

    window.addEventListener('click', klick, true);
    window.addEventListener('scroll', speichern, { passive: true });
    window.addEventListener('popstate', zurueck);
    const gecacht = (e: PageTransitionEvent) => { if (e.persisted) zurueck(); };
    window.addEventListener('pageshow', gecacht);
    window.addEventListener('wheel', stopp, { passive: true });
    window.addEventListener('touchstart', stopp, { passive: true });
    window.addEventListener('keydown', stopp);
    return () => {
      window.removeEventListener('click', klick, true);
      window.removeEventListener('scroll', speichern);
      window.removeEventListener('popstate', zurueck);
      window.removeEventListener('pageshow', gecacht);
      window.removeEventListener('wheel', stopp);
      window.removeEventListener('touchstart', stopp);
      window.removeEventListener('keydown', stopp);
      clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
