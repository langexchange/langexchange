import { Col, Row } from "antd";
import PostSearchCard from "../../components/PostSearchCard";
import GroupPostList from "../../components/studySpaces/GroupPostList";
import MainSidebar from "../../components/studySpaces/MainSidebar";

const StudySpacePage = () => {
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
          <MainSidebar />
        </Col>
        <Col
          span={12}
          style={{
            overflowY: "scroll",
            height: "100%",
            padding: "0 24px 48px 24px",
          }}
        >
          <GroupPostList />
        </Col>
        <Col span={6}>
          <PostSearchCard />
        </Col>
      </Row>
    </div>
  );
};

export default StudySpacePage;
