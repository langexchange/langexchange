import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import PageFooter from "../parts/footers/PageFooter";
import PageHeader from "../parts/header/PageHeader";

const AppSignedInLayout = () => {
  return (
    <>
      <Layout>
        <PageHeader />
        <Content className="has-background-color">
          <Outlet />
        </Content>
        {/* <Footer */}
        {/*   className="pos-fixed width-full bottom-0" */}
        {/*   style={{ backgroundColor: "#fafafa", padding: "12px 50px" }} */}
        {/* > */}
        {/*   <PageFooter /> */}
        {/* </Footer> */}
      </Layout>
    </>
  );
};

export default AppSignedInLayout;
