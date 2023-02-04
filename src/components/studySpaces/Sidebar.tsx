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
  Typography,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import type { SelectProps } from "antd";
import { useNavigate } from "react-router-dom";

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

const topicOptions = [
  { label: "Computer Science", value: "1" },
  { label: "Back end topic", value: "2" },
  { label: "Frontend topic", value: "3" },
  { label: "AI - Machine learning", value: "4" },
  { label: "Tester - QA/QC", value: "5" },
  { label: "Design UI/UX", value: "6" },
  { label: "Life stories", value: "7" },
  { label: "Back Khoa drama", value: "8" },
];

const countryOptions = [
  { label: "Viet Nam", value: "1" },
  { label: "China", value: "2" },
  { label: "USA", value: "3" },
  { label: "UK", value: "4" },
  { label: "Japan", value: "5" },
  { label: "Korea", value: "6" },
  { label: "Lao", value: "7" },
  { label: "Cuba", value: "8" },
];

const onSearch = (value: string) => console.log(value);

const handleChange = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
};

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Space align="center">
        <Button
          type="text"
          shape="circle"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        />
        <Typography.Title level={3} className="m-0">
          Explores
        </Typography.Title>
      </Space>
      <br />
      <br />
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
            <Form.Item label="Countries" style={{ marginBottom: "12px" }}>
              <Select
                showSearch
                mode="multiple"
                placeholder="Select country"
                optionFilterProp="children"
                // onChange={onChange}
                // onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={countryOptions}
              />
            </Form.Item>
            <Form.Item label="Topics" style={{ marginBottom: "12px" }}>
              <Select
                showSearch
                mode="multiple"
                placeholder="Select the topic"
                optionFilterProp="children"
                // onChange={onChange}
                // onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={topicOptions}
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-warning"
                >
                  Filter
                </Button>
                <Button htmlType="button">Reset</Button>
              </Space>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default Sidebar;
