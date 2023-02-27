import { useState } from "react";
import { faker } from "@faker-js/faker";
import FlashCard from "./FlashCard";
import { Button, Space } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import classes from "./FlashCardList.module.scss";
import Vocabulary from "../../types/Vocabulary";
import { fakeVocabularies } from "../../utils/fakeData/fakeVocabulary";

const items: Vocabulary[] = fakeVocabularies(10);

interface FlashCardListProps {
  type?: "view" | "practice";
}

const FlashCardList: React.FC<FlashCardListProps> = ({ type = "practice" }) => {
  const cards = items.map((item: Vocabulary) => {
    return <FlashCard {...item} key={item.id} />;
  });

  const loading = <div className="loading">Loading flashcard content...</div>;

  const [current, setCurrent] = useState(0);
  function previousCard() {
    setCurrent(current - 1);
  }
  function nextCard() {
    setCurrent(current + 1);
  }

  return (
    <div className={classes.container}>
      {items && items.length > 0 ? cards[current] : loading}

      {items && items.length > 0 ? (
        <div className={classes.index}>
          {current + 1}/{items.length}
        </div>
      ) : (
        ""
      )}

      <Space className={classes.navigation}>
        <Button
          onClick={previousCard}
          size="large"
          disabled={current == 0}
          icon={<LeftOutlined />}
          className={classes.button}
        />
        {type === "practice" && (
          <>
            <Button size="large" danger>
              Hard
            </Button>
            <Button size="large" className="btn-outlined-success">
              Known
            </Button>
          </>
        )}
        <Button
          onClick={nextCard}
          size="large"
          disabled={current >= items.length - 1}
          icon={<RightOutlined />}
          className={classes.button}
        />
      </Space>
    </div>
  );
};

export default FlashCardList;
