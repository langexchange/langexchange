import { Input, Typography } from "antd";

const onSearch = (value: string) => console.log(value);

interface Props {
  title: string;
}

const ContentTitleWithSearch = ({ title }: Props) => {
  return (
    <div className="d-flex justify-space-between ">
      <Typography.Title level={3}>{title}</Typography.Title>
      <Input.Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 400 }}
      />
    </div>
  );
};

export default ContentTitleWithSearch;
