import { Col } from "antd";
import ContentTitleWithSearch from "../../components/partners/ContentTitleWithSearch";
import ExplorePartnerList from "../../components/partners/ExplorePartnerList";
import FilterLine from "../../components/partners/FilterLine";

const PartnerExplorePage = () => {
  return (
    <Col
      span={18}
      style={{
        overflowY: "scroll",
        height: "100%",
        padding: "0 24px 48px 24px",
      }}
    >
      <ContentTitleWithSearch title="You may know" />
      <FilterLine />
      <ExplorePartnerList colSpan={8} />
    </Col>
  );
};

export default PartnerExplorePage;
