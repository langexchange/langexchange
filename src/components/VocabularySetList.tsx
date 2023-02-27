import { Link } from "react-router-dom";
import VocabularySet from "../types/VocabularySet";
import { fakeVocabularySets } from "../utils/fakeData/fakeVocabularySet";
import VocabularyCard from "./VocabularyCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface ListProps {
  colSpan?: number;
  editable?: boolean;
  setVocabularySet?: React.Dispatch<React.SetStateAction<VocabularySet | null>>;
  showModal?: () => void;
  columnsCount?: number;
}

const items: VocabularySet[] = fakeVocabularySets(10);

const VocabularySetList = ({
  showModal,
  setVocabularySet,
  columnsCount = 4,
  editable = false,
}: ListProps) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: columnsCount }}
    >
      <Masonry gutter="16px" columnsCount={columnsCount}>
        {items.map((item, index) => (
          <Link to="/vocabularies/details" key={index}>
            <VocabularyCard
              {...item}
              editable={editable}
              showModal={showModal}
              setVocabularySet={setVocabularySet}
            />
          </Link>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default VocabularySetList;
