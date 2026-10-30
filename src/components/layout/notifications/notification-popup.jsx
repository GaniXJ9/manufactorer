import TooltipIconButton from "../../../shared/ui/tooltip-icon-button";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link as RouterLink } from "react-router-dom";
import { useNotificationsContext } from "../../../app/context/notifications/use-notifications-context";
import { useState } from "react";
import { getLead } from "../../../shared/api/leads";
import RenderNotificationType from "../../../shared/ui/render-notification-type";
import RenderNotificationIcon from "../../../shared/ui/render-notification-icon";
import { parserNotificationType } from "../../../shared/helpers/notifications/parse-notification-type";
import { NOTIFICATION_TYPE } from "../../../shared/const/notification-types";
import NotificationDocument from "./notification-document";
import NotificationLoader from "../../../shared/ui/loaders/notification-loader";

const NotificationPopup = ({
  selectedNotification,
  setSelectedNotification,
}) => {
  const [currentLead, setCurrentLead] = useState(null);
  const {
    notificationDetails,
    getNotificationDetails,
    getNotifications,
    isNotificationDetailsLoading,
    detailsError: error,
  } = useNotificationsContext();
  const { id, notification_type } = parserNotificationType(
    selectedNotification?.type || "",
  );
  const files =
    notification_type === NOTIFICATION_TYPE.shipping
      ? currentLead?.cargo_actions?.at(-1)?.files || []
      : [];

  const handleClose = () => {
    setSelectedNotification(null);
  };

  useEffect(() => {
    const controller = new AbortController();
    getNotificationDetails(selectedNotification.id, controller.signal);
    return () => {
      controller.abort();
      getNotifications();
    };
  }, [selectedNotification.id, getNotificationDetails, getNotifications]);

  useEffect(() => {
    const controller = new AbortController();
    if (notification_type === NOTIFICATION_TYPE.shipping && id) {
      getLead(id, controller.signal).then(({ data }) => {
        if (!controller.signal.aborted) setCurrentLead(data);
      }).catch(() => {});
    }
    return () => controller.abort();
  }, [id, notification_type]);

  return (
    <Dialog
      open={!!selectedNotification}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="notification-dialog-title"
      slotProps={{
        paper: {
          sx: {
            borderRadius: "24px",
            m: 2,
            width: "calc(100% - 32px)",
            maxHeight: "calc(100dvh - 32px)",
          },
        },
      }}
    >
      <DialogTitle
        id="notification-dialog-title"
        sx={{
          p: 3,
          pr: 7,
          borderBottom: "1px solid",
          borderColor: "divider",
          color: "font_color.heading",
          fontSize: 20,
          fontWeight: 600,
          overflowWrap: "anywhere",
        }}
      >
        {selectedNotification?.theme || "Уведомление"}
      </DialogTitle>
      <TooltipIconButton
        title="Закрыть уведомление"
        aria-label="Закрыть уведомление"
        onClick={handleClose}
        sx={{ position: "absolute", right: 12, top: 16 }}
      >
        <CloseRoundedIcon />
      </TooltipIconButton>
      <DialogContent sx={{ p: 3, "&.MuiDialogContent-root": { pt: 3 } }}>
        {isNotificationDetailsLoading ? (
          <NotificationLoader />
        ) : error ? (
          <Alert severity="error">
            Не удалось загрузить уведомление. Закройте окно и попробуйте ещё
            раз.
          </Alert>
        ) : (
          <>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "16px",
                  bgcolor: "background.main",
                  color: "primary.main",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <RenderNotificationIcon
                  type={selectedNotification?.type || ""}
                />
              </Box>
              <Box
                sx={{
                  color: "font_color.heading",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                <RenderNotificationType
                  type={selectedNotification?.type || ""}
                />
              </Box>
            </Box>
            <Typography
              sx={{
                p: 2,
                borderRadius: "16px",
                bgcolor: "background.default",
                fontSize: 14,
                lineHeight: 1.8,
                color: "text.secondary",
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
              }}
            >
              {notificationDetails?.message || selectedNotification?.message}
            </Typography>
            {files.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography
                  sx={{
                    mb: 1.5,
                    fontWeight: 600,
                    fontSize: 14,
                    color: "font_color.heading",
                  }}
                >
                  Документы
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, minmax(0, 1fr))",
                    },
                    gap: 1.5,
                  }}
                >
                  {files.map((file, index) => (
                    <NotificationDocument
                      key={file.id || file.url || index}
                      document={file}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          gap: 1,
        }}
      >
        <Button
          onClick={handleClose}
          sx={{ textTransform: "none", borderRadius: "16px" }}
        >
          Закрыть
        </Button>
        {!isNotificationDetailsLoading &&
          !error &&
          notificationDetails?.link && (
            <Button
              component={RouterLink}
              to={notificationDetails.link}
              onClick={handleClose}
              variant="contained"
              disableElevation
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{ textTransform: "none", borderRadius: "16px" }}
            >
              Перейти
            </Button>
          )}
      </DialogActions>
    </Dialog>
  );
};
export default NotificationPopup;
