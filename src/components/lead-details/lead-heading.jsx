import { useTranslation } from "react-i18next";
import { Box, Stack, Typography } from "@mui/material";
import RenderStatus from "../../shared/ui/render-status";

const LeadHeading = ({ leadData }) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        mb: 2,
      }}
    >
      <Stack spacing={0.5}>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: 22, sm: 26 },
            fontWeight: 600,
            color: "font_color.heading",
          }}
        >
          {t("lead.number", { value: leadData.num || "—" })}
        </Typography>
        <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
          {t("lead.subtitle")}
        </Typography>
      </Stack>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 1,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <RenderStatus status={leadData.status} />
        </Box>
      </Box>
    </Box>
  );
};

export default LeadHeading;
