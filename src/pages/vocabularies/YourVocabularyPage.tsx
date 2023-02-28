import { Input, Space } from "antd";
import { useTranslation } from "react-i18next";
import FilterLine from "../../components/vocabularies/FilterLine";
import VocabularySetList from "../../components/VocabularySetList";

const onSearch = (value: string) => console.log(value);

const YourVocabularyPage = () => {
  const [t] = useTranslation(["commons"]);
  return (
    <div className="py-4">
      <Space>
        <Input.Search
          placeholder={t("type-to-search").toString()}
          allowClear
          onSearch={onSearch}
          style={{ width: 400 }}
        />
        <FilterLine />
      </Space>
      <br />
      <br />
      <VocabularySetList />
    </div>
  );
};

export default YourVocabularyPage;
