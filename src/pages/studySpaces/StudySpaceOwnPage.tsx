import { Col, Row } from "antd";
import StudySpaceTabs from "../../components/community/StudySpaceTabs";
import PostSearchCard from "../../components/PostSearchCard";
import GroupPostList from "../../components/studySpaces/GroupPostList";
import MainSidebar from "../../components/studySpaces/MainSidebar";

const StudySpaceOwnPage = () => {
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
          <StudySpaceTabs />
        </Col>
        <Col span={6}>
          <PostSearchCard />
        </Col>
      </Row>
    </div>
  );
};

export default StudySpaceOwnPage;
