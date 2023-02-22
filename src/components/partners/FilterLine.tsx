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
  { label: "Viet Nam", value: "1" },
  { label: "China", value: "2" },
  { label: "USA", value: "3" },
  { label: "UK", value: "4" },
  { label: "Japan", value: "5" },
  { label: "Korea", value: "6" },
  { label: "Lao", value: "7" },
  { label: "Cuba", value: "8" },
];

const handleChange = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
};

const FilterLine = () => {
  return (
    <Form className="width-full">
      <Row gutter={12}>
        <Col flex="auto">
          <Form.Item label="Natives">
            <Select
              allowClear
              mode="multiple"
              size="middle"
              placeholder="Native languaes"
              defaultValue={["english", "vietnamese"]}
              onChange={handleChange}
              style={{ width: "100%" }}
              options={options}
            />
          </Form.Item>
        </Col>
        <Col flex="auto">
          <Form.Item label="Targets">
            <Select
              allowClear
              mode="multiple"
              size="middle"
              placeholder="Target languages"
              defaultValue={["english", "vietnamese"]}
              onChange={handleChange}
              options={options}
            />
          </Form.Item>
        </Col>
        <Col flex="auto">
          <Form.Item label="Countries">
            <Select
              allowClear
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
        </Col>
        <Col flex="auto">
          <Form.Item className="text-center">
            <Space>
              <Button type="primary" htmlType="submit" className="btn-warning">
                Filter
              </Button>
              <Button htmlType="button">Reset</Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterLine;
