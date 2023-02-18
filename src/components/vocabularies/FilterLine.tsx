import { Button, Col, Form, Row, Select, SelectProps, Space } from "antd";

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

const countryOptions = [
  { label: "Food", value: "1" },
  { label: "Beauty", value: "2" },
  { label: "Sport", value: "3" },
  { label: "Technology", value: "4" },
  { label: "Machine learning", value: "5" },
  { label: "Girls", value: "6" },
  { label: "Histories", value: "7" },
  { label: "Travel", value: "8" },
];

const handleChange = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
};

const FilterLine = () => {
  return (
    <Form className="width-full" layout="inline">
      <Form.Item label="Natives">
        <Select
          allowClear
          // mode="multiple"
          size="middle"
          placeholder="Term languaes"
          defaultValue={["english", "vietnamese"]}
          onChange={handleChange}
          style={{ width: "100%" }}
          options={options}
        />
      </Form.Item>
      <Form.Item label="Targets">
        <Select
          allowClear
          size="middle"
          placeholder="Define languages"
          defaultValue={["english", "vietnamese"]}
          onChange={handleChange}
          options={options}
        />
      </Form.Item>
      <Form.Item label="Topic">
        <Select
          allowClear
          showSearch
          placeholder="Select topic"
          optionFilterProp="children"
          // onChange={onChange}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={countryOptions}
        />
      </Form.Item>
      <Form.Item className="text-center">
        <Space>
          <Button type="primary" htmlType="submit" className="btn-warning">
            Filter
          </Button>
          <Button htmlType="button">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default FilterLine;
