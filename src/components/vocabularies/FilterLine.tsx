import { Button, Form, Select, SelectProps, Space } from "antd";
import { useTranslation } from "react-i18next";

const handleChange = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
};

const FilterLine: React.FC = () => {
  const [t] = useTranslation(["vocabulary", "commons"]);
  const options: SelectProps["options"] = [
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

  const topicOptions = [
    { label: t("Food"), value: "1" },
    { label: t("Beauty"), value: "2" },
    { label: t("Sport"), value: "3" },
    { label: t("Technology"), value: "4" },
    { label: t("Machine learning"), value: "5" },
    { label: t("Girls"), value: "6" },
    { label: t("Histories"), value: "7" },
    { label: t("Travel"), value: "8" },
  ];

  return (
    <Form className="width-full" layout="inline">
      <Form.Item label={t("Term", { ns: "commons" }).toString()}>
        <Select
          allowClear
          // mode="multiple"
          size="middle"
          placeholder={t("Term", { ns: "commons" })}
          defaultValue={["english"]}
          onChange={handleChange}
          style={{ width: "100%" }}
          options={options}
          dropdownMatchSelectWidth={false}
        />
      </Form.Item>
      <Form.Item label={t("Define", { ns: "commons" })}>
        <Select
          allowClear
          size="middle"
          placeholder={t("Define", { ns: "commons" })}
          defaultValue={["vietnamese"]}
          onChange={handleChange}
          options={options}
          dropdownMatchSelectWidth={false}
        />
      </Form.Item>
      <Form.Item label={t("Topic", { ns: "commons" })}>
        <Select
          allowClear
          showSearch
          placeholder={t("Topic", { ns: "commons" })}
          optionFilterProp="children"
          // onChange={onChange}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={topicOptions}
          dropdownMatchSelectWidth={false}
        />
      </Form.Item>
      <Form.Item className="text-center">
        <Space>
          <Button type="primary" htmlType="submit">
            {t("filter", { ns: "commons" })}
          </Button>
          <Button htmlType="button">{t("reset", { ns: "commons" })}</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default FilterLine;
