import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import { STATUS } from "../const/status";

export const RenderStatusContent = ({ label, color = "#518ded" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          flexShrink: 0,
          borderRadius: "50%",
          backgroundColor: color,
        }}
      ></Box>

      <Typography
        sx={{
          color: "#172B4D",
          fontSize: {
            xs: "0.7rem",
            sm: "0.8rem",
          },
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

const RenderStatus = ({ status }) => {
  const { t } = useTranslation();
  switch (status) {
    case STATUS.new:
      return (
        <RenderStatusContent
          label={t("status.new")}
          variant="contained"
          color="#51d861"
        />
      );

    case STATUS.active:
      return (
        <RenderStatusContent
          label={t("status.active")}
          variant="outlined"
          color="#49b439"
        />
      );

    case STATUS.cancelled:
      return (
        <RenderStatusContent
          label={t("status.cancelled")}
          variant="outlined"
          color="#c60606"
        />
      );

    case STATUS.add_driver:
      return (
        <RenderStatusContent label={t("status.addDriver")} variant="outlined" />
      );

    case STATUS.start_driver:
      return (
        <RenderStatusContent label={t("status.startDriver")} variant="contained" />
      );

    case STATUS.loading:
      return <RenderStatusContent label={t("status.loading")} variant="contaned" />;

    case STATUS.start_loading:
      return <RenderStatusContent label={t("status.loading")} variant="outlined" />;

    case STATUS.verification_loading:
      return (
        <RenderStatusContent
          label={t("status.loadingVerified")}
          variant="contained"
        />
      );

    case STATUS.start_unloading:
      return <RenderStatusContent label={t("status.unloading")} variant="outlined" />;

    case STATUS.unloading:
      return <RenderStatusContent label={t("status.unloading")} variant="contaned" />;

    case STATUS.verification_unloading:
      return (
        <RenderStatusContent
          label={t("status.unloadingVerified")}
          variant="outlined"
        />
      );

    case STATUS.finished:
      return (
        <RenderStatusContent
          label={t("status.finished")}
          variant="outlined"
          color="#c60606"
        />
      );

    case STATUS.deleted:
      return (
        <RenderStatusContent
          label={t("status.deleted")}
          variant="outlined"
          color="#c60606"
        />
      );

    case STATUS.loss:
      return (
        <RenderStatusContent
          label={t("status.lost")}
          variant="outlined"
          color="#c60606"
        />
      );

    case STATUS.closed:
      return (
        <RenderStatusContent
          label={t("status.closed")}
          variant="container"
          color="#c60606"
        />
      );

    case STATUS.winning:
      return <RenderStatusContent label={t("status.won")} variant="outlined" />;

    case STATUS.await_paid:
      return (
        <RenderStatusContent label={t("status.awaitingPayment")} variant="outlined" />
      );

    case STATUS.verified_participant:
      return (
        <RenderStatusContent label={t("status.pendingConfirmation")} variant="outlined" />
      );

    case STATUS.approved:
      return <RenderStatusContent label={t("status.approved")} variant="outlined" />;

    case STATUS.emergency_situation:
      return (
        <RenderStatusContent
          label={t("status.emergency")}
          variant="outlined"
          color="#c60606"
        />
      );

    case STATUS.finished_emergency_situation:
      return (
        <RenderStatusContent
          label={t("status.emergencyClosed")}
          variant="outlined"
          color="#c60606"
        />
      );

    case STATUS.sign_avr:
      return (
        <RenderStatusContent
          label={t("status.awaitingSignatures")}
          variant="outlined"
          color="#d16a16"
        />
      );

    default:
      return <>{t("status.none")}</>;
  }
};

export default RenderStatus;
