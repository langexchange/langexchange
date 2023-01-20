import { Card, Space, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import { gold } from "@ant-design/colors";

const { Text, Paragraph } = Typography;

interface FeedbackItemProps {
  star: number;
  content: string;
  owner: string;
}

const FeedbackItem = ({ star, content, owner }: FeedbackItemProps) => {
  return (
    <Card style={{ width: "100%" }}>
      <Space align="center" direction="vertical" style={{ width: "100%" }}>
        <Space align="center">
          {[...new Array(star)].map((_, index) => (
            <StarFilled key={index} style={{ color: gold[5] }} />
          ))}
        </Space>
        <Paragraph>{content}</Paragraph>
        <Text type="secondary">by {owner}</Text>
      </Space>
    </Card>
  );
};

export default FeedbackItem;
