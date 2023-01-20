import Logo from "../../assets/images/logo.svg";
import { Button, Image, Space } from "antd";
import { Footer } from "antd/es/layout/layout";
import {
  YoutubeFilled,
  TwitterSquareFilled,
  FacebookFilled,
  InstagramFilled,
} from "@ant-design/icons";

const PageFooter = () => {
  return (
    <Footer>
      <Space align="center" direction="vertical" style={{ width: "100%" }}>
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
    </Footer>
  );
};

export default PageFooter;
