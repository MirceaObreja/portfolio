'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { KONTAKT } from '@/lib/site';
import logo from '../../public/images/logo.png';

export function SiteHeader({ nav = true, lang = 'de' }: { nav?: boolean; lang?: 'de' | 'en' }) {
  const [offen, setOffen] = useState(false);
  const reduce = useReducedMotion();
  const links = lang === 'de'
    ? [['/#arbeitsweise', 'Arbeitsweise'], ['/#fallstudien', 'Fallstudien'], ['/#werdegang', 'Werdegang'], ['/#ueber-mich', 'Über mich']]
    : [['/#arbeitsweise', 'Approach'], ['/#fallstudien', 'Case studies'], ['/#werdegang', 'Experience'], ['/#ueber-mich', 'About']];
  const cta = lang === 'de' ? 'Kontaktiere mich' : 'Get in touch';
  const ctaKurz = lang === 'de' ? 'Kontakt' : 'Contact';

  return (
    <>
      <div className="h-24" aria-hidden />
      <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-4" style={{ paddingLeft: 'max(12px, env(safe-area-inset-left, 0px))', paddingRight: 'max(12px, env(safe-area-inset-right, 0px))' }}>
        <div className="glass mx-auto max-w-[1120px] rounded-[26px]">
          <div className="flex h-14 items-center justify-between gap-2 pl-5 pr-2 md:grid md:grid-cols-[1fr_auto_1fr]">
            <Link href="/" aria-label={`${KONTAKT.name}, Startseite`} className="justify-self-start rounded-md">
              <Image src={logo} alt="" priority className="h-7 w-auto" />
            </Link>

            {nav ? (
              <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 text-[15px] md:flex">
                {links.map(([href, label]) => (
                  <Link key={href} href={href} className="rounded-full px-4 py-2 text-foreground/70 transition-colors hover:bg-white/70 hover:text-foreground">
                    {label}
                  </Link>
                ))}
              </nav>
            ) : <span />}

            <div className="flex items-center gap-1.5 justify-self-end">
              <a
                href="#kontakt"
                className="group inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-tinte pl-4 pr-1.5 text-[15px] font-medium text-white transition-colors hover:bg-nacht"
              >
                <span className="hidden sm:inline">{cta}</span>
                <span className="sm:hidden">{ctaKurz}</span>
                <span className="grid size-7 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-45">
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
                  className="grid size-10 place-items-center rounded-full transition-colors hover:bg-white/70 md:hidden"
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
                      <Link href={href} onClick={() => setOffen(false)} className="block rounded-2xl px-4 py-3 text-[17px] hover:bg-white/70">
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
