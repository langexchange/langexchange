import {
  Skeleton,
  Button,
  Card,
  Divider,
  message,
  Space,
  Typography,
  Tag,
} from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import FlashCardList from "../../components/vocabularies/FlashCardList";
import UserItem from "../../components/UserItem";
import VocabularyList from "../../components/VocabularyList";
import BackCircleButton from "../../components/BackCircleButton";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  useCloneVocabularySetMutation,
  useGetVocabularySetQuery,
} from "../../services/vocabulary/vocabularyService";
import { selectCredentials } from "../../features/auth/authSlice";
import { useAppSelector } from "../../hooks/hooks";

const VocabularyDetailPage: React.FC = () => {
  const [t] = useTranslation(["vocabulary", "commons", "languages"]);
  const { vocabularySetId } = useParams<{ vocabularySetId: string }>();
  const [cloneVocabularySet, { isLoading: isCloning }] =
    useCloneVocabularySetMutation();
  const credentials = useAppSelector(selectCredentials);

  const { data, isLoading } = useGetVocabularySetQuery(vocabularySetId || "", {
    skip: !vocabularySetId,
    refetchOnMountOrArgChange: true,
  });

  const handleCollect = async () => {
    if (!vocabularySetId) return;
    try {
      await cloneVocabularySet(vocabularySetId).unwrap();
      message.success("Collect successfully!", 1);
    } catch (err) {
      message.error("Oops! Something went wrong.", 1);
    }
  };

  const vocabularySet = data?.vocabularyPackageDtos[0];
  const collectedVocabularySet = data?.userInfo.id === credentials.userId;

  return (
    <>
      <div
        style={{
          margin: "auto",
          padding: "24px 0",
        }}
      >
        <div className="d-flex align-items-center justify-space-between mb-3">
          <Space align="center">
            <BackCircleButton />
            <Typography.Title className="m-0" level={3}>
              {vocabularySet?.title}
            </Typography.Title>
          </Space>
          {!collectedVocabularySet && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCollect}
              loading={isCloning}
            >
              {t("Collect", { ns: "commons" })}
            </Button>
          )}
        </div>
        <div className="ma mb-3">
          <Skeleton active loading={isLoading}>
            <FlashCardList
              type="view"
              vocabularies={vocabularySet?.vocabularyDtos}
            />
          </Skeleton>
          <br />
          <Card size="small">
            <div className="d-flex align-items-center justify-space-between flex-wrap gap-3">
              <Skeleton active loading={isLoading}>
                <UserItem
                  id={data?.userInfo?.id || ""}
                  fullname={[
                    data?.userInfo.firstName,
                    data?.userInfo.lastName,
                  ].join(" ")}
                  avatar={data?.userInfo.avatar || undefined}
                  description={new Date(
                    data?.vocabularyPackageDtos[0]?.updatedAt?.toString() ||
                    data?.vocabularyPackageDtos[0]?.createdAt?.toString() ||
                    ""
                  ).toLocaleString()}
                  size="small"
                  isStrong={true}
                />
              </Skeleton>
              <Space>
                <Tag color="blue" className="m-0">
                  {t(
                    `${data?.vocabularyPackageDtos[0]?.termLocale.toLowerCase()}`,
                    {
                      ns: "languages",
                    }
                  )}
                </Tag>
                <ArrowRightOutlined />
                <Tag color="green" className="m-0">
                  {t(
                    `${data?.vocabularyPackageDtos[0]?.defineLocale.toLowerCase()}`,
                    {
                      ns: "languages",
                    }
                  )}
                </Tag>
              </Space>
            </div>
          </Card>
        </div>
        <Divider />

        <div>
          <Typography.Title level={4}>
            {t("Terminology in this module")}
          </Typography.Title>
          <VocabularyList vocabularies={vocabularySet?.vocabularyDtos} />
        </div>
      </div>
    </>
  );
};

export default VocabularyDetailPage;
