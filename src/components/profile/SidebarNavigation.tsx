import { Button, Card, Menu, MenuProps } from "antd";
import {
  ProfileOutlined,
  StarOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SidebarNavigation = () => {
  const [t] = useTranslation(["commons"]);
  const activeKey = window.location.pathname.split("/")[2] || "wall";
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuProps["items"] = [
    {
      label: <Link to="wall">{t("Wall")}</Link>,
      key: "wall",
      icon: <ProfileOutlined />,
    },
    {
      label: <Link to="vocabularies">{t("Vocabulary")}</Link>,
      key: "vocabularies",
      icon: <StarOutlined />,
    },
    {
      label: <Link to="settings">{t("settings")}</Link>,
      key: "settings",
      icon: <SettingOutlined />,
    },
  ];

  return (
    <Card
      size="small"
      style={{ width: "fit-content" }}
      className="h-100 d-flex flex-column"
      bodyStyle={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[activeKey]}
        className="border-0"
        items={items}
        inlineCollapsed={collapsed}
        style={{ flex: 1 }}
      />
      <Button type="text" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </Card>
  );
};

export default SidebarNavigation;
