import { Col } from "antd";
import PostSearchCard from "../../components/PostSearchCard";
import GroupPostList from "../../components/studySpaces/GroupPostList";

const StudySpacePage = () => {
  return (
    <>
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
    </>
  );
};

export default StudySpacePage;
