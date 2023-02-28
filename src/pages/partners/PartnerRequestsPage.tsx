import { Col } from "antd";
import { useTranslation } from "react-i18next";
import ContentTitleWithSearch from "../../components/partners/ContentTitleWithSearch";
import FilterLine from "../../components/partners/FilterLine";
import PartnerRequestList from "../../components/partners/PartnerRequestList";

const PartnerRequestsPage = () => {
  const [t] = useTranslation(["commons"]);
  return (
    <Col
      span={18}
      className="auto-hide-scroll scroll-style-1 height-full pb-5 overflow-x-hidden"
    >
      <ContentTitleWithSearch title={t("Partner request").toString()} />
      <FilterLine />
      <PartnerRequestList colSpan={8} />
    </Col>
  );
};

export default PartnerRequestsPage;
