import VocabularyCard from "./VocabularyCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { VocabularySetDetail } from "../services/vocabulary/vocabularyService";

interface VocabularySetListProps {
  data?: VocabularySetDetail[];
  colSpan?: number;
  editable?: boolean;
  setVocabularySet?: React.Dispatch<
    React.SetStateAction<VocabularySetDetail | null>
  >;
  showModal?: () => void;
  columnsCount?: number;
  refetch?: () => void;
}

const VocabularySetList: React.FC<VocabularySetListProps> = ({
  data,
  showModal,
  setVocabularySet,
  columnsCount = 4,
  editable = false,
  refetch,
}) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: columnsCount }}
    >
      <Masonry gutter="16px" columnsCount={columnsCount}>
        {data?.map((ofUser) => {
          return ofUser?.vocabularyPackageDtos.map((item) => (
            <VocabularyCard
              {...item}
              owner={ofUser.userInfo}
              editable={editable}
              showModal={showModal}
              // setVocabularySet={setVocabularySet}
              refetch={refetch}
              key={item.packageId}
            />
          ));
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default VocabularySetList;
