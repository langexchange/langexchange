import { Layout } from "antd";
import PracticeSidebar from "../../components/vocabularies/PracticeSidebar";
import { Outlet } from "react-router-dom";

const PracticeVocabularyLayout = () => {
  return (
    <Layout
      className="py-4 full-height-minus-header"
      style={{ backgroundColor: "inherit" }}
    >
      <Layout.Sider
        className="white-background sider-with-content-scroll py-3 px-3"
        width={360}
        style={{ borderRadius: "8px" }}
      >
        <PracticeSidebar />
      </Layout.Sider>
      <Layout.Content
        className="d-flex justify-center"
        style={{ backgroundColor: "inherit" }}
      >
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default PracticeVocabularyLayout;
