import VocabularySet from "../../types/VocabularySet";
import VocabularyCard from "../VocabularyCard";
import { fakeVocabularySets } from "../../utils/fakeData/fakeVocabularySet";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface ListProps {
  colSpan?: number;
  editable?: boolean;
  setVocabularySet?: React.Dispatch<React.SetStateAction<VocabularySet | null>>;
  showModal?: () => void;
  columnsCount?: number;
}

const items: VocabularySet[] = fakeVocabularySets(10);

const VocabularyList = ({
  showModal,
  setVocabularySet,
  colSpan = 6,
  columnsCount = 2,
  editable = false,
}: ListProps) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 2 }}>
      <Masonry gutter="16px" columnsCount={columnsCount}>
        {/* {items.map((item, index) => ( */}
        {/*   <VocabularyCard */}
        {/*     {...item} */}
        {/*     editable={editable} */}
        {/*     showModal={showModal} */}
        {/*     setVocabularySet={setVocabularySet} */}
        {/*     key={index} */}
        {/*   /> */}
        {/* ))} */}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default VocabularyList;
