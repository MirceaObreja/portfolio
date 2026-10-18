# Portfolio mircea-obreja.ch

Next.js (App Router, Server Components), Tailwind CSS 4, shadcn/ui, Motion. Hosting über GitHub und Vercel.

## Lokal starten

Voraussetzung: Node.js ab Version 20.

```
npm install
npm run dev
```

Die Seite läuft danach unter http://localhost:3000.

## Schrift BDO Grotesk einbinden

BDO Grotesk ist nicht über npm oder Google Fonts verfügbar. Die Schriftdatei beim Hersteller herunterladen und die Lizenz für die Nutzung auf einer Website prüfen. Danach die variable Datei als `public/fonts/BDOGrotesk-Variable.woff2` ablegen. Die Seite nutzt sie dann automatisch. Bis dahin wird Hanken Grotesk als Ersatz angezeigt.

Liegen nur einzelne Schnitte vor (z. B. Regular und Medium), in `src/app/globals.css` den `@font-face`-Block pro Datei anlegen.

## Inhalte

Alle Texte liegen als Markdown-Dateien im Ordner `content`.

- `content/projekte`: ein Projekt pro Datei. `phasen` steuert die Rauten und den Filter, `fallstudie: true` erzeugt eine eigene Seite unter `/projekte/<dateiname>`, `sichtbar: false` versteckt ein Projekt.
- `content/bewerbungen`: eine Bewerbungsseite pro Datei, erreichbar unter `/f/<dateiname>`.

## Neue Bewerbungsseite anlegen

1. `content/bewerbungen/beispiel-energie-7k3m9q.md` kopieren und umbenennen, zum Beispiel `firmenname-x8f2kq.md`. Die Zeichen am Ende machen die Adresse schwer erratbar.
2. Oben ausfüllen: `firma`, `stelle`, `sprache` (`de` oder `en`), `anrede`, drei `staerken`, optional `beobachtungen`, und unter `projekte` die Dateinamen der passenden Projekte. Statt `projekte` geht auch `branchen: [Banking]`.
3. Unter dem zweiten `---` das Anschreiben als normalen Text schreiben.
4. Committen und pushen. Vercel veröffentlicht die Seite automatisch.

Bewerbungsseiten sind nicht verlinkt und für Suchmaschinen gesperrt (`noindex` und `robots.txt`). Die Beispieldatei vor dem ersten Veröffentlichen löschen.

## Veröffentlichen mit Vercel

1. Ein neues Repository auf GitHub anlegen und den Ordner hochladen.
2. Auf vercel.com mit GitHub anmelden, «Add New Project» wählen und das Repository importieren. Vercel erkennt Next.js selbst, es sind keine Einstellungen nötig.
3. Unter Settings, Domains `mircea-obreja.ch` und `www.mircea-obreja.ch` hinzufügen und die DNS-Einträge beim Domain-Anbieter so setzen, wie Vercel sie anzeigt.

Jeder Push auf GitHub löst danach einen neuen Build aus.

## Aufbau

- `src/app/page.tsx`: Startseite
- `src/app/projekte/[slug]/page.tsx`: Fallstudien
- `src/app/f/[slug]/page.tsx`: Bewerbungsseiten
- `src/components`: Bausteine. `ui/` enthält die shadcn-Komponenten.
- `src/lib/content.ts`: liest die Markdown-Dateien
- `src/app/globals.css`: Farben, Schrift und Radien als Variablen
