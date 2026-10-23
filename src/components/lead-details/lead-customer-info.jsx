import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import { Box } from "@mui/material";
import Section from "../../shared/ui/section";
import EmptyInfo from "../../shared/ui/empty-info";
import InfoItem from "../../shared/ui/info-item";

const LeadCustomerInfo = ({ leadData }) => {
  const customer = leadData?.customer;

  if (!customer?.name)
    return (
      <Section
        title="Данные о заказчике"
        icon={<BusinessOutlinedIcon color="primary" />}
      >
        <EmptyInfo
          label="Заказчик не указан"
          subLabel="Нельзя начать рейс без заказчика"
        />
      </Section>
    );

  return (
    <Section
      title="Данные о заказчике"
      icon={<BusinessOutlinedIcon color="primary" />}
    >
      <Box
        sx={{
          py: 1,
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, minmax(0, 1fr))",
          },
        }}
      >
        <InfoItem label={"Имя"} value={customer.name} />
        <InfoItem label={"Номер телефона"} value={customer.tel} />
        <InfoItem label={"БИН"} value={customer.bin} />
        <InfoItem label={"Контактное лицо"} value={customer.contact_person} />
      </Box>
    </Section>
  );
};

export default LeadCustomerInfo;
