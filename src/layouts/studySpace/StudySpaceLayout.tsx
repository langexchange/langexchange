import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";
import MainSidebar from "../../components/studySpaces/MainSidebar";

const StudySpaceLayout = () => {
  return (
    <div>
      <Row
        style={{
          height: "calc(100vh - 48px)",
          padding: "24px 50px",
        }}
        justify="space-between"
      >
        <Col span={6}>
          <MainSidebar />
        </Col>
        <Outlet />
      </Row>
    </div>
  );
};

export default StudySpaceLayout;
