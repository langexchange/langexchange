import { Badge, Card, Col, Row, Typography } from "antd";

interface VocabularyProps {
  term: string;
  define: string;
  badge?: {
    color: string;
    text: string;
  };
}

const VocabularyItem = ({ term, define, badge }: VocabularyProps) => {
  return (
    <div className="width-full">
      {badge ? (
        <Badge.Ribbon text={badge.text} color={badge.color}>
          <Card size="small" className="width-full">
            <Row gutter={24}>
              <Col
                span={6}
                style={{ borderRight: "solid 2px #8c8c8c" }}
                className="d-flex align-items-center"
              >
                <Typography.Text>{term}</Typography.Text>
              </Col>
              <Col
                span={18}
                className="d-flex align-items-center"
                style={{ paddingRight: "60px" }}
              >
                <Typography.Text>{define}</Typography.Text>
              </Col>
            </Row>
          </Card>
        </Badge.Ribbon>
      ) : (
        <Card size="small" className="width-full">
          <Row gutter={24}>
            <Col
              span={6}
              style={{ borderRight: "solid 2px #8c8c8c" }}
              className="d-flex align-items-center"
            >
              <Typography.Text>{term}</Typography.Text>
            </Col>
            <Col
              span={18}
              className="d-flex align-items-center"
              style={{ paddingRight: "60px" }}
            >
              <Typography.Text>{define}</Typography.Text>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default VocabularyItem;
