'use client';
import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** E-Mail-Adresse als grosse Zeile mit einem Knopf zum Kopieren. */
export function MailKopieren({ email, lang = 'de' }: { email: string; lang?: 'de' | 'en' }) {
  const [kopiert, setKopiert] = useState(false);
  useEffect(() => {
    if (!kopiert) return;
    const t = setTimeout(() => setKopiert(false), 2200);
    return () => clearTimeout(t);
  }, [kopiert]);
  const t = lang === 'de' ? { kopieren: 'Adresse kopieren', kopiert: 'Kopiert' } : { kopieren: 'Copy address', kopiert: 'Copied' };

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
      <a
        href={`mailto:${email}`}
        className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-1 text-[clamp(1.2rem,2vw,1.7rem)] font-medium tracking-tight transition-[background-size] duration-500 hover:bg-[length:100%_1px]"
      >
        {email}
      </a>
      <button
        type="button"
        aria-label={kopiert ? t.kopiert : t.kopieren}
        title={kopiert ? t.kopiert : t.kopieren}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setKopiert(true);
          } catch {
            // Ohne Zugriff auf die Zwischenablage bleibt die Adresse markierbar
          }
        }}
        className="inline-flex h-9 items-center gap-2 rounded-full border border-white/25 px-2.5 text-[13px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        {kopiert ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
        {kopiert && <span>{t.kopiert}</span>}
        <span className="sr-only" aria-live="polite">{kopiert ? t.kopiert : ''}</span>
      </button>
    </div>
  );
}
