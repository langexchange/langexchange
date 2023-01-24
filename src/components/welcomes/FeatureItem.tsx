import { Image, Space, Typography } from "antd";

const { Title, Paragraph } = Typography;

interface FeatureItemProps {
  image: string;
  title: string;
  descriptions: string;
}

const FeatureItem = ({ image, title, descriptions }: FeatureItemProps) => {
  return (
    <Space direction="vertical" align="center" style={{ padding: "0 48px" }}>
      <Space direction="vertical" align="center">
        <Image src={image} alt="LangExchange feature" />
        <Title level={4}>{title}</Title>
      </Space>
      <Paragraph type="secondary" style={{ textAlign: "center" }}>
        {descriptions}
      </Paragraph>
    </Space>
  );
};

export default FeatureItem;
