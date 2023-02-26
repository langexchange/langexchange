import { Col } from "antd";
import ContentTitleWithSearch from "../../components/partners/ContentTitleWithSearch";
import FilterLine from "../../components/partners/FilterLine";
import PartnerRequestList from "../../components/partners/PartnerRequestList";

const PartnerRequestsPage = () => {
  return (
    <Col
      span={18}
      className="auto-hide-scroll scroll-style-1 height-full pb-5 overflow-x-hidden"
    >
      <ContentTitleWithSearch title="Partner requests" />
      <FilterLine />
      <PartnerRequestList colSpan={8} />
    </Col>
  );
};

export default PartnerRequestsPage;
