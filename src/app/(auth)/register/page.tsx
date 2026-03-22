'use client';

import { Suspense } from 'react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/lib/api';
import { signIn } from 'next-auth/react';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') || 'CLIENT';

  const [role, setRole] = useState<'CLIENT' | 'MASTER'>(defaultRole as 'CLIENT' | 'MASTER');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError('Пароли не совпадают'); return; }
    setLoading(true);
    setError('');
    try {
      await authApi.register({ phone, fullName, password, role });
      await signIn('credentials', { phone, password, redirect: false });
      router.push('/dashboard');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Ошибка регистрации';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-sm">РР</span>
        </div>
        <h1 className="text-xl font-bold text-primary-500">Создать аккаунт</h1>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {([['CLIENT', 'Клиент', 'Заказываю услуги'], ['MASTER', 'Мастер', 'Оказываю услуги']] as const).map(([r, label, sub]) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${role === r ? 'border-primary-500 bg-primary-50' : 'border-slate-200 hover:border-slate-300'}`}
          >
            <div className={`font-semibold ${role === r ? 'text-primary-500' : ''}`}>{label}</div>
            <div className="text-xs text-slate-500">{sub}</div>
          </button>
        ))}
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Имя</label>
          <input className="input" placeholder="Иван Петров" value={fullName} onChange={e => setFullName(e.target.value)} required />
        </div>
        <div>
          <label className="label">Телефон</label>
          <input className="input" type="tel" placeholder="+79001234567" value={phone} onChange={e => setPhone(e.target.value)} required />
        </div>
        <div>
          <label className="label">Пароль</label>
          <input className="input" type="password" placeholder="Минимум 6 символов" value={password} onChange={e => setPassword(e.target.value)} minLength={6} required />
        </div>
        <div>
          <label className="label">Подтвердите пароль</label>
          <input className="input" type="password" placeholder="Повторите пароль" value={confirm} onChange={e => setConfirm(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
          {loading ? 'Регистрируем...' : 'Зарегистрироваться'}
        </button>
      </form>

      <p className="text-center text-slate-500 text-sm mt-6">
        Уже есть аккаунт?{' '}
        <Link href="/login" className="text-primary-500 font-medium hover:underline">Войти</Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-4">
      <Suspense fallback={
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
