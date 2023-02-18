import { Layout } from "antd";
import PracticeSidebar from "../../components/vocabularies/PracticeSidebar";
import { Outlet } from "react-router-dom";

const PracticeVocabularyLayout = () => {
  return (
    <Layout style={{ maxHeight: "calc(100vh - 96px)" }}>
      <Layout.Sider
        className="white-background sider-with-content-scroll py-3"
        width={350}
      >
        <PracticeSidebar />
      </Layout.Sider>
      <Layout.Content className="has-background-color d-flex justify-center pt-5 pos-relative">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default PracticeVocabularyLayout;
