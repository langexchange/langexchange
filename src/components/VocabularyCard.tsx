import { Button, Card, Space, Tag, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface VocabularyCardProps {
  title: string;
  descriptions: string;
  termLanguage: string;
  defineLanguage: string;
  editable?: boolean;
}

const VocabularyCard = ({
  title,
  descriptions,
  termLanguage,
  defineLanguage,
  editable = false,
}: VocabularyCardProps) => {
  return (
    <Card
      hoverable
      className="height-full"
      bodyStyle={{
        padding: "12px",
        height: "100%",
      }}
    >
      <div className="d-flex height-full" style={{ flexDirection: "column" }}>
        <Space direction="vertical" style={{ flex: 1 }}>
          <Typography.Title level={5}>{title}</Typography.Title>
          <Typography.Paragraph type="secondary">
            {descriptions}
          </Typography.Paragraph>
          <Space>
            <Space>
              Term:
              <Tag color="blue">{termLanguage}</Tag>
            </Space>
            <Space>
              Define:
              <Tag color="green">{defineLanguage}</Tag>
            </Space>
          </Space>
        </Space>
        {editable ? (
          <Space style={{ justifyContent: "end" }}>
            <Button
              icon={<DeleteOutlined />}
              type="text"
              shape="circle"
              danger
            />
            <Button
              icon={<EditOutlined />}
              type="text"
              shape="circle"
              className="btn-text-warning"
            />
          </Space>
        ) : (
          ""
        )}
      </div>
    </Card>
  );
};

export default VocabularyCard;
