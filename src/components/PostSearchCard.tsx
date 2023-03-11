import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import type { SelectProps } from "antd";

const options: SelectProps["options"] = [
  {
    value: "english",
    label: "English",
  },
  {
    value: "vietnamese",
    label: "Vietnamese",
  },
  {
    value: "chinese",
    label: "Chinese",
  },
  {
    value: "japanese",
    label: "Japanese",
  },
  {
    value: "korean",
    label: "Korean",
  },
  {
    value: "laos",
    label: "Laos",
  },
];

const onSearch = (value: string) => console.log(value);

const handleChange = (value: string | string[]) => { };

const PostSearchCard = () => {
  return (
    <Card>
      <Space direction="vertical" className="width-full" size="middle">
        <Input.Search placeholder="input search text" onSearch={onSearch} />

        <Form>
          <Form.Item label="Languages" style={{ marginBottom: "12px" }}>
            <Select
              mode="multiple"
              size="middle"
              placeholder="Languages"
              defaultValue={["english", "vietnamese"]}
              onChange={handleChange}
              style={{ width: "100%" }}
              options={options}
            />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item label="Only friend" style={{ marginBottom: "12px" }}>
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Only text" style={{ marginBottom: "12px" }}>
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item className="text-center">
            <Space>
              <Button type="primary" htmlType="submit" className="btn-warning">
                Filter
              </Button>
              <Button htmlType="button">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Space>
    </Card>
  );
};

export default PostSearchCard;
