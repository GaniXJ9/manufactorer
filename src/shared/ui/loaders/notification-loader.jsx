import { useTranslation } from "react-i18next";
import { Box, CircularProgress } from "@mui/material";
export default function NotificationLoader() {
  const { t } = useTranslation();
  return <Box role="status" aria-label={t("notifications.loadingDetails")} sx={{ p: 3, display: "flex", justifyContent: "center" }}><CircularProgress /></Box>;
}
