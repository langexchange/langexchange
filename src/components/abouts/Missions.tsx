import { Col, Row, Space, Typography } from "antd";
import LocationIcon from "../../assets/images/locations.png";
import BookIcon from "../../assets/images/books.png";
import NoteIcon from "../../assets/images/note.png";
import LanguageIcon from "../../assets/images/language.png";
import MissionItem from "../welcomes/FeatureItem";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

const Missions = () => {
  const [t] = useTranslation("about");

  const missionItems = [
    {
      image: LocationIcon,
      title: t("mission-build-health-community"),
      descriptions: t("mission-build-health-community-description"),
    },
    {
      image: BookIcon,
      title: t("mission-create-learning-opportunity"),
      descriptions: t("mission-create-learning-opportunity-description"),
    },
    {
      image: NoteIcon,
      title: t("mission-provide-interesting-contents"),
      descriptions: t("mission-provide-interesting-contents-description"),
    },
    {
      image: LanguageIcon,
      title: t("mission-support-many-features-tools"),
      descriptions: t("mission-support-many-features-tools-description"),
    },
  ];

  return (
    <div className="has-background-color">
      <div className="container-lg py-5 text-center">
        <Space direction="vertical" align="center" size={48}>
          <Title level={2} className="m-0">
            <span className="color-blue-logo">Lang</span>
            <span className="color-red-logo">Exchange</span> {t("missions")}
          </Title>
          <div>
            <Row align="middle" gutter={[24, 48]}>
              {missionItems.map((item, index) => (
                <Col md={12} xs={24} key={index}>
                  <MissionItem {...item} />
                </Col>
              ))}
            </Row>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default Missions;
