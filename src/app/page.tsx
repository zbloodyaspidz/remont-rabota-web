import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      {/* Header */}
      <header className="rr-header">
        <div className="rr-header-inner">
          <div className="rr-logo">
            <div className="rr-logo-icon">
              <span style={{ color: '#0A2B4E', fontWeight: 700, fontSize: 14 }}>РР</span>
            </div>
            <span className="rr-logo-text">Ремонт-Работа</span>
          </div>
          <nav className="rr-nav">
            <Link href="/catalog">Услуги</Link>
            <Link href="/masters">Мастера</Link>
            <Link href="/login" className="rr-btn-login">Войти</Link>
            <Link href="/register" className="rr-btn-register">Зарегистрироваться</Link>
          </nav>
          <Link href="/register" className="rr-btn-register" style={{ display: 'none' }}>Войти</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="rr-hero">
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h1>
            Найдите мастера<br />
            <span className="rr-hero-accent">за несколько минут</span>
          </h1>
          <p>
            Проверенные специалисты по ремонту и обслуживанию рядом с вами.
            Работаем как такси — принимаем заявку, подбираем мастера.
          </p>
          <div className="rr-hero-btns">
            <Link href="/register?role=CLIENT" className="rr-btn-accent">
              Заказать услугу →
            </Link>
            <Link href="/register?role=MASTER" className="rr-btn-ghost">
              Стать мастером 🔧
            </Link>
          </div>
          <div className="rr-hero-badges">
            <span>✓ Сервисный сбор всего 250 ₽</span>
            <span>✓ Безопасная сделка</span>
            <span>✓ Отмена без штрафа</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="rr-section rr-section-white">
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <h2>Популярные услуги</h2>
          <p className="rr-section-sub">Тысячи мастеров готовы помочь прямо сейчас</p>
          <div className="rr-grid-4">
            {[
              { name: 'Электрика', emoji: '⚡', color: 'rr-icon-yellow', desc: 'Проводка, розетки, щитки' },
              { name: 'Сантехника', emoji: '💧', color: 'rr-icon-blue', desc: 'Трубы, краны, унитазы' },
              { name: 'Отделка', emoji: '🎨', color: 'rr-icon-green', desc: 'Покраска, обои, плитка' },
              { name: 'Мебель', emoji: '📦', color: 'rr-icon-purple', desc: 'Сборка и монтаж' },
            ].map((service) => (
              <Link key={service.name} href={`/register?role=CLIENT&category=${service.name}`} className="rr-card" style={{ display: 'block' }}>
                <div className={`rr-icon ${service.color}`}>{service.emoji}</div>
                <h3>{service.name}</h3>
                <p>{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="rr-section rr-section-gray">
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <h2>Почему Ремонт-Работа?</h2>
          <div className="rr-grid-3">
            {[
              { emoji: '🛡️', title: 'Проверенные мастера', desc: 'Верификация документов и портфолио' },
              { emoji: '⏱️', title: 'Быстрый отклик', desc: 'Мастер приедет в течение нескольких часов' },
              { emoji: '⭐', title: 'Рейтинг и отзывы', desc: 'Реальные отзывы от клиентов' },
            ].map((f) => (
              <div key={f.title} style={{ textAlign: 'center' }}>
                <div className="rr-icon rr-icon-navy" style={{ fontSize: 32 }}>{f.emoji}</div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: '#64748B' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="rr-section rr-section-white">
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h2>Как это работает</h2>
          {[
            { step: '1', title: 'Создайте заявку', desc: 'Укажите тип услуги, адрес и удобное время' },
            { step: '2', title: 'Мастер откликнется', desc: 'Подберём проверенного специалиста в вашем районе' },
            { step: '3', title: 'Работа выполнена', desc: 'Подтвердите выполнение и оставьте отзыв' },
          ].map((item) => (
            <div key={item.step} className="rr-step">
              <div className="rr-step-num">{item.step}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rr-section rr-section-dark">
        <h2 style={{ color: 'white' }}>Готовы начать?</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, marginBottom: 0 }}>
          Присоединяйтесь к тысячам клиентов и мастеров
        </p>
        <div className="rr-cta-btns">
          <Link href="/register?role=CLIENT" className="rr-btn-accent">Заказать услугу</Link>
          <Link href="/register?role=MASTER" className="rr-btn-ghost">Стать мастером</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="rr-footer">
        <p>© 2024 Ремонт-Работа. Все права защищены.</p>
      </footer>
    </main>
  );
}
