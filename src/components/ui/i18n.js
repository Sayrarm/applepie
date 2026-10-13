import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, ru } from '@data';
import { getLanguage } from '@localstorage';

const resources = { en, ru };

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: getLanguage() || 'en',   // ← читаем из localStorage, если есть
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
    });

export default i18n;