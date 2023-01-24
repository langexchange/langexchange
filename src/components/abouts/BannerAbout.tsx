import { Col, Image, Row, Space, Typography } from "antd";
import { blue, red } from "@ant-design/colors";
import MemeberImage from "../../assets/images/members.png";

const { Title, Paragraph } = Typography;

const BannerAbout = () => {
  return (
    <Row
      style={{ backgroundColor: "white", padding: "48px 50px" }}
      align="middle"
    >
      <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
        <Space
          direction="vertical"
          size={16}
          align="center"
          style={{ maxWidth: "80%" }}
        >
          <Space direction="vertical" size={0} align="center">
            <Title level={2} style={{ margin: 0 }}>
              <span style={{ color: blue[4] }}>Lang</span>
              <span style={{ color: red[7] }}>Exchange</span> develop team
            </Title>
            <Paragraph style={{ fontSize: "20px", textAlign: "center" }}>
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
      <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
        <Image src={MemeberImage} alt="Team's memebers" />
      </Col>
    </Row>
  );
};

export default BannerAbout;
