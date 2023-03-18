import Logo from "../../assets/images/logo.png";
import { CN, FR, VN } from "country-flag-icons/react/3x2";
import AuthenBackgroundImage from "../../assets/images/authen_bg.png";
import { Button, Image, Select, Space, Tabs, Typography } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { Outlet, Link, useNavigate } from "react-router-dom";
import type { TabsProps } from "antd";
import { useTranslation } from "react-i18next";
import { getElementInPathnameAt } from "../../utils/extractPathname";
import { useState } from "react";

const AuthenticationLayout = () => {
  const { t, i18n } = useTranslation(["commons"]);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const navigate = useNavigate();

  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
    setSelectedLanguage(value);
  };

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

  const languages = [
    {
      label: (
        <div className="d-flex align-items-center" style={{ gap: "8px" }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/English_language.svg"
            width={24}
            alt="EN"
          />
          EN
        </div>
      ),
      value: "en",
    },
    {
      label: (
        <div className="d-flex align-items-center" style={{ gap: "8px" }}>
          <div style={{ width: "24px" }} className="d-flex align-items-center">
            <VN title="Vietnamese" style={{ width: "24px" }} />
          </div>
          VI
        </div>
      ),
      value: "vi",
    },
    {
      label: (
        <div className="d-flex align-items-center" style={{ gap: "8px" }}>
          <div style={{ width: "24px" }} className="d-flex align-items-center">
            <CN title="Chinese" style={{ width: "24px" }} />
          </div>
          CN
        </div>
      ),
      value: "cn",
    },
    {
      label: (
        <div className="d-flex align-items-center" style={{ gap: "8px" }}>
          <div style={{ width: "24px" }} className="d-flex align-items-center">
            <FR title="French" style={{ width: "24px" }} />
          </div>
          FR
        </div>
      ),
      value: "fr",
    },
  ];

  return (
    <div style={styles.container}>
      <Select
        className="float-right me-5 mt-5"
        options={languages}
        bordered={false}
        onChange={handleChangeLanguage}
        defaultValue={i18n.language}
        value={selectedLanguage}
        dropdownMatchSelectWidth={false}
      />
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
              onTabClick={handleTabClick}
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
