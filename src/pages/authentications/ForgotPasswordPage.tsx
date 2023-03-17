import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../services/auth/authServices";

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation(["commons"]);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      await forgotPassword(values.email).unwrap();
      notification.success({
        message: "Successfully!",
        description:
          "Please check your email to reset your password. Thank you!",
      });
      navigate("/sign-in");
    } catch (error) {
      notification.error({
        message: "Failed!",
        description: "Something went wrong. Please try again later. Thank you!",
      });
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
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
        <Button
          type="primary"
          htmlType="submit"
          className="d-block ma"
          loading={isLoading}
        >
          {t("send")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPasswordPage;
