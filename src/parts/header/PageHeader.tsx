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
  Select,
  Space,
} from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  MessageOutlined,
  FileTextOutlined,
  LogoutOutlined,
  SettingOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import NotificationList from "../../components/NotificationList";
import { useTranslation } from "react-i18next";
import { CN, FR, VN } from "country-flag-icons/react/3x2";
import { useAppDispatch } from "../../hooks/hooks";
import { logout } from "../../features/auth/authSlice";
import { setCredentialProfile } from "../../features/profile/profileSlice";
const { Header } = Layout;

const PageHeader = () => {
  const { t, i18n } = useTranslation(["commons"]);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
    setSelectedLanguage(value);
    message.success("Change language success");
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log(e.key);
    if (e.key === "sign-out") {
      dispatch(logout());
      dispatch(setCredentialProfile(null));
      navigate("/");
    }
  };
  const items: MenuProps["items"] = [
    {
      label: <NavLink to="/community">{t("header-community")}</NavLink>,
      key: "community",
      icon: <HomeOutlined />,
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
  const languages = [
    {
      label: (
        <div className="d-flex align-items-center" style={{ gap: "8px" }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/English_language.svg"
            width={24}
            alt="EN"
          />
          EN
        </div>
      ),
      value: "en",
    },
    {
      label: (
        <div className="d-flex align-items-center" style={{ gap: "8px" }}>
          <div style={{ width: "24px" }} className="d-flex align-items-center">
            <VN title="Vietnamese" style={{ width: "24px" }} />
          </div>
          VI
        </div>
      ),
      value: "vi",
    },
    {
      label: (
        <div className="d-flex align-items-center" style={{ gap: "8px" }}>
          <div style={{ width: "24px" }} className="d-flex align-items-center">
            <CN title="Chinese" style={{ width: "24px" }} />
          </div>
          CN
        </div>
      ),
      value: "cn",
    },
    {
      label: (
        <div className="d-flex align-items-center" style={{ gap: "8px" }}>
          <div style={{ width: "24px" }} className="d-flex align-items-center">
            <FR title="france" style={{ width: "24px" }} />
          </div>
          FR
        </div>
      ),
      value: "fr",
    },
  ];

  const dropdownItems: MenuProps["items"] = [
    {
      label: <Link to="/dinhnhutan/settings">{t("settings")}</Link>,
      key: "setting",
      icon: <SettingOutlined />,
    },
    {
      label: t("sign-out"),
      key: "sign-out",
      icon: <LogoutOutlined />,
    },
    { label: "Toggle theme", key: "toggle-theme" },
  ];

  const menuDropdown = {
    items: dropdownItems,
    onClick: handleMenuClick,
  };

  const [allRead, setAllRead] = useState(false);
  const activeKey: string = window.location.pathname.split("/")[1];
  const [open, setOpen] = useState(false);

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
                  <Avatar src={faker.image.abstract(40, 40)}>T</Avatar>
                </Button>
              </Dropdown>
              <Select
                className="d-block"
                options={languages}
                bordered={false}
                onChange={handleChangeLanguage}
                defaultValue={i18n.language}
                value={selectedLanguage}
                dropdownMatchSelectWidth={false}
              />
            </Space>
          </Col>
        </Row>
      </div>
    </Header>
  );
};

export default PageHeader;
