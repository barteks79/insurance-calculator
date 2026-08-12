import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Kalkulator Składek',
  description: 'Oblicz wartość składek podstawowych ubezpieczeń.'
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pl" className={`${geistSans.variable} h-full antialiased`}>
      <body className="dark min-h-full flex flex-col">{children}</body>
    </html>
  );
}
