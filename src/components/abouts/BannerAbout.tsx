import { Col, Image, Row, Space, Typography } from "antd";
import MemeberImage from "../../assets/images/members.png";

const { Title, Paragraph } = Typography;

const BannerAbout = () => {
  return (
    <Row className="bg-white" style={{ padding: "48px 50px" }} align="middle">
      <Col span={12} className="d-flex justify-center">
        <Space
          direction="vertical"
          size={16}
          align="center"
          style={{ maxWidth: "80%" }}
        >
          <Space direction="vertical" size={0} align="center">
            <Title level={2} className="m-0">
              <span className="color-blue-logo">Lang</span>
              <span className="color-red-logo">Exchange</span> develop team
            </Title>
            <Paragraph className="text-center fz-20">
              We are a group of software development students working on a
              project at Ho Chi Minh city University of Technology
            </Paragraph>
          </Space>
          <Paragraph type="secondary" className="text-300">
            Lorem ipsum dolor sit amet consectetur. Scelerisque volutpat amet
            mollis gravida elementum lorem consectetur. Sed cras et venenatis
            feugiat malesuada interdum arcu orci.
          </Paragraph>
        </Space>
      </Col>
      <Col span={12} className="d-flex justify-center">
        <Image src={MemeberImage} alt="Team's memebers" />
      </Col>
    </Row>
  );
};

export default BannerAbout;
