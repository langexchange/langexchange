import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Banner } from "../../components/welcomes/Banner";
import { FeatureDetails } from "../../components/welcomes/FeatureDetails";
import { FeaturesOverview } from "../../components/welcomes/FeaturesOverview";
import Feedbacks from "../../components/welcomes/Feedbacks";
import PageFooter from "../../parts/footers/PageFooter";
import { NoLoginHeader } from "../../parts/header/NoLoginHeader";

export const WelcomePage = () => {
  return (
    <>
      <Layout>
        <NoLoginHeader />
        <Content>
          <Banner />
          <FeaturesOverview />
          <FeatureDetails />
          <Feedbacks />
        </Content>
        <PageFooter />
      </Layout>
    </>
  );
};
