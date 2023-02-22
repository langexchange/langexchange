import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import VocabularyHeader from "../components/vocabularies/VocabularyHeader";
import PageHeader from "../parts/header/PageHeader";
import { getElementInPathnameAt } from "../utils/extractPathname";

const AppSignedInLayout = () => {
  const pathname = getElementInPathnameAt(1);
  const isVocabulary = pathname === "vocabularies";
  console.log(pathname);
  return (
    <>
      <Layout>
        <PageHeader />
        {isVocabulary && <VocabularyHeader />}
        <Content className="has-background-color">
          <div className="container">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default AppSignedInLayout;
