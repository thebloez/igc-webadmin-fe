import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "../../assets/locales/en.json"; // Import file terjemahan lokal
import idTranslation from "../../assets/locales/id.json";

import { store } from "../redux/store"; // Import Redux store

const currentLanguage = store.getState().language.value || "en";
console.log("currentLanguage", currentLanguage);

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    id: {
      translation: idTranslation,
    },
  },
  lng: currentLanguage,
  fallbackLng: "id",
  interpolation: {
    escapeValue: false,
  },
});

// Subscribe to language changes
store.subscribe(() => {
  const currentLanguage = store.getState().language.value;
  if (i18n.language !== currentLanguage) {
    i18n.changeLanguage(currentLanguage);
  }
});


export default i18n;


