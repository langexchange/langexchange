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
import { Link, NavLink, useMatch } from "react-router-dom";
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

const PageHeader = () => {
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
            defaultSelectedKeys={["community"]}
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
