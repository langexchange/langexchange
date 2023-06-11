import { Col, Image, Row, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

const BannerAbout: React.FC = () => {
  const [t] = useTranslation("about");
  return (
    <div className="bg-white">
      <div className="container-lg py-5">
        <Row align="middle" gutter={12}>
          <Col md={12} xs={24} className="d-flex justify-center">
            <Space direction="vertical" size={16} align="center">
              <Space
                direction="vertical"
                size={0}
                align="center"
                className="text-center"
              >
                <Title level={2} className="m-0">
                  <span className="color-blue-logo">Lang</span>
                  <span className="color-red-logo">Exchange</span>{" "}
                  {t("develop-team")}
                </Title>
                <Paragraph
                  className="text-center fz-18 text-400 mt-2"
                  style={{ lineHeight: "24px" }}
                >
                  {t("banner-title")}
                </Paragraph>
              </Space>
              <Paragraph type="secondary" className="text-300">
                {t("banner-description")}
              </Paragraph>
            </Space>
          </Col>
          <Col md={12} xs={24} className="d-flex justify-center">
            <Image
              src="https://static.vecteezy.com/system/resources/previews/002/792/531/original/design-of-improve-behavior-literacy-in-managing-finances-people-saving-in-piggy-bank-for-financial-education-illustration-can-be-for-websites-posters-banners-mobile-apps-web-social-media-free-vector.jpg"
              alt="Team's memebers"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BannerAbout;
