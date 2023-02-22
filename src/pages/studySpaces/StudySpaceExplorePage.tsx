import { Breadcrumb, Col, Row, Space, Typography } from "antd";
import { GroupOutlined } from "@ant-design/icons";
import Sidebar from "../../components/studySpaces/Sidebar";
import StudySpaceList from "../../components/studySpaces/StudySpaceList";
import { Link } from "react-router-dom";

const StudySpaceExplorePage = () => {
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
            <Breadcrumb.Item>
              <Link to="/study-spaces">
                <Space size={4}>
                  <GroupOutlined />
                  <span>Study space</span>
                </Space>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Explores</Breadcrumb.Item>
          </Breadcrumb>
          <Typography.Title level={3}>Recommends for you</Typography.Title>
          <StudySpaceList colSpan={8} />
        </Col>
      </Row>
    </div>
  );
};

export default StudySpaceExplorePage;
