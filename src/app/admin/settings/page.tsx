'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/api';
import { SystemSettings } from '@/types';
import { useState, useEffect } from 'react';
import { Save, Settings } from 'lucide-react';

export default function AdminSettingsPage() {
  const qc = useQueryClient();
  const [saved, setSaved] = useState(false);

  const { data: settings, isLoading } = useQuery<SystemSettings>({
    queryKey: ['admin-settings'],
    queryFn: () => adminApi.getSettings().then(r => r.data),
  });

  const [commission, setCommission] = useState(250);
  const [radius, setRadius] = useState(10);
  const [timeout, setTimeout_] = useState(180);
  const [retryInterval, setRetryInterval] = useState(300);

  useEffect(() => {
    if (settings) {
      setCommission(settings.orderCommission);
      setRadius(settings.defaultRadius);
      setTimeout_(settings.searchTimeout);
      setRetryInterval(settings.retryInterval);
    }
  }, [settings]);

  const { mutate: save, isPending } = useMutation({
    mutationFn: () => adminApi.updateSettings({ orderCommission: commission, defaultRadius: radius, searchTimeout: timeout, retryInterval }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-settings'] });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
  });

  if (isLoading) return <div className="card flex items-center justify-center h-48"><div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Настройки системы</h1>
        <p className="text-slate-500">Управление параметрами платформы</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <Save size={16} /> Настройки сохранены
        </div>
      )}

      <div className="card space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
            <Settings size={20} className="text-primary-500" />
          </div>
          <div>
            <h2 className="font-semibold">Финансовые настройки</h2>
            <p className="text-sm text-slate-500">Применяются к новым заказам</p>
          </div>
        </div>

        <div>
          <label className="label">Комиссия платформы за заказ (₽)</label>
          <input
            type="number"
            className="input"
            value={commission}
            onChange={(e) => setCommission(Number(e.target.value))}
            min={0}
            step={10}
          />
          <p className="text-xs text-slate-500 mt-1">
            Текущее значение: <strong>{commission} ₽</strong>. Добавляется к стоимости работ мастера.
          </p>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <h3 className="font-medium mb-4">Параметры поиска</h3>
          <div className="space-y-4">
            <div>
              <label className="label">Радиус поиска по умолчанию (км)</label>
              <input type="number" className="input" value={radius} onChange={(e) => setRadius(Number(e.target.value))} min={1} max={100} />
            </div>
            <div>
              <label className="label">Таймаут ответа мастера (секунды)</label>
              <input type="number" className="input" value={timeout} onChange={(e) => setTimeout_(Number(e.target.value))} min={30} max={600} />
              <p className="text-xs text-slate-500 mt-1">Сколько секунд мастер может принять заказ</p>
            </div>
            <div>
              <label className="label">Интервал повторного поиска (секунды)</label>
              <input type="number" className="input" value={retryInterval} onChange={(e) => setRetryInterval(Number(e.target.value))} min={60} max={3600} />
              <p className="text-xs text-slate-500 mt-1">Если мастера не найдены, повторить через N секунд</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => save()}
          disabled={isPending}
          className="btn-primary inline-flex items-center gap-2 w-auto px-8"
        >
          <Save size={18} />
          {isPending ? 'Сохраняем...' : 'Сохранить настройки'}
        </button>
      </div>
    </div>
  );
}
