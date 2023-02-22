import Logo from "../../assets/images/logo.png";
import { Button, Image, Space } from "antd";
import {
  YoutubeFilled,
  TwitterSquareFilled,
  FacebookFilled,
  InstagramFilled,
} from "@ant-design/icons";

const PageFooter = () => {
  return (
    <Space
      align="center"
      direction="vertical"
      className="width-full"
      style={{ backgroundColor: "#fafafa" }}
    >
      <Image src={Logo} alt="LangExchange Logo" width={161} />
      <Space>
        Follow us on:
        <Button size="small" type="text">
          <YoutubeFilled style={{ fontSize: "24px" }} />
        </Button>
        <Button size="small" type="text">
          <TwitterSquareFilled style={{ fontSize: "24px" }} />
        </Button>
        <Button size="small" type="text">
          <FacebookFilled style={{ fontSize: "24px" }} />
        </Button>
        <Button size="small" type="text">
          <InstagramFilled style={{ fontSize: "24px" }} />
        </Button>
      </Space>
    </Space>
  );
};

export default PageFooter;
