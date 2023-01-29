import {
  LockOutlined,
  UserOutlined,
  FacebookFilled,
  GoogleSquareFilled,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SigninForm = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    navigate("/community");
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
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          allowClear={true}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link to="/forgot-password" className="float-right">
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Space>
          Sign in with:
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
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SigninForm;
