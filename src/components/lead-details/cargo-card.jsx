import InfoItem from "../../shared/ui/info-item";
import { Box, Typography } from "@mui/material";

const CargoCard = ({ cargo, index = 0 }) => {
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
        Груз #{index + 1}
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
        <InfoItem label="Наименование" value={cargo?.name} />
        <InfoItem label="Тип" value={cargo?.type} />
        <InfoItem
          label="Вес"
          value={cargo?.weight_kg != null ? `${cargo.weight_kg} кг` : "Вес не указан"}
        />
        <InfoItem
          label="Объём"
          value={cargo?.volume != null ? `${cargo.volume} м³` : "Объём не указан"}
        />
      </Box>
    </Box>
  );
};

export default CargoCard;