import { enUS, ruRU } from "@mui/x-data-grid/locales";

export function getDataGridLocale(t, language) {
  const base = language === "ru" ? ruRU : enUS;
  const localeText = { ...base.components.MuiDataGrid.defaultProps.localeText };

  // MUI X does not ship a Kazakh locale. Cover the controls used by this grid.
  if (language === "kk") {
    const translations = t("dataGrid", { returnObjects: true });
    for (const key of Object.keys(localeText)) {
      if (typeof localeText[key] === "string" && typeof translations[key] === "string") {
        localeText[key] = translations[key];
      }
    }
    localeText.toolbarFiltersTooltipActive = count => t("dataGrid.activeFilters", { count });
    localeText.columnHeaderFiltersTooltipActive = localeText.toolbarFiltersTooltipActive;
    localeText.columnMenuAriaLabel = name => t("dataGrid.columnMenuAriaLabel", { name });
    localeText.footerRowSelected = count => t("dataGrid.selectedRows", { count });
    localeText.footerTotalVisibleRows = (visible, total) => t("dataGrid.visibleRows", { visible, total });
  }

  return { ...localeText, noRowsLabel: t("leads.empty") };
}
