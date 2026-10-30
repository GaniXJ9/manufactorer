import { enUS, ruRU, esES, ptPT, trTR, arSD, zhCN, frFR, deDE, urPK } from "@mui/x-data-grid/locales";

const locales = { en: enUS, ru: ruRU, es: esES, pt: ptPT, tr: trTR, ar: arSD, zh: zhCN, fr: frFR, de: deDE, ur: urPK };

export function getDataGridLocale(t, language) {
  const base = locales[language] || enUS;
  const localeText = { ...base.components.MuiDataGrid.defaultProps.localeText };

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
  localeText.paginationRowsPerPage = t("pagination.rowsPerPage");
  localeText.paginationItemAriaLabel = type => t(`pagination.${type}`);
  localeText.paginationDisplayedRows = ({ from, to, count }) => t("pagination.displayedRows", { from, to, count: count == null || count === -1 ? `${to}+` : count });

  return { ...localeText, noRowsLabel: t("leads.empty") };
}
