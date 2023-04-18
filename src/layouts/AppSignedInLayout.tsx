import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import Dictionary from "../components/Dictionary";
import VocabularyHeader from "../components/vocabularies/VocabularyHeader";
import { selectCurrentBackgroundColor } from "../features/themes/themeSlice";
import { useAppSelector } from "../hooks/hooks";
import PageHeader from "../parts/header/PageHeader";
import { getElementInPathnameAt } from "../utils/extractPathname";

const AppSignedInLayout: React.FC = () => {
  const pathname = getElementInPathnameAt(1);
  const isVocabulary = pathname === "vocabularies";
  const backgroundColor = useAppSelector(selectCurrentBackgroundColor);

  return (
    <>
      <Layout style={{ background: backgroundColor }}>
        <PageHeader />
        {isVocabulary && <VocabularyHeader />}
        <Content className="container">
          <Outlet />
        </Content>
      </Layout>
      <Dictionary />
    </>
  );
};

export default AppSignedInLayout;
