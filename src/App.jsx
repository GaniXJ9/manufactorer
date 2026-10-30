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
import { enUS, ruRU, kkKZ } from "@mui/material/locale";

const materialLocales = { en: enUS, ru: ruRU, kk: kkKZ };

function App() {
  const { i18n } = useTranslation();
  const localizedTheme = useMemo(
    () => createTheme(theme, materialLocales[i18n.resolvedLanguage] || ruRU),
    [i18n.resolvedLanguage],
  );
  return (
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
  );
}

export default App;
