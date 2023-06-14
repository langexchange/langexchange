import { Col, Layout, Row } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/partners/Sidebar";

const PartnerLayout = () => {
  return (
    <Layout
      style={{ background: "inherit" }}
      className="full-height-minus-header py-3"
    >
      <Layout.Sider
        style={{ height: "fit-content", background: "transparent" }}
        breakpoint="lg"
        collapsedWidth="0"
        theme="light"
        zeroWidthTriggerStyle={{ top: "80px" }}
        trigger={null}
      >
        <Sidebar />
      </Layout.Sider>
      <Layout.Content className="px-3">
        <Row className="w-100 mb-2">
          <Col lg={0} xs={24}>
            <Sidebar mode="horizontal" />
          </Col>
        </Row>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default PartnerLayout;
