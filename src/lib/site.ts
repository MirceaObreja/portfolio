import type { Phase, Sprache } from './content';

export const KONTAKT = {
  name: 'Mircea Obreja',
  email: 'contact@mircea-obreja.ch',
  linkedin: 'https://www.linkedin.com/in/mircea-obreja/',
};

export const PHASEN_TEXT: Record<Sprache, Record<Phase, { name: string; text: string }>> = {
  de: {
    discover: { name: 'Discover', text: 'Mit Research, Analytics und Desk Research verstehen, wie Menschen heute vorgehen und wo sie scheitern.' },
    define: { name: 'Define', text: 'Erkenntnisse verdichten, das eigentliche Problem benennen und Hypothesen formulieren.' },
    develop: { name: 'Develop', text: 'Lösungen entwickeln, als Wireframes ausarbeiten und zu klickbaren Prototypen verbinden.' },
    deliver: { name: 'Deliver', text: 'Mit Nutzerinnen und Nutzern testen, iterieren, finalisieren und an UI-Design oder Entwicklung übergeben.' },
  },
  en: {
    discover: { name: 'Discover', text: 'Use research, analytics and desk research to understand how people work today and where they get stuck.' },
    define: { name: 'Define', text: 'Condense the findings, name the real problem and formulate hypotheses.' },
    develop: { name: 'Develop', text: 'Develop solutions, work them out as wireframes and connect them into clickable prototypes.' },
    deliver: { name: 'Deliver', text: 'Test with users, iterate, finalise and hand over to UI design or development.' },
  },
};
