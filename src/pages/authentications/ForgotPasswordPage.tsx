import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";

const ForgotPasswordPage = () => {
  const { t } = useTranslation(["commons"]);
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
            message: t("email-invalid").toString(),
          },
          { required: true, message: t("email-empty").toString() },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={t("reset-password-message").toString()}
          allowClear={true}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="d-block ma">
          {t("send")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPasswordPage;
