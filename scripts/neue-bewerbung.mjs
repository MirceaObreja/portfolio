// Legt eine neue Bewerbungsseite an.
// Aufruf: npm run neu -- "Firma AG" "Senior Service Designer" [--en]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const args = process.argv.slice(2);
const en = args.includes('--en');
const [firma, stelle] = args.filter((a) => a !== '--en');
if (!firma || !stelle) {
  console.log('Aufruf: npm run neu -- "Firma AG" "Stelle" [--en]');
  process.exit(1);
}

const basis = firma
  .toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/&/g, 'und')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');
const zeichen = 'abcdefghjkmnpqrstuvwxyz23456789';
const code = Array.from(crypto.randomBytes(6), (b) => zeichen[b % zeichen.length]).join('');
const slug = `${basis}-${code}`;
const datei = path.join('content', 'bewerbungen', `${slug}.md`);
const heute = new Date().toISOString().slice(0, 10);

const de = `---
firma: ${firma}
stelle: ${stelle}
sprache: de
anrede: Guten Tag Frau/Herr ...
datum: ${heute}
# Drei Gründe, warum du passt. Titel kurz, Text zwei Sätze mit einem Beleg.
staerken:
  - titel: ...
    text: ...
  - titel: ...
    text: ...
  - titel: ...
    text: ...
# Optional. Ganz löschen, wenn du keine hast.
beobachtungen:
  - titel: ...
    text: ...
# Projekte aus content/projekte ohne .md. Fallstudien erscheinen als grosse Karten.
# Möglich: siemens-xcelerator, bank-cler-zak, privatkredit-fehlerfaelle, retailbank-conversational-ui,
# retailbank-affluent, adac-mautportal, co2-apps, finanz-informationsarchitektur, kanton-steuersoftware,
# pitch-pharma, tiernahrung-landingpages
projekte: [siemens-xcelerator, bank-cler-zak]
---

Erster Absatz: Was die Stelle sucht und wie du arbeitest.

Zweiter Absatz: Warum diese Firma und warum inhouse.
`;

const enText = `---
firma: ${firma}
stelle: ${stelle}
sprache: en
anrede: Dear Ms/Mr ...
datum: ${heute}
staerken:
  - titel: ...
    text: ...
  - titel: ...
    text: ...
  - titel: ...
    text: ...
beobachtungen:
  - titel: ...
    text: ...
projekte: [siemens-xcelerator, bank-cler-zak]
---

First paragraph.

Second paragraph.
`;

fs.writeFileSync(datei, en ? enText : de);
console.log(`\nAngelegt: ${datei}`);
console.log(`Lokal:     http://localhost:3000/f/${slug}`);
console.log(`Online:    https://mircea-obreja.ch/f/${slug}\n`);
