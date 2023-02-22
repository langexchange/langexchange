import { FeatureDetailItem } from "./FeatureDetailItem";
import MakeFriendPicture from "../../assets/images/people_protesting.png";
import ShareStoriesPicture from "../../assets/images/blog.png";
import ChatPicture from "../../assets/images/croods.png";
import ToolsPicture from "../../assets/images/learning_tools.png";

const featureDetailItems = [
  {
    title: "Many friends, lots of fun",
    descriptions:
      "Lorem ipsum dolor sit amet consectetur. Feugiat donec id aenean metus nunc. Feugiat donec id aenean metus nunc. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Feugiat donec id aenean metus nunc. Feugiat donec id aenean metus nunc. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Feugiat donec id aenean metus nunc. Feugiat donec id aenean metus nunc.",
    image: MakeFriendPicture,
  },
  {
    title: "Share stories, learn together",
    descriptions:
      "Lorem ipsum dolor sit amet consectetur. Feugiat donec id aenean metus nunc. Feugiat donec id aenean metus nunc. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Feugiat donec id aenean metus nunc. Feugiat donec id aenean metus nunc. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Feugiat donec id aenean metus nunc. Feugiat donec id aenean metus nunc.",
    image: ShareStoriesPicture,
  },
  {
    title: "Chat together, more practice",
    descriptions:
      "Lorem ipsum dolor sit amet consectetur. Feugiat donec id aenean metus nunc. Feugiat donec id aenean metus nunc. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Feugiat donec id aenean metus nunc. Feugiat donec id aenean metus nunc. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Feugiat donec id aenean metus nunc. Feugiat donec id aenean metus nunc.",
    image: ChatPicture,
  },
  {
    title: "A lot of tools and other features",
    descriptions:
      "Lorem ipsum dolor sit amet consectetur. Feugiat donec id aenean metus nunc. Feugiat donec id aenean metus nunc. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Feugiat donec id aenean metus nunc. Feugiat donec id aenean metus nunc. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Feugiat donec id aenean metus nunc. Feugiat donec id aenean metus nunc.",
    image: ToolsPicture,
  },
];

const FeatureDetails = () => {
  return (
    <div>
      {featureDetailItems.map((item, index) => (
        <FeatureDetailItem {...item} index={index} key={index} />
      ))}
    </div>
  );
};
export default FeatureDetails;
