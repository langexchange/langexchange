import {
  Button,
  Card,
  Image,
  message,
  Popconfirm,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import UserItem from "./UserItem";
import { useTranslation } from "react-i18next";
import {
  useDeleteVocabularySetMutation,
  VocabularySet,
  VocabularySetUserInfo,
} from "../services/vocabulary/vocabularyService";
import { useNavigate } from "react-router-dom";
import Progress from "antd/lib/progress";

interface VocabularyCardProps extends VocabularySet {
  owner: VocabularySetUserInfo;
  editable?: boolean;
  setVocabularySet?: React.Dispatch<React.SetStateAction<VocabularySet | null>>;
  showModal?: () => void;
  refetch?: () => void;
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({
  owner,
  editable = false,
  setVocabularySet,
  showModal,
  refetch,
  ...vocabularySet
}) => {
  const { t } = useTranslation(["commons", "languages"]);
  const [deleteVocabularySet, { isLoading }] = useDeleteVocabularySetMutation();
  const navigate = useNavigate();

  const onClick = () => {
    showModal && showModal();
    // setVocabularySet &&
    if (!showModal) {
      navigate(`/vocabularies/${vocabularySet.packageId}`);
    }
  };

  const confirm = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await deleteVocabularySet(vocabularySet.packageId).unwrap();
      refetch && refetch();
      message.success("Deleted successfully", 1);
    } catch (e) {
      message.error("Delete failed", 1);
    }
  };

  const cancel = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Card
      hoverable
      className="action-small-no-border vocabulary-card"
      size="small"
      onClick={onClick}
      cover={
        vocabularySet?.imageUrl && (
          <Image
            src={vocabularySet.imageUrl}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          />
        )
      }
      actions={[
        owner ? (
          <UserItem
            id={owner.id}
            fullname={[owner.firstName, owner.lastName].join(" ")}
            avatar={owner.avatar || undefined}
            size="small"
            style={{ flex: 1 }}
          />
        ) : null,
        editable ? (
          <Popconfirm
            title="Delete the vocabulary set?"
            description="Are you sure to delete this vocabulary set?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              type="text"
              shape="circle"
              danger
              loading={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            />
          </Popconfirm>
        ) : null,
        editable ? (
          <Button
            icon={<EditOutlined />}
            type="text"
            shape="circle"
            className="btn-text-warning"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              navigate(`/vocabularies/${vocabularySet.packageId}/edit`);
            }}
          />
        ) : null,
        ,
      ]}
    >
      <Space direction="vertical" className="w-100">
        <Space className="mb-2">
          <Typography.Title level={5} className="m-0">
            {vocabularySet.title}
          </Typography.Title>
          <Tag>
            {vocabularySet.vocabularyDtos.length} {t("Term")}
          </Tag>
        </Space>
        <Space wrap={true}>
          <Tag color="blue" className="m-0">
            {t(vocabularySet.termLocale.toLowerCase(), { ns: "languages" })}
          </Tag>
          <ArrowRightOutlined />
          <Tag color="green" className="m-0">
            {t(vocabularySet.defineLocale.toLowerCase(), { ns: "languages" })}
          </Tag>
        </Space>
        <Typography.Paragraph type="secondary" className="mb-0">
          {vocabularySet.description}
        </Typography.Paragraph>
        {vocabularySet.practiceResultDto.isPracticed ? (
          <Tooltip title="Bộ này bạn đang luyện tập">
            <span>
              <Progress
                percent={
                  (1 -
                    vocabularySet.practiceResultDto.currentNumOfVocab /
                      vocabularySet.practiceResultDto.totalVocabs) *
                  100
                }
                size="small"
              />
            </span>
          </Tooltip>
        ) : null}
      </Space>
    </Card>
  );
};

export default VocabularyCard;
