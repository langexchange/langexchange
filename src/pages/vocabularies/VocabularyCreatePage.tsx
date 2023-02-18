import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { SelectProps } from "antd";
import ListCardAddVocabulary from "../../components/vocabularies/ListCardAddVocabulary";

const languages: SelectProps["options"] = [
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

const VocabularyCreatePage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleCollect = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };
  return (
    <div
      className="has-background-color height-full"
      style={{ minHeight: "calc(100vh - 96px)" }}
    >
      {contextHolder}
      <div
        style={{
          width: "fit-content",
          minWidth: "900px",
          margin: "auto",
          padding: "24px 0",
        }}
      >
        <div className="d-flex align-items-center justify-space-between mb-3">
          <Space>
            <Button
              size="small"
              shape="circle"
              icon={<LeftOutlined />}
              onClick={() => navigate(-1)}
              className="color-secondary"
            />
            <Typography.Title className="m-0" level={3}>
              Create new vocabulary set
            </Typography.Title>
          </Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCollect}
          >
            Create
          </Button>
        </div>
        <Form autoComplete="off" labelAlign="left">
          <Form.Item name="title" label="Title" labelCol={{ span: 3 }} required>
            <Input placeholder='Enter a title, for example " Biology - Chapter 22: Evolution"' />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            labelCol={{ span: 3 }}
          >
            <Input.TextArea autoSize={true} placeholder="Add description..." />
          </Form.Item>

          <Row gutter={12}>
            <Col>
              <Form.Item label="Public" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Term languages">
                <Select
                  placeholder="Term languages"
                  defaultValue={["english"]}
                  options={languages}
                  style={{ width: "200px" }}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Define languages">
                <Select
                  placeholder="Define languages"
                  defaultValue={["vietnamese"]}
                  options={languages}
                  style={{ width: "200px" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <ListCardAddVocabulary />
      </div>
    </div>
  );
};

export default VocabularyCreatePage;
