import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import kk from "./locales/kz.json";
import es from "./locales/es.json";
import pt from "./locales/pt.json";
import tr from "./locales/tr.json";
import ar from "./locales/ar.json";
import zh from "./locales/zh.json";
import uz from "./locales/uz.json";
import ky from "./locales/ky.json";
import ka from "./locales/ka.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import tg from "./locales/tg.json";
import ur from "./locales/ur.json";
import { getLayoutDirection, languages, LANGUAGE_STORAGE_KEY, normalizeLanguage } from "./languages";

const translations = { en, ru, kk, es, pt, tr, ar, zh, uz, ky, ka, fr, de, tg, ur };

function getInitialLanguage() {
  try {
    return normalizeLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY));
  } catch {
    return "ru";
  }
}

function syncLanguage(language) {
  const normalized = normalizeLanguage(language);
  if (typeof document !== "undefined") {
    document.documentElement.lang = normalized;
    document.documentElement.dir = getLayoutDirection(normalized);
  }
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, normalized);
  } catch {
    // Language switching also works when browser storage is unavailable.
  }
}

i18n.on("languageChanged", syncLanguage);
i18n.use(initReactI18next).init({
  resources: Object.fromEntries(Object.entries(translations).map(([language, translation]) => [language, { translation }])),
  lng: getInitialLanguage(),
  fallbackLng: "ru",
  supportedLngs: languages.map(({ value }) => value),
  nsSeparator: false,
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
