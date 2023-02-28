import { Card, Rate, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Text, Paragraph } = Typography;

interface FeedbackItemProps {
  star: number;
  content: string;
  owner: string;
}

const FeedbackItem = ({ star, content, owner }: FeedbackItemProps) => {
  const { t } = useTranslation(["welcome"]);
  return (
    <Card className="width-full">
      <Space align="center" direction="vertical" className="width-full">
        <Space align="center">
          <Rate value={star} disabled />
        </Space>
        <Paragraph>{content}</Paragraph>
        <Text type="secondary">
          {t("by")} {owner}
        </Text>
      </Space>
    </Card>
  );
};

export default FeedbackItem;
