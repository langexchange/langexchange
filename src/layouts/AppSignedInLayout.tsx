import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { initChat, loginChat } from "../chat";
import Dictionary from "../components/Dictionary";
import VocabularyHeader from "../components/vocabularies/VocabularyHeader";
import { selectCurrentChatStatus, setChatStatus } from "../features/chatSlice";
import { selectCurrentBackgroundColor } from "../features/themes/themeSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import PageHeader from "../parts/header/PageHeader";
import { getElementInPathnameAt } from "../utils/extractPathname";

const AppSignedInLayout: React.FC = () => {
  const pathname = getElementInPathnameAt(1);
  const isVocabulary = pathname === "vocabularies";
  const backgroundColor = useAppSelector(selectCurrentBackgroundColor);
  const chatStatus = useAppSelector(selectCurrentChatStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!window.converse) return;
    if (window.location.pathname === "/initial") return;
    if (chatStatus) {
      loginChat();
      return;
    }

    initChat();
    dispatch(setChatStatus(true));
  }, [window.converse]);

  return (
    <>
      <Layout style={{ background: backgroundColor }}>
        <PageHeader />
        {isVocabulary && <VocabularyHeader />}
        <Content className="container-lg">
          <Outlet />
        </Content>
      </Layout>
      <Dictionary />
    </>
  );
};

export default AppSignedInLayout;
