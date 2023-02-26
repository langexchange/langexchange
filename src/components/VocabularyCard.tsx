import { Button, Card, Image, Space, Tag, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UserItem from "./UserItem";
import VocabularySet from "../types/VocabularySet";
import { faker } from "@faker-js/faker";

interface VocabularyCardProps extends VocabularySet {
  editable?: boolean;
  setVocabularySet?: React.Dispatch<React.SetStateAction<VocabularySet | null>>;
  showModal?: () => void;
}

const VocabularyCard = ({
  id,
  owner,
  title,
  description,
  termLanguage,
  definitionLanguage,
  createdAt,
  isPublic,
  vocabularies,
  editable = false,
  setVocabularySet,
  showModal,
}: VocabularyCardProps) => {
  const onClick = () => {
    showModal && showModal();
    setVocabularySet &&
      setVocabularySet({
        id,
        owner,
        createdAt,
        isPublic,
        vocabularies,
        title,
        description,
        termLanguage,
        definitionLanguage,
      });
  };
  return (
    <Card
      hoverable
      className="height-full action-small-no-border "
      size="small"
      onClick={onClick}
      cover={
        <Image
          src={faker.image.nature()}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        />
      }
      actions={[
        <Button icon={<DeleteOutlined />} type="text" shape="circle" danger />,
        <Button
          icon={<EditOutlined />}
          type="text"
          shape="circle"
          className="btn-text-warning"
        />,
      ]}
    >
      <Space direction="vertical" style={{ flex: 1 }}>
        <Typography.Title level={5}>{title}</Typography.Title>
        <Typography.Paragraph type="secondary">
          {description}
        </Typography.Paragraph>
        <Space>
          <Space>
            Term:
            <Tag color="blue">{termLanguage}</Tag>
          </Space>
          <Space>
            Define:
            <Tag color="green">{definitionLanguage}</Tag>
          </Space>
        </Space>
        {owner ? <UserItem {...owner} size="small" /> : null}
      </Space>
    </Card>
  );
};

export default VocabularyCard;
