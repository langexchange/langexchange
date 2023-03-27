import Logo from "../../assets/images/logo.png";
import { Button, Image, Layout, Menu, Space } from "antd";
import { Link, NavLink } from "react-router-dom";
import LocaleSelect from "../../components/LocaleSelect";
import type { MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import { getElementInPathnameAt } from "../../utils/extractPathname";

const { Header } = Layout;

const NoLoginHeader: React.FC = () => {
  const { t } = useTranslation(["commons"]);
  const pathname = getElementInPathnameAt(1);

  const items: MenuProps["items"] = [
    {
      label: <NavLink to="/abouts">{t("header-about")}</NavLink>,
      key: "abouts",
    },
  ];

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
            selectedKeys={(pathname === "abouts" && ["abouts"]) || []}
            style={{ flex: 1 }}
            className="justify-content-end"
          />
          <LocaleSelect />
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
