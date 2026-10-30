import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
export default function NotificationDocument({ document }) {
  const { t } = useTranslation();
  const url = document.url;
  return <Box component={url ? "a" : "div"} href={url || undefined} target={url ? "_blank" : undefined} rel={url ? "noopener noreferrer" : undefined}
    sx={{ p: 1.5, border: "1px solid", borderColor: "divider", borderRadius: "16px", bgcolor: "grey.50", display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none", color: "inherit", overflowWrap: "anywhere" }}>
    <Box sx={{ width: 42, height: 42, borderRadius: "16px", bgcolor: "primary.main", color: "white", display: "grid", placeItems: "center", flexShrink: 0 }}><InsertDriveFileOutlinedIcon /></Box>
    <Box sx={{ minWidth: 0 }}><Typography sx={{ fontSize: 13 }}>{document.name || document.fileName || t("notifications.document")}</Typography>{document.context && <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{document.context}</Typography>}</Box>
  </Box>;
}
