import { Input, Layout, Space } from "antd";
import FilterLine from "../../components/vocabularies/FilterLine";
import VocabularySetList from "../../components/VocabularySetList";

const onSearch = (value: string) => console.log(value);

const YourVocabularyPage = () => {
  return (
    <Layout>
      <Layout.Content style={{ background: "white", padding: "24px 50px" }}>
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
      </Layout.Content>
    </Layout>
  );
};

export default YourVocabularyPage;
