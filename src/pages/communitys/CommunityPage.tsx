import { Col, Layout, Row, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import PostList from "../../components/community/PostList";
import RightSidebar from "../../components/community/RightSidebar";
import Sidebar from "../../components/community/Sidebar";
import PostCard from "../../components/PostCard";
import PostInput from "../../components/PostInput";

const CommunityPage = () => {
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
          <RightSidebar />
        </Col>
        <Col
          span={10}
          style={{
            overflowY: "scroll",
            height: "100%",
            padding: "0 24px 48px 24px",
          }}
        >
          <PostInput />
          <PostList />
        </Col>
        <Col span={6}>
          <Sidebar />
        </Col>
      </Row>
    </div>
  );
};

export default CommunityPage;