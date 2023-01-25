import {
  LockOutlined,
  UserOutlined,
  FacebookFilled,
  GoogleSquareFilled,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space } from "antd";

const SignupForm = () => {
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
      <Form.Item
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input
          type="password"
          placeholder="Confirm password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          allowClear={true}
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
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
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

export default SignupForm;
