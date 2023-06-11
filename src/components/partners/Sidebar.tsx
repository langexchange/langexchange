import { Card, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  CompassOutlined,
  TeamOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar: React.FC<MenuProps> = (props) => {
  const [t] = useTranslation(["commons"]);

  const items: MenuProps["items"] = [
    {
      label: <NavLink to="explores">{t("Explore")}</NavLink>,
      key: "explores",
      icon: <CompassOutlined />,
    },
    {
      label: <NavLink to="requests">{t("Partner request")}</NavLink>,
      key: "requests",
      icon: <UserAddOutlined />,
    },
    {
      label: <NavLink to="all">{t("Your partner")}</NavLink>,
      key: "all",
      icon: <TeamOutlined />,
    },
  ];

  let activeKey: string = window.location.pathname.split("/")[2] || "explores";

  return (
    <Card size="small" bodyStyle={{ padding: "4px" }}>
      <Menu
        mode="inline"
        items={items}
        style={{ border: "none" }}
        selectedKeys={[activeKey]}
        {...props}
      />
    </Card>
  );
};

export default Sidebar;
