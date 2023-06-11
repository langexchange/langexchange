import { Col, Row, Space, Typography } from "antd";
import MakeFriendIcon from "../../assets/images/make_friend.png";
import StoryIcon from "../../assets/images/story.png";
import ChattingIcon from "../../assets/images/chatting.png";
import LanguageIcon from "../../assets/images/language.png";
import FeatureItem from "./FeatureItem";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const FeaturesOverview = () => {
  const { t } = useTranslation(["welcome"]);

  const featuresItems = [
    {
      image: MakeFriendIcon,
      title: t("feature-make-friends-title"),
      descriptions: t("feature-make-friends-slogan"),
    },
    {
      image: StoryIcon,
      title: t("feature-share-stories-title"),
      descriptions: t("feature-share-stories-slogan"),
    },
    {
      image: ChattingIcon,
      title: t("feature-chatting-title"),
      descriptions: t("feature-chatting-slogan"),
    },
    {
      image: LanguageIcon,
      title: t("feature-support-tool-title"),
      descriptions: t("feature-support-tool-slogan"),
    },
  ];

  return (
    <div className="has-background-color py-5">
      <div className="container-lg text-center">
        <Space direction="vertical" align="center" size={48}>
          <Space direction="vertical" align="center">
            <Title level={2} className="m-0">
              {t("feature-title")}
            </Title>
            <Text type="secondary">{t("feature-slogan")}</Text>
          </Space>
          <div>
            <Row align="middle" gutter={[24, 48]}>
              {featuresItems.map((item, index) => (
                <Col md={12} key={index} sm={24}>
                  <FeatureItem {...item} />
                </Col>
              ))}
            </Row>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default FeaturesOverview;
