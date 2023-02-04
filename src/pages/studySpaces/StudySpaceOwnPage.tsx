import { Col } from "antd";
import StudySpaceTabs from "../../components/community/StudySpaceTabs";

const StudySpaceOwnPage = () => {
  return (
    <>
      <Col
        span={18}
        style={{
          overflowY: "scroll",
          height: "100%",
          padding: "0 24px 48px 24px",
        }}
      >
        <StudySpaceTabs />
      </Col>
    </>
  );
};

export default StudySpaceOwnPage;
