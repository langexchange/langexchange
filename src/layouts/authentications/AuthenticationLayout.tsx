import Logo from "../../assets/images/logo.png";
import AuthenBackgroundImage from "../../assets/images/authen_bg.png";
import { Button, Image, Space, Tabs, Typography } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { Outlet, Link } from "react-router-dom";
import type { TabsProps } from "antd";
import { useTranslation } from "react-i18next";
import { getElementInPathnameAt } from "../../utils/extractPathname";

const AuthenticationLayout = () => {
  const { t } = useTranslation(["commons"]);

  const activeTab = getElementInPathnameAt(1);

  const items: TabsProps["items"] = [
    {
      label: (
        <Link to="/sign-in" style={{ color: "inherit" }}>
          {t("sign-in")}
        </Link>
      ),
      key: "sign-in",
    },
    {
      label: (
        <Link to="/sign-up" style={{ color: "inherit" }}>
          {t("sign-up")}
        </Link>
      ),
      key: "sign-up",
    },
  ];

  const backToHome = (
    <Link to="/">
      <Button type="default" icon={<RollbackOutlined />}>
        {t("go-home")}
      </Button>
    </Link>
  );

  return (
    <div style={styles.container}>
      <div
        style={{
          margin: "auto",
          width: "max-content",
          height: "max-content",
          paddingTop: "120px",
        }}
      >
        <Space
          direction="vertical"
          align="center"
          size="large"
          style={{ width: "360px" }}
        >
          <Space direction="vertical" align="center">
            <Image src={Logo} alt="LangExchange logo" />
            <Typography.Text type="secondary">
              {t("logo-slogan")}
            </Typography.Text>
          </Space>
          <Space direction="vertical" align="center">
            <Tabs
              tabBarExtraContent={backToHome}
              items={items}
              style={{ width: "360px" }}
              activeKey={activeTab}
            />
            <div style={{ width: "360px" }}>
              <Outlet />
            </div>
          </Space>
        </Space>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundImage: `url(${AuthenBackgroundImage})`,
    width: "100vw",
    height: "100vh",
  },
};

export default AuthenticationLayout;
