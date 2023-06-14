import BannerAbout from "../../components/abouts/BannerAbout";
import Missions from "../../components/abouts/Missions";
import Contacts from "../../components/abouts/Contacts";
import SubcribeForm from "../../components/abouts/SubcribeForm";
import { FloatButton } from "antd";

const AboutPage = () => {
  return (
    <>
      <BannerAbout />
      <Missions />
      <Contacts />
      <SubcribeForm />
      <FloatButton.BackTop />
    </>
  );
};

export default AboutPage;
