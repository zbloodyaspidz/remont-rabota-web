'use client';

import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/lib/api';
import { Order, OrderStatus, ORDER_STATUS_LABELS } from '@/types';
import { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: 'bg-slate-100 text-slate-700',
  SEARCHING: 'bg-orange-100 text-orange-700',
  ACCEPTED: 'bg-blue-100 text-blue-700',
  IN_PROGRESS: 'bg-purple-100 text-purple-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED_BY_CLIENT: 'bg-red-100 text-red-700',
  CANCELLED_BY_MASTER: 'bg-red-100 text-red-700',
  DISPUTED: 'bg-amber-100 text-amber-700',
};

export default function AdminOrdersPage() {
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-orders', status, page],
    queryFn: () => adminApi.getOrders({ status: status || undefined, page, limit: 20 }).then(r => r.data),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Заказы</h1>
          <p className="text-slate-500">Управление всеми заказами платформы</p>
        </div>
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="input w-48"
        >
          <option value="">Все статусы</option>
          {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="card flex items-center justify-center h-48">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {['Заказ', 'Клиент', 'Мастер', 'Стоимость', 'Комиссия', 'Клиент платит', 'Статус', 'Дата'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-sm font-medium text-slate-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {(data?.orders || []).map((order: Order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-sm">{order.category?.name}</div>
                      <div className="text-xs text-slate-400 truncate max-w-[140px]">{order.address}</div>
                    </td>
                    <td className="px-4 py-3 text-sm">{order.client?.fullName || '—'}</td>
                    <td className="px-4 py-3 text-sm">{order.master?.fullName || '—'}</td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {order.workPrice ? `${order.workPrice.toFixed(0)} ₽` : '—'}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">
                      {order.commission ? `${order.commission.toFixed(0)} ₽` : '—'}
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-primary-500">
                      {order.clientPrice ? `${order.clientPrice.toFixed(0)} ₽` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`status-badge ${STATUS_COLORS[order.status]}`}>
                        {ORDER_STATUS_LABELS[order.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400">
                      {format(new Date(order.createdAt), 'd MMM yy', { locale: ru })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data && data.pages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
              <span className="text-sm text-slate-500">Всего: {data.total}</span>
              <div className="flex gap-2">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="btn-outline px-3 py-1.5 text-sm disabled:opacity-40">←</button>
                <span className="px-3 py-1.5 text-sm">{page} / {data.pages}</span>
                <button disabled={page === data.pages} onClick={() => setPage(p => p + 1)} className="btn-outline px-3 py-1.5 text-sm disabled:opacity-40">→</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
