import { Col, Row, Image, Space, Typography, Form, Input, Button } from "antd";
import SubcribeFormImage from "../../assets/images/form_contact.png";

const { Title } = Typography;

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const SubcribeForm = () => {
  return (
    <div
      style={{
        padding: "48px 98px",
      }}
      className="bg-white"
    >
      <Row align="middle">
        <Col span={12} className="d-flex justify-center">
          <Image
            src={SubcribeFormImage}
            alt="LangExchange subcribe"
          // height="460px"
          />
        </Col>
        <Col span={12}>
          <Space size={40} direction="vertical">
            <div style={styles.title_container}>
              <Title level={2}>
                Subscribe to receive the latest information
              </Title>
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
                label="Fullname"
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
                  Subcribe
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
