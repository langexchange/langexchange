import { Badge, Card, Col, Image, Row, Typography } from "antd";
import { Vocabulary } from "../services/vocabulary/vocabularyService";

interface VocabularyProps extends Vocabulary {
  badge?: {
    color: string;
    text: string;
  };
}

const VocabularyItem = ({
  term,
  define,
  imageUrl: image,
  badge,
}: VocabularyProps) => {
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
                span={(image && 14) || 18}
                className="d-flex align-items-center"
                style={{ paddingRight: "60px" }}
              >
                <Typography.Text className="fz-18 text-300">
                  {define}
                </Typography.Text>
              </Col>
              {image ? (
                <Col span={4}>
                  <Image src={image} />
                </Col>
              ) : null}
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
              span={(image && 14) || 18}
              className="d-flex align-items-center"
              style={{ paddingRight: "60px" }}
            >
              <Typography.Text className="fz-18 text-300">
                {define}
              </Typography.Text>
            </Col>
            {image ? (
              <Col span={4}>
                <Image src={image} />
              </Col>
            ) : null}
          </Row>
        </Card>
      )}
    </div>
  );
};

export default VocabularyItem;
