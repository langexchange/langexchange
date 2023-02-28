import {
  LockOutlined,
  UserOutlined,
  FacebookFilled,
  GoogleSquareFilled,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space } from "antd";
import Link from "antd/es/typography/Link";
import { useTranslation } from "react-i18next";

const SignupForm = () => {
  const [t] = useTranslation(["commons"]);

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
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
          placeholder="Email"
          allowClear={true}
          autoComplete="on"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: t("password-empty").toString() }]}
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
        <Space>
          {t("signin-with")}
          <Space size="small">
            <Button type="default" shape="circle" icon={<FacebookFilled />} />
            <Button
              type="default"
              shape="circle"
              icon={<GoogleSquareFilled />}
            />
          </Space>
        </Space>
        <Button type="primary" htmlType="submit" className="float-right">
          {t("sign-up")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
