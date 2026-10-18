import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mircea-obreja.ch'),
  title: 'Mircea Obreja – Service Design und UX-Strategie',
  description: 'Fallstudien und Projekte aus Banking, B2B-Plattformen und öffentlicher Verwaltung.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body id="top">{children}</body>
    </html>
  );
}
