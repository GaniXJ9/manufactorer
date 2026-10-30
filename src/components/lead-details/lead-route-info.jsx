import { useTranslation } from "react-i18next";
import RouteOutlinedIcon from "@mui/icons-material/RouteOutlined";
import { Box } from "@mui/material";
import RoutePoint from "./route-point";
import Section from "../../shared/ui/section";

const LeadRouteInfo = ({ leadData }) => {
  const { t } = useTranslation();
  const waypoints = leadData?.waypoints || [];
  const pointSchedules = leadData?.point_schedules || [];

  return (
    <Section title={t("lead.route")} icon={<RouteOutlinedIcon color="primary" />}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          gap: {
            xs: 1,
            sm: 1.5,
            md: 2,
          },

          width: "100%",
          minWidth: 0,

          px: {
            xs: 0,
            sm: 0.5,
            md: 0,
          },
        }}
      >
        <RoutePoint
          label={t("lead.from")}
          isFrom
          address={leadData?.from_location?.address || t("common.notSpecifiedMale")}
          isPassed={leadData?.from_location?.is_passed}
          status={
            leadData?.from_location?.is_passed
              ? t("lead.pointPassed")
              : t("lead.pointNotPassed")
          }
          date={pointSchedules[0]}
        />

        {waypoints.map((point, index) => (
          <RoutePoint
            key={point?.id || `${point?.address}-${index}`}
            isPassed={point?.is_passed}
            isWaypoint
            label={t("lead.waypoint", { value: index + 1 })}
            address={point?.address || t("common.notSpecifiedMale")}
            status={point?.is_passed ? t("lead.pointPassed") : t("lead.pointNotPassed")}
            date={pointSchedules[index + 1]}
            type={point.type}
          />
        ))}

        <RoutePoint
          label={t("lead.to")}
          address={leadData?.to_location?.address || t("common.notSpecifiedMale")}
          isTo
          status={
            leadData?.to_location?.is_passed
              ? t("lead.pointPassed")
              : t("lead.pointNotPassed")
          }
          isPassed={leadData?.to_location?.is_passed}
          date={pointSchedules[waypoints.length + 1]}
        />
      </Box>
    </Section>
  );
};

export default LeadRouteInfo;
