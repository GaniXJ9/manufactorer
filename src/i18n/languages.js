export const LANGUAGE_STORAGE_KEY = "app-language";

export const languages = [
  { value: "en", code: "EN", label: "English", locale: "en-US" },
  { value: "ru", code: "RU", label: "Русский", locale: "ru-RU" },
  { value: "kk", code: "KZ", label: "Қазақша", locale: "kk-KZ" },
];

export function normalizeLanguage(language) {
  const code = String(language || "").toLowerCase().split(/[-_]/)[0];
  return code === "kz" ? "kk" : languages.some(({ value }) => value === code) ? code : "ru";
}

export function getLocale(language) {
  return languages.find(({ value }) => value === normalizeLanguage(language)).locale;
}
