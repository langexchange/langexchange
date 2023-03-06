import {
  LockOutlined,
  UserOutlined,
  FacebookFilled,
  GoogleSquareFilled,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification, Space, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { useLoginMutation } from "../../services/auth/authServices";

const SigninForm = () => {
  const [t] = useTranslation(["commons"]);
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const data = {
        email: values.email.toLowerCase(),
        password: values.password,
      };

      const { token, ...user } = await login(data).unwrap();
      const credentials = { user, token };
      dispatch(setCredentials({ ...credentials, persist: values.remember }));
      notification.success({
        message: "Login success!",
      });
      navigate("/initial");
    } catch (err) {
      notification.error({
        message: "Login fail!",
      });
    }
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
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>{t("remember-me")}</Checkbox>
          </Form.Item>

          <Link to="/forgot-password" className="float-right">
            {t("forgot-password")}
          </Link>
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
            {t("sign-in")}
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default SigninForm;
