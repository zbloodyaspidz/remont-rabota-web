import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, Receipt, Star, Settings, LogOut } from 'lucide-react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  if (!session || session.user?.role !== 'ADMIN') redirect('/login');

  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Дашборд' },
    { href: '/admin/users', icon: Users, label: 'Пользователи' },
    { href: '/admin/orders', icon: Receipt, label: 'Заказы' },
    { href: '/admin/reviews', icon: Star, label: 'Отзывы' },
    { href: '/admin/settings', icon: Settings, label: 'Настройки' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-500 text-white min-h-screen fixed left-0 top-0 z-30 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-primary-500 font-bold text-sm">РР</span>
            </div>
            <div>
              <div className="font-bold">Ремонт-Работа</div>
              <div className="text-xs text-white/60">Администратор</div>
            </div>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6">
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-white/70">
            <LogOut size={18} />
            <span>Выйти</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-64">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
