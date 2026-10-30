import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { LeadsProvider } from "./app/context/leads/leads-provider";
import { CustomersProvider } from "./app/context/customers/customers-provider";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./app/theme";
import { NotificationsProvider } from "./app/context/notifications/notifications-provider";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { getLayoutDirection } from "./i18n/languages";
import { getMaterialLocale } from "./i18n/material";

const ltrCache = createCache({ key: "muiltr" });
const rtlCache = createCache({ key: "muirtl", stylisPlugins: [prefixer, rtlPlugin] });

function App() {
  const { t, i18n } = useTranslation();
  const direction = getLayoutDirection(i18n.resolvedLanguage);
  const localizedTheme = useMemo(
    () => createTheme(theme, getMaterialLocale(t, i18n.resolvedLanguage), { direction }),
    [t, i18n.resolvedLanguage, direction],
  );
  return (
    <CacheProvider value={direction === "rtl" ? rtlCache : ltrCache}>
      <ThemeProvider theme={localizedTheme}>
        <NotificationsProvider>
          <CssBaseline />
          <LeadsProvider>
            <CustomersProvider>
              <RouterProvider router={router} />
            </CustomersProvider>
          </LeadsProvider>
        </NotificationsProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
