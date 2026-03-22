import Link from 'next/link';
import { Wrench, Star, Shield, Clock, ChevronRight, Zap, Droplets, PaintBucket, Package } from 'lucide-react';

const services = [
  { name: 'Электрика', icon: Zap, color: 'bg-yellow-50 text-yellow-600', desc: 'Проводка, розетки, щитки' },
  { name: 'Сантехника', icon: Droplets, color: 'bg-blue-50 text-blue-600', desc: 'Трубы, краны, унитазы' },
  { name: 'Отделка', icon: PaintBucket, color: 'bg-green-50 text-green-600', desc: 'Покраска, обои, плитка' },
  { name: 'Мебель', icon: Package, color: 'bg-purple-50 text-purple-600', desc: 'Сборка и монтаж' },
];

const features = [
  { icon: Shield, title: 'Проверенные мастера', desc: 'Верификация документов и портфолио' },
  { icon: Clock, title: 'Быстрый отклик', desc: 'Мастер приедет в течение нескольких часов' },
  { icon: Star, title: 'Рейтинг и отзывы', desc: 'Реальные отзывы от клиентов' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, background: '#0A2B4E', color: 'white', padding: '20px', zIndex: 9999, fontSize: '20px', textAlign: 'center' }}>
        ✅ Ремонт-Работа — сайт работает!
      </div>
      <div style={{ height: '60px' }} />
      {/* Header */}
      <header className="bg-primary-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-primary-500 font-bold text-sm">РР</span>
            </div>
            <span className="text-xl font-bold">Ремонт-Работа</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/catalog" className="text-white/80 hover:text-white transition-colors">Услуги</Link>
            <Link href="/masters" className="text-white/80 hover:text-white transition-colors">Мастера</Link>
            <Link href="/login" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-colors">Войти</Link>
            <Link href="/register" className="bg-accent-500 hover:bg-accent-600 px-4 py-2 rounded-xl transition-colors">
              Зарегистрироваться
            </Link>
          </nav>
          <Link href="/register" className="md:hidden bg-accent-500 px-4 py-2 rounded-xl text-sm">
            Войти
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Найдите мастера<br />
            <span className="text-accent-500">за несколько минут</span>
          </h1>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Проверенные специалисты по ремонту и обслуживанию рядом с вами. Работаем как такси — принимаем заявку, подбираем мастера.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?role=CLIENT" className="btn-accent inline-flex items-center gap-2 justify-center text-lg px-8 py-4">
              Заказать услугу <ChevronRight size={20} />
            </Link>
            <Link href="/register?role=MASTER" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium transition-colors inline-flex items-center gap-2 justify-center text-lg">
              Стать мастером <Wrench size={20} />
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/70">
            <span>✓ Сервисный сбор всего 250 ₽</span>
            <span>✓ Безопасная сделка</span>
            <span>✓ Отмена без штрафа</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Популярные услуги</h2>
          <p className="text-slate-500 text-center mb-10">Тысячи мастеров готовы помочь прямо сейчас</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.name}
                  href={`/register?role=CLIENT&category=${service.name}`}
                  className="card hover:shadow-md transition-shadow text-center cursor-pointer"
                >
                  <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="font-semibold mb-1">{service.name}</h3>
                  <p className="text-sm text-slate-500">{service.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Почему Ремонт-Работа?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="text-center">
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} className="text-primary-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                  <p className="text-slate-500">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Как это работает</h2>
          <div className="space-y-8">
            {[
              { step: '1', title: 'Создайте заявку', desc: 'Укажите тип услуги, адрес и удобное время' },
              { step: '2', title: 'Мастер откликнется', desc: 'Подберём проверенного специалиста в вашем районе' },
              { step: '3', title: 'Работа выполнена', desc: 'Подтвердите выполнение и оставьте отзыв' },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-accent-500 text-white rounded-full flex items-center justify-center text-xl font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
        <p className="text-white/80 mb-8 text-lg">Присоединяйтесь к тысячам клиентов и мастеров</p>
        <div className="flex gap-4 justify-center">
          <Link href="/register?role=CLIENT" className="bg-accent-500 hover:bg-accent-600 px-8 py-4 rounded-xl font-medium transition-colors text-lg">
            Заказать услугу
          </Link>
          <Link href="/register?role=MASTER" className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-xl font-medium transition-colors text-lg">
            Стать мастером
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-700 text-white/60 py-8 px-4 text-center">
        <p>© 2024 Ремонт-Работа. Все права защищены.</p>
      </footer>
    </main>
  );
}
