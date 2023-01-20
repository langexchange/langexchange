import { Col, Row, Space, Typography } from "antd";
import FeedbackItem from "./FeedbackItem";

const { Title, Text } = Typography;

const feedbackItems = [
  {
    star: 5,
    content:
      "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.",
    owner: "Lorem Inspus",
  },
  {
    star: 5,
    content:
      "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.",
    owner: "Lorem Inspus",
  },
  {
    star: 5,
    content:
      "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.",
    owner: "Lorem Inspus",
  },
  {
    star: 5,
    content:
      "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.",
    owner: "Lorem Inspus",
  },
  {
    star: 5,
    content:
      "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.",
    owner: "Lorem Inspus",
  },
  {
    star: 5,
    content:
      "Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.",
    owner: "Lorem Inspus",
  },
];

const Feedbacks = () => {
  return (
    <div style={{ background: "white" }}>
      <Space
        direction="vertical"
        style={{ padding: "48px 50px", width: "100%" }}
        align="center"
        size={48}
      >
        <Space direction="vertical" align="center">
          <Title level={2} style={{ margin: "0" }}>
            What feeling are saying
          </Title>
          <Text type="secondary">
            Learn a language, explore new cultures, and make friends around the
            world
          </Text>
        </Space>
        <div>
          <Row align="middle" gutter={[24, 48]}>
            {feedbackItems.map((item, index) => (
              <Col span={8} key={index}>
                <FeedbackItem {...item} />
              </Col>
            ))}
          </Row>
        </div>
      </Space>
    </div>
  );
};

export default Feedbacks;
