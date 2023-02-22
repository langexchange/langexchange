import { faker } from "@faker-js/faker";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import VocabularyCard from "./VocabularyCard";

interface ListProps {
  colSpan?: number;
  editable?: boolean;
  setVocabularySet?: (val: Vocabulary) => void;
  showModal?: () => void;
}

interface Vocabulary {
  owner?: {
    fullname: string;
    color?: string;
    image: string;
  };
  title: string;
  descriptions: string;
  termLanguage: string;
  defineLanguage: string;
}

const items: Vocabulary[] = [];

for (let i = 0; i < 20; i++) {
  const item: Vocabulary = {
    owner: {
      fullname: faker.name.fullName(),
      image: faker.image.abstract(),
    },
    title: faker.random.words(4),
    descriptions: faker.random.words(15),
    termLanguage: faker.random.words(1),
    defineLanguage: faker.random.words(1),
  };
  items.push(item);
}

const VocabularySetList = ({
  showModal,
  setVocabularySet,
  colSpan = 8,
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
            <Link to="/vocabularies/details">
              <VocabularyCard
                {...item}
                editable={editable}
                showModal={showModal}
                setVocabularySet={setVocabularySet}
              />
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VocabularySetList;
