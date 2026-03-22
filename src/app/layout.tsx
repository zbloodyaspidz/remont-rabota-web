import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Ремонт-Работа — Найдите мастера рядом',
  description: 'Платформа для поиска проверенных мастеров по ремонту. Электрика, сантехника, отделка и многое другое.',
  keywords: 'ремонт, мастер, электрик, сантехник, услуги',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
