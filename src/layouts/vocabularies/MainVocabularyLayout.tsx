import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const MainVocabularyLayout = () => {
  return (
    <Layout.Content className="has-background-color">
      <Outlet />
    </Layout.Content>
  );
};

export default MainVocabularyLayout;
