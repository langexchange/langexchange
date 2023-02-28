import { Col } from "antd";
import { useTranslation } from "react-i18next";
import ContentTitleWithSearch from "../../components/partners/ContentTitleWithSearch";
import ExplorePartnerList from "../../components/partners/ExplorePartnerList";
import FilterLine from "../../components/partners/FilterLine";

const PartnerExplorePage = () => {
  const [t] = useTranslation(["commons"]);
  return (
    <Col
      span={18}
      className="auto-hide-scroll scroll-style-1 height-full pb-5 overflow-x-hidden"
    >
      <ContentTitleWithSearch title={t("You may know")} />
      <FilterLine />
      <ExplorePartnerList colSpan={8} />
    </Col>
  );
};

export default PartnerExplorePage;
