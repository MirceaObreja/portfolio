import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mircea-obreja.ch'),
  title: 'Mircea Obreja – Service Design und UX-Strategie',
  description: 'Fallstudien und Projekte aus Banking, B2B-Plattformen und öffentlicher Verwaltung.',
  icons: { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 24'%3E%3Cpath d='M1 12 L16 1 L31 12 L16 23Z M33 12 L48 1 L63 12 L48 23Z' fill='%232e4bff'/%3E%3C/svg%3E" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
