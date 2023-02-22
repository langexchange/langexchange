import { Col } from "antd";
import ContentTitleWithSearch from "../../components/partners/ContentTitleWithSearch";
import ExplorePartnerList from "../../components/partners/ExplorePartnerList";
import FilterLine from "../../components/partners/FilterLine";

const PartnerExplorePage = () => {
  return (
    <Col
      span={18}
      className="overflow-y-scroll height-full pb-5 overflow-x-hidden"
    >
      <ContentTitleWithSearch title="You may know" />
      <FilterLine />
      <ExplorePartnerList colSpan={8} />
    </Col>
  );
};

export default PartnerExplorePage;
