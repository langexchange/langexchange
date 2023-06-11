import { Button, Col, Form, Row, Space } from "antd";
import { useTranslation } from "react-i18next";
import { FilterVocabularySet } from "../../services/vocabulary/vocabularyService";
import SeclectLanguageInput from "../SeclectLanguageInput";

interface FilterLineProps {
  resetFilters?: () => void;
  setFilters?: React.Dispatch<React.SetStateAction<FilterVocabularySet>>;
}
const FilterLine: React.FC<FilterLineProps> = ({
  resetFilters,
  setFilters,
}) => {
  const [t] = useTranslation(["vocabulary", "commons"]);
  const [form] = Form.useForm();

  const onFinish = (values: any) => setFilters?.(values);

  return (
    <Form className="width-full" form={form} onFinish={onFinish}>
      <Row gutter={12}>
        <Col flex="auto">
          <Form.Item
            label={t("Term", { ns: "commons" }).toString()}
            name="terms"
            className="m-0"
          >
            <SeclectLanguageInput
              mode="multiple"
              valueType="locale"
              placeholder={t("Term", { ns: "commons" })}
              dropdownMatchSelectWidth={false}
              exceptLanguages={[]}
            />
          </Form.Item>
        </Col>
        <Col flex="auto">
          <Form.Item
            label={t("Define", { ns: "commons" })}
            name="defines"
            className="m-0"
          >
            <SeclectLanguageInput
              mode="multiple"
              valueType="locale"
              placeholder={t("Define", { ns: "commons" })}
              dropdownMatchSelectWidth={false}
              exceptLanguages={[]}
            />
          </Form.Item>
        </Col>
        <Col flex="none">
          <Form.Item className="text-center m-0">
            <Space>
              <Button type="primary" htmlType="submit">
                {t("filter", { ns: "commons" })}
              </Button>
              <Button
                htmlType="button"
                onClick={() => {
                  resetFilters && resetFilters();
                  form.resetFields();
                }}
              >
                {t("reset", { ns: "commons" })}
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterLine;
