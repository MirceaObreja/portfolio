"use client";
import { useRef, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Korn } from "@/components/licht";
import { KONTAKT } from "@/lib/site";
import portrait from "../../public/images/fotos/portrait-bw.png";

const ZAHLEN: {
  wert?: number;
  suffix?: string;
  zeichen?: string;
  label: string;
}[] = [
  { wert: 4, suffix: "+", label: "Jahre bei Merkle" },
  { wert: 14, suffix: "+", label: "Firmen begleitet" },
  { zeichen: "∞", label: "Post-its geklebt" },
];

const ZAHLEN_EN = ["Years at Merkle", "Companies supported", "Post-its stuck"];
function beschriftung(z: { label: string }, i: number, lang: "de" | "en") {
  return lang === "en" ? ZAHLEN_EN[i] : z.label;
}

const SUB =
  "Service Designer und UX-Stratege. Ich sorge dafür, dass digitale Abläufe von Anfang bis Ende funktionieren, und stütze meine Entscheidungen auf Research statt auf Bauchgefühl.";

const ROLLE = "Service Designer und UX-Stratege.";
const REST = SUB.slice(ROLLE.length + 1);

// Blendet die geraden Bildkanten des Porträts unten und seitlich weich aus
const KANTEN =
  "[mask-image:linear-gradient(to_top,transparent_0%,black_20%),linear-gradient(to_right,transparent_0%,black_14%,black_86%,transparent_100%)] [mask-composite:intersect]";

/**
 * Einstieg: links Begrüssung, Name, Text und Buttons, rechts das Porträt vor einem aufgehenden Licht.
 * Unter dem Porträt stehen die drei Zahlen. Beim Scrollen wird das Licht heller und der Text blendet aus.
 */
export function Einstieg({ children, lang = "de" }: { children: ReactNode; lang?: "de" | "en" }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bildY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const lichtScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);

  return (
    <section
      ref={ref}
      id="einstieg"
      aria-label="Einstieg"
      className="relative isolate -mt-24 h-[100svh] max-h-[1080px] min-h-[640px] overflow-clip rounded-b-[32px] bg-nacht text-white md:rounded-b-[44px]"
    >
      {/* Licht: geht hinter dem Porträt auf, die linke Seite bleibt dunkel für den Text. Auf dem Handy liegt es mittig hinter dem Bild. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-bottom-right max-md:hidden"
        style={{
          scale: reduce ? 1 : lichtScale,
          background:
            "radial-gradient(50% 70% at 74% 110%, #dfe3dc 0%, #c7ccc2 14%, #9eaaa2 30%, #758a87 46%, rgba(81,104,111,0.75) 62%, rgba(53,72,87,0.4) 80%, rgba(31,43,51,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            "radial-gradient(95% 34% at 50% 60%, #9eaaa2 0%, #758a87 26%, rgba(81,104,111,0.7) 52%, rgba(53,72,87,0.35) 76%, rgba(31,43,51,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(50%_100%_at_10%_0%,rgba(81,104,111,0.4),rgba(31,43,51,0))]"
      />
      <Korn className="opacity-[0.34]" />

      <div className="container-page relative flex h-full flex-col pt-24 md:justify-center">
        {/* Porträt: auf dem Handy mittig, sonst rechts */}
        <motion.div
          className="absolute inset-x-0 bottom-[25%] z-10 flex h-[45%] justify-center md:bottom-0 md:left-auto md:right-[3%] md:h-[86%] md:justify-end"
          style={reduce ? undefined : { y: bildY }}
        >
          <Image
            src={portrait}
            alt={`Porträt von ${KONTAKT.name}`}
            priority
            sizes="(min-width: 768px) 45vw, 100vw"
            className={`h-full w-auto max-w-none ${KANTEN}`}
          />
        </motion.div>

        {/* Zahlen unter dem Porträt */}
        <dl className="absolute bottom-10 right-[3%] z-20 hidden divide-x divide-white/15 rounded-[22px] border border-white/15 bg-nacht/45 px-2 py-3.5 backdrop-blur-md md:flex">
          {ZAHLEN.map((z, zi) => (
            <div key={z.label} className="px-5">
              <dt className="sr-only">{beschriftung(z, zi, lang)}</dt>
              <dd className="text-[clamp(1.25rem,1.9vw,1.6rem)] font-medium leading-none tracking-tight">
                {z.zeichen ?? `${z.wert}${z.suffix ?? ""}`}
              </dd>
              <p
                aria-hidden
                className="mt-1.5 whitespace-nowrap text-[12px] leading-snug text-white/70"
              >
                {beschriftung(z, zi, lang)}
              </p>
            </div>
          ))}
        </dl>

        {/* Links: Begrüssung mit Name, Rolle als Titel, Text, Buttons */}
        <motion.div
          className="relative z-20 flex flex-1 flex-col pb-6 pt-4 md:max-w-[54%] md:flex-none md:pb-10 md:pt-0"
          style={reduce ? undefined : { opacity: textOpacity, y: textY }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

/** Startseite: Begrüssung mit Name, Rolle als Titel, Text und Buttons. */
export function Hero() {
  const knoepfe = (
    <div className="mt-5 flex flex-wrap gap-2.5 md:mt-8 md:gap-3">
      <a
        href="#kontakt"
        className="group/cta inline-flex h-12 items-center gap-2 rounded-full bg-white pl-4 pr-1.5 text-[15px] font-medium text-ink md:pl-5"
      >
        Schreib mir
        <span className="grid size-9 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover/cta:rotate-45">
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </a>
      <a
        href="#fallstudien"
        className="inline-flex h-12 items-center rounded-full border border-white/30 bg-white/5 px-4 text-[15px] text-white backdrop-blur-md transition-colors hover:bg-white/15 md:px-5"
      >
        Fallstudien ansehen
      </a>
    </div>
  );

  return (
    <Einstieg>
          <h1 className="font-light">
            <span className="block text-[15px] text-white/65 md:text-[clamp(1rem,1.5vw,1.4rem)]">
              Ciao, ich bin <span className="text-white">{KONTAKT.name}</span>
            </span>
            <span className="mt-3 block text-[clamp(2.4rem,10.5vw,3.4rem)] leading-[0.98] tracking-[-0.05em] md:mt-5 md:text-[clamp(2.6rem,4.6vw,5.2rem)]">
              Service Designer
              <br />
              und UX-Stratege.
            </span>
          </h1>
          <div className="mt-auto md:mt-9">
            <p className="text-[15px] leading-normal text-white/85 [text-shadow:0_1px_18px_rgba(31,43,51,0.55)] md:max-w-[40ch] md:text-[17px] md:leading-relaxed">
              {REST}
            </p>
            {knoepfe}
          </div>
    </Einstieg>
  );
}
