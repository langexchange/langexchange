import Logo from "../../assets/images/logo.svg";
import { Avatar, Badge, Button, Image, Layout, Menu, Space } from "antd";
import {
  HomeOutlined,
  GroupOutlined,
  TeamOutlined,
  MessageOutlined,
  FileTextOutlined,
  GlobalOutlined,
  BellOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
const { Header } = Layout;

const items: MenuProps["items"] = [
  {
    label: "Community",
    key: "community",
    icon: <HomeOutlined />,
  },
  {
    label: "Study space",
    key: "study_space",
    icon: <GroupOutlined />,
  },
  {
    label: "Partner",
    key: "partner",
    icon: <TeamOutlined />,
  },
  {
    label: "Chat",
    key: "chat",
    icon: <MessageOutlined />,
  },
  {
    label: "Vocabulary",
    key: "vocabulary",
    icon: <FileTextOutlined />,
  },
  {
    label: "Live class",
    key: "live_class",
    icon: <GlobalOutlined />,
  },
];

export const PageHeader = () => {
  return (
    <Header
      className="header"
      style={{
        display: "flex",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
      }}
    >
      <div className="logo">
        <Image src={Logo} alt="LangExchange Logo" width={161} />
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["community"]}
        items={items}
      />
      <Space className="toolbars" align="center">
        <Button type="text" style={{ display: "flex", alignItems: "center" }}>
          <Badge count={99} overflowCount={10} size="small">
            <div
              style={{
                height: "24px",
                width: "24px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <BellOutlined style={{ fontSize: "16px" }} />
            </div>
          </Badge>
        </Button>
        <Button type="text" style={{ display: "flex", alignItems: "center" }}>
          <Space className="avatar" align="center">
            <Avatar size="small">T</Avatar>
            <span className="fullname">Dinh Nhu Tan</span>
          </Space>
        </Button>
        <Button type="text" style={{ display: "flex", alignItems: "center" }}>
          <TranslationOutlined style={{ fontSize: "16px" }} />
        </Button>
      </Space>
    </Header>
  );
};
