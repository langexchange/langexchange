import { Col, Row, Image, Space, Typography, Form, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import SubcribeFormImage from "../../assets/images/form_contact.png";

const { Title } = Typography;

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const SubcribeForm = () => {
  const [t] = useTranslation(["about"]);

  return (
    <div className="bg-white">
      <Row align="middle" className="container-lg py-5" gutter={[12, 12]}>
        <Col md={12} xs={24} className="d-flex justify-center">
          <Image src={SubcribeFormImage} alt="LangExchange subcribe" />
        </Col>
        <Col md={12} xs={24}>
          <Space
            size={40}
            direction="vertical"
            className="float-right width-full"
          >
            <div style={styles.title_container}>
              <Title level={2}>{t("subcribe-form-title")}</Title>
              <span style={styles.underline_blue}></span>
            </div>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label={t("fullname", { ns: "commons" })}
                name="fullname"
              // rules={[{ required: true, message: 'Please input your fullname!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ type: "email", message: "Not valid emails" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {t("subcribe", { ns: "commons" })}
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </Col>
      </Row>
    </div>
  );
};
export default SubcribeForm;

const styles: { [key: string]: React.CSSProperties } = {
  title_container: {
    position: "relative",
  },
  underline_red: {
    position: "absolute",
    width: "80px",
    height: "0",
    left: "0",
    top: "100%",
    borderBottom: "6px solid #A8071A",
  },
  underline_blue: {
    position: "absolute",
    width: "80px",
    height: "0",
    left: "0",
    top: "100%",
    borderBottom: "6px solid #40A9FF",
  },
};
