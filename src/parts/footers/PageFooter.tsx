import Logo from "../../assets/images/logo.png";
import { Button, Image, Space } from "antd";
import {
  GithubOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const PageFooter: React.FC = () => {
  const [t] = useTranslation(["commons"]);
  return (
    <Space
      align="center"
      direction="vertical"
      className="width-full"
      style={{ backgroundColor: "#fafafa" }}
    >
      <Image src={Logo} alt="LangExchange Logo" width={161} />
      <Space size={0}>
        {t("footer-follow")}
        <Button
          size="small"
          type="link"
          className="secondary-color"
          href="https://github.com/langexchange"
          target="blank"
        >
          <GithubOutlined style={{ fontSize: "24px" }} />
        </Button>
        <Button size="small" type="link" className="secondary-color">
          <TwitterOutlined style={{ fontSize: "24px" }} />
        </Button>
        <Button size="small" type="link" className="secondary-color">
          <InstagramOutlined style={{ fontSize: "24px" }} />
        </Button>
      </Space>
    </Space>
  );
};

export default PageFooter;
