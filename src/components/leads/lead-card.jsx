import { useTranslation } from "react-i18next";
import { Typography, Box, Stack } from "@mui/material";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";

const LeadCard = ({ lead }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateToLeadItem = () => {
    navigate(`/leads/${lead.id}`);
  };

  return (
    <Box
      onClick={navigateToLeadItem}
      tabIndex={0}
      sx={{
        p: 3,
        maxWidth: "100%",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 4,
        backgroundColor: "background.paper",
        boxShadow: "0 2px 8px rgba(23, 43, 77, 0.06)",
        transition: "0.2s ease",
        cursor: "pointer",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 4px 12px rgba(23, 43, 77, 0.08)",
        },
      }}
    >
      <Stack spacing={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
            }}
          >
            {t("common.customerLabel")}{" "}{lead?.customer?.fullName || lead?.customer?.name || t("common.notSpecifiedMale")}
          </Typography>

          <Stack
            direction="row"
            flexWrap="wrap"
            useFlexGap
            sx={{
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              justifyContent: {
                xs: "flex-start",
                sm: "flex-end",
              },
              gap: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 20,
              }}
            >
              #{lead.num || "—"}
            </Typography>

            {/* <LeadStatus lead={lead} /> */}
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TripOriginIcon sx={{ fontSize: 12, color: "primary.main" }} />
              <Typography
                sx={{
                  fontSize: 12,
                }}
              >
                {t("lead.from")}
              </Typography>
            </Box>

            <Typography
              fontWeight={500}
              sx={{
                fontSize: 14,
                lineHeight: 1.35,
              }}
            >
              {lead?.from_location?.address || lead?.from || t("common.notSpecifiedMale")}
            </Typography>
          </Box>

          <ArrowDownwardRoundedIcon
            sx={{
              color: "text.secondary",
              fontSize: 17,
              transform: {
                xs: "none",
                sm: "rotate(-90deg)",
              },
            }}
          />

          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnOutlinedIcon
                sx={{ fontSize: 12, color: "primary.main" }}
              />
              <Typography
                sx={{
                  fontSize: 12,
                }}
              >
                {t("lead.to")}
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: 14,
                lineHeight: 1.35,
              }}
            >
              {lead?.to_location?.address || lead?.to || t("common.notSpecifiedMale")}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default LeadCard;
