import type { Metadata } from 'next';
import { ScrollRuhe } from '@/components/scroll-ruhe';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mircea-obreja.ch'),
  title: 'Mircea Obreja – Service Design und UX-Strategie',
  description: 'Fallstudien und Projekte aus Banking, B2B-Plattformen und öffentlicher Verwaltung.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-scroll-behavior="smooth">
      <body id="top" suppressHydrationWarning>
        <ScrollRuhe />
        {children}
      </body>
    </html>
  );
}
