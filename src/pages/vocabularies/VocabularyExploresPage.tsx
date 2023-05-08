import { Input, Skeleton, Divider } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import FilterLine from "../../components/vocabularies/FilterLine";
import VocabularySetList from "../../components/VocabularySetList";
import {
  FilterVocabularySet,
  useGetSuggestVocabularySetsQuery,
} from "../../services/vocabulary/vocabularyService";

const onSearch = (value: string) => console.log(value);
const defaultFilters: FilterVocabularySet = {
  terms: [],
  defines: [],
};

const VocabularyExploresPage: React.FC = () => {
  const [t] = useTranslation(["commons"]);
  const [filters, setFilters] = useState<FilterVocabularySet>(defaultFilters);
  const { data, isLoading } = useGetSuggestVocabularySetsQuery(filters, {
    refetchOnMountOrArgChange: true,
  });

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <div className="pt-4 pb-5">
      <div className="d-flex gap-3">
        <Input.Search
          placeholder={t("type-to-search").toString()}
          allowClear
          onSearch={onSearch}
          style={{ width: 500 }}
        />
        <FilterLine resetFilters={resetFilters} setFilters={setFilters} />
      </div>
      <Divider />
      <Skeleton loading={isLoading} active>
        <VocabularySetList data={data} />
      </Skeleton>
    </div>
  );
};

export default VocabularyExploresPage;
