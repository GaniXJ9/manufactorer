import { useState } from "react";
import { Box, Slide, Snackbar, Typography } from "@mui/material";
import { useNotificationsContext } from "../../../app/context/notifications/use-notifications-context";
import RenderNotificationIcon from "../../../shared/ui/render-notification-icon";
import NotificationPopup from "./notification-popup";
export default function NotificationSnackbar() {
  const { newNotification, clearNewNotificationValue } = useNotificationsContext();
  const [displayedNotification, setDisplayedNotification] = useState(newNotification);
  const [notificationPopUpItem, setNotificationPopUpItem] = useState(null);
  if (newNotification && newNotification !== displayedNotification) setDisplayedNotification(newNotification);
  const handleOpenPopUp = () => {
    if (newNotification) setNotificationPopUpItem(newNotification);
  };
  return <>
      <Snackbar
        open={!!newNotification}
        onClose={clearNewNotificationValue}
        onClick={handleOpenPopUp}
        slots={{ transition: Slide }}
        slotProps={{
          transition: {
            direction: "left",
            easing: { enter: "ease-out", exit: "ease-in-out" },
            onExited: () => setDisplayedNotification(null),
          },
        }}
        transitionDuration={{ enter: 300, exit: 300 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            px: 1.5,
            py: 1.25,
            width: 280,
            minHeight: 80,
            backgroundColor: "primary.main",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            cursor: "pointer",
            borderRadius: "16px",
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.95rem",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              color: "white",
              lineHeight: 1.2,
              mb: 0.5,
            }}
          >
            {displayedNotification && (
              <RenderNotificationIcon type={displayedNotification.type} />
            )}

            {displayedNotification?.theme}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "white",
              lineHeight: 1.3,

              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {displayedNotification?.message}
          </Typography>
        </Box>
      </Snackbar>

      {notificationPopUpItem && (
        <NotificationPopup
          selectedNotification={notificationPopUpItem}
          setSelectedNotification={setNotificationPopUpItem}
        />
      )}
  </>;
}
