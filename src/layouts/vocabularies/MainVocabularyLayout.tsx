import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import VocabularyHeader from "../../components/vocabularies/VocabularyHeader";

const MainVocabularyLayout = () => {
  return (
    <Layout>
      <VocabularyHeader />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default MainVocabularyLayout;
