import BannerImage from "../../assets/images/introduce_img.svg";
import { Button, Col, Image, Row, Space, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { blue, red } from "@ant-design/colors";

const { Title, Text } = Typography;

export const Banner = () => {
  return (
    <Row style={{ backgroundColor: "white" }} align="middle">
      <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
        <Image src={BannerImage} alt="Welcome banner" width="100%" />
      </Col>
      <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
        <Space direction="vertical" size={16} align="center">
          <Space direction="vertical" size={0} align="center">
            <Title level={2} style={{ margin: 0 }}>
              <span style={{ color: blue[4] }}>Lang</span>
              <span style={{ color: red[7] }}>Exchange</span>
            </Title>
            <Title style={{ margin: 0 }}>Learning language community</Title>
          </Space>
          <Text type="secondary">
            Everyone can together share, exchange stories, and improve skills
          </Text>
          <Button type="primary" icon={<ArrowRightOutlined />}>
            Let's get started
          </Button>
        </Space>
      </Col>
    </Row>
  );
};
