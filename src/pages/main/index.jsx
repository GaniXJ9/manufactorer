import { useTranslation } from "react-i18next";
import RootLayout from "../../components/layout/root-layout";
import { PageHeading } from "../../components/layout/page-heading";

const Main = () => {
  const { t } = useTranslation();
  return (
    <RootLayout>
      <PageHeading title={t("nav.home")} subtitle={t("home.subtitle")} />
    </RootLayout>
  );
};

export default Main;
