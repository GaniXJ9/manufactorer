import { useTranslation } from "react-i18next";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import { Box } from "@mui/material";
import Section from "../../shared/ui/section";
import EmptyInfo from "../../shared/ui/empty-info";
import InfoItem from "../../shared/ui/info-item";

const LeadCustomerInfo = ({ leadData }) => {
  const { t } = useTranslation();
  const customer = leadData?.customer;

  if (!customer?.name)
    return (
      <Section
        title={t("lead.customerDetails")}
        icon={<BusinessOutlinedIcon color="primary" />}
      >
        <EmptyInfo
          label={t("lead.noCustomer")}
          subLabel={t("lead.customerRequired")}
        />
      </Section>
    );

  return (
    <Section
      title={t("lead.customerDetails")}
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
        <InfoItem label={t("common.name")} value={customer.name} />
        <InfoItem label={t("common.phoneNumber")} value={customer.tel} />
        <InfoItem label={t("common.bin")} value={customer.bin} />
        <InfoItem label={t("common.contactPerson")} value={customer.contact_person} />
      </Box>
    </Section>
  );
};

export default LeadCustomerInfo;
