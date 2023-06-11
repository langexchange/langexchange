import { useState } from "react";
import FlashCard from "./FlashCard";
import { Button, Col, Row, Space, Spin } from "antd";
import {
  RightOutlined,
  LeftOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import classes from "./FlashCardList.module.scss";
import { useTranslation } from "react-i18next";
import {
  useTrackingVocabularyMutation,
  Vocabulary,
} from "../../services/vocabulary/vocabularyService";
import { useNavigate, useParams } from "react-router-dom";
import confirm from "antd/es/modal/confirm";

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
    if (current >= (vocabularies?.length || 0) - 1) {
      showConfirm();
    } else {
      setCurrent(current + 1);
    }
  }
  const navigate = useNavigate();

  const showConfirm = () => {
    confirm({
      title: "Bạn đã hoàn thành luyện tập bộ từ vựng này.",
      content: "Quay trở lại trang dashboard để tiếp tục luyện tập.",
      okText: "Đi thôi",
      icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
      cancelButtonProps: {
        style: { display: "none" },
      },
      onOk() {
        navigate("/vocabularies/practice");
      },
    });
  };

  const tracking = async (id: string, quality: number) => {
    if (
      vocabularies?.length === 0 ||
      current >= (vocabularies?.length || 0) - 1
    ) {
      showConfirm();
    } else {
      nextCard();
    }

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
      <div className={classes.navigation}>
        <Row className="mb-2">
          <Col sm={0} xs={24}>
            <Space>
              {type === "practice" && (
                <>
                  <Button
                    className="btn-outlined-warning"
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
                    danger
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
                    className="btn-outlined-success"
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
            </Space>
          </Col>
        </Row>
        <Space>
          <Button
            onClick={previousCard}
            size="large"
            disabled={current === 0}
            icon={<LeftOutlined />}
            className={classes.button}
          />
          <Row>
            <Col sm={24} xs={0}>
              <Space>
                {type === "practice" && (
                  <>
                    <Button
                      size="large"
                      className="btn-outlined-warning"
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
              </Space>
            </Col>
          </Row>
          <Button
            onClick={nextCard}
            size="large"
            disabled={
              type !== "practice" && current >= (vocabularies?.length || 0) - 1
            }
            icon={<RightOutlined />}
            className={classes.button}
          />
        </Space>
      </div>
    </div>
  );
};

export default FlashCardList;
