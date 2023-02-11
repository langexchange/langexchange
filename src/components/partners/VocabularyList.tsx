import { faker } from "@faker-js/faker";
import { Col, Row } from "antd";
import VocabularyCard from "../VocabularyCard";

interface ListProps {
  colSpan?: number;
  editable?: boolean;
  setVocabularySet?: (val: Vocabulary) => void;
  showModal?: () => void;
}

interface Vocabulary {
  title: string;
  descriptions: string;
  termLanguage: string;
  defineLanguage: string;
}

const items: Vocabulary[] = [];

for (let i = 0; i < 10; i++) {
  const item: Vocabulary = {
    title: faker.random.words(4),
    descriptions: faker.random.words(15),
    termLanguage: faker.random.words(1),
    defineLanguage: faker.random.words(1),
  };
  items.push(item);
}

const VocabularyList = ({
  showModal,
  setVocabularySet,
  colSpan = 6,
  editable = false,
}: ListProps) => {
  return (
    <div>
      <Row gutter={[12, 12]}>
        {items.map((item, index) => (
          <Col
            span={colSpan}
            key={index}
            style={{
              height: "auto",
            }}
          >
            <VocabularyCard
              {...item}
              editable={editable}
              showModal={showModal}
              setVocabularySet={setVocabularySet}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VocabularyList;
