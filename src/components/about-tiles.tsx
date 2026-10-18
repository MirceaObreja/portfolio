'use client';
import { motion, useReducedMotion } from 'motion/react';
import { Wrench } from 'lucide-react';
import { Flaeche } from '@/components/flaeche';


// Markenzeichen aus Iconify «logos» und Remix Icon, nur zur Kennzeichnung der genutzten Werkzeuge
function Svg({ box, className = 'size-7', children }: { box: string; className?: string; children: React.ReactNode }) {
  return (
    <svg viewBox={box} className={className} aria-hidden>
      {children}
    </svg>
  );
}

const FigmaLogo = () => (
  <Svg box="0 0 256 384" className="h-8 w-auto">
    <path fill="#0acf83" d="M64 384c35.328 0 64-28.672 64-64v-64H64c-35.328 0-64 28.672-64 64s28.672 64 64 64" />
    <path fill="#a259ff" d="M0 192c0-35.328 28.672-64 64-64h64v128H64c-35.328 0-64-28.672-64-64" />
    <path fill="#f24e1e" d="M0 64C0 28.672 28.672 0 64 0h64v128H64C28.672 128 0 99.328 0 64" />
    <path fill="#ff7262" d="M128 0h64c35.328 0 64 28.672 64 64s-28.672 64-64 64h-64z" />
    <path fill="#1abcfe" d="M256 192c0 35.328-28.672 64-64 64s-64-28.672-64-64s28.672-64 64-64s64 28.672 64 64" />
  </Svg>
);
const MiroLogo = () => (
  <Svg box="0 0 256 256" className="size-full">
    <path fill="#ffdd33" d="M0 64C0 28.654 28.654 0 64 0h128c35.346 0 64 28.654 64 64v128c0 35.346-28.654 64-64 64H64c-35.346 0-64-28.654-64-64z" />
    <path fill="#050038" d="M170.195 48.8h-23.239l19.366 34.026L123.717 48.8h-23.239l21.303 41.588L77.239 48.8H54l23.239 52.937L54 207.6h23.239l44.542-113.426L100.478 207.6h23.239l42.605-120.988L146.956 207.6h23.239L212.8 75.263z" />
  </Svg>
);
const AnalyticsLogo = () => (
  <Svg box="0 0 256 284" className="h-8 w-auto">
    <path fill="#f9ab00" d="M256.003 247.933a35.224 35.224 0 0 1-39.376 35.161c-18.044-2.67-31.266-18.371-30.826-36.606V36.845C185.365 18.591 198.62 2.881 216.687.24a35.22 35.22 0 0 1 39.316 35.16z" />
    <path fill="#e37400" d="M35.101 213.193c19.386 0 35.101 15.716 35.101 35.101c0 19.386-15.715 35.101-35.101 35.101S0 267.68 0 248.295s15.715-35.102 35.101-35.102m92.358-106.387c-19.477 1.068-34.59 17.406-34.137 36.908v94.285c0 25.588 11.259 41.122 27.755 44.433a35.16 35.16 0 0 0 42.146-34.56V142.089a35.22 35.22 0 0 0-35.764-35.282" />
  </Svg>
);
const LookbackLogo = () => (
  <Svg box="0 0 512 96" className="w-12">
    <g fill="#192d41"><path d="M296.128 31.545c-7.935 0-13.187 3.334-20.223 8.925V1.006L273.983 0l-24.319 11.5v1.76l9.408 5.783v71.828c8.641 3.768 16.384 4.774 24.318 4.774c17.729 0 35.203-12.067 35.203-34.688c-.066-16.907-9.6-29.412-22.465-29.412m-8.959 55.362c-4.737 0-8.324-2.136-11.33-5.783V45.181a48.4 48.4 0 0 1 10.432-1.318c8.641 0 14.336 7.035 14.336 21.305c.066 13.824-4.35 21.74-13.438 21.74m85.438-2.703V56.117c0-15.96-6.144-24.635-21.567-24.635c-9.982 0-18.177 3.584-25.342 10.62l2.748 5.47c5.25-3.33 10.24-5.341 15.36-5.341c8.513 0 11.842 5.024 11.842 14.83v2.578c-25.342 2.575-32.705 10.932-32.705 21.74c0 10.619 7.489 14.266 14.528 14.266c6.018 0 12.162-2.579 18.177-6.601v5.028h24.193V84.9h-6.593l-.64-.693zm-16.833-.184a33.8 33.8 0 0 1-7.934 1.318c-4.992 0-8.51-2.45-8.321-7.92c.129-6.471 4.862-9.613 16.258-10.619v17.22zm64.832 1.631c-10.11 0-19.647-8.04-19.647-26.079c0-12.818 3.97-19.732 11.459-19.732c3.072 0 5.437 1.131 8.063 3.33l11.135 14.642h1.92V34.69a51.4 51.4 0 0 0-17.151-3.142c-20.546 0-33.28 14.642-33.28 33.493c0 18.418 11.71 30.481 30.016 30.481a34.47 34.47 0 0 0 23.04-8.361l-2.755-5.025c-4.413 2.512-8.126 3.518-12.8 3.518zm82.307-.751L483.136 57.56l25.92-23.437v-1.131h-32.384v1.252l8.384 8.048L466.303 61.9l22.528 32.234H512v-9.23h-9.087z" /><path d="M465.088 84.204V1.009L463.04 0l-24.193 11.5v1.694l9.41 5.783v65.23l-.769.693h-6.593v9.234h31.552v-9.23h-6.59l-.77-.693zM15.04 9.489H0v84.774h50.88v-13.64H15.04zM83.456 31.67c-18.56 0-32.576 13.765-32.576 31.987c0 18.226 14.015 32.113 32.576 32.113c18.56 0 32.705-13.824 32.705-32.113c0-18.284-14.019-31.987-32.705-31.987m0 50.777c-10.369 0-18.174-8.041-18.174-18.727c0-10.682 7.809-18.664 18.174-18.664c10.24 0 18.307 8.17 18.307 18.601c0 10.682-7.81 18.79-18.307 18.79m70.144-50.84c-18.56 0-32.576 13.766-32.576 31.988c0 18.226 14.015 32.112 32.576 32.112c18.56 0 32.705-13.824 32.705-32.112S172.224 31.608 153.6 31.608m0 50.714c-10.369 0-18.174-8.044-18.174-18.726s7.809-18.602 18.174-18.602c10.24 0 18.307 8.17 18.307 18.602c0 10.682-7.875 18.726-18.307 18.726m93.055-49.266h-19.581l-18.627 18.977V6.41h-14.399v87.725h14.402v-26.96l25.214 26.963h18.88L220.29 59.572l26.366-26.52z" /></g>
  </Svg>
);
const ClaudeLogo = () => (
  <Svg box="0 0 256 257" className="size-8">
    <path fill="#d97757" d="m50.228 170.321l50.357-28.257l.843-2.463l-.843-1.361h-2.462l-8.426-.518l-28.775-.778l-24.952-1.037l-24.175-1.296l-6.092-1.297L0 125.796l.583-3.759l5.12-3.434l7.324.648l16.202 1.101l24.304 1.685l17.629 1.037l26.118 2.722h4.148l.583-1.685l-1.426-1.037l-1.101-1.037l-25.147-17.045l-27.22-18.017l-14.258-10.37l-7.713-5.25l-3.888-4.925l-1.685-10.758l7-7.713l9.397.649l2.398.648l9.527 7.323l20.35 15.75L94.817 91.9l3.889 3.24l1.555-1.102l.195-.777l-1.75-2.917l-14.453-26.118l-15.425-26.572l-6.87-11.018l-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0l10.63 1.426l4.472 3.888l6.61 15.101l10.694 23.786l16.591 32.34l4.861 9.592l2.592 8.879l.973 2.722h1.685v-1.556l1.36-18.211l2.528-22.36l2.463-28.776l.843-8.1l4.018-9.722l7.971-5.25l6.222 2.981l5.12 7.324l-.713 4.73l-3.046 19.768l-5.962 30.98l-3.889 20.739h2.268l2.593-2.593l10.499-13.934l17.628-22.036l7.778-8.749l9.073-9.657l5.833-4.601h11.018l8.1 12.055l-3.628 12.443l-11.342 14.388l-9.398 12.184l-13.48 18.147l-8.426 14.518l.778 1.166l2.01-.194l30.46-6.481l16.462-2.982l19.637-3.37l8.88 4.148l.971 4.213l-3.5 8.62l-20.998 5.184l-24.628 4.926l-36.682 8.685l-.454.324l.519.648l16.526 1.555l7.065.389h17.304l32.21 2.398l8.426 5.574l5.055 6.805l-.843 5.184l-12.962 6.611l-17.498-4.148l-40.83-9.721l-14-3.5h-1.944v1.167l11.666 11.406l21.387 19.314l26.767 24.887l1.36 6.157l-3.434 4.86l-3.63-.518l-23.526-17.693l-9.073-7.972l-20.545-17.304h-1.36v1.814l4.73 6.935l25.017 37.59l1.296 11.536l-1.814 3.76l-6.481 2.268l-7.13-1.297l-14.647-20.544l-15.1-23.138l-12.185-20.739l-1.49.843l-7.194 77.448l-3.37 3.953l-7.778 2.981l-6.48-4.925l-3.436-7.972l3.435-15.749l4.148-20.544l3.37-16.333l3.046-20.285l1.815-6.74l-.13-.454l-1.49.194l-15.295 20.999l-23.267 31.433l-18.406 19.702l-4.407 1.75l-7.648-3.954l.713-7.064l4.277-6.286l25.47-32.405l15.36-20.092l9.917-11.6l-.065-1.686h-.583L44.07 198.125l-12.055 1.555l-5.185-4.86l.648-7.972l2.463-2.593l20.35-13.999z" />
  </Svg>
);
const CopilotLogo = () => (
  <Svg box="0 0 24 24" className="size-8">
    <defs>
      <linearGradient id="copilot-v" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#2870ea" />
        <stop offset="0.5" stopColor="#1b4aef" />
        <stop offset="1" stopColor="#7b3fe4" />
      </linearGradient>
    </defs>
    <path fill="url(#copilot-v)" d="M14.865 3.063c.857 0 1.618.544 1.896 1.355l.602 1.758c.269.785.993 1.32 1.817 1.352h.553l.08.003h.073l-.005.002c3.672.114 2.36 4.494 1.356 7.782c-.86 2.811-2.149 5.623-4.297 5.623H9.36c-.86 0-1.625-.55-1.9-1.365l-.586-1.739a2.005 2.005 0 0 0-1.877-1.364h-.73c-3.855 0-2.523-4.454-1.505-7.784c.86-2.812 2.149-5.623 4.297-5.623zm-1.62 4.468c-.812 0-1.535.49-1.845 1.225c-.67 2.272-1.391 4.746-1.830 6.264a2.010 2.010 0 0 1-1.905 1.449h3.078c.862 0 1.623-.552 1.897-1.363c.659-2.234 1.360-4.639 1.790-6.127a2.005 2.005 0 0 1 1.857-1.448z" />
  </Svg>
);

function App({ children, label, bg = '#ffffff', i, rotate = 0, pad = true }: { children: React.ReactNode; label: string; bg?: string; i: number; rotate?: number; pad?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      title={label}
      className={`relative grid size-16 place-items-center overflow-hidden rounded-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_-12px_rgba(31,43,51,0.35)] ${pad ? '' : 'p-0'}`}
      style={{ background: bg, rotate }}
      variants={
        reduce
          ? undefined
          : { rest: { y: 0, rotate }, hover: { y: -8, rotate: 0, transition: { delay: i * 0.04, type: 'spring', stiffness: 300, damping: 18 } } }
      }
    >
      {children}
      <span className="sr-only">{label}</span>
    </motion.div>
  );
}

function WerkzeugeVisual() {
  return (
    <div className="relative grid grid-cols-2 place-items-center gap-4 md:gap-5">
      <App i={0} label="Figma" rotate={-6}><FigmaLogo /></App>
      <App i={1} label="Miro" bg="#ffdd33" rotate={-3} pad={false}><MiroLogo /></App>
      <App i={2} label="Lookback" rotate={4}><LookbackLogo /></App>
      <App i={3} label="Google Analytics" rotate={3}><AnalyticsLogo /></App>
    </div>
  );
}

function KiVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex w-full items-center justify-center gap-3">
      <div aria-hidden className="absolute left-[18%] right-[18%] top-1/2 border-t-[1.5px] border-dashed border-tinte/35" />
      {!reduce && (
        <motion.span
          aria-hidden
          className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_12px_3px_rgba(53,72,87,0.5)]"
          animate={{ left: ['18%', '82%', '18%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <App i={0} label="Claude" rotate={-5}><ClaudeLogo /></App>
      <App i={1} label="Eigene KI-Tools" bg="#1f2b33"><Wrench className="size-7 text-white" aria-hidden /></App>
      <App i={2} label="Microsoft Copilot" rotate={5}><CopilotLogo /></App>
    </div>
  );
}

const LAMELLEN = Array.from({ length: 6 }, (_, k) => k * 60);

/** Kamera als App-Kachel: Beim Darüberfahren schliesst sich die Blende und der Blitz leuchtet kurz auf. */
function KameraVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex flex-col items-center gap-4">
      <motion.div
        className="relative h-[104px] w-[150px] rounded-[22px] bg-nacht shadow-[0_1px_2px_rgba(0,0,0,0.08),0_18px_36px_-14px_rgba(31,43,51,0.55)]"
        variants={reduce ? undefined : { rest: { y: 0, rotate: -4 }, hover: { y: -6, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 18 } } }}
        style={{ rotate: -4 }}
      >
        {/* Sucherbuckel und Auslöser */}
        <span aria-hidden className="absolute -top-2.5 left-1/2 h-4 w-12 -translate-x-1/2 rounded-t-[8px] bg-nacht" />
        <motion.span
          aria-hidden
          className="absolute -top-1.5 right-5 h-2 w-6 rounded-t-[4px] bg-schiefer"
          variants={reduce ? undefined : { rest: { y: 0 }, hover: { y: [0, 2, 0], transition: { duration: 0.25, delay: 0.15 } } }}
        />
        {/* Blitz */}
        <motion.span
          aria-hidden
          className="absolute left-4 top-3.5 h-2 w-4 rounded-[3px] bg-salbei"
          variants={reduce ? undefined : { rest: { backgroundColor: '#9eaaa2', boxShadow: '0 0 0 0 rgba(241,239,232,0)' }, hover: { backgroundColor: ['#9eaaa2', '#ffffff', '#9eaaa2'], boxShadow: ['0 0 0 0 rgba(241,239,232,0)', '0 0 28px 10px rgba(241,239,232,0.9)', '0 0 0 0 rgba(241,239,232,0)'], transition: { duration: 0.5, delay: 0.3 } } }}
        />
        {/* Objektiv mit Blende */}
        <div className="absolute left-1/2 top-1/2 grid size-[74px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-schiefer ring-[3px] ring-eukalyptus/70">
          <div className="relative size-[54px] overflow-hidden rounded-full bg-nacht">
            <motion.svg
              aria-hidden
              viewBox="-50 -50 100 100"
              className="absolute inset-0 size-full"
              variants={reduce ? undefined : { rest: { rotate: 0 }, hover: { rotate: 30, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } } }}
            >
              <defs>
                <radialGradient id="linse" cx="0.38" cy="0.32" r="0.8">
                  <stop offset="0" stopColor="#c7ccc2" />
                  <stop offset="0.45" stopColor="#758a87" />
                  <stop offset="1" stopColor="#354857" />
                </radialGradient>
              </defs>
              {LAMELLEN.map((w) => (
                <line key={w} x1={0} y1={-50} x2={22} y2={6} stroke="#51686f" strokeWidth={1.6} transform={`rotate(${w})`} />
              ))}
              <motion.circle
                cx={0}
                cy={0}
                fill="url(#linse)"
                initial={false}
                variants={reduce ? undefined : { rest: { r: 30 }, hover: { r: 11, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } } }}
                r={30}
              />
            </motion.svg>
            <span aria-hidden className="absolute left-[24%] top-[20%] size-2 rounded-full bg-white/60 blur-[1px]" />
          </div>
        </div>
      </motion.div>
      <div aria-hidden className="flex gap-2 text-[11px] font-medium tabular-nums tracking-wide text-tinte/80">
        {['f/2.8', '1/250', 'ISO 100'].map((t) => (
          <span key={t} className="rounded-full bg-white/60 px-2.5 py-1 backdrop-blur-sm">{t}</span>
        ))}
      </div>
    </div>
  );
}

const KACHELN = [
  {
    key: 'werkzeuge',
    titel: 'Werkzeuge',
    text: 'Figma, FigJam, Miro, Lookback, Testing Time und Google Analytics gehören zu meinem Alltag, von der Recherche bis zum klickbaren Prototyp.',
    visual: <WerkzeugeVisual />,
  },
  {
    key: 'ki',
    titel: 'KI im Arbeitsalltag',
    text: 'Ich setze Claude und Microsoft Copilot täglich ein und baue mir eigene kleine KI-Tools für wiederkehrende Aufgaben. So bleibt mehr Zeit für Analyse und Konzept.',
    visual: <KiVisual />,
  },
  {
    key: 'ausgleich',
    titel: 'Ausgleich',
    text: 'Fotografie. Nach einem Tag am Bildschirm schaue ich gern durch den Sucher.',
    visual: <KameraVisual />,
  },
];

export function AboutTiles() {
  return (
    <ul className="mt-14 grid gap-5 md:grid-cols-3">
      {KACHELN.map((k, i) => (
        <motion.li key={k.key} initial="rest" animate="rest" whileHover="hover" className="group flex flex-col overflow-hidden rounded-[24px] bg-card p-2">
          <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[18px] p-5">
            <Flaeche i={i} />
            <div className="relative">{k.visual}</div>
          </div>
          <div className="px-4 pb-5 pt-5">
            <h3 className="text-lg">{k.titel}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{k.text}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
