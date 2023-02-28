import { Button, Col, Form, Input, Row, Select, Space, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import type { SelectProps } from "antd";
import { useTranslation } from "react-i18next";

const onSearch = (value: string) => console.log(value);

const handleChange = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
};

const RightSidebar: React.FC = () => {
  const [t] = useTranslation(["commons"]);

  const options: SelectProps["options"] = [
    {
      value: "english",
      label: t("English"),
    },
    {
      value: "vietnamese",
      label: t("Vietnamese"),
    },
    {
      value: "chinese",
      label: t("Chinese"),
    },
    {
      value: "japanese",
      label: t("Japanese"),
    },
    {
      value: "korean",
      label: t("Korean"),
    },
    {
      value: "laos",
      label: t("Laos"),
    },
  ];

  return (
    <div className="has-background-color pt-1">
      <Space direction="vertical" className="width-full" size="middle">
        <Input.Search
          placeholder={`${t("type-to-search")} ${t("post")}...`}
          onSearch={onSearch}
          className="input-no-background"
        />

        <Form>
          <Form.Item label={t("languages")} style={{ marginBottom: "12px" }}>
            <Select
              mode="multiple"
              size="middle"
              placeholder={t("languages")}
              defaultValue={["english", "vietnamese"]}
              onChange={handleChange}
              style={{ width: "100%" }}
              options={options}
              className="input-no-background"
            />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item
                label={t("filter-only-friend")}
                style={{ marginBottom: "12px" }}
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={t("filter-latest")}
                style={{ marginBottom: "12px" }}
              >
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
              <Button type="primary" htmlType="submit">
                {t("filter")}
              </Button>
              <Button htmlType="button">{t("reset")}</Button>
            </Space>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

export default RightSidebar;
