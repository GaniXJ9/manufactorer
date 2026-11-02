import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MenuItem, Select } from "@mui/material";
import { getDirection, normalizeLanguage } from "../../i18n/languages";
import { getLanguages } from "../../shared/api/languages";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const [languages, setLanguages] = useState([]);
  const [loadError, setLoadError] = useState(false);

  const language = normalizeLanguage(i18n.resolvedLanguage);

  const selectedLanguage = languages.some(({ code }) => code === language)
    ? language
    : "";

  useEffect(() => {
    const controller = new AbortController();

    getLanguages(controller.signal)
      .then(({ data }) => {
        if (controller.signal.aborted) return;

        const availableLanguages = data.results;
        setLanguages(availableLanguages);

        const currentLanguage = normalizeLanguage(i18n.resolvedLanguage);
        if (
          availableLanguages.length &&
          !availableLanguages.some(({ code }) => code === currentLanguage)
        ) {
          i18n.changeLanguage(availableLanguages[0].code);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoadError(true);
      });

    return () => controller.abort();
  }, [i18n]);

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select
      size="small"
      value={selectedLanguage}
      onChange={handleChange}
      disabled={!languages.length}
      error={loadError}
      title={loadError ? t("errors.action") : undefined}
      displayEmpty
      renderValue={(value) => (value || language).toUpperCase()}
      inputProps={{ "aria-label": t("language.select") }}
      MenuProps={{
        slotProps: {
          paper: {
            sx: { mt: 1, minWidth: 160, maxHeight: "min(640px, 80vh)" },
          },
          list: { "aria-label": t("language.list") },
        },
      }}
      sx={{
        width: 72,
        height: 40,
        flexShrink: 0,
        color: "primary.main",
        bgcolor: "background.paper",
        fontSize: 14,
        fontWeight: 600,
        "& .MuiSelect-select": { py: 1, pl: 1.25 },
      }}
    >
      {languages.map(({ code, name }) => (
        <MenuItem key={code} value={code}>
          <span lang={code} dir={getDirection(code)}>
            {name}
          </span>
        </MenuItem>
      ))}
    </Select>
  );
}
