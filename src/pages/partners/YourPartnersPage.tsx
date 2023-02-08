import { Col } from "antd";
import YourParnersList from "../../components/partners/YourPartnersList";

const YourPartnersPage = () => {
  return (
    <Col
      span={18}
      style={{
        overflowY: "scroll",
        height: "100%",
        padding: "0 24px 48px 24px",
      }}
    >
      <YourParnersList />
    </Col>
  );
};

export default YourPartnersPage;
