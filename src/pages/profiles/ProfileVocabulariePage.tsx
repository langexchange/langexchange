import { useState } from "react";
import VocabularyList from "../../components/partners/VocabularyList";
import VocabularyModal from "../../components/VocabularyModal";
import VocabularySet from "../../types/VocabularySet";

const ProfileVocabulariesPage = () => {
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
      <VocabularyList
        colSpan={12}
        editable={false}
        setVocabularySet={setVocabularySet}
        showModal={showModalVocabulary}
      />
      <VocabularyModal
        vocabularySet={vocabularySet}
        isModalVocabularyOpen={isModalVocabularyOpen}
        setIsModalVocabularyOpen={setIsModalVocabularyOpen}
      />
    </>
  );
};

export default ProfileVocabulariesPage;
