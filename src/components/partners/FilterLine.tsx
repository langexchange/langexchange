import { Button, Col, Form, Row, Space } from "antd";
import { useTranslation } from "react-i18next";
import { FriendSuggestionsQuery } from "../../services/friend/friendService";
import CountrySelectInput from "../CountrySelectInput";
import SeclectLanguageInput from "../SeclectLanguageInput";

interface FilterLineProps {
  defaultFilters: FriendSuggestionsQuery;
  setFilters: React.Dispatch<React.SetStateAction<FriendSuggestionsQuery>>;
}

const FilterLine: React.FC<FilterLineProps> = ({
  defaultFilters,
  setFilters,
}) => {
  const [t] = useTranslation(["commons"]);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
    setFilters((prev) => ({ ...prev, ...values }));
  };
  const resetFilters = () => {
    setFilters(defaultFilters);
    form.resetFields();
  };

  return (
    <Form
      className="width-full"
      form={form}
      initialValues={defaultFilters}
      onFinish={onFinish}
    >
      <Row gutter={12}>
        <Col flex="auto">
          <Form.Item
            label={t("Native").toString()}
            className="m-0"
            name="nativeLangs"
          >
            <SeclectLanguageInput
              allowClear
              mode="multiple"
              size="middle"
              placeholder={t("Native").toString()}
              dropdownMatchSelectWidth={false}
              valueType="locale"
              exceptLanguages={[]}
            />
          </Form.Item>
        </Col>
        <Col flex="auto">
          <Form.Item
            label={t("Target").toString()}
            className="m-0"
            name="targetLangs"
          >
            <SeclectLanguageInput
              allowClear
              mode="multiple"
              size="middle"
              placeholder={t("Target").toString()}
              dropdownMatchSelectWidth={false}
              valueType="locale"
              exceptLanguages={[]}
            />
          </Form.Item>
        </Col>
        <Col flex="auto">
          <Form.Item label={t("Country")} className="m-0" name="countryCodes">
            <CountrySelectInput
              mode="multiple"
              placeholder={t("Country").toString()}
            />
          </Form.Item>
        </Col>
        <Col flex="auto">
          <Form.Item className="text-center m-0">
            <Space>
              <Button type="primary" htmlType="submit">
                {t("filter")}
              </Button>
              <Button htmlType="button" onClick={resetFilters}>
                {t("reset")}
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterLine;
