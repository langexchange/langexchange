import { faker } from "@faker-js/faker";
import { List } from "antd";
import VocabularyItem from "./VocabularyItem";

interface Vocabulary {
  term: string;
  define: string;
}

const items: Vocabulary[] = [];
for (let i = 0; i < 10; i++) {
  const item: Vocabulary = {
    term: faker.random.word(),
    define: faker.random.words(10),
  };
  items.push(item);
}

type VocabType = "hard" | "known";
interface Props {
  type?: VocabType;
}

const VocabularyList = ({ type }: Props) => {
  let badge: any;
  switch (type) {
    case "hard":
      badge = {
        text: "Hard",
        color: "red",
      };
      break;
    case "known":
      badge = {
        text: "Known",
        color: "green",
      };
      break;
    default:
      break;
  }
  return (
    <List
      itemLayout="horizontal"
      dataSource={items}
      split={false}
      renderItem={(item) => (
        <List.Item>
          <VocabularyItem {...item} badge={badge} />
        </List.Item>
      )}
    />
  );
};

export default VocabularyList;
