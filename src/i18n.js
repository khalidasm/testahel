import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// import translations file
import { TRANSLATIONS_AR } from './locales/ar/translation'

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
    resources: {
        ar: {
            // use translations file for arabic resources
            translation: TRANSLATIONS_AR,
        },
    }
});