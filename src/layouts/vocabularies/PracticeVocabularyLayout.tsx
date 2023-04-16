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
        className="card-box-shadow rounded-3 white-background"
        width={360}
        style={{ zIndex: 2 }}
        breakpoint="xl"
        collapsedWidth="0"
        theme="light"
        zeroWidthTriggerStyle={{ top: "12px" }}
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
