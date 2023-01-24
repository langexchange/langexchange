import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import BannerAbout from "../../components/abouts/BannerAbout";
import Missons from "../../components/abouts/Missons";
import PageFooter from "../../parts/footers/PageFooter";
import NoLoginHeader from "../../parts/header/NoLoginHeader";
import Contacts from "../../components/abouts/Contacts";
import SubcribeForm from "../../components/abouts/SubcribeForm";

const AboutPage = () => {
  return (
    <>
      <Layout>
        <NoLoginHeader />
        <Content>
          <BannerAbout />
          <Missons />
          <Contacts />
          <SubcribeForm />
        </Content>
        <PageFooter />
      </Layout>
    </>
  );
};

export default AboutPage;
