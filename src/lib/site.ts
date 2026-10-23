import type { Phase, Sprache } from './content';

export const KONTAKT = {
  name: 'Mircea Obreja',
  email: 'contact@mircea-obreja.ch',
  linkedin: 'https://www.linkedin.com/in/mircea-obreja/',
};

export const PHASEN_TEXT: Record<Sprache, Record<Phase, { name: string; text: string; methoden: string[] }>> = {
  de: {
    discover: { name: 'Discover', text: 'Verstehen, wie Menschen heute vorgehen und wo sie hängen bleiben. Dafür kombiniere ich Research, Web Analytics und Desk Research.', methoden: ['Desk Research', 'Wettbewerbsanalyse', 'Benchmarking', 'Web Analytics', 'Expert Review', 'Interviews'] },
    define: { name: 'Define', text: 'Erkenntnisse verdichten, das eigentliche Problem benennen und daraus prüfbare Hypothesen ableiten.', methoden: ['Insight-Synthese', 'Hypothesen', 'Customer Journey', 'Informationsarchitektur', 'Stakeholder-Workshops'] },
    develop: { name: 'Develop', text: 'Lösungen als User Flows und Wireframes ausarbeiten und zu klickbaren Prototypen verbinden.', methoden: ['User Flows', 'Wireframes', 'Klickbare Prototypen', 'Interaction Design', 'Nudging'] },
    deliver: { name: 'Deliver', text: 'Mit Nutzerinnen und Nutzern testen, nachbessern und das fertige Konzept an UI-Design und Entwicklung übergeben.', methoden: ['Usability-Tests', 'SUS und SEQ', 'A/B-Test-Konzept', 'Iteration', 'Übergabe an UI und Entwicklung'] },
  },
  en: {
    discover: { name: 'Discover', text: 'Use research, analytics and desk research to understand how people work today and where they get stuck.', methoden: ['Desk research', 'Competitor analysis', 'Benchmarking', 'Web analytics', 'Expert review', 'Interviews'] },
    define: { name: 'Define', text: 'Condense the findings, name the real problem and formulate hypotheses.', methoden: ['Insight synthesis', 'Hypotheses', 'Customer journey', 'Information architecture', 'Stakeholder workshops'] },
    develop: { name: 'Develop', text: 'Develop solutions, work them out as wireframes and connect them into clickable prototypes.', methoden: ['User flows', 'Wireframes', 'Clickable prototypes', 'Interaction design', 'Nudging'] },
    deliver: { name: 'Deliver', text: 'Test with users, iterate, finalise and hand over to UI design or development.', methoden: ['Usability testing', 'SUS and SEQ', 'A/B test concept', 'Iteration', 'Handover to UI and development'] },
  },
};
