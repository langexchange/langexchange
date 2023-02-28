import { Button, Card, Image, Space, Tag, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UserItem from "./UserItem";
import VocabularySet from "../types/VocabularySet";
import { useTranslation } from "react-i18next";

interface VocabularyCardProps extends VocabularySet {
  editable?: boolean;
  setVocabularySet?: React.Dispatch<React.SetStateAction<VocabularySet | null>>;
  showModal?: () => void;
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({
  id,
  owner,
  title,
  image,
  description,
  termLanguage,
  definitionLanguage,
  createdAt,
  isPublic,
  vocabularies,
  editable = false,
  setVocabularySet,
  showModal,
}) => {
  const [t] = useTranslation(["commons"]);
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
      className="action-small-no-border "
      size="small"
      onClick={onClick}
      cover={
        image && (
          <Image
            src={image}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          />
        )
      }
      actions={[
        <Button
          icon={<DeleteOutlined />}
          type="text"
          shape="circle"
          danger
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        />,
        <Button
          icon={<EditOutlined />}
          type="text"
          shape="circle"
          className="btn-text-warning"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        />,
      ]}
    >
      <Space direction="vertical" style={{ flex: 1 }}>
        <Typography.Title level={5}>{title}</Typography.Title>
        <Typography.Paragraph type="secondary">
          {description}
        </Typography.Paragraph>
        <Space wrap={true}>
          <Space>
            {t("Term")}
            <Tag color="blue">{termLanguage}</Tag>
          </Space>
          <Space>
            {t("Define")}
            <Tag color="green">{definitionLanguage}</Tag>
          </Space>
        </Space>
        {owner ? <UserItem {...owner} size="small" /> : null}
      </Space>
    </Card>
  );
};

export default VocabularyCard;
