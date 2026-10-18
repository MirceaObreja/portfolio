'use client';
import { motion, useReducedMotion } from 'motion/react';
import { Wrench } from 'lucide-react';

// Markenzeichen aus Simple Icons (CC0), nur zur Kennzeichnung der genutzten Werkzeuge
const ICON: Record<'figma' | 'miro' | 'googleanalytics' | 'claude', string> = {
  'figma': 'M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z',
  'miro': 'M17.392 0H13.9L17 4.808 10.444 0H6.949l3.102 6.3L3.494 0H0l3.05 8.131L0 24h3.494L10.05 6.985 6.949 24h3.494L17 5.494 13.899 24h3.493L24 3.672 17.392 0z',
  'googleanalytics': 'M22.84 2.9982v17.9987c.0086 1.6473-1.3197 2.9897-2.967 2.9984a2.9808 2.9808 0 01-.3677-.0208c-1.528-.226-2.6477-1.5558-2.6105-3.1V3.1204c-.0369-1.5458 1.0856-2.8762 2.6157-3.1 1.6361-.1915 3.1178.9796 3.3093 2.6158.014.1201.0208.241.0202.3619zM4.1326 18.0548c-1.6417 0-2.9726 1.331-2.9726 2.9726C1.16 22.6691 2.4909 24 4.1326 24s2.9726-1.3309 2.9726-2.9726-1.331-2.9726-2.9726-2.9726zm7.8728-9.0098c-.0171 0-.0342 0-.0513.0003-1.6495.0904-2.9293 1.474-2.891 3.1256v7.9846c0 2.167.9535 3.4825 2.3505 3.763 1.6118.3266 3.1832-.7152 3.5098-2.327.04-.1974.06-.3983.0593-.5998v-8.9585c.003-1.6474-1.33-2.9852-2.9773-2.9882z',
  'claude': 'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z'
};

function Logo({ d, fill }: { d: string; fill: string }) {
  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
      <path d={d} fill={fill} />
    </svg>
  );
}

function App({ children, label, bg = '#ffffff', i, rotate = 0 }: { children: React.ReactNode; label: string; bg?: string; i: number; rotate?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      title={label}
      className="relative grid size-16 place-items-center rounded-[18px] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_-12px_rgba(31,43,51,0.35)]"
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

function Initialen({ t, color }: { t: string; color: string }) {
  return (
    <span aria-hidden className="text-[17px] font-bold tracking-tight" style={{ color }}>
      {t}
    </span>
  );
}

function WerkzeugeVisual() {
  return (
    <div className="grid grid-cols-3 place-items-center gap-3 md:gap-4">
      <App i={0} label="Figma" rotate={-6}><Logo d={ICON.figma} fill="#1f2b33" /></App>
      <App i={1} label="FigJam" bg="#9747ff" rotate={4}><Initialen t="Fj" color="#ffffff" /></App>
      <App i={2} label="Miro" bg="#ffd02f" rotate={-3}><Logo d={ICON.miro} fill="#050038" /></App>
      <App i={3} label="Lookback" bg="#1f2b33" rotate={5}><Initialen t="Lb" color="#ffffff" /></App>
      <App i={4} label="Testing Time" rotate={-4}><Initialen t="TT" color="#354857" /></App>
      <App i={5} label="Google Analytics" rotate={3}><Logo d={ICON.googleanalytics} fill="#e37400" /></App>
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
      <App i={0} label="Claude" rotate={-5}><Logo d={ICON.claude} fill="#d97757" /></App>
      <App i={1} label="Eigene KI-Tools" bg="#1f2b33"><Wrench className="size-7 text-white" aria-hidden /></App>
      <App i={2} label="Microsoft Copilot" rotate={5}><Initialen t="Co" color="#0078d4" /></App>
    </div>
  );
}

const ECKEN = [
  'left-3 top-3 border-l-2 border-t-2',
  'right-3 top-3 border-r-2 border-t-2',
  'left-3 bottom-3 border-l-2 border-b-2',
  'right-3 bottom-3 border-r-2 border-b-2',
];

function SucherVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-[radial-gradient(120%_90%_at_70%_20%,#c7ccc2_0%,#9eaaa2_30%,#51686f_65%,#1f2b33_100%)]">
      <svg aria-hidden viewBox="0 0 400 100" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[42%] w-full">
        <path d="M0 100 L0 58 L60 30 L110 52 L170 12 L240 58 L300 34 L400 66 L400 100 Z" fill="rgba(31,43,51,0.55)" />
        <path d="M0 100 L0 78 L80 60 L150 76 L230 54 L320 74 L400 62 L400 100 Z" fill="rgba(31,43,51,0.85)" />
      </svg>
      {ECKEN.map((c) => (
        <span key={c} aria-hidden className={`absolute size-5 border-white/80 ${c}`} />
      ))}
      <motion.span
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-[1.5px]"
        variants={{
          rest: { width: 64, height: 44, borderColor: 'rgba(255,255,255,0.9)' },
          hover: { width: 40, height: 28, borderColor: 'rgba(74,222,128,1)', transition: { type: 'spring', stiffness: 260, damping: 16 } },
        }}
      />
      <div aria-hidden className="absolute inset-x-0 bottom-2.5 flex justify-center gap-4 text-[11px] font-medium tabular-nums tracking-wide text-white/90">
        <span>f/2.8</span>
        <span>1/250</span>
        <span>ISO 100</span>
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
    voll: false,
  },
  {
    key: 'ki',
    titel: 'KI im Arbeitsalltag',
    text: 'Ich setze Claude und Microsoft Copilot täglich ein und baue mir eigene kleine KI-Tools für wiederkehrende Aufgaben. So bleibt mehr Zeit für Analyse und Konzept.',
    visual: <KiVisual />,
    voll: false,
  },
  {
    key: 'ausgleich',
    titel: 'Ausgleich',
    text: 'Fotografie. Nach einem Tag am Bildschirm schaue ich gern durch den Sucher.',
    visual: <SucherVisual />,
    voll: true,
  },
];

export function AboutTiles() {
  return (
    <ul className="mt-14 grid gap-5 md:grid-cols-3">
      {KACHELN.map((k) => (
        <motion.li key={k.key} initial="rest" animate="rest" whileHover="hover" className="flex flex-col overflow-hidden rounded-[24px] bg-card p-2">
          <div
            className={`grid aspect-[4/3] place-items-center rounded-[18px] ${
              k.voll ? '' : 'bg-[radial-gradient(120%_100%_at_50%_0%,#f8f7f2_0%,#eceee8_60%,#dfe3dc_100%)] p-5'
            }`}
          >
            {k.visual}
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
