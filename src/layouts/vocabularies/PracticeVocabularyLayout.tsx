import { Col, Drawer, Layout, Row } from "antd";
import PracticeSidebar from "../../components/vocabularies/PracticeSidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Button } from "antd/es/radio";

const PracticeVocabularyLayout: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  return (
    <Layout
      className="py-4 full-height-minus-header"
      style={{ backgroundColor: "inherit" }}
    >
      <Layout.Sider
        className="card-box-shadow rounded-3 white-background"
        width={360}
        style={{ zIndex: 2 }}
        breakpoint="xl"
        collapsedWidth="0"
        theme="light"
        zeroWidthTriggerStyle={{ top: "12px" }}
        trigger={null}
      >
        <PracticeSidebar />
      </Layout.Sider>
      <Layout.Content
        className="d-flex justify-center"
        style={{ backgroundColor: "inherit" }}
      >
        <Row className="w-100" gutter={4} style={{ height: "fit-content" }}>
          <Col xs={24} xl={0} className="mb-4">
            <Button onClick={() => showDrawer()}>Danh sách</Button>
          </Col>
          <Col span={24}>
            <Outlet />
          </Col>
        </Row>
      </Layout.Content>
      <Drawer
        title="Danh sách luyện tập"
        placement="left"
        width="min(100vw, 800px)"
        onClose={() => setOpen(false)}
        open={open}
      >
        <PracticeSidebar />
      </Drawer>
    </Layout>
  );
};

export default PracticeVocabularyLayout;
