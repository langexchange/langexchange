import { Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../../components/chats/LeftSidebar";

const ChatLayout = () => {
  return (
    <Layout style={{ height: "calc(100vh - 64px)" }}>
      <Sider width={460}>
        <LeftSidebar />
      </Sider>
      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default ChatLayout;
