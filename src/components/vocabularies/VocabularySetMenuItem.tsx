import {
  Button,
  message,
  Popconfirm,
  Progress,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  useRemoveFromPracticeMutation,
  VocabularySet,
} from "../../services/vocabulary/vocabularyService";

interface VocabularySetMenuItemProps {
  progressHidden?: boolean;
  moreHidden?: boolean;
  numberWords?: number;
  numberWordsLearned?: number;
  title: string;
  description: string;
  vocabularyDtos: VocabularySet["vocabularyDtos"];
  id?: string;
  refetch?: () => void;
}

const VocabularySetMenuItem: React.FC<VocabularySetMenuItemProps> = ({
  id,
  title,
  description,
  vocabularyDtos,
  numberWords,
  numberWordsLearned = 0,
  progressHidden = false,
  moreHidden = false,
  refetch,
}) => {
  const [t] = useTranslation(["vocabulary"]);
  const [removeFromPractice, { isLoading }] = useRemoveFromPracticeMutation();

  const handleRemove = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    if (!id) return;

    try {
      await removeFromPractice(id).unwrap();
      refetch && refetch();
      message.success("Đã xoá", 1);
    } catch (error) {
      message.error("Có lỗi xảy ra", 1);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-space-between pt-2">
        <div
          className="d-flex flex-column align-items-start"
          style={{ maxWidth: "240px" }}
        >
          <Typography.Text strong ellipsis={true}>
            {title}
          </Typography.Text>
          <Typography.Text type="secondary" ellipsis={true} className="mt-1">
            {description}
          </Typography.Text>
        </div>
        {!moreHidden && (
          <Popconfirm
            title="Loại bộ từ vựng ra khỏi danh sách"
            description="Chắc không?"
            onConfirm={handleRemove}
            okText="Yes"
            cancelText="No"
            onCancel={(e: any) => {
              e?.preventDefault();
              e?.stopPropagation();
            }}
          >
            <span
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <Tooltip
                title="Xoá bộ từ vựng này ra khỏi danh sách cần luyện tập."
                placement="bottom"
              >
                <Button
                  type="text"
                  size="small"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  danger
                  loading={isLoading}
                />
              </Tooltip>
            </span>
          </Popconfirm>
        )}
      </div>
      <div className="d-flex align-items-center">
        <Tag color="magenta">
          {numberWords || vocabularyDtos.length} {t("words")}
        </Tag>
        <div style={{ flex: 1 }}>
          {!progressHidden && (
            <Progress
              percent={(numberWordsLearned / (numberWords || 1)) * 100}
              strokeColor={{ "0%": "#108ee9", "100%": "#87d068" }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default VocabularySetMenuItem;
