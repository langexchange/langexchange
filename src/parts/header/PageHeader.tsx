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
  Popover,
  Row,
  Space,
} from "antd";
import {
  GlobalOutlined,
  TeamOutlined,
  MessageOutlined,
  FileTextOutlined,
  LogoutOutlined,
  SettingOutlined,
  BellOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import NotificationList from "../../components/NotificationList";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { logout, selectCredentials } from "../../features/auth/authSlice";
import {
  selectCredentalProfile,
  setCredentialProfile,
} from "../../features/profile/profileSlice";
import { toggleTheme } from "../../features/themes/themeSlice";
import LocaleSelect from "../../components/LocaleSelect";
const { Header } = Layout;

const PageHeader: React.FC = () => {
  const { t } = useTranslation(["commons"]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [allRead, setAllRead] = useState(false);
  const activeKey: string = window.location.pathname.split("/")[1];
  const [open, setOpen] = useState(false);
  const currentUserProfile = useAppSelector(selectCredentalProfile);
  const credentials = useAppSelector(selectCredentials);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "sign-out") {
      dispatch(logout());
      dispatch(setCredentialProfile(null));
      navigate("/");
    } else if (e.key === "toggle-theme") {
      dispatch(toggleTheme());
    }
  };

  const items: MenuProps["items"] = [
    {
      label: <NavLink to="/community">{t("header-community")}</NavLink>,
      key: "community",
      icon: <GlobalOutlined />,
    },
    {
      label: <NavLink to="/partners">{t("header-partner")}</NavLink>,
      key: "partners",
      icon: <TeamOutlined />,
    },
    {
      label: <NavLink to="chat">{t("header-chat")}</NavLink>,
      key: "chat",
      icon: <MessageOutlined />,
    },
    {
      label: <NavLink to="vocabularies">{t("header-vocabulary")}</NavLink>,
      key: "vocabularies",
      icon: <FileTextOutlined />,
    },
  ];

  const dropdownItems: MenuProps["items"] = [
    {
      label: (
        <Link to={`profile/${credentials.userId}/settings`}>
          {t("settings")}
        </Link>
      ),
      key: "setting",
      icon: <SettingOutlined />,
    },
    {
      label: t("sign-out"),
      key: "sign-out",
      icon: <LogoutOutlined />,
    },
    { label: "Toggle theme", key: "toggle-theme", icon: <SwapOutlined /> },
  ];

  const menuDropdown = {
    items: dropdownItems,
    onClick: handleMenuClick,
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
              <NavLink to="/community">
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
                      {t("notifications")}
                    </Space>
                    <Button
                      type="link"
                      onClick={() => setAllRead(true)}
                      className="text-300 fz-12"
                    >
                      {t("mark-all-as-read")}
                    </Button>
                  </div>
                }
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
                placement="bottomRight"
              >
                <Button
                  type="text"
                  className="d-flex align-items-center px-4"
                  size="large"
                >
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
                  className="d-flex align-items-center px-4"
                  size="large"
                >
                  <Avatar
                    src={currentUserProfile?.avatar || undefined}
                    icon={<UserOutlined />}
                  />
                </Button>
              </Dropdown>
              <LocaleSelect />
            </Space>
          </Col>
        </Row>
      </div>
    </Header>
  );
};

export default PageHeader;
