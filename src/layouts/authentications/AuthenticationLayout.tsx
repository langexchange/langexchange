import Logo from "../../assets/images/logo.png";
import AuthenBackgroundImage from "../../assets/images/authen_bg.png";
import { Button, Image, Space, Tabs, Typography } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { Outlet, Link, useNavigate } from "react-router-dom";
import type { TabsProps } from "antd";
import { useTranslation } from "react-i18next";
import { getElementInPathnameAt } from "../../utils/extractPathname";
import LocaleSelect from "../../components/LocaleSelect";

const AuthenticationLayout: React.FC = () => {
  const { t } = useTranslation(["commons"]);
  const navigate = useNavigate();

  const activeTab = getElementInPathnameAt(1);
  const handleTabClick = (key: string) => {
    if (key === "sign-in") {
      navigate("/sign-in");
    } else if (key === "sign-up") {
      navigate("/sign-up");
    }
  };

  const items: TabsProps["items"] = [
    {
      label: t("sign-in"),
      key: "sign-in",
    },
    {
      label: t("sign-up"),
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
      <LocaleSelect className="float-right me-5 mt-5" />
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
          style={{ minWidth: "min(100vw, 500px)" }}
        >
          <Space direction="vertical" align="center">
            <Image src={Logo} alt="LangExchange logo" height={48} width={274} />
            <Typography.Text type="secondary">
              {t("logo-slogan")}
            </Typography.Text>
          </Space>
          <Space direction="vertical" className="text-center">
            <Tabs
              tabBarExtraContent={backToHome}
              items={items}
              style={{ minWidth: "360px" }}
              activeKey={activeTab}
              onTabClick={handleTabClick}
            />
            <div style={{ minWidth: "360px" }}>
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
