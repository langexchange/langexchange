import { Input, Skeleton, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import VocabularySetList from "../../components/VocabularySetList";
import {
  useGetVocabularySetsQuery,
  VocabularySetDetail,
} from "../../services/vocabulary/vocabularyService";

const YourVocabularyPage: React.FC = () => {
  const [t] = useTranslation(["commons", "vocabulary"]);
  const { data, isLoading, refetch } = useGetVocabularySetsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [sets, setSets] = useState<VocabularySetDetail>();

  const onSearch = (value: string) => {
    setSets((prev: any) => {
      const newSets = data?.vocabularyPackageDtos.filter((item: any) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );

      return { ...prev, vocabularyPackageDtos: newSets };
    });
  };

  useEffect(() => {
    if (!data) return;
    setSets(data);
  }, [data]);

  return (
    <div className="pt-4 pb-5">
      <Space className="w-100 justify-content-between" wrap={true}>
        <Typography.Title level={3} className="m-0">
          {t("Your vocabulary", { ns: "vocabulary" })}
        </Typography.Title>
        <Input.Search
          placeholder={t("type-to-search").toString()}
          allowClear
          onSearch={onSearch}
          style={{ width: 400 }}
        />
        {/* <FilterLine /> */}
      </Space>
      <br />
      <br />
      <Skeleton loading={isLoading}>
        <VocabularySetList
          data={[sets as VocabularySetDetail]}
          refetch={refetch}
          editable={true}
        />
      </Skeleton>
    </div>
  );
};

export default YourVocabularyPage;
