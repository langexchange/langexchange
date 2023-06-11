import { Input, Skeleton, Divider } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FilterLine from "../../components/vocabularies/FilterLine";
import VocabularySetList from "../../components/VocabularySetList";
import {
  FilterVocabularySet,
  useGetSuggestVocabularySetsQuery,
  VocabularySetDetail,
} from "../../services/vocabulary/vocabularyService";

const defaultFilters: FilterVocabularySet = {
  terms: [],
  defines: [],
};

const VocabularyExploresPage: React.FC = () => {
  const [t] = useTranslation(["commons"]);
  const [filters, setFilters] = useState<FilterVocabularySet>(defaultFilters);
  const { data, isLoading, isFetching } = useGetSuggestVocabularySetsQuery(
    filters,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [displayedData, setDisplayedData] = useState<VocabularySetDetail[]>([]);

  useEffect(() => {
    if (data) {
      setDisplayedData(data);
    }
  }, [data, isLoading]);

  const onSearch = (value: string) => {
    if (!data) return;

    if (!value) {
      setDisplayedData(data);
      return;
    }

    const newData = data?.filter((item) => {
      if (
        item.userInfo.firstName?.toLowerCase().includes(value.toLowerCase()) ||
        item.userInfo.lastName?.toLowerCase().includes(value.toLowerCase())
      )
        return true;
      return item.vocabularyPackageDtos.some((vocabularyPackage) => {
        if (
          vocabularyPackage.title
            ?.toLowerCase()
            .includes(value.toLowerCase()) ||
          vocabularyPackage.description
            ?.toLowerCase()
            .includes(value.toLowerCase())
        )
          return true;
      });
    });

    const finalData = newData.map((item) => {
      return {
        ...item,
        vocabularyPackageDtos: item.vocabularyPackageDtos.filter(
          (vocabularyPackage) => {
            if (
              vocabularyPackage.title
                ?.toLowerCase()
                .includes(value.toLowerCase()) ||
              vocabularyPackage.description
                ?.toLowerCase()
                .includes(value.toLowerCase())
            )
              return true;
          }
        ),
      };
    });
    setDisplayedData(finalData);
  };

  const resetFilters = () => setFilters(defaultFilters);
  useEffect(() => {
    if (!data) return;
    console.log(data);
    console.log(filters);
    if (
      (!filters?.terms && !filters?.defines) ||
      (filters?.terms?.length === 0 && filters?.defines?.length === 0)
    ) {
      setDisplayedData(data);
      return;
    }

    const newData = data?.map((item) => {
      return {
        ...item,
        vocabularyPackageDtos: item.vocabularyPackageDtos.filter(
          (vocabularyPackage) => {
            if (
              filters.terms?.some((term) =>
                vocabularyPackage.termLocale
                  ?.toLowerCase()
                  .includes(term.toLowerCase())
              ) ||
              filters.defines?.some((define) =>
                vocabularyPackage.defineLocale
                  ?.toLowerCase()
                  .includes(define.toLowerCase())
              )
            )
              return true;
          }
        ),
      };
    });
    setDisplayedData(newData);
  }, [isFetching]);

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
        <VocabularySetList data={displayedData} />
      </Skeleton>
    </div>
  );
};

export default VocabularyExploresPage;
