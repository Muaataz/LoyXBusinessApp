import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import sv from './locales/sv.json';

i18n
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: en },
      sv: { translation: sv },
    },
    lng: __DEV__ ? 'en' : 'sv', // Default language
    fallbackLng: __DEV__ ? 'en' : 'sv', // Fallback language if the selected language doesn't exist
    interpolation: {
      escapeValue: false, // React already escapes content
    },
  });

export default i18n;
