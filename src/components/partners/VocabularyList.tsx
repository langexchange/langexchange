import { Col, Row } from "antd";
import VocabularySet from "../../types/VocabularySet";
import VocabularyCard from "../VocabularyCard";
import { fakeVocabularySets } from "../../utils/fakeData/fakeVocabularySet";

interface ListProps {
  colSpan?: number;
  editable?: boolean;
  setVocabularySet?: React.Dispatch<React.SetStateAction<VocabularySet | null>>;
  showModal?: () => void;
}

const items: VocabularySet[] = fakeVocabularySets(10);

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
