import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import * as en from './locales/en.json';
import * as ru from './locales/ru.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: process.env.NODE_ENV === 'development',
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: { translation: en },
            ru: { translation: ru }
        },
    });

export default i18n;
