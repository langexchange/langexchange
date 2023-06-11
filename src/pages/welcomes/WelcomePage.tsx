import { FloatButton } from "antd";
import Banner from "../../components/welcomes/Banner";
import FeatureDetails from "../../components/welcomes/FeatureDetails";
import FeaturesOverview from "../../components/welcomes/FeaturesOverview";
import Feedbacks from "../../components/welcomes/Feedbacks";

const WelcomePage = () => {
  return (
    <>
      <Banner />
      <FeaturesOverview />
      <FeatureDetails />
      <Feedbacks />
      <FloatButton.BackTop />
    </>
  );
};

export default WelcomePage;
