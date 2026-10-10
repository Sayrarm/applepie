import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Здесь можно определить переводы прямо в объекте или вынести их в отдельные файлы
const resources = {
    en: {
        translation: {
            "welcome": "Welcome to React",
            "change_language": "Change Language"
        }
    },
    ru: {
        translation: {
            "welcome": "Добро пожаловать в React",
            "change_language": "Сменить язык"
        }
    }
};

i18n
    .use(initReactI18next) // передает i18n в react-i18next
    .init({
        resources,
        lng: 'en', // язык по умолчанию
        fallbackLng: 'en', // резервный язык
        interpolation: {
            escapeValue: false // React уже защищен от XSS
        }
    });

export default i18n;