import { useTranslation } from "react-i18next";
import { MenuItem, Select } from "@mui/material";
import { languages, normalizeLanguage } from "../../i18n/languages";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.resolvedLanguage);

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select
      size="small"
      value={language}
      onChange={handleChange}
      renderValue={(value) => languages.find((item) => item.value === value).code}
      inputProps={{ "aria-label": t("language.select") }}
      MenuProps={{
        slotProps: {
          paper: { sx: { mt: 1, minWidth: 160 } },
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
      {languages.map(({ value, label }) => (
        <MenuItem key={value} value={value} lang={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
}
