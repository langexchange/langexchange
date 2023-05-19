import { useState } from "react";
import FlashCard from "./FlashCard";
import { Button, Space, Spin } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import classes from "./FlashCardList.module.scss";
import { useTranslation } from "react-i18next";
import {
  useTrackingVocabularyMutation,
  Vocabulary,
} from "../../services/vocabulary/vocabularyService";
import { useParams } from "react-router-dom";

interface FlashCardListProps {
  type?: "view" | "practice";
  vocabularies?: Vocabulary[];
}

const FlashCardList: React.FC<FlashCardListProps> = ({
  type = "practice",
  vocabularies,
}) => {
  const [t] = useTranslation(["vocabulary"]);
  const [trackingVocab, { isLoading: isTracking }] =
    useTrackingVocabularyMutation();
  const { id: setId } = useParams<{ id: string }>();

  const cards =
    vocabularies?.map((item: Vocabulary, index) => {
      return <FlashCard {...item} key={index} />;
    }) || [];

  const loading = (
    <Spin tip="Loading vocabularies...">
      <FlashCard term="" define="" imageUrl="" />
    </Spin>
  );

  const [current, setCurrent] = useState(0);

  function previousCard() {
    setCurrent(current - 1);
  }

  function nextCard() {
    setCurrent(current + 1);
  }

  const tracking = async (id: string, quality: number) => {
    nextCard();

    try {
      await trackingVocab({
        id: id,
        body: {
          vocabTrackings: [{ vocabularyId: setId || "", quality: quality }],
        },
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      {vocabularies && vocabularies.length > 0 ? cards[current] : loading}

      {vocabularies && vocabularies.length > 0 ? (
        <div className={classes.index}>
          {current + 1}/{vocabularies.length}
        </div>
      ) : (
        ""
      )}

      <Space className={classes.navigation}>
        <Button
          onClick={previousCard}
          size="large"
          disabled={current === 0}
          icon={<LeftOutlined />}
          className={classes.button}
        />
        {type === "practice" && (
          <>
            <Button
              size="large"
              className="btn-outlined-warning"
              disabled={
                vocabularies?.length === 0 ||
                current >= (vocabularies?.length || 0) - 1
              }
              onClick={() =>
                tracking(
                  (vocabularies && vocabularies[current].vocabId) || "",
                  1
                )
              }
            >
              {t("Medium")}
            </Button>
            <Button
              size="large"
              danger
              disabled={
                vocabularies?.length === 0 ||
                current >= (vocabularies?.length || 0) - 1
              }
              onClick={() =>
                tracking(
                  (vocabularies && vocabularies[current].vocabId) || "",
                  0
                )
              }
            >
              {t("Hard")}
            </Button>
            <Button
              size="large"
              className="btn-outlined-success"
              disabled={
                vocabularies?.length === 0 ||
                current >= (vocabularies?.length || 0) - 1
              }
              onClick={() =>
                tracking(
                  (vocabularies && vocabularies[current].vocabId) || "",
                  2
                )
              }
            >
              {t("Known")}
            </Button>
          </>
        )}
        <Button
          onClick={nextCard}
          size="large"
          disabled={current >= (vocabularies?.length || 0) - 1}
          icon={<RightOutlined />}
          className={classes.button}
        />
      </Space>
    </div>
  );
};

export default FlashCardList;
