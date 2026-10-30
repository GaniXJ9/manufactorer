import { useTranslation } from "react-i18next";
import CargoCard from "../../../components/lead-details/cargo-card";
import LeadMap from "../../../components/lead-details/lead-map";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Alert, Box, CircularProgress } from "@mui/material";
import LeadHeading from "../../../components/lead-details/lead-heading";
import RootLayout from "../../../components/layout/root-layout";
import { useLeadsContext } from "../../../app/context/leads/use-leads-context";
import LeadRouteInfo from "../../../components/lead-details/lead-route-info";
import LeadCustomerInfo from "../../../components/lead-details/lead-customer-info";
import Section from "../../../shared/ui/section";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

const LeadDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { lead, leadLoading, leadError, fetchLead } = useLeadsContext();

  useEffect(() => {
    const controller = new AbortController();
    fetchLead(id, controller.signal);
    return () => controller.abort();
  }, [id, fetchLead]);

  if (leadLoading || (!leadError && lead?.id !== id)) {
    return (
      <RootLayout>
        <CircularProgress aria-label={t("leads.loadingDetails")} />
      </RootLayout>
    );
  }

  if (leadError) {
    return (
      <RootLayout>
        <Alert severity="error">{t(leadError)}</Alert>
      </RootLayout>
    );
  }

  return (
    <RootLayout breadcrumbTitle={t("lead.number", { value: lead.num || "—" })}>
      <LeadHeading leadData={lead} />

      <LeadMap leadData={lead} />

      <LeadRouteInfo leadData={lead} />

      <LeadCustomerInfo leadData={lead} />

      <Section
        title={t("cargo.title")}
        icon={<LocalShippingOutlinedIcon color="primary" />}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 2,
          }}
        >
          {lead?.cargos?.map((cargo, index) => (
            <CargoCard key={cargo.id || index} cargo={cargo} index={index} />
          ))}
        </Box>
      </Section>
    </RootLayout>
  );
};

export default LeadDetails;
