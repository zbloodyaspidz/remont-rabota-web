'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/api';
import { User } from '@/types';
import { useState } from 'react';
import { Search, Ban, CheckCircle, Shield } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function AdminUsersPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users', search, role, page],
    queryFn: () => adminApi.listUsers({ search: search || undefined, role: role || undefined, page, limit: 20 }).then(r => r.data),
  });

  const { mutate: toggleBlock } = useMutation({
    mutationFn: (id: string) => adminApi.blockUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const { mutate: verifyMaster } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => adminApi.verifyMaster(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Пользователи</h1>
        <p className="text-slate-500">Управление аккаунтами клиентов и мастеров</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            className="input pl-9"
            placeholder="Поиск по имени или телефону..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <select value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }} className="input w-36">
          <option value="">Все роли</option>
          <option value="CLIENT">Клиенты</option>
          <option value="MASTER">Мастера</option>
          <option value="ADMIN">Администраторы</option>
        </select>
      </div>

      {isLoading ? (
        <div className="card flex items-center justify-center h-48">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Пользователь', 'Телефон', 'Роль', 'Статус', 'Рейтинг', 'Дата', 'Действия'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-sm font-medium text-slate-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {(data?.users || []).map((user: User) => (
                <tr key={user.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold">
                        {user.fullName?.[0] || user.phone[0]}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{user.fullName || '—'}</div>
                        <div className="text-xs text-slate-400">{user.email || ''}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{user.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`status-badge ${
                      user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'MASTER' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {user.role === 'ADMIN' ? 'Администратор' : user.role === 'MASTER' ? 'Мастер' : 'Клиент'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {user.isBlocked ? (
                      <span className="status-badge bg-red-100 text-red-700">Заблокирован</span>
                    ) : user.masterProfile ? (
                      <span className={`status-badge ${
                        user.masterProfile.verificationStatus === 'VERIFIED' ? 'bg-green-100 text-green-700' :
                        user.masterProfile.verificationStatus === 'REJECTED' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {user.masterProfile.verificationStatus === 'VERIFIED' ? '✓ Верифицирован' :
                         user.masterProfile.verificationStatus === 'REJECTED' ? '✗ Отклонён' : '⏳ На проверке'}
                      </span>
                    ) : (
                      <span className="status-badge bg-green-100 text-green-700">Активен</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {user.masterProfile ? `⭐ ${user.masterProfile.rating.toFixed(1)}` : '—'}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">
                    {format(new Date(user.createdAt), 'd MMM yy', { locale: ru })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleBlock(user.id)}
                        className={`p-1.5 rounded-lg transition-colors ${user.isBlocked ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
                        title={user.isBlocked ? 'Разблокировать' : 'Заблокировать'}
                      >
                        {user.isBlocked ? <CheckCircle size={16} /> : <Ban size={16} />}
                      </button>
                      {user.masterProfile && user.masterProfile.verificationStatus === 'PENDING' && (
                        <>
                          <button
                            onClick={() => verifyMaster({ id: user.id, status: 'VERIFIED' })}
                            className="p-1.5 rounded-lg bg-green-100 text-green-600 hover:bg-green-200"
                            title="Верифицировать"
                          >
                            <Shield size={16} />
                          </button>
                          <button
                            onClick={() => verifyMaster({ id: user.id, status: 'REJECTED' })}
                            className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                            title="Отклонить"
                          >
                            <Ban size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
