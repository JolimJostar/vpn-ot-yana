import React, { useEffect, useRef, useState } from 'react';
import { siteConfig } from './config';
import './App.css';

const publicUrl = process.env.PUBLIC_URL || '';
const publicImage = (filename: string) => `${publicUrl}/images/${filename}`;

const plans = [
  {
    title: '😼 Личный ВПН 🤩',
    description: [
      'Расчитан на 1 человека.',
      'Идеально если нужен для тг и просмотра ютуба или рилсики полистать.',
    ],
    price: '100 руб в месяц.',
  },
  {
    title: '🥰Семейный ВПН🐱',
    description: [
      '200 МБ/сек. На всех бабушек, дедушек и родителей хватит с головой.',
      'Выделенный сервер только для вас.',
      'Идеально если впн нужен всей семье.',
    ],
    price: '500 руб в месяц.',
    featured: true,
  },
];

const instructionSteps = [
  {
    image: publicImage('step1.jpg'),
    alt: 'Кнопка «+» в правом верхнем углу приложения Happ',
    text: 'Нажмите кнопку «+» в правом верхнем углу, чтобы добавить подписку.',
  },
  {
    image: publicImage('step2.jpg'),
    alt: 'Пункт «Import from clipboard» в меню приложения Happ',
    text: 'Скопируйте ссылку подписки, которую вы получили, и выберите «Import from clipboard» (Импорт из буфера обмена).',
  },
  {
    image: publicImage('step3.jpg'),
    alt: 'Кнопка включения и выключения VPN в приложении Happ',
    text: 'Нажмите большую кнопку по центру экрана, чтобы включить или выключить VPN.',
  },
] as const;

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
  const { emergency, vpnApp } = siteConfig;
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

        <section className="instructions" aria-labelledby="instructions-title">
          <h2 id="instructions-title" className="instructions__title">
            Как скачать и подключить VPN
          </h2>
          <p className="instructions__text">
            Установите приложение {vpnApp.name}, добавьте подписку и включите VPN.
          </p>

          <div className="instructions__download">
            <img
              className="instructions__app-icon"
              src={publicImage('app-icon.jpg')}
              alt={`Иконка приложения ${vpnApp.name}`}
              width={72}
              height={72}
            />
            <div className="instructions__download-info">
              <p className="instructions__app-name">Скачайте {vpnApp.name}</p>
              <div className="instructions__download-links">
                <a
                  className="instructions__download-link"
                  href={vpnApp.iosUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  App Store
                </a>
                <a
                  className="instructions__download-link"
                  href={vpnApp.androidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Play
                </a>
                <a
                  className="instructions__download-link instructions__download-link--secondary"
                  href={vpnApp.apkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  APK для Android
                </a>
              </div>
            </div>
          </div>

          <ol className="instructions__steps">
            {instructionSteps.map((step, index) => (
              <li key={step.image} className="instruction-step">
                <span className="instruction-step__number">{index + 1}</span>
                <div className="instruction-step__content">
                  <p className="instruction-step__text">{step.text}</p>
                  <img
                    className="instruction-step__image"
                    src={step.image}
                    alt={step.alt}
                    loading="lazy"
                  />
                </div>
              </li>
            ))}
          </ol>
        </section>

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
