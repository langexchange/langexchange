import { Col, Row, Space, Typography } from "antd";
import MailSupportIcon from "../../assets/images/mail_support.png";
import ChatSupportIcon from "../../assets/images/chat_support.png";
import HandshakeIcon from "../../assets/images/handshake.png";
import ContactItem from "./ContactItem";

const { Title } = Typography;

const contactItems = [
  {
    image: ChatSupportIcon,
    title: "General inquiries",
    descriptions:
      "Lorem ipsum dolor sit amet consectetur. Elit enim scelerisque vel vitae. Sollicitudin feugiat malesuada viverra nec. Mattis aliquam sit arcu feugiat. Lectus vel potenti aliquam nulla.",
    type: "primary",
    text_button: "Contact us",
  },
  {
    image: MailSupportIcon,
    title: "Customer support",
    descriptions:
      "Lorem ipsum dolor sit amet consectetur. Elit enim scelerisque vel vitae. Sollicitudin feugiat malesuada viverra nec. Mattis aliquam sit arcu feugiat. Lectus vel potenti aliquam nulla.",
    type: "warning",
    text_button: "Email support",
  },
  {
    image: HandshakeIcon,
    title: "Cooperate with us",
    descriptions:
      "Lorem ipsum dolor sit amet consectetur. Elit enim scelerisque vel vitae. Sollicitudin feugiat malesuada viverra nec. Mattis aliquam sit arcu feugiat. Lectus vel potenti aliquam nulla.",
    type: "success",
    text_button: "Get details",
  },
];

const Contacts = () => {
  return (
    <div className="bg-white">
      <div className="container py-5">
        <Space
          direction="vertical"
          align="center"
          size={48}
          className="bg-white"
        >
          <Title level={2} className="m-0">
            Contact to <span className="color-blue-logo">Lang</span>
            <span className="color-red-logo">Exchange</span>
          </Title>
          <div>
            <Row align="middle" gutter={[24, 48]}>
              {contactItems.map((item, index) => (
                <Col span={8} key={index}>
                  <ContactItem {...item} />
                </Col>
              ))}
            </Row>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default Contacts;
