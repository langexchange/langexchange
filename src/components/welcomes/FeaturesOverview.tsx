import { Col, Row, Space, Typography } from "antd";
import MakeFriendIcon from "../../assets/images/make_friend.svg";
import StoryIcon from "../../assets/images/story.svg";
import ChattingIcon from "../../assets/images/chatting.svg";
import LanguageIcon from "../../assets/images/language.svg";
import { FeatureItem } from "./FeatureItem";

const { Title, Text } = Typography;

const featuresItems = [
  {
    image: MakeFriendIcon,
    title: "Make friends",
    descriptions:
      "You can be able to connect to many other partners who have the same targets, and hobbies as you. Then all of you can share with each other to improve your skills.",
  },
  {
    image: StoryIcon,
    title: "Share stories",
    descriptions:
      "You can be able to connect to many other partners who have the same targets, and hobbies as you. Then all of you can share with each other to improve your skills.",
  },
  {
    image: ChattingIcon,
    title: "Chatting",
    descriptions:
      "You can be able to connect to many other partners who have the same targets, and hobbies as you. Then all of you can share with each other to improve your skills.",
  },
  {
    image: LanguageIcon,
    title: "Support tools",
    descriptions:
      "You can be able to connect to many other partners who have the same targets, and hobbies as you. Then all of you can share with each other to improve your skills.",
  },
];

export const FeaturesOverview = () => {
  return (
    <Space
      direction="vertical"
      style={{ padding: "48px 50px" }}
      align="center"
      size={48}
    >
      <Space direction="vertical" align="center">
        <Title level={2} style={{ margin: "0" }}>
          The language exchange community
        </Title>
        <Text type="secondary">
          Learn a language, explore new cultures, and make friends around the
          world
        </Text>
      </Space>
      <div>
        <Row align="middle" gutter={[24, 48]}>
          {featuresItems.map((item, index) => (
            <Col span={12} key={index}>
              <FeatureItem {...item} />
            </Col>
          ))}
        </Row>
      </div>
    </Space>
  );
};
