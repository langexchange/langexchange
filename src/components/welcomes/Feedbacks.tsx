import { Col, Row, Space, Typography } from "antd";
import FeedbackItem from "./FeedbackItem";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["welcome"]);
  return (
    <div className="bg-white py-5">
      <div className="container-lg">
        <Space direction="vertical" align="center" size={48}>
          <Space direction="vertical" align="center">
            <Title level={2} className="m-0">
              {t("feedback-title")}
            </Title>
            <Text type="secondary">{t("feedback-slogan")}</Text>
          </Space>
          <div>
            <Row align="middle" gutter={[24, 48]}>
              {feedbackItems.map((item, index) => (
                <Col md={8} xs={24} sm={12} key={index}>
                  <FeedbackItem {...item} />
                </Col>
              ))}
            </Row>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default Feedbacks;
