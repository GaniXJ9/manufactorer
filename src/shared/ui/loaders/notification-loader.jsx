import { Box, CircularProgress } from "@mui/material";
export default function NotificationLoader() {
  return <Box role="status" aria-label="Загрузка уведомления" sx={{ p: 3, display: "flex", justifyContent: "center" }}><CircularProgress /></Box>;
}
