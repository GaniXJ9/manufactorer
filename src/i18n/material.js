import {
  enUS, ruRU, kkKZ, esES, ptPT, trTR, arSA, zhCN, frFR, deDE, urPK,
} from "@mui/material/locale";

const locales = { en: enUS, ru: ruRU, kk: kkKZ, es: esES, pt: ptPT, tr: trTR, ar: arSA, zh: zhCN, fr: frFR, de: deDE, ur: urPK };

export function getMaterialLocale(t, language) {
  if (locales[language]) return locales[language];

  return {
    components: {
      MuiBreadcrumbs: { defaultProps: { expandText: t("nav.breadcrumbs") } },
      MuiAlert: { defaultProps: { closeText: t("common.close") } },
      MuiPagination: {
        defaultProps: {
          "aria-label": t("leads.pages"),
          getItemAriaLabel: (type, page, selected) => t(`pagination.${type === "page" ? selected ? "current" : "page" : type}`, { page }),
        },
      },
      MuiTablePagination: {
        defaultProps: {
          labelRowsPerPage: t("pagination.rowsPerPage"),
          getItemAriaLabel: type => t(`pagination.${type}`),
          labelDisplayedRows: ({ from, to, count }) => t("pagination.displayedRows", { from, to, count: count === -1 ? `${to}+` : count }),
        },
      },
    },
  };
}
