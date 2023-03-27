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
import ListCardAddVocabulary from "../../components/vocabularies/ListCardAddVocabulary";
import type { SelectProps } from "antd";
import UploadImage from "../../components/UploadImage";
import { useTranslation } from "react-i18next";

const VocabularyCreatePage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [t] = useTranslation(["vocabulary", "commons"]);

  const languages: SelectProps["options"] = [
    {
      value: "english",
      label: t("English", { ns: "commons" }),
    },
    {
      value: "vietnamese",
      label: t("Vietnamese", { ns: "commons" }),
    },
    {
      value: "chinese",
      label: t("Chinese", { ns: "commons" }),
    },
    {
      value: "japanese",
      label: t("Japanese", { ns: "commons" }),
    },
    {
      value: "korean",
      label: t("Korean", { ns: "commons" }),
    },
    {
      value: "laos",
      label: t("Laos", { ns: "commons" }),
    },
  ];

  const handleCollect = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };
  return (
    <div
      className="height-full"
      style={{
        minHeight: "calc(100vh - 48px)",
      }}
    >
      {contextHolder}
      <div
        style={{
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
              {t("create-set-page-title")}
            </Typography.Title>
          </Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCollect}
          >
            {t("Create", { ns: "commons" })}
          </Button>
        </div>
        <Row gutter={24}>
          <Col flex="auto">
            <Form autoComplete="off" labelAlign="left">
              <Form.Item
                name="title"
                label={t("Title", { ns: "commons" })}
                labelCol={{ span: 2 }}
                required
              >
                <Input placeholder={t("title-input-placeholder").toString()} />
              </Form.Item>
              <Form.Item
                name="description"
                label={t("Description", { ns: "commons" })}
                labelCol={{ span: 2 }}
              >
                <Input.TextArea
                  autoSize={true}
                  placeholder={t("description-input-placeholder").toString()}
                />
              </Form.Item>

              <Row gutter={24}>
                <Col>
                  <Form.Item
                    label={t("Public", { ns: "commons" })}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label={t("Term", { ns: "commons" })}>
                    <Select
                      placeholder={t("Term", { ns: "commons" })}
                      defaultValue={["english"]}
                      options={languages}
                      style={{ width: "200px" }}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label={t("Define", { ns: "commons" })}>
                    <Select
                      placeholder={t("Define", { ns: "commons" })}
                      defaultValue={["vietnamese"]}
                      options={languages}
                      style={{ width: "200px" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col flex="none">
            <UploadImage />
          </Col>
        </Row>
        <ListCardAddVocabulary />
      </div>
    </div>
  );
};

export default VocabularyCreatePage;
