import { Col } from "antd";
import ContentTitleWithSearch from "../../components/partners/ContentTitleWithSearch";
import FilterLine from "../../components/partners/FilterLine";
import PartnerRequestList from "../../components/partners/PartnerRequestList";

const PartnerRequestsPage = () => {
  return (
    <Col
      span={18}
      style={{
        overflowY: "scroll",
        height: "100%",
        padding: "0 24px 48px 24px",
      }}
    >
      <ContentTitleWithSearch title="Partner requests" />
      <FilterLine />
      <PartnerRequestList colSpan={8} />
    </Col>
  );
};

export default PartnerRequestsPage;
