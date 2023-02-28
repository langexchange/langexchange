import { Col, Row, Space, Typography } from "antd";
import MailSupportIcon from "../../assets/images/mail_support.png";
import ChatSupportIcon from "../../assets/images/chat_support.png";
import HandshakeIcon from "../../assets/images/handshake.png";
import ContactItem from "./ContactItem";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

const Contacts = () => {
  const [t] = useTranslation("about");

  const contactItems = [
    {
      image: ChatSupportIcon,
      title: t("general-inquiries"),
      descriptions: t("general-inquiries-description"),
      type: "primary",
      text_button: t("contact-us"),
    },
    {
      image: MailSupportIcon,
      title: t("customer-support"),
      descriptions: t("customer-support-description"),
      type: "warning",
      text_button: t("email-support"),
    },
    {
      image: HandshakeIcon,
      title: t("cooperate-with-us"),
      descriptions: t("cooperate-with-us-description"),
      type: "success",
      text_button: t("get-details"),
    },
  ];
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
            {t("contact")} <span className="color-blue-logo">Lang</span>
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
