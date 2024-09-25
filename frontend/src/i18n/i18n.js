import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.js';
import ru from './ru.js';

i18n
  .use(initReactI18next) // передайте инстанс i18n в react-i18next
  .init({
    resources: {
        en,
        ru
    },
    lng: 'ru', // язык по умолчанию
    keySeparator: false, // используйте точки в ключах переводов
    interpolation: {
      escapeValue: false, // для React не нужно экранировать значения
    }
  });

export default i18n;