import Logo from "../../assets/images/logo.png";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Dropdown,
  Image,
  Layout,
  Menu,
  message,
  Popover,
  Row,
  Space,
} from "antd";
import {
  HomeOutlined,
  // GroupOutlined,
  TeamOutlined,
  MessageOutlined,
  FileTextOutlined,
  LogoutOutlined,
  // GlobalOutlined,
  SettingOutlined,
  BellOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import type { MenuProps } from "antd";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import NotificationList from "../../components/NotificationList";
const { Header } = Layout;

const handleMenuClick: MenuProps["onClick"] = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};

const dropdownItems: MenuProps["items"] = [
  {
    label: (
      <Space>
        <SettingOutlined />
        Setting
      </Space>
    ),
    key: "setting",
  },
  {
    label: (
      <Space>
        <LogoutOutlined />
        Logout
      </Space>
    ),
    key: "logout",
  },
  { label: "Toggle theme", key: "toggle-theme" },
];

const menuDropdown = {
  items: dropdownItems,
  onClick: handleMenuClick,
};

const items: MenuProps["items"] = [
  {
    label: <NavLink to="/community">Community</NavLink>,
    key: "community",
    icon: <HomeOutlined />,
  },
  // {
  //   label: <NavLink to="/study-spaces">Study space</NavLink>,
  //   key: "study-spaces",
  //   icon: <GroupOutlined />,
  // },
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
  // {
  //   label: <NavLink to="live-classes">Live class</NavLink>,
  //   key: "live-classes",
  //   icon: <GlobalOutlined />,
  // },
];

const PageHeader = () => {
  const [allRead, setAllRead] = useState(false);
  const activeKey: string = window.location.pathname.split("/")[1];
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Header className="z-index-1 bg-white d-flex justify-space-between align-items-center pos-sticky t-0 width-full with-header-height with-header-border-bottom">
      <div className="container">
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
              <Popover
                content={
                  <NotificationList allRead={allRead} setAllRead={setAllRead} />
                }
                title={
                  <div className="d-flex align-items-center justify-space-between">
                    <Space size={4} align="center">
                      <BellOutlined />
                      Notifications
                    </Space>
                    <Button
                      type="link"
                      onClick={() => setAllRead(true)}
                      className="text-300 fz-12"
                    >
                      Mark all read
                    </Button>
                  </div>
                }
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
                placement="bottomRight"
              >
                <Button type="text" className="d-flex align-items-center">
                  {allRead ? (
                    <div className="d-flex align-items-center">
                      <BellOutlined style={{ fontSize: "16px" }} />
                    </div>
                  ) : (
                    <Badge
                      count={99}
                      overflowCount={10}
                      size="small"
                      offset={[10, 0]}
                    >
                      <div className="d-flex align-items-center">
                        <BellOutlined style={{ fontSize: "16px" }} />
                      </div>
                    </Badge>
                  )}
                </Button>
              </Popover>
              <Dropdown
                menu={menuDropdown}
                trigger={["click"]}
                arrow
                placement="bottom"
              >
                <Button
                  type="text"
                  className="d-flex align-items-center"
                  size="large"
                >
                  <Avatar src={faker.image.abstract(40, 40)}>T</Avatar>
                </Button>
              </Dropdown>
              <Button type="text" className="d-flex align-items-center">
                <TranslationOutlined style={{ fontSize: "16px" }} />
              </Button>
            </Space>
          </Col>
        </Row>
      </div>
    </Header>
  );
};

export default PageHeader;
