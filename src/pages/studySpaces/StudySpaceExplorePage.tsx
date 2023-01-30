import { Breadcrumb, Col, Row } from "antd";
import { GroupOutlined } from "@ant-design/icons";
import Sidebar from "../../components/studySpaces/Sidebar";
import StudySpaceList from "../../components/studySpaces/StudySpaceList";

const StudySpaceExplorePage = () => {
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
        <Col
          span={18}
          style={{
            overflowY: "scroll",
            height: "100%",
            padding: "0 24px 48px 24px",
          }}
        >
          <Breadcrumb style={{ marginBottom: "4px" }}>
            <Breadcrumb.Item href="">
              <GroupOutlined />
              <span>Study space</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Explores</Breadcrumb.Item>
          </Breadcrumb>
          <StudySpaceList />
        </Col>
      </Row>
    </div>
  );
};

export default StudySpaceExplorePage;
