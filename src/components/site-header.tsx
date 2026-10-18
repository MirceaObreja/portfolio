import Image from 'next/image';
import Link from 'next/link';
import { KONTAKT } from '@/lib/site';
import logo from '../../public/images/logo.png';

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
        className="glass fixed top-4 z-50 flex h-11 items-center rounded-full px-4"
        style={{ left: 'max(12px, env(safe-area-inset-left, 0px))' }}
      >
        <Image src={logo} alt="" priority className="h-7 w-auto" />
      </Link>
      <nav
        aria-label="Hauptnavigation"
        className="glass fixed right-3 top-4 z-50 flex h-11 items-center gap-0.5 rounded-full p-1 text-[14px] sm:left-1/2 sm:right-auto sm:-translate-x-1/2"
      >
        {nav && links.map(([href, label], i) => (
          <Link key={href} href={href} className={`${i === 2 ? 'hidden sm:inline-block' : ''} whitespace-nowrap rounded-full px-3 py-1.5 text-foreground/75 transition-colors hover:bg-white/70 hover:text-foreground sm:px-4`}>
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
