import Logo from "../../assets/images/logo.svg";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Image,
  Layout,
  Menu,
  Row,
  Space,
} from "antd";
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
import { NavLink } from "react-router-dom";
import type { MenuProps } from "antd";
const { Header } = Layout;

const items: MenuProps["items"] = [
  {
    label: <NavLink to="/community">Community</NavLink>,
    key: "community",
    icon: <HomeOutlined />,
  },
  {
    label: <NavLink to="/study-spaces">Study space</NavLink>,
    key: "study-spaces",
    icon: <GroupOutlined />,
  },
  {
    label: <NavLink to="/partners">Partner</NavLink>,
    key: "partners",
    icon: <TeamOutlined />,
  },
  {
    label: <NavLink to="chat">Chat</NavLink>,
    key: "chat",
    icon: <MessageOutlined />,
  },
  {
    label: <NavLink to="vocabularies">Vocabulary</NavLink>,
    key: "vocabularies",
    icon: <FileTextOutlined />,
  },
  {
    label: <NavLink to="live-classes">Live class</NavLink>,
    key: "live-classes",
    icon: <GlobalOutlined />,
  },
];

const PageHeader = () => {
  const activeKey: string = window.location.pathname.split("/")[1];

  return (
    <Header
      className="header"
      style={{
        display: "flex",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        lineHeight: "48px",
        height: "48px",
      }}
    >
      <Row className="width-full d-flex align-items-center">
        <Col span={6}>
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
        </Col>
        <Col span={12} className="text-center">
          <Menu
            theme="light"
            mode="horizontal"
            // defaultSelectedKeys={["community"]}
            selectedKeys={[activeKey]}
            items={items}
            className="d-block"
          />
        </Col>
        <Col span={6} className="d-flex justify-end align-items-center">
          <Space className="toolbars" align="center">
            <Button type="text" className="d-flex align-items-center">
              <Badge count={99} overflowCount={10} size="small">
                <div
                  className="d-flex align-items-center"
                  style={{
                    height: "24px",
                    width: "24px",
                  }}
                >
                  <BellOutlined style={{ fontSize: "16px" }} />
                </div>
              </Badge>
            </Button>
            <Button
              type="text"
              className="d-flex align-items-center"
              size="large"
            >
              <Avatar size={36}>T</Avatar>
            </Button>
            <Button type="text" className="d-flex align-items-center">
              <TranslationOutlined style={{ fontSize: "16px" }} />
            </Button>
          </Space>
        </Col>
      </Row>
    </Header>
  );
};

export default PageHeader;
