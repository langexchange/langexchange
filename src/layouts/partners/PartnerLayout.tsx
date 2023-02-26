import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/partners/Sidebar";

const PartnerLayout = () => {
  return (
    <Row
      gutter={24}
      className="full-height-minus-header py-3"
      justify="space-between"
    >
      <Col span={6}>
        <Sidebar />
      </Col>
      <Outlet />
    </Row>
  );
};

export default PartnerLayout;
