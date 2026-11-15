import { zeitraum, type Projekt, type Sprache } from './content';

export type ProjektKarte = {
  id: string;
  titel: string;
  kunde: string;
  zeitraum: string;
  rolle: string;
  kurz: string;
  ergebnis?: string;
  tags: string[];
  phasen: string[];
  fallstudie: boolean;
};

export const zuKarte = (p: Projekt, l: Sprache = 'de'): ProjektKarte => ({
  id: p.id,
  titel: p.titel,
  kunde: p.kunde,
  zeitraum: zeitraum(p, l),
  rolle: p.rolle,
  kurz: p.kurz,
  ergebnis: p.ergebnis,
  tags: [...p.branchen, ...p.methoden],
  phasen: p.phasen,
  fallstudie: p.fallstudie,
});
