'use client';

import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/lib/api';
import { AdminStats } from '@/types';
import { Users, Receipt, CheckCircle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery<AdminStats>({
    queryKey: ['admin-stats'],
    queryFn: () => adminApi.getStats().then((r) => r.data),
    refetchInterval: 60000,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const metrics = [
    { label: 'Всего пользователей', value: stats?.totalUsers ?? 0, icon: Users, color: 'text-blue-500 bg-blue-50' },
    { label: 'Мастеров', value: stats?.totalMasters ?? 0, icon: Users, color: 'text-purple-500 bg-purple-50' },
    { label: 'Завершённых заказов', value: stats?.completedOrders ?? 0, icon: CheckCircle, color: 'text-green-500 bg-green-50' },
    { label: 'Доход платформы', value: `${(stats?.totalRevenue ?? 0).toLocaleString()} ₽`, icon: TrendingUp, color: 'text-accent-500 bg-accent-50' },
    { label: 'Активных заказов', value: stats?.activeOrders ?? 0, icon: Receipt, color: 'text-orange-500 bg-orange-50' },
    { label: 'Всего заказов', value: stats?.totalOrders ?? 0, icon: Receipt, color: 'text-slate-500 bg-slate-50' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Дашборд</h1>
        <p className="text-slate-500">Актуальная статистика платформы</p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">{m.label}</p>
                <p className="text-2xl font-bold text-slate-800">{m.value}</p>
              </div>
              <div className={`w-10 h-10 ${m.color} rounded-xl flex items-center justify-center`}>
                <m.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Orders chart */}
      {stats?.ordersByDay && stats.ordersByDay.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-6">Заказы за последние 30 дней</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.ordersByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                tickFormatter={(d) => format(new Date(d), 'd MMM', { locale: ru })}
                tick={{ fontSize: 12, fill: '#94a3b8' }}
              />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip
                labelFormatter={(d) => format(new Date(d as string), 'd MMMM', { locale: ru })}
                formatter={(v: number) => [v, 'Заказов']}
              />
              <Bar dataKey="count" fill="#0A2B4E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
