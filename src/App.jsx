import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { LeadsProvider } from "./app/context/leads/leads-provider";
import { CustomersProvider } from "./app/context/customers/customers-provider";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./app/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LeadsProvider>
        <CustomersProvider>
          <RouterProvider router={router} />
        </CustomersProvider>
      </LeadsProvider>
    </ThemeProvider>
  );
}

export default App;
