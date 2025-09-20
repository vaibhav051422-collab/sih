import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Dono translation files ko yahan import karein
import enTranslation from './locales/en/translation.json';
import hiTranslation from './locales/hi/translation.json';

i18n
  .use(initReactI18next) // react-i18next library ko i18next se jodta hai
  .init({
    // Yahan hum translations ko jod rahe hain
    resources: {
      en: {
        translation: enTranslation,
      },
      hi: {
        translation: hiTranslation,
      },
    },
    lng: 'en', // Default language (app shuru hone par English dikhegi)
    fallbackLng: 'en', // Agar koi translation nahi milti to English dikhegi
    interpolation: {
      escapeValue: false, // React isko khud handle kar leta hai
    },
  });

export default i18n;