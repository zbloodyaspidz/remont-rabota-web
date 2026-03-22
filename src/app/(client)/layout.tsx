import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Home, Receipt, User, Bell } from 'lucide-react';

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  if (!session) redirect('/login');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top nav */}
      <header className="bg-primary-500 text-white px-4 py-3 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary-500 font-bold text-xs">РР</span>
            </div>
            <span className="font-semibold">Ремонт-Работа</span>
          </div>
          <Link href="/client/notifications" className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <Bell size={20} />
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {children}
      </main>

      {/* Bottom nav */}
      <nav className="bg-white border-t border-slate-100 px-4 py-2 sticky bottom-0">
        <div className="max-w-2xl mx-auto flex">
          {[
            { href: '/client', icon: Home, label: 'Главная' },
            { href: '/client/orders', icon: Receipt, label: 'Заказы' },
            { href: '/client/profile', icon: User, label: 'Профиль' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="flex-1 flex flex-col items-center gap-1 py-2 text-slate-500 hover:text-primary-500 transition-colors">
              <item.icon size={22} />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
