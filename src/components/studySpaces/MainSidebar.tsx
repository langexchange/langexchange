import { Button, Menu, Space } from "antd";
import type { MenuProps } from "antd";
import {
  HistoryOutlined,
  CompassOutlined,
  TeamOutlined,
  GroupOutlined,
} from "@ant-design/icons";

const items: MenuProps["items"] = [
  {
    label: "Recent",
    key: "recent",
    icon: <HistoryOutlined />,
  },
  {
    label: "Explore",
    key: "explore",
    icon: <CompassOutlined />,
  },
  {
    label: "You've joined",
    key: "joined",
    icon: <TeamOutlined />,
  },
  {
    label: "You own",
    key: "owned",
    icon: <GroupOutlined />,
  },
];

const MainSidebar = () => {
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
          mode="vertical"
          items={items}
          style={{ border: "none" }}
        />
      </Space>
    </div>
  );
};

export default MainSidebar;
