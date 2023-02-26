import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import VocabularySet from "../types/VocabularySet";
import { fakeVocabularySets } from "../utils/fakeData/fakeVocabularySet";
import VocabularyCard from "./VocabularyCard";

interface ListProps {
  colSpan?: number;
  editable?: boolean;
  setVocabularySet?: React.Dispatch<React.SetStateAction<VocabularySet | null>>;
  showModal?: () => void;
}

const items: VocabularySet[] = fakeVocabularySets(5);

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
