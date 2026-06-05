import React, { useEffect, useRef, useState } from 'react';
import { siteConfig } from './config';
import './App.css';

const plans = [
  {
    title: '😼 Личный ВПН 🤩',
    description: [
      'Расчитан на 1 человека.',
      'Идеально если нужен для тг и просмотра ютуба или рилсики полистать.',
    ],
    price: '150 руб в месяц.',
  },
  {
    title: '🥰Семейный ВПН🐱',
    description: [
      '200 МБ/сек. На всех бабушек, дедушек и родителей хватит с головой.',
      'Выделенный сервер только для вас.',
      'Идеально если впн нужен всей семье.',
    ],
    price: '600 руб в месяц.',
    featured: true,
  },
];

const contactItems = [
  {
    id: 'telegram',
    label: 'Telegram',
    href: siteConfig.contacts.telegram,
    description: 'Написать в Telegram',
  },
  {
    id: 'vk',
    label: 'ВКонтакте',
    href: siteConfig.contacts.vk,
    description: 'Написать во ВКонтакте',
  },
] as const;

function App() {
  const { emergency } = siteConfig;
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current !== null) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const showToast = () => {
    setToastVisible(true);

    if (toastTimeoutRef.current !== null) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      setToastVisible(false);
      toastTimeoutRef.current = null;
    }, 2500);
  };

  const copyEmergencyLink = async () => {
    try {
      await navigator.clipboard.writeText(emergency.backupUrl);
      showToast();
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = emergency.backupUrl;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast();
    }
  };

  return (
    <div className="app">
      {emergency.enabled && (
        <aside className="emergency-banner" role="alert">
          <p className="emergency-banner__text">{emergency.message}</p>
          <button
            type="button"
            className="emergency-banner__link"
            onClick={copyEmergencyLink}
          >
            {emergency.backupUrl}
          </button>
          <p className="emergency-banner__hint">Нажмите на ссылку, чтобы скопировать</p>
        </aside>
      )}

      {toastVisible && (
        <div className="toast" role="status" aria-live="polite">
          Ссылка скопирована в буфер обмена
        </div>
      )}

      <main className="page">
        <header className="hero">
          <h1 className="hero__title">Актуальные услуги</h1>
        </header>

        <section className="plans">
          {plans.map((plan) => (
            <article
              key={plan.title}
              className={`plan-card${plan.featured ? ' plan-card--featured' : ''}`}
            >
              <h2 className="plan-card__title">{plan.title}</h2>
              <div className="plan-card__body">
                {plan.description.map((line) => (
                  <p key={line} className="plan-card__text">
                    {line}
                  </p>
                ))}
              </div>
              <p className="plan-card__price">{plan.price}</p>
            </article>
          ))}
        </section>

        <footer className="note">
          <p>🔥Кол-во устройств не ограниченно.🔥</p>
        </footer>

        <section className="contacts" aria-labelledby="contacts-title">
          <h2 id="contacts-title" className="contacts__title">
            Контакты
          </h2>
          <p className="contacts__text">Напишите, чтобы подключить VPN или задать вопрос.</p>
          <div className="contacts__list">
            {contactItems.map((contact) => (
              <a
                key={contact.id}
                className={`contact-card contact-card--${contact.id}`}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-card__label">{contact.label}</span>
                <span className="contact-card__description">{contact.description}</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
