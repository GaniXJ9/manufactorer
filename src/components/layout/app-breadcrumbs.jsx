import { useTranslation } from "react-i18next";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link as RouterLink, useMatches, useNavigate } from "react-router-dom";

export function AppBreadcrumbs({ currentTitle }) {
  const { t } = useTranslation();
  const matches = useMatches();
  const navigate = useNavigate();
  const items = matches.flatMap((match) => [
    ...(match.handle?.breadcrumbParents || []),
    ...(match.handle?.breadcrumb
      ? [{ to: match.pathname, label: match.handle.breadcrumb }]
      : []),
  ]).filter((item, index, all) => all.findLastIndex((entry) => entry.to === item.to) === index);
  const parentPath = items.at(-2)?.to || "/";

  return (
    <Breadcrumbs
      aria-label={t("nav.breadcrumbs")}
      separator="/"
      sx={{ mb: 4, color: "text.secondary", "& .MuiBreadcrumbs-ol": { rowGap: 1 } }}
    >
      <Link
        component="button"
        type="button"
        underline="hover"
        color="inherit"
        onClick={() => navigate(window.history.state?.idx > 0 ? -1 : parentPath)}
        sx={{ display: "inline-flex", alignItems: "center", font: "inherit", verticalAlign: "middle", cursor: "pointer" }}
      >
        <ChevronLeftIcon sx={(theme) => ({ mr: 0.5, transform: theme.direction === "rtl" ? "scaleX(-1)" : undefined })} />
        {t("nav.back")}
      </Link>
      {items.map((item, index) => index === items.length - 1 ? (
        <Typography key={item.to} color="text.secondary" aria-current="page">
          {currentTitle || t(item.label)}
        </Typography>
      ) : (
        <Link key={item.to} component={RouterLink} to={item.to} underline="hover" color="primary">
          {t(item.label)}
        </Link>
      ))}
    </Breadcrumbs>
  );
}
