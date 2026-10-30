import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const EmptyInfo = ({ label, subLabel }) => {
  const { t } = useTranslation();
  return (<Box
    sx={{
      border: "1px solid",
      borderColor: "divider",
      minHeight: 180,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 1,
      p: 3,
      borderRadius: 2,
      bgcolor: "action.hover",
      color: "text.secondary",
      textAlign: "center",
    }}
  >
    <InfoOutlinedIcon
      color="primary"
      sx={{
        fontSize: 36,
        opacity: 0.6,
      }}
    />

    <Typography variant="body1" fontWeight={500}>
      {label ?? t("common.data")}
    </Typography>

    <Typography variant="body2" color="text.disabled">
      {subLabel ?? t("common.additionalInfo")}
    </Typography>
  </Box>);
};

export default EmptyInfo;
