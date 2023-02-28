import { Input, Typography } from "antd";
import { useTranslation } from "react-i18next";

const onSearch = (value: string) => console.log(value);

interface Props {
  title: string;
}

const ContentTitleWithSearch = ({ title }: Props) => {
  const [t] = useTranslation(["commons"]);
  return (
    <div className="d-flex justify-space-between ">
      <Typography.Title level={3}>{title}</Typography.Title>
      <Input.Search
        placeholder={t("type-to-search").toString()}
        onSearch={onSearch}
        style={{ width: 400 }}
      />
    </div>
  );
};

export default ContentTitleWithSearch;
