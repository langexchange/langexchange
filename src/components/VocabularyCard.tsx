import { Button, Card, Space, Tag, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UserItem from "./UserItem";

interface Vocabulary {
  owner?: {
    fullname: string;
    color?: string;
    image: string;
  };
  title: string;
  descriptions: string;
  termLanguage: string;
  defineLanguage: string;
}

interface VocabularyCardProps extends Vocabulary {
  editable?: boolean;
  setVocabularySet?: (val: Vocabulary) => void;
  showModal?: () => void;
}

const VocabularyCard = ({
  owner,
  title,
  descriptions,
  termLanguage,
  defineLanguage,
  editable = false,
  setVocabularySet,
  showModal,
}: VocabularyCardProps) => {
  const onClick = () => {
    showModal && showModal();
    setVocabularySet &&
      setVocabularySet({
        title,
        descriptions,
        termLanguage,
        defineLanguage,
      });
  };
  return (
    <Card
      hoverable
      className="height-full"
      bodyStyle={{
        padding: "12px",
        height: "100%",
      }}
      onClick={onClick}
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
          {owner ? (
            <UserItem
              fullname={owner.fullname}
              size="small"
              image={owner.image}
            />
          ) : null}
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
