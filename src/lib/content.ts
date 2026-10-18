import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export const PHASEN = ['discover', 'define', 'develop', 'deliver'] as const;
export type Phase = (typeof PHASEN)[number];
export type Sprache = 'de' | 'en';

export type Projekt = {
  id: string;
  titel: string;
  kunde: string;
  start: string;
  ende: string;
  laufend: boolean;
  rolle: string;
  kurz: string;
  ergebnis?: string;
  kennzahl?: string;
  branchen: string[];
  methoden: string[];
  phasen: Phase[];
  fallstudie: boolean;
  reihenfolge: number;
  sichtbar: boolean;
  body: string;
};

export type Bewerbung = {
  id: string;
  firma: string;
  stelle: string;
  sprache: Sprache;
  anrede?: string;
  staerken: { titel: string; text: string }[];
  beobachtungen?: { titel: string; text: string }[];
  projekte?: string[];
  branchen?: string[];
  body: string;
};

const root = path.join(process.cwd(), 'content');

function lesen<T>(ordner: string, map: (id: string, data: Record<string, unknown>, body: string) => T): T[] {
  const dir = path.join(root, ordner);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
      return map(f.replace(/\.md$/, ''), data, content.trim());
    });
}

export function alleProjekte(): Projekt[] {
  return lesen('projekte', (id, d, body) => ({
    id,
    titel: String(d.titel),
    kunde: String(d.kunde),
    start: String(d.start),
    ende: String(d.ende),
    laufend: Boolean(d.laufend),
    rolle: String(d.rolle),
    kurz: String(d.kurz),
    ergebnis: d.ergebnis ? String(d.ergebnis) : undefined,
    kennzahl: d.kennzahl ? String(d.kennzahl) : undefined,
    branchen: (d.branchen as string[]) ?? [],
    methoden: (d.methoden as string[]) ?? [],
    phasen: (d.phasen as Phase[]) ?? [],
    fallstudie: Boolean(d.fallstudie),
    reihenfolge: typeof d.reihenfolge === 'number' ? d.reihenfolge : 99,
    sichtbar: d.sichtbar !== false,
    body,
  }))
    .filter((p) => p.sichtbar)
    .sort((a, b) => b.start.localeCompare(a.start) || a.reihenfolge - b.reihenfolge);
}

export function fallstudien(): Projekt[] {
  return alleProjekte()
    .filter((p) => p.fallstudie)
    .sort((a, b) => a.reihenfolge - b.reihenfolge);
}

export function alleBewerbungen(): Bewerbung[] {
  return lesen('bewerbungen', (id, d, body) => ({
    id,
    firma: String(d.firma),
    stelle: String(d.stelle),
    sprache: d.sprache === 'en' ? 'en' : 'de',
    anrede: d.anrede ? String(d.anrede) : undefined,
    staerken: (d.staerken as Bewerbung['staerken']) ?? [],
    beobachtungen: d.beobachtungen as Bewerbung['beobachtungen'],
    projekte: d.projekte as string[] | undefined,
    branchen: d.branchen as string[] | undefined,
    body,
  }));
}

const MONATE = {
  de: ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};
const monat = (s: string, l: Sprache) => {
  const [j, m] = s.split('-').map(Number);
  return `${MONATE[l][m - 1]} ${j}`;
};
export function zeitraum(p: Projekt, l: Sprache = 'de') {
  if (p.laufend) return `${l === 'de' ? 'seit' : 'since'} ${monat(p.start, l)}`;
  if (p.start === p.ende) return monat(p.start, l);
  return `${monat(p.start, l)} – ${monat(p.ende, l)}`;
}
