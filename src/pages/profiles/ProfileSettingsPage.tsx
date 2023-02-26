import { Button, Form, Input, Select, Typography } from "antd";
import { useState } from "react";
import SeclectLanguageInput from "../../components/SeclectLanguageInput";
import TagsInput from "../../components/TagsInput";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const ProfileSettingsPage = () => {
  const initialTags: string[] = [];
  const [tags, setTags] = useState(initialTags);
  return (
    <div>
      <Typography.Title level={3}>Profile settings</Typography.Title>
      <Form
        name="basic"
        style={{ width: "100%" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="pt-3"
        labelCol={{ span: 5 }}
      >
        <Form.Item label="App language">
          <SeclectLanguageInput />
        </Form.Item>

        <Form.Item label="Native language">
          <SeclectLanguageInput mode="multiple" />
        </Form.Item>

        <Form.Item label="Target language">
          <SeclectLanguageInput mode="multiple" color="green" />
        </Form.Item>

        <Form.Item label="Fullname">
          <Input />
        </Form.Item>

        <Form.Item label="Address">
          <Input />
        </Form.Item>

        <Form.Item label="Bio">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Interest">
          <TagsInput
            tags={tags}
            setTags={setTags}
            tagColor="green"
            placeholder="Add interest"
            borderStyle="solid"
            placeholderStyle={{
              fontSize: "14px",
              fontWeight: 300,
              color: "#bfbfbf",
            }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileSettingsPage;
