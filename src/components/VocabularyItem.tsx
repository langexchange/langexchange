import { faker } from "@faker-js/faker";
import { Badge, Card, Col, Image, Row, Typography } from "antd";

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
                <Typography.Text className="fz-18 text-300">
                  {term}
                </Typography.Text>
              </Col>
              <Col
                span={14}
                className="d-flex align-items-center"
                style={{ paddingRight: "60px" }}
              >
                <Typography.Text className="fz-18 text-300">
                  {define}
                </Typography.Text>
              </Col>
              <Col span={4}>
                <Image src={faker.image.nature()} />
              </Col>
            </Row>
          </Card>
        </Badge.Ribbon>
      ) : (
        <Card size="small" className="width-full">
          <Row gutter={24} wrap={false}>
            <Col
              span={6}
              style={{ borderRight: "solid 2px #8c8c8c" }}
              className="d-flex align-items-center"
            >
              <Typography.Text className="fz-18 text-300">
                {term}
              </Typography.Text>
            </Col>
            <Col
              span={14}
              className="d-flex align-items-center"
              style={{ paddingRight: "60px" }}
            >
              <Typography.Text className="fz-18 text-300">
                {define}
              </Typography.Text>
            </Col>
            <Col span={4}>
              <Image src={faker.image.nature()} />
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default VocabularyItem;
