import { faker } from "@faker-js/faker";
import { Col, Row } from "antd";
import VocabularyCard from "../VocabularyCard";

interface ListProps {
  colSpan?: number;
  editable?: boolean;
}

interface Vocabulary {
  title: string;
  descriptions: string;
  termLanguage: string;
  defineLanguage: string;
  image: string;
}

const items: Vocabulary[] = [];

for (let i = 0; i < 10; i++) {
  const item: Vocabulary = {
    title: faker.random.words(4),
    descriptions: faker.random.words(15),
    termLanguage: faker.random.words(1),
    defineLanguage: faker.random.words(1),
    image: faker.image.abstract(),
  };
  items.push(item);
}

const VocabularyList = ({ colSpan = 6, editable = false }: ListProps) => {
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
            <VocabularyCard {...item} editable={editable} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VocabularyList;
