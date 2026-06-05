import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./config', () => ({
  siteConfig: {
    contacts: {
      telegram: 'https://t.me/m/es4085jrMzYy',
      vk: 'https://vk.com/lapochka_yan',
    },
    emergency: {
      enabled: true,
      message: 'Сервер временно недоступен.',
      backupUrl: 'https://backup.example/vpn',
    },
  },
}));

test('renders service title and plans', () => {
  render(<App />);
  expect(screen.getByText('Актуальные услуги')).toBeInTheDocument();
  expect(screen.getByText(/Личный ВПН/)).toBeInTheDocument();
  expect(screen.getByText(/Семейный ВПН/)).toBeInTheDocument();
  expect(screen.getByText(/Кол-во устройств не ограниченно/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Контакты' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Telegram/i })).toHaveAttribute(
    'href',
    'https://t.me/m/es4085jrMzYy'
  );
  expect(screen.getByRole('link', { name: /ВКонтакте/i })).toHaveAttribute(
    'href',
    'https://vk.com/lapochka_yan'
  );
});

test('copies emergency link and shows toast', async () => {
  const writeText = jest.fn().mockResolvedValue(undefined);

  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
  });

  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'https://backup.example/vpn' }));

  expect(writeText).toHaveBeenCalledWith('https://backup.example/vpn');
  expect(await screen.findByRole('status')).toHaveTextContent(
    'Ссылка скопирована в буфер обмена'
  );
});
