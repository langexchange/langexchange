import { Input, Space } from "antd";
import FilterLine from "../../components/vocabularies/FilterLine";
import VocabularySetList from "../../components/VocabularySetList";

const onSearch = (value: string) => console.log(value);

const YourVocabularyPage = () => {
  return (
    <div className="py-4">
      <Space>
        <Input.Search
          placeholder="input search text"
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
