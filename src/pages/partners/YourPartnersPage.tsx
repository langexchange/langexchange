import { Col } from "antd";
import YourParnersList from "../../components/partners/YourPartnersList";

const YourPartnersPage = () => {
  return (
    <Col span={18} className="overflow-y-scroll height-full ">
      <YourParnersList colSpan={8} />
    </Col>
  );
};

export default YourPartnersPage;
