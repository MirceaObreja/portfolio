import Link from 'next/link';
import { KONTAKT } from '@/lib/site';

function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 24" className={className} aria-hidden>
      <path d="M1 12 L16 1 L31 12 L16 23Z M33 12 L48 1 L63 12 L48 23Z" className="fill-foreground" />
    </svg>
  );
}

export function SiteHeader({ nav = true, lang = 'de' }: { nav?: boolean; lang?: 'de' | 'en' }) {
  const links = lang === 'de'
    ? [['/#fallstudien', 'Fallstudien'], ['/#projekte', 'Projekte'], ['/#ueber-mich', 'Über mich']]
    : [['/#fallstudien', 'Case studies'], ['/#projekte', 'Projects'], ['/#ueber-mich', 'About']];
  return (
    <>
      <div className="h-24" aria-hidden />
      <Link
        href="/"
        aria-label={`${KONTAKT.name}, Startseite`}
        className="fixed top-4 z-50 flex h-11 items-center gap-2.5 rounded-full px-3 text-[15px] font-semibold tracking-tight transition-colors hover:bg-black/5"
        style={{ left: 'max(12px, env(safe-area-inset-left, 0px))' }}
      >
        <Mark className="h-3 w-8" />
        <span className="hidden lg:inline">{KONTAKT.name}</span>
      </Link>
      <nav
        aria-label="Hauptnavigation"
        className="fixed right-3 top-4 z-50 flex h-11 items-center sm:right-auto sm:left-1/2 sm:-translate-x-1/2 gap-0.5 rounded-full border border-black/[0.06] bg-white/70 p-1 text-[14px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl backdrop-saturate-150"
      >
        {nav && links.map(([href, label], i) => (
          <Link key={href} href={href} className={`${i === 2 ? 'hidden sm:inline-block' : ''} whitespace-nowrap rounded-full px-3 py-1.5 text-foreground/80 transition-colors hover:bg-black/5 hover:text-foreground sm:px-4`}>
            {label}
          </Link>
        ))}
        <a href="#kontakt" className="whitespace-nowrap rounded-full bg-foreground px-3.5 py-1.5 text-background transition-opacity hover:opacity-85 sm:px-4">
          {lang === 'de' ? 'Kontakt' : 'Contact'}
        </a>
      </nav>
    </>
  );
}
