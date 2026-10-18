import { zeitraum, type Projekt, type Sprache } from './content';
import type { ProjektKarte } from '@/components/project-explorer';

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
