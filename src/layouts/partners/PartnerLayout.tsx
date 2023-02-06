import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/partners/Sidebar";

const PartnerLayout = () => {
  return (
    <div>
      <Row
        style={{
          height: "calc(100vh - 64px)",
          padding: "24px 50px",
        }}
        justify="space-between"
      >
        <Col span={6}>
          <Sidebar />
        </Col>
        <Outlet />
      </Row>
    </div>
  );
};

export default PartnerLayout;
