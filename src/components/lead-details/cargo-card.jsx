import { useTranslation } from "react-i18next";
import InfoItem from "../../shared/ui/info-item";
import { Box, Typography } from "@mui/material";

const CargoCard = ({ cargo, index = 0 }) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2.5,
        backgroundColor: "background.default",
      }}
    >
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 600,
          mb: 1.5,
        }}
      >
        {t("cargo.number", { value: index + 1 })}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, minmax(0, 1fr))",
          },
          gap: 1.2,
          mb: 1.2,
        }}
      >
        <InfoItem label={t("cargo.name")} value={cargo?.name} />
        <InfoItem label={t("common.type")} value={cargo?.type} />
        <InfoItem
          label={t("cargo.weight")}
          value={cargo?.weight_kg != null ? t("cargo.weightValue", { value: cargo.weight_kg }) : t("cargo.noWeight")}
        />
        <InfoItem
          label={t("cargo.volume")}
          value={cargo?.volume != null ? t("cargo.volumeValue", { value: cargo.volume }) : t("cargo.noVolume")}
        />
      </Box>
    </Box>
  );
};

export default CargoCard;
