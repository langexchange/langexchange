import { FeatureDetailItem } from "./FeatureDetailItem";
import MakeFriendPicture from "../../assets/images/people_protesting.png";
import ShareStoriesPicture from "../../assets/images/blog.png";
import ChatPicture from "../../assets/images/croods.png";
import ToolsPicture from "../../assets/images/learning_tools.png";
import { useTranslation } from "react-i18next";

const FeatureDetails = () => {
  const { t } = useTranslation(["welcome"]);
  const featureDetailItems = [
    {
      title: t("feature-make-friends-detail-title"),
      descriptions: t("feature-make-friends-detail-descriptions"),
      image: MakeFriendPicture,
    },
    {
      title: t("feature-share-stories-detail-title"),
      descriptions: t("feature-share-stories-detail-descriptions"),
      image: ShareStoriesPicture,
    },
    {
      title: t("feature-chatting-detail-title"),
      descriptions: t("feature-chatting-detail-descriptions"),
      image: ChatPicture,
    },
    {
      title: t("feature-support-tool-detail-title"),
      descriptions: t("feature-support-tool-detail-descriptions"),
      image: ToolsPicture,
    },
  ];

  return (
    <div>
      {featureDetailItems.map((item, index) => (
        <FeatureDetailItem {...item} index={index} key={index} />
      ))}
    </div>
  );
};
export default FeatureDetails;
