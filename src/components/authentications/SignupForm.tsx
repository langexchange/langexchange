import {
  LockOutlined,
  UserOutlined,
  FacebookFilled,
  GoogleSquareFilled,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification, Space, Spin } from "antd";
import Link from "antd/es/typography/Link";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  AuthRequest,
  useRegisterMutation,
} from "../../services/auth/authServices";

const SignupForm: React.FC = () => {
  const [t] = useTranslation(["commons"]);
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleRegister = async (data: AuthRequest) => {
    try {
      await register(data).unwrap();
      notification.success({
        message: "Register successfully!",
      });
      navigate("/sign-in");
    } catch (err) {
      notification.error({
        message: "Register fail!",
      });
    }
  };
  const onFinish = async (values: any) => {
    const data = {
      email: values.email.toLowerCase(),
      password: values.password,
    };
    await handleRegister(data);
  };

  return (
    <Spin spinning={isLoading} delay={500}>
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
            placeholder="Email"
            allowClear={true}
            autoComplete="on"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: t("password-empty").toString() },
            {
              min: 8,
              message: "Password must be at least 8 characters long",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={t("password").toString()}
            allowClear={true}
            autoComplete="on"
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: t("confirm-password-empty").toString(),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t("password-not-match").toString())
                );
              },
            }),
          ]}
        >
          <Input
            type="password"
            placeholder={t("confirm-password").toString()}
            prefix={<LockOutlined className="site-form-item-icon" />}
            allowClear={true}
            autoComplete="on"
          />
        </Form.Item>

        <Form.Item
          className="text-left"
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error(t("must-agree").toString())),
            },
          ]}
        >
          <Checkbox>
            {t("read-agree")} <Link>{t("agree-terms")}</Link>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <div className="d-flex align-items-center justify-content-between">
            <Space align="center">
              {t("signin-with")}
              <Space size={0} align="center">
                <Button
                  type="text"
                  shape="circle"
                  icon={<FacebookFilled className="fz-18" />}
                  className="btn-text-primary d-flex justify-center align-items-center"
                />
                <Button
                  type="text"
                  shape="circle"
                  icon={<GoogleSquareFilled className="fz-18" />}
                  className="d-flex justify-center align-items-center"
                  danger
                />
              </Space>
            </Space>
            <Button type="primary" htmlType="submit" className="float-right">
              {t("sign-up")}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default SignupForm;
