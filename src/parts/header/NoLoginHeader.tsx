import Logo from "../../assets/images/logo.png";
import { Button, Image, Layout, Menu, Space, message, Select } from "antd";
import type { MenuProps } from "antd";
import { Link, NavLink, useMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CN, FR, VN } from "country-flag-icons/react/3x2";
import { useState } from "react";

const { Header } = Layout;

const NoLoginHeader = () => {
  const { t, i18n } = useTranslation(["commons"]);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const languages = [
    {
      label: (
        <div className="d-flex align-items-center" style={{ gap: "8px" }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/English_language.svg"
            width={24}
            alt="banner"
          />
          {t("english")}
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
          {t("vietnamese")}
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
          {t("Chinese")}
        </div>
      ),
      value: "cn",
    },
    {
      label: (
        <div className="d-flex align-items-center" style={{ gap: "8px" }}>
          <div style={{ width: "24px" }} className="d-flex align-items-center">
            <FR title="France" style={{ width: "24px" }} />
          </div>
          {t("French")}
        </div>
      ),
      value: "fr",
    },
  ];

  const items: MenuProps["items"] = [
    {
      label: <NavLink to="/abouts">{t("header-about")}</NavLink>,
      key: "about",
    },
  ];

  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
    setSelectedLanguage(value);
    message.success("Change language success");
  };

  return (
    <Header className="z-index-1 bg-white pos-sticky t-0 width-full with-header-height with-header-border-bottom">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="logo">
          <NavLink to="/">
            <Image
              src={Logo}
              alt="LangExchange Logo"
              width={161}
              preview={false}
            />
          </NavLink>
        </div>
        <div
          className="d-flex align-items-center w-50 justify-content-end"
          style={{ gap: "8px" }}
        >
          <Menu
            theme="light"
            mode="horizontal"
            items={items}
            selectedKeys={(useMatch("/abouts") && ["about"]) || []}
            style={{ flex: 1 }}
            className="justify-content-end"
          />
          <Select
            options={languages}
            bordered={false}
            onChange={handleChangeLanguage}
            defaultValue={i18n.language}
            value={selectedLanguage}
            dropdownMatchSelectWidth={false}
          />
          <Space>
            <Link to="/sign-in">
              <Button type="primary">{t("sign-in")}</Button>
            </Link>
            <Link to="/sign-up">
              <Button>{t("sign-up")}</Button>
            </Link>
          </Space>
        </div>
      </div>
    </Header>
  );
};
export default NoLoginHeader;
