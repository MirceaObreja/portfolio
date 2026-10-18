import Link from 'next/link';
import { KONTAKT } from '@/lib/site';

export function SiteHeader({ nav = true, lang = 'de' }: { nav?: boolean; lang?: 'de' | 'en' }) {
  const t = lang === 'de'
    ? [['/#fallstudien', 'Fallstudien'], ['/#projekte', 'Projekte'], ['/#ueber-mich', 'Über mich']]
    : [['/#fallstudien', 'Case studies'], ['/#projekte', 'Projects'], ['/#ueber-mich', 'About']];
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-medium tracking-tight">
          <svg viewBox="0 0 64 24" className="h-3 w-8" aria-hidden>
            <path d="M1 12 L16 1 L31 12 L16 23Z M33 12 L48 1 L63 12 L48 23Z" className="fill-brand" />
          </svg>
          {KONTAKT.name}
        </Link>
        <nav aria-label="Hauptnavigation" className="flex items-center gap-1 text-[15px]">
          {nav && t.map(([href, label]) => (
            <Link key={href} href={href} className="hidden rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-block">
              {label}
            </Link>
          ))}
          <a href="#kontakt" className="ml-1 rounded-full bg-primary px-4 py-1.5 text-primary-foreground transition-colors hover:bg-primary/85">
            {lang === 'de' ? 'Kontakt' : 'Contact'}
          </a>
        </nav>
      </div>
    </header>
  );
}
