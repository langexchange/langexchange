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

const items: MenuProps["items"] = [
  {
    label: <Link to="wall">Wall</Link>,
    key: "wall",
    icon: <ProfileOutlined />,
  },
  {
    label: <Link to="vocabularies">Vocabularies</Link>,
    key: "vocabularies",
    icon: <StarOutlined />,
  },
  {
    label: <Link to="settings">Settings</Link>,
    key: "settings",
    icon: <SettingOutlined />,
  },
];

const SidebarNavigation = () => {
  const activeKey = window.location.pathname.split("/")[2] || "wall";
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

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
