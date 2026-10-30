import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import kk from "./locales/kz.json";
import { LANGUAGE_STORAGE_KEY, normalizeLanguage } from "./languages";

function getInitialLanguage() {
  try {
    return normalizeLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY));
  } catch {
    return "ru";
  }
}

function syncLanguage(language) {
  const normalized = normalizeLanguage(language);
  if (typeof document !== "undefined") document.documentElement.lang = normalized;
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalized);
  } catch {
    // Language switching also works when browser storage is unavailable.
  }
}

i18n.on("languageChanged", syncLanguage);
i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ru: { translation: ru }, kk: { translation: kk } },
  lng: getInitialLanguage(),
  fallbackLng: "ru",
  supportedLngs: ["en", "ru", "kk"],
  nsSeparator: false,
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
