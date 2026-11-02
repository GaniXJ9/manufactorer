export const LANGUAGE_STORAGE_KEY = "app-language";

// Keep the layout fixed until mirroring is explicitly enabled.
const RTL_LAYOUT_ENABLED = true;

export const languages = [
  { value: "kk", code: "KZ", label: "Қазақша", locale: "kk-KZ" },
  { value: "ru", code: "RU", label: "Русский", locale: "ru-RU" },
  { value: "en", code: "EN", label: "English", locale: "en-US" },
  { value: "es", code: "ES", label: "Español", locale: "es-ES" },
  { value: "pt", code: "PT", label: "Português", locale: "pt-PT" },
  { value: "tr", code: "TR", label: "Türkçe", locale: "tr-TR" },
  {
    value: "ar",
    code: "AR",
    label: "العربية",
    locale: "ar-SA",
    direction: "rtl",
  },
  { value: "zh", code: "ZH", label: "中文", locale: "zh-CN" },
  { value: "uz", code: "UZ", label: "O‘zbekcha", locale: "uz-UZ" },
  { value: "ky", code: "KY", label: "Кыргызча", locale: "ky-KG" },
  { value: "ka", code: "KA", label: "ქართული", locale: "ka-GE" },
  { value: "fr", code: "FR", label: "Français", locale: "fr-FR" },
  { value: "de", code: "DE", label: "Deutsch", locale: "de-DE" },
  { value: "tg", code: "TG", label: "Тоҷикӣ", locale: "tg-TJ" },
  { value: "ur", code: "UR", label: "اردو", locale: "ur-PK", direction: "rtl" },
];

export function normalizeLanguage(language) {
  const code = String(language || "")
    .toLowerCase()
    .split(/[-_]/)[0];
  return code === "kz"
    ? "kk"
    : languages.some(({ value }) => value === code)
      ? code
      : "ru";
}

export function getLocale(language) {
  return languages.find(({ value }) => value === normalizeLanguage(language))
    .locale;
}

export function getDirection(language) {
  return (
    languages.find(({ value }) => value === normalizeLanguage(language))
      .direction || "ltr"
  );
}

export function getLayoutDirection(language) {
  return RTL_LAYOUT_ENABLED ? getDirection(language) : "ltr";
}
