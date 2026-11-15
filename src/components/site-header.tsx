'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { KONTAKT } from '@/lib/site';
import { cn } from '@/lib/utils';
import logo from '../../public/images/logo.png';

/** `eigene` ersetzt die Links der Startseite durch Anker auf der aktuellen Seite (Bewerbungsseiten). */
export function SiteHeader({ nav = true, lang = 'de', eigene }: { nav?: boolean; lang?: 'de' | 'en'; eigene?: [string, string][] }) {
  const [offen, setOffen] = useState(false);
  const pfad = usePathname();
  const reduce = useReducedMotion();
  const links = eigene ?? (lang === 'de'
    ? [['/#arbeitsweise', 'Arbeitsweise'], ['/#fallstudien', 'Fallstudien'], ['/#werdegang', 'Werdegang'], ['/#ueber-mich', 'Über mich']]
    : [['/#arbeitsweise', 'Approach'], ['/#fallstudien', 'Case studies'], ['/#werdegang', 'Experience'], ['/#ueber-mich', 'About']]);
  const cta = lang === 'de' ? 'Schreib mir' : 'Get in touch';
  const daheim = pfad === '/' || !!eigene;
  // Über dem dunklen Einstieg wird die Leiste selbst dunkel, danach hell
  const [dunkel, setDunkel] = useState(daheim);
  const [aktiv, setAktiv] = useState<string | null>(null);

  useEffect(() => {
    if (!daheim) {
      setDunkel(false);
      setAktiv(null);
      return;
    }
    const ids = links.map(([href]) => href.split('#')[1]);
    let frame = 0;
    const messen = () => {
      frame = 0;
      const hero = document.getElementById('einstieg');
      setDunkel(!!hero && hero.getBoundingClientRect().bottom > 64);
      let treffer: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.42) treffer = id;
      }
      setAktiv(treffer);
    };
    const beiScroll = () => {
      if (!frame) frame = requestAnimationFrame(messen);
    };
    messen();
    window.addEventListener('scroll', beiScroll, { passive: true });
    window.addEventListener('resize', beiScroll);
    return () => {
      window.removeEventListener('scroll', beiScroll);
      window.removeEventListener('resize', beiScroll);
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daheim, lang]);
  const ctaKurz = lang === 'de' ? 'Kontakt' : 'Contact';

  return (
    <>
      <div className="h-24" aria-hidden />
      <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-4" style={{ paddingLeft: 'max(12px, env(safe-area-inset-left, 0px))', paddingRight: 'max(12px, env(safe-area-inset-right, 0px))' }}>
        <div className={cn('mx-auto max-w-[clamp(1120px,80vw,1680px)] rounded-[26px] transition-[background-color,border-color,box-shadow,color] duration-500', dunkel ? 'glass-dunkel text-white' : 'glass')}>
          <div className="flex h-14 items-center justify-between gap-2 pl-5 pr-2 md:grid md:grid-cols-[1fr_auto_1fr]">
            <Link
              href="/"
              aria-label={`${KONTAKT.name}, Startseite`}
              className="justify-self-start rounded-md"
              onClick={(e) => {
                // Auf der Startseite selbst zurück an den Anfang scrollen
                if (daheim) {
                  e.preventDefault();
                  setOffen(false);
                  window.history.replaceState(null, '', pfad);
                  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
                }
              }}
            >
              <Image src={logo} alt="" priority className={cn('h-7 w-auto transition-[filter] duration-500', dunkel && 'brightness-0 invert')} />
            </Link>

            {nav ? (
              <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 text-[15px] md:flex">
                {links.map(([href, label]) => {
                  const an = aktiv === href.split('#')[1];
                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={an ? 'location' : undefined}
                      className={cn(
                        'relative rounded-full px-4 py-2 transition-colors',
                        an ? 'text-foreground' : dunkel ? 'text-white/75 hover:text-white' : 'text-foreground/65 hover:text-foreground',
                      )}
                    >
                      {an && (
                        <motion.span
                          layoutId="nav-aktiv"
                          aria-hidden
                          className="absolute inset-0 rounded-full bg-white shadow-[0_1px_2px_rgba(31,43,51,0.08),0_6px_16px_-8px_rgba(31,43,51,0.25)]"
                          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{label}</span>
                    </Link>
                  );
                })}
              </nav>
            ) : <span />}

            <div className="flex items-center gap-1.5 justify-self-end">
              <a
                href="#kontakt"
                className={cn(
                  'group inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full pl-4 pr-1.5 text-[15px] font-medium transition-colors duration-500',
                  dunkel ? 'bg-white text-ink' : 'bg-tinte text-white hover:bg-nacht',
                )}
              >
                <span className="hidden sm:inline">{cta}</span>
                <span className="sm:hidden">{ctaKurz}</span>
                <span className={cn('grid size-7 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45', dunkel ? 'bg-ink text-white' : 'bg-white/20')}>
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </a>
              {nav && (
                <button
                  type="button"
                  aria-expanded={offen}
                  aria-controls="mobile-nav"
                  aria-label={offen ? 'Menü schliessen' : 'Menü öffnen'}
                  onClick={() => setOffen((o) => !o)}
                  className={cn('grid size-10 place-items-center rounded-full transition-colors md:hidden', dunkel ? 'hover:bg-white/15' : 'hover:bg-white/70')}
                >
                  {offen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
                </button>
              )}
            </div>
          </div>

          <AnimatePresence initial={false}>
            {nav && offen && (
              <motion.nav
                id="mobile-nav"
                aria-label="Hauptnavigation"
                initial={reduce ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={reduce ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="overflow-hidden md:hidden"
              >
                <ul className="grid gap-1 px-3 pb-3">
                  {links.map(([href, label]) => (
                    <li key={href}>
                      <Link href={href} onClick={() => setOffen(false)} className={cn('block rounded-2xl px-4 py-3 text-[17px]', dunkel ? 'hover:bg-white/10' : 'hover:bg-white/70')}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
