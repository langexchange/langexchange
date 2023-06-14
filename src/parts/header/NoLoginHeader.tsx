import Logo from "../../assets/images/logo.png";
import { Button, Col, Image, Layout, Menu, Row, Space } from "antd";
import { Link, NavLink } from "react-router-dom";
import LocaleSelect from "../../components/LocaleSelect";
import type { MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import { getElementInPathnameAt } from "../../utils/extractPathname";
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;

const NoLoginHeader: React.FC = () => {
  const { t } = useTranslation(["commons"]);
  const pathname = getElementInPathnameAt(1);

  const items: MenuProps["items"] = [
    {
      label: <NavLink to="/abouts">{t("header-about")}</NavLink>,
      key: "abouts",
    },
    {
      label: (
        <Space
          onClick={(e) => {
            e.preventDefault();
          }}
          className="fix-bugggggggs"
        >
          <LocaleSelect />
          <NavLink to="/sign-in">
            <Button type="primary">{t("sign-in")}</Button>
          </NavLink>
          <NavLink to="/sign-up">
            <Button>{t("sign-up")}</Button>
          </NavLink>
        </Space>
      ),
      key: "toolbar",
    },
  ];

  return (
    <Header className="z-index-1 bg-white pos-sticky t-0 width-full with-header-height with-header-border-bottom p-0">
      <div className="container-lg">
        <Row
          className="w-100"
          align="middle"
          justify="space-between"
          wrap={false}
        >
          <Col flex="none">
            <NavLink to="/">
              <Image
                src={Logo}
                alt="LangExchange Logo"
                width={161}
                preview={false}
              />
            </NavLink>
          </Col>
          <Col flex="auto">
            <Menu
              theme="light"
              mode="horizontal"
              items={items}
              selectedKeys={(pathname === "abouts" && ["abouts"]) || []}
              style={{ flex: 1 }}
              className="justify-content-end align-items-center with-header-height"
              overflowedIndicator={<MenuOutlined />}
            />
          </Col>
        </Row>
      </div>
    </Header>
  );
};
export default NoLoginHeader;
