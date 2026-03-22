'use client';

import { useQuery } from '@tanstack/react-query';
import { orderApi, categoryApi } from '@/lib/api';
import Link from 'next/link';
import { Plus, ChevronRight, Zap, Droplets, PaintBucket, Package, DoorOpen, Layers } from 'lucide-react';
import { Order, OrderStatus, ORDER_STATUS_LABELS } from '@/types';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Электрика': <Zap className="text-yellow-500" />,
  'Сантехника': <Droplets className="text-blue-500" />,
  'Отделочные работы': <PaintBucket className="text-green-500" />,
  'Мебель и сборка': <Package className="text-purple-500" />,
  'Двери и окна': <DoorOpen className="text-orange-500" />,
  'Полы': <Layers className="text-teal-500" />,
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: 'bg-slate-100 text-slate-600',
  SEARCHING: 'bg-orange-100 text-orange-700',
  ACCEPTED: 'bg-blue-100 text-blue-700',
  IN_PROGRESS: 'bg-purple-100 text-purple-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED_BY_CLIENT: 'bg-red-100 text-red-700',
  CANCELLED_BY_MASTER: 'bg-red-100 text-red-700',
  DISPUTED: 'bg-amber-100 text-amber-700',
};

export default function ClientDashboard() {
  const { data: ordersData } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderApi.getAll({ limit: 5 }).then((r) => r.data),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getAll().then((r) => r.data),
  });

  const activeOrders: Order[] = (ordersData?.orders || []).filter((o: Order) =>
    ['PENDING', 'SEARCHING', 'ACCEPTED', 'IN_PROGRESS'].includes(o.status)
  );

  return (
    <div className="space-y-6">
      {/* Quick order CTA */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-1">Нужен мастер?</h2>
        <p className="text-white/70 mb-4">Оставьте заявку — подберём специалиста рядом с вами</p>
        <Link href="/client/create-order" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 px-5 py-2.5 rounded-xl font-medium transition-colors">
          <Plus size={18} /> Создать заказ
        </Link>
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Категории услуг</h3>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {(categories || []).slice(0, 6).map((cat: { id: string; name: string; icon?: string }) => (
            <Link
              key={cat.id}
              href={`/client/create-order?categoryId=${cat.id}`}
              className="card p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">{cat.icon || CATEGORY_ICONS[cat.name] || '🔧'}</div>
              <div className="text-xs font-medium text-slate-700 leading-tight">{cat.name}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Active orders */}
      {activeOrders.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Активные заказы</h3>
            <Link href="/client/orders" className="text-primary-500 text-sm flex items-center gap-1 hover:underline">
              Все заказы <ChevronRight size={16} />
            </Link>
          </div>
          <div className="space-y-3">
            {activeOrders.map((order) => (
              <Link key={order.id} href={`/client/orders/${order.id}`} className="card block hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{order.category?.name || 'Заказ'}</div>
                    <div className="text-sm text-slate-500 mt-0.5">{order.address}</div>
                    <div className="text-xs text-slate-400 mt-1">
                      {format(new Date(order.desiredDate), 'd MMM yyyy', { locale: ru })}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`status-badge ${STATUS_COLORS[order.status]}`}>
                      {ORDER_STATUS_LABELS[order.status]}
                    </span>
                    {order.clientPrice && (
                      <span className="font-bold text-lg">{order.clientPrice.toFixed(0)} ₽</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
