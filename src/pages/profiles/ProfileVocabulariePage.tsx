import { Skeleton } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import VocabularyStaticChart from "../../components/tracking/VocabularyStaticChart";
// import VocabularyList from "../../components/partners/VocabularyList";
import VocabularyModal from "../../components/VocabularyModal";
import VocabularySetList from "../../components/VocabularySetList";
import {
  useGetUserVocabularySetsQuery,
  VocabularySetDetail,
} from "../../services/vocabulary/vocabularyService";
import VocabularySet from "../../types/VocabularySet";

const ProfileVocabulariesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetUserVocabularySetsQuery(id || "", {
    skip: !id,
  });

  console.log(data);
  const [vocabularySet, setVocabularySet] = useState<VocabularySet | null>(
    null
  );
  const [isModalVocabularyOpen, setIsModalVocabularyOpen] =
    useState<boolean>(false);

  const showModalVocabulary = () => {
    setIsModalVocabularyOpen(true);
  };

  return (
    <>
      <VocabularyStaticChart />
      <Skeleton loading={isLoading} active>
        <VocabularySetList
          data={[data] as VocabularySetDetail[]}
          columnsCount={2}
        />
      </Skeleton>
      <VocabularyModal
        vocabularySet={vocabularySet}
        isModalVocabularyOpen={isModalVocabularyOpen}
        setIsModalVocabularyOpen={setIsModalVocabularyOpen}
      />
    </>
  );
};

export default ProfileVocabulariesPage;
