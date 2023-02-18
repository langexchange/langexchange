import { useState } from "react";
import { faker } from "@faker-js/faker";
import FlashCard from "./FlashCard";
import { Button, Space } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import classes from "./FlashCardList.module.scss";

interface Card {
  id: string;
  term: string;
  define: string;
}

const items: Card[] = [];

for (let index = 0; index < 20; index++) {
  const card: Card = {
    id: faker.database.mongodbObjectId().toString(),
    term: faker.random.words(3),
    define: faker.random.words(10),
  };
  items.push(card);
}

interface Props {
  type?: "view" | "practice";
}

const FlashCardList = ({ type = "practice" }: Props) => {
  const cards = items.map((item) => {
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
