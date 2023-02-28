import { Button, Col, Form, Row, Select, SelectProps, Space } from "antd";
import { useTranslation } from "react-i18next";

const handleChange = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
};

const FilterLine: React.FC = () => {
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

  const countryOptions = [
    { label: t("Viet Nam"), value: "1" },
    { label: t("China"), value: "2" },
    { label: t("United States"), value: "3" },
    { label: t("United Kingdom"), value: "4" },
    { label: t("Japan"), value: "5" },
    { label: t("Korea"), value: "6" },
    { label: t("Brazil"), value: "7" },
    { label: t("Canada"), value: "8" },
  ];
  return (
    <Form className="width-full">
      <Row gutter={12}>
        <Col flex="auto">
          <Form.Item label={t("Native").toString()}>
            <Select
              allowClear
              mode="multiple"
              size="middle"
              placeholder={t("Native").toString()}
              defaultValue={["english", "vietnamese"]}
              onChange={handleChange}
              style={{ width: "100%" }}
              options={options}
            />
          </Form.Item>
        </Col>
        <Col flex="auto">
          <Form.Item label={t("Target").toString()}>
            <Select
              allowClear
              mode="multiple"
              size="middle"
              placeholder={t("Target").toString()}
              defaultValue={["english", "vietnamese"]}
              onChange={handleChange}
              options={options}
            />
          </Form.Item>
        </Col>
        <Col flex="auto">
          <Form.Item label={t("Country")}>
            <Select
              allowClear
              showSearch
              mode="multiple"
              placeholder={t("Country").toString()}
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
        </Col>
        <Col flex="auto">
          <Form.Item className="text-center">
            <Space>
              <Button type="primary" htmlType="submit">
                {t("filter")}
              </Button>
              <Button htmlType="button">{t("reset")}</Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterLine;
