import { List } from "antd";
import Vocabulary from "../types/Vocabulary";
import VocabularyItem from "./VocabularyItem";
import { useTranslation } from "react-i18next";
import { fakeVocabularies } from "../utils/fakeData/fakeVocabulary";

const items: Vocabulary[] = fakeVocabularies(10);

interface VocabularyListProps {
  type?: "hard" | "known";
  vocabularies?: Vocabulary[];
}

const VocabularyList: React.FC<VocabularyListProps> = ({
  type,
  vocabularies,
}) => {
  const [t] = useTranslation(["vocabulary"]);

  let badge: any;
  switch (type) {
    case "hard":
      badge = {
        text: t("Hard"),
        color: "red",
      };
      break;
    case "known":
      badge = {
        text: t("Known"),
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
      renderItem={(item, index) => (
        <List.Item key={index}>
          <VocabularyItem {...item} badge={badge} />
        </List.Item>
      )}
    />
  );
};

export default VocabularyList;
