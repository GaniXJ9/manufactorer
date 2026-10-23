import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Header } from "./header";

export function AppLayout() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* <DocumentTitleManager /> */}
      <Header />

      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          //   pt: `${HEADER_HEIGHT}px`,
          pl: {
            xs: 0,
            sm: "35vh",
          },
        }}
      >
        {/* <AppBreadcrumbs /> */}
        {/* <RootLayout> */}
        <Outlet />
        {/* </RootLayout> */}
      </Box>
    </Box>
  );
}
