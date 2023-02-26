import { Col } from "antd";
import YourParnersList from "../../components/partners/YourPartnersList";

const YourPartnersPage = () => {
  return (
    <Col span={18} className="auto-hide-scroll scroll-style-1 height-full px-3">
      <YourParnersList colSpan={8} gutter={[12, 12]} />
    </Col>
  );
};

export default YourPartnersPage;
