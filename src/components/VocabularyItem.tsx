import { Card, Col, Row, Typography } from "antd";

interface VocabularyProps {
  term: string;
  define: string;
}

const VocabularyItem = ({ term, define }: VocabularyProps) => {
  return (
    <Card size="small" className="width-full">
      <Row gutter={24}>
        <Col
          span={6}
          style={{
            borderRight: "solid 2px #8c8c8c",
          }}
          className="d-flex align-items-center"
        >
          <Typography.Text>{term}</Typography.Text>
        </Col>
        <Col span={18} className="d-flex align-items-center">
          <Typography.Text>{define}</Typography.Text>
        </Col>
      </Row>
    </Card>
  );
};

export default VocabularyItem;
