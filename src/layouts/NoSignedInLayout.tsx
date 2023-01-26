import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import PageFooter from "../parts/footers/PageFooter";
import NoLoginHeader from "../parts/header/NoLoginHeader";

const NoSignedInLayout = () => {
  return (
    <>
      <Layout>
        <NoLoginHeader />
        <Content>
          <Outlet />
        </Content>
        <PageFooter />
      </Layout>
    </>
  );
};

export default NoSignedInLayout;
