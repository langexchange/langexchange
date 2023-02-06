import { Menu, Space } from "antd";
import type { MenuProps } from "antd";
import {
  CompassOutlined,
  TeamOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    label: <NavLink to="explores">Explore</NavLink>,
    key: "explores",
    icon: <CompassOutlined />,
  },
  {
    label: <NavLink to="requests">Partner requests</NavLink>,
    key: "requests",
    icon: <UserAddOutlined />,
  },
  {
    label: <NavLink to="all">Your partners</NavLink>,
    key: "all",
    icon: <TeamOutlined />,
  },
];

const Sidebar = () => {
  let activeKey: string = window.location.pathname.split("/")[2] || "explores";

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "12px 0",
        borderRadius: "8px",
      }}
      className="height-full"
    >
      <Space className="width-full height-full" direction="vertical">
        <Menu
          onClick={onClick}
          mode="inline"
          items={items}
          style={{ border: "none" }}
          selectedKeys={[activeKey]}
        />
      </Space>
    </div>
  );
};

export default Sidebar;
