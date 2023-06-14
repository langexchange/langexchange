import BannerImage from "../../assets/images/introduce_img.png";
import { Button, Col, Image, Row, Space, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const Banner = () => {
  const { t } = useTranslation(["welcome"]);

  return (
    <div className="bg-white">
      <Row
        className="container-lg py-5 m-auto"
        align="middle"
        gutter={[12, 12]}
      >
        <Col md={12} xs={24} className="d-flex justify-center">
          <Image src={BannerImage} alt="Welcome banner" width="100%" />
        </Col>
        <Col md={12} xs={24} className="d-flex justify-center text-center">
          <Space direction="vertical" size={16} align="center">
            <Space direction="vertical" size={0} align="center">
              <Title level={2} style={{ margin: 0 }}>
                <span className="color-blue-logo">Lang</span>
                <span className="color-red-logo">Exchange</span>
              </Title>
              <Title className="m-0">{t("banner-title")}</Title>
            </Space>
            <Text type="secondary">{t("banner-slogan")}</Text>
            <Link to="/sign-up">
              <Button size="large" type="primary" icon={<ArrowRightOutlined />}>
                {t("btn-text-start")}
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Banner;
