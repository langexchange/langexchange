import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import PageFooter from "../parts/footers/PageFooter";
import NoLoginHeader from "../parts/header/NoLoginHeader";

const NoSignedInLayout = () => {
  return (
    <>
      <Layout>
        <NoLoginHeader />
        <Content className="has-background-color">
          <Outlet />
        </Content>
        <Footer style={{ backgroundColor: "#fafafa" }}>
          <PageFooter />
        </Footer>
      </Layout>
    </>
  );
};

export default NoSignedInLayout;
