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

interface SidebarNavigationProps extends MenuProps {
  canSeeSettings?: boolean;
  toggleable?: boolean;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  canSeeSettings = false,
  toggleable = true,
  ...props
}) => {
  const [t] = useTranslation(["commons"]);
  const activeKey = window.location.pathname.split("/")[3] || "wall";
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <Link to="wall" replace>
          {t("Wall")}
        </Link>
      ),
      key: "wall",
      icon: <ProfileOutlined />,
    },
    {
      label: (
        <Link to="vocabularies" replace>
          {t("Vocabulary")}
        </Link>
      ),
      key: "vocabularies",
      icon: <StarOutlined />,
    },
    {
      label: (
        <Link to="settings" replace>
          {t("settings")}
        </Link>
      ),
      key: "settings",
      icon: <SettingOutlined />,
    },
  ];

  return (
    <Card
      size="small"
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
        items={canSeeSettings ? items : items.slice(0, 2)}
        inlineCollapsed={collapsed}
        style={{ flex: 1 }}
        {...props}
      />
      {toggleable ? (
        <Button type="text" onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      ) : null}
    </Card>
  );
};

export default SidebarNavigation;
