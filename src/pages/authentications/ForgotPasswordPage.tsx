import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";

const ForgotPasswordPage = () => {
  const onFinish = (values: any) => {
    success();
    console.log("Received values of form: ", values);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      {contextHolder}
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          { required: true, message: "Please input your E-mail!" },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
          allowClear={true}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="d-block ma">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPasswordPage;
