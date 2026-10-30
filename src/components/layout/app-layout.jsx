import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import NotificationSnackbar from "./notifications/notification-snackbar";
import { Header } from "./header";
import { useEffect } from "react";
import { connectNotifications } from "../../app/context/notifications/connect-notification";
import { useNotificationsContext } from "../../app/context/notifications/use-notifications-context";

export function AppLayout() {
  const { getNotifications } = useNotificationsContext();

  useEffect(() => {
    getNotifications(undefined, { showSnackbar: true });
    return connectNotifications(() => getNotifications(undefined, { showSnackbar: true }), (error) => {
      console.error("[Notifications] Connection failed:", error);
    });
  }, [getNotifications]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* <DocumentTitleManager /> */}
      <Header />
      <NotificationSnackbar />

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
