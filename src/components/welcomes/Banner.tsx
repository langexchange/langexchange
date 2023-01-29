import BannerImage from "../../assets/images/introduce_img.svg";
import { Button, Col, Image, Row, Space, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Banner = () => {
  return (
    <Row className="bg-white" align="middle">
      <Col span={12} className="d-flex justify-center">
        <Image src={BannerImage} alt="Welcome banner" width="100%" />
      </Col>
      <Col span={12} className="d-flex justify-center">
        <Space direction="vertical" size={16} align="center">
          <Space direction="vertical" size={0} align="center">
            <Title level={2} style={{ margin: 0 }}>
              <span className="color-blue-logo">Lang</span>
              <span className="color-red-logo">Exchange</span>
            </Title>
            <Title className="m-0">Learning language community</Title>
          </Space>
          <Text type="secondary">
            Everyone can together share, exchange stories, and improve skills
          </Text>
          <Button size="large" type="primary" icon={<ArrowRightOutlined />}>
            Let's get started
          </Button>
        </Space>
      </Col>
    </Row>
  );
};

export default Banner;
