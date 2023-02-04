import { Button, Menu, Space } from "antd";
import type { MenuProps } from "antd";
import {
  HistoryOutlined,
  CompassOutlined,
  TeamOutlined,
  GroupOutlined,
  AppstoreOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    label: <NavLink to="recent">Recent</NavLink>,
    key: "recent",
    icon: <HistoryOutlined />,
  },
  {
    label: "Study spaces",
    key: "study-space",
    icon: <TeamOutlined />,
    children: [
      {
        label: <NavLink to="all">All study spaces</NavLink>,
        key: "all",
        icon: <AppstoreOutlined />,
      },
      {
        label: <NavLink to="own">You own</NavLink>,
        key: "own",
        icon: <GroupOutlined />,
      },
      {
        label: <NavLink to="joined">You've joined</NavLink>,
        key: "joined",
        icon: <CheckCircleOutlined />,
      },
    ],
  },
  {
    label: <NavLink to="explores">Explore more space</NavLink>,
    key: "explores",
    icon: <CompassOutlined />,
  },
];

const MainSidebar = () => {
  let activeKey: string = window.location.pathname.split("/")[2] || "recent";

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
    >
      <Space direction="vertical" className="width-full">
        <Button type="primary" className="d-block ma" size="large">
          Create new study space
        </Button>
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

export default MainSidebar;
