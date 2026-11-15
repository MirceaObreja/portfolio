'use client';
import { useEffect } from 'react';

/**
 * Weiches Scrollen gilt nur für Sprünge innerhalb der Seite.
 * Beim Zurück- und Vorwärtsgehen im Browser erscheint die Seite sofort an der alten Stelle, ohne Fahrt.
 */
export function ScrollRuhe() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const ruhig = () => {
      const html = document.documentElement;
      html.style.scrollBehavior = 'auto';
      clearTimeout(timer);
      timer = setTimeout(() => {
        html.style.scrollBehavior = '';
      }, 900);
    };
    window.addEventListener('popstate', ruhig);
    window.addEventListener('pageshow', ruhig);
    return () => {
      window.removeEventListener('popstate', ruhig);
      window.removeEventListener('pageshow', ruhig);
      clearTimeout(timer);
    };
  }, []);
  return null;
}
