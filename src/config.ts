export const siteConfig = {
  vpnApp: {
    name: 'Happ',
    iosUrl: 'https://apps.apple.com/us/app/happ-proxy-utility/id6504287215',
    androidUrl: 'https://play.google.com/store/apps/details?id=com.happproxy',
    apkUrl: 'https://github.com/Happ-proxy/happ-android/releases/latest/download/Happ.apk',
  },
  contacts: {
    telegram: 'https://t.me/m/es4085jrMzYy',
    vk: 'https://vk.com/lapochka_yan',
  },
  emergency: {
    /** Включите true, когда основной сервер недоступен */
    enabled: true,
    message: 'Основные сервера временно недоступны. Используйте запасную ссылку(22.06 15:08):',
    backupUrl: 'https://109.248.247.234:2096/sub/4bpl7k2m7h3f7lj5',
  },
};
