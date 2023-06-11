import { Button, Card, Image, Space, Typography } from "antd";

const { Title, Paragraph } = Typography;

interface ContactItemProps {
  image: string;
  title: string;
  descriptions: string;
  type: string;
  text_button: string;
  link: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  image,
  title,
  descriptions,
  type,
  text_button,
  link,
}) => {
  return (
    <Card>
      <Space direction="vertical" align="center" size="large">
        <Space direction="vertical" align="center">
          <Image src={image} alt="LangExchange Support" />
          <Title level={4}>{title}</Title>
        </Space>
        <Paragraph type="secondary" className="text-justify">
          {descriptions}
        </Paragraph>
        <Button
          className={`btn-${type}`}
          type="primary"
          size="large"
          href={link}
          target="_blank"
        >
          {text_button}
        </Button>
      </Space>
    </Card>
  );
};

export default ContactItem;
