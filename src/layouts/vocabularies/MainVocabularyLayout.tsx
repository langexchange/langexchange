import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const MainVocabularyLayout = () => {
  return (
    <Layout.Content style={{ minHeight: "calc(100vh - 112px)" }}>
      <Outlet />
    </Layout.Content>
  );
};

export default MainVocabularyLayout;
