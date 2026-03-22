import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Ремонт-Работа — Найдите мастера рядом',
  description: 'Платформа для поиска проверенных мастеров по ремонту. Электрика, сантехника, отделка и многое другое.',
  keywords: 'ремонт, мастер, электрик, сантехник, услуги',
};

const criticalCss = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; background: #F8FAFC; color: #1e293b; }
  a { color: inherit; text-decoration: none; }
  .rr-header { background: #0A2B4E; color: white; padding: 16px; }
  .rr-header-inner { max-width: 1152px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
  .rr-logo { display: flex; align-items: center; gap: 12px; }
  .rr-logo-icon { width: 40px; height: 40px; background: white; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
  .rr-logo-text { font-size: 20px; font-weight: 700; }
  .rr-nav { display: flex; align-items: center; gap: 24px; }
  .rr-nav a { color: rgba(255,255,255,0.8); }
  .rr-nav a:hover { color: white; }
  .rr-btn-login { background: rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 12px; }
  .rr-btn-register { background: #F97316; padding: 8px 16px; border-radius: 12px; color: white; }
  .rr-hero { background: linear-gradient(135deg, #0A2B4E, #061A30); color: white; padding: 80px 16px; text-align: center; }
  .rr-hero h1 { font-size: clamp(28px, 5vw, 48px); font-weight: 700; margin-bottom: 24px; line-height: 1.2; }
  .rr-hero p { font-size: 18px; color: rgba(255,255,255,0.8); margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; }
  .rr-hero-accent { color: #F97316; }
  .rr-hero-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .rr-btn-accent { background: #F97316; color: white; padding: 16px 32px; border-radius: 12px; font-weight: 600; font-size: 18px; display: inline-flex; align-items: center; gap: 8px; }
  .rr-btn-ghost { background: rgba(255,255,255,0.1); color: white; padding: 16px 32px; border-radius: 12px; font-weight: 600; font-size: 18px; }
  .rr-hero-badges { margin-top: 32px; display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; font-size: 14px; color: rgba(255,255,255,0.7); }
  .rr-section { padding: 64px 16px; }
  .rr-section-white { background: white; }
  .rr-section-gray { background: #F1F5F9; }
  .rr-section-dark { background: #0A2B4E; color: white; text-align: center; }
  .rr-section h2 { font-size: 30px; font-weight: 700; text-align: center; margin-bottom: 16px; }
  .rr-section-sub { color: #64748B; text-align: center; margin-bottom: 40px; }
  .rr-grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; max-width: 1152px; margin: 0 auto; }
  .rr-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 32px; max-width: 1152px; margin: 0 auto; }
  .rr-card { background: white; border-radius: 16px; padding: 24px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #F1F5F9; }
  .rr-card h3 { font-weight: 600; margin: 8px 0 4px; }
  .rr-card p { color: #64748B; font-size: 14px; }
  .rr-icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 24px; }
  .rr-icon-yellow { background: #FEF9C3; }
  .rr-icon-blue { background: #DBEAFE; }
  .rr-icon-green { background: #DCFCE7; }
  .rr-icon-purple { background: #F3E8FF; }
  .rr-icon-navy { background: #E8EEF5; }
  .rr-step { display: flex; gap: 24px; align-items: flex-start; max-width: 700px; margin: 0 auto 32px; }
  .rr-step-num { width: 48px; height: 48px; background: #F97316; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; flex-shrink: 0; }
  .rr-step h3 { font-size: 18px; font-weight: 600; margin-bottom: 4px; }
  .rr-step p { color: #64748B; }
  .rr-cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 32px; }
  .rr-footer { background: #061A30; color: rgba(255,255,255,0.5); padding: 32px 16px; text-align: center; font-size: 14px; }
  @media (max-width: 768px) { .rr-nav { display: none; } }
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
