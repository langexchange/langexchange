import { List } from "antd";
import Vocabulary from "../types/Vocabulary";
import { fakeVocabularies } from "../utils/fakeData/fakeVocabulary";
import VocabularyItem from "./VocabularyItem";

const items: Vocabulary[] = fakeVocabularies(10);

type VocabType = "hard" | "known";
interface Props {
  type?: VocabType;
  vocabularies?: Vocabulary[];
}

const VocabularyList = ({ type, vocabularies }: Props) => {
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
      dataSource={vocabularies || items}
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
