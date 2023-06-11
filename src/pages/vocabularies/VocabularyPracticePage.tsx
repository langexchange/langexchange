import { useState } from "react";
import { Card, Skeleton, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import FlashCardList from "../../components/vocabularies/FlashCardList";
import Dashboard from "../../components/vocabularies/Dashboard";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetPracticeSetQuery } from "../../services/vocabulary/vocabularyService";

const VocabularyPracticePage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [t] = useTranslation(["vocabulary"]);
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetPracticeSetQuery(id || "", {
    skip: !id,
    refetchOnMountOrArgChange: false,
  });

  const showDrawer = () => setOpen(true);

  const onClose = () => setOpen(false);

  return (
    <div>
      {/* <Card */}
      {/*   hoverable */}
      {/*   size="small" */}
      {/*   onClick={showDrawer} */}
      {/*   className="mb-3 float-right" */}
      {/*   style={{ width: "fit-content", zIndex: 1 }} */}
      {/* > */}
      {/*   <LeftOutlined /> */}
      {/*   {t("Dashboard")} */}
      {/* </Card> */}
      <Skeleton loading={isLoading} active>
        {!isLoading && data?.practiceVocabularies.length === 0 ? (
          <Typography.Title level={3} className="mb-3">
            Bạn đã hoàn thành bộ từ vựng này!
          </Typography.Title>
        ) : (
          <FlashCardList vocabularies={data?.practiceVocabularies} />
        )}
      </Skeleton>
      <Dashboard onClose={onClose} open={open} />
    </div>
  );
};

export default VocabularyPracticePage;
