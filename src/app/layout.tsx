import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Ремонт-Работа — Найдите мастера рядом',
  description: 'Платформа для поиска проверенных мастеров по ремонту. Электрика, сантехника, отделка и многое другое.',
  keywords: 'ремонт, мастер, электрик, сантехник, услуги',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
