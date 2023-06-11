import { Col, Input, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";

interface ContentTitleWithSearchProps {
  title: string;
  onSearch?: (value: string) => void;
}

const ContentTitleWithSearch: React.FC<ContentTitleWithSearchProps> = ({
  title,
  onSearch,
}) => {
  const [t] = useTranslation(["commons"]);
  return (
    <Row justify="space-between" align="top" className="mb-3">
      <Col>
        <Typography.Title level={3} className="m-0">
          {title}
        </Typography.Title>
      </Col>
      <Col>
        <Input.Search
          placeholder={t("type-to-search").toString()}
          onSearch={onSearch}
          style={{ width: "min(400px, 80vw)" }}
        />
      </Col>
    </Row>
  );
};

export default ContentTitleWithSearch;
