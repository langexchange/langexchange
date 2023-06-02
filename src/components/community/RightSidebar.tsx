import { Button, Col, Form, Input, Row, Space, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import SeclectLanguageInput from "../SeclectLanguageInput";
import { PostSuggestionQuery } from "../../services/post/postService";
import SuggestFriendSide from "../SuggestFriendSide";

interface RightSidebarProps {
  defaultFilters: PostSuggestionQuery;
  setFilters: React.Dispatch<React.SetStateAction<PostSuggestionQuery>>;
  resetFilters: () => void;
  onSearch?: (value: string) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  defaultFilters,
  setFilters,
  resetFilters,
  onSearch,
}) => {
  const [t] = useTranslation(["commons"]);

  const onFinish = (values: any) => {
    setFilters((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const [form] = Form.useForm();

  return (
    <div className="pt-1">
      <Space direction="vertical" className="width-full" size="middle">
        <Input.Search
          placeholder={`${t("type-to-search")} ${t("post")}...`}
          onSearch={onSearch}
          className="input-no-background"
        />

        <Form onFinish={onFinish} initialValues={defaultFilters} form={form}>
          <Form.Item
            name="filterLangs"
            label={t("languages")}
            style={{ marginBottom: "12px" }}
          >
            <SeclectLanguageInput
              mode="multiple"
              size="middle"
              placeholder={t("languages")}
              style={{ width: "100%" }}
              className="input-no-background"
              valueType="locale"
              exceptLanguages={[]}
            />
          </Form.Item>
          <Row wrap={true} gutter={12}>
            <Col span="auto">
              <Form.Item
                label={t("filter-only-friend")}
                style={{ marginBottom: "12px" }}
                name="isOnlyFriend"
                valuePropName="checked"
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked
                />
              </Form.Item>
            </Col>
            <Col span="auto">
              <Form.Item
                label={t("filter-latest")}
                style={{ marginBottom: "12px" }}
                name="isNewest"
                valuePropName="checked"
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
              <Button
                htmlType="button"
                onClick={() => {
                  resetFilters();
                  form.resetFields();
                }}
              >
                {t("reset")}
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <SuggestFriendSide />
      </Space>
    </div>
  );
};

export default RightSidebar;
