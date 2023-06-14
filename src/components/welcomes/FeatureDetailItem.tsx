import { Col, Row, Image, Space, Typography } from "antd";

const { Title, Paragraph } = Typography;

interface FeatureDetailItemProps {
  title: string;
  descriptions: string;
  image: string;
  index: number;
}

export const FeatureDetailItem = ({
  title,
  descriptions,
  image,
  index,
}: FeatureDetailItemProps) => {
  const contentLeft: boolean = index % 2 === 0;
  return (
    <div className={contentLeft ? "bg-white" : "has-background-color"}>
      <div className="container-lg">
        <Row align="middle" className="py-5" justify="space-between">
          <Col md={12} xs={24} order={(contentLeft && 1) || 2}>
            <Space
              size={40}
              direction="vertical"
              align={contentLeft ? "start" : "end"}
            >
              <div style={styles.title_container}>
                <Title
                  level={2}
                  className={`text-${contentLeft ? "left" : "right"}`}
                >
                  {title}
                </Title>
                <span
                  style={
                    (contentLeft && styles.underline_red) ||
                    styles.underline_blue
                  }
                ></span>
              </div>
              <Paragraph
                type="secondary"
                style={{
                  textAlign: contentLeft ? "left" : "right",
                  float: contentLeft ? "left" : "right",
                  width: "100%",
                  lineHeight: "28px",
                }}
                className="text-300"
              >
                {descriptions}
              </Paragraph>
            </Space>
          </Col>
          <Col
            md={12}
            xs={24}
            className="d-flex justify-center"
            order={(contentLeft && 2) || 1}
          >
            <Image
              src={image}
              alt="LangExchange feature details"
              height="460px"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  title_container: {
    position: "relative",
  },
  underline_red: {
    position: "absolute",
    width: "80px",
    height: "0",
    left: "0",
    top: "100%",
    borderBottom: "6px solid #A8071A",
  },
  underline_blue: {
    position: "absolute",
    width: "80px",
    height: "0",
    right: "0",
    top: "100%",
    borderBottom: "6px solid #40A9FF",
  },
};
