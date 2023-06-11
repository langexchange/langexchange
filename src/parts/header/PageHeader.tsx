import Logo from "../../assets/images/logo.png";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Image,
  Layout,
  Menu,
  Popover,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import Icon, {
  GlobalOutlined,
  TeamOutlined,
  MessageOutlined,
  LogoutOutlined,
  SettingOutlined,
  BellOutlined,
  SwapOutlined,
  FileTextOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { Link, NavLink, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
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
import { destroyChat } from "../../chat";
import { useGetNotificationsQuery } from "../../services/notifications/notificationsService";
import { selectReadNotification, setReadList } from "../../features/notiSlice";
import { useClearCookieMutation } from "../../services/auth/authServices";
const { Header } = Layout;

const VocabularySvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="14"
    height="14"
    viewBox="0,0,256,256"
    fill="currentColor"
  >
    <g transform="translate(-48,-48) scale(1.375,1.375)">
      <g
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
      >
        <g transform="scale(8,8)">
          <path d="M9,4c-1.64453,0 -3,1.35547 -3,3v18c0,1.64453 1.35547,3 3,3h17v-24zM9,6h15v16h-15c-0.35156,0 -0.68359,0.07422 -1,0.1875v-15.1875c0,-0.56641 0.43359,-1 1,-1zM12.21094,10l-2.21094,5.81641v2.18359h2v-1h2v1h2v-2.19141l-2.32422,-5.80859zM19.5,12c-1.37109,0 -2.5,1.12891 -2.5,2.5v1c0,1.37109 1.12891,2.5 2.5,2.5c0.5625,0 1.07813,-0.19531 1.49609,-0.51562c0.5,0.33594 1.18359,0.51563 2.00391,0.51563v-2c-0.73047,0 -0.89062,-0.16406 -0.93359,-0.20703c-0.04297,-0.04687 -0.06641,-0.13281 -0.06641,-0.29297v-1c0,-1.37109 -1.12891,-2.5 -2.5,-2.5zM12.97266,13.625l0.55078,1.375h-1.07422zM19.5,14c0.28125,0 0.5,0.21875 0.5,0.5v1c0,0.28125 -0.21875,0.5 -0.5,0.5c-0.28125,0 -0.5,-0.21875 -0.5,-0.5v-1c0,-0.28125 0.21875,-0.5 0.5,-0.5zM9,24h15v2h-15c-0.56641,0 -1,-0.43359 -1,-1c0,-0.56641 0.43359,-1 1,-1z"></path>
        </g>
      </g>
    </g>
  </svg>
);
const VocabularyIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={VocabularySvg} {...props} />
);

const PageHeader: React.FC = () => {
  const { t } = useTranslation(["commons"]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [allRead, setAllRead] = useState(0);
  const activeKey: string = window.location.pathname.split("/")[1];
  const [open, setOpen] = useState(false);
  const currentUserProfile = useAppSelector(selectCredentalProfile);
  const credentials = useAppSelector(selectCredentials);
  const readList = useAppSelector(selectReadNotification);
  const [clearCookie] = useClearCookieMutation();

  const {
    data: notifications,
    isLoading: isLoadingNofitications,
    refetch: refetchNotifications,
    isFetching,
  } = useGetNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const handleMarkAllAsRead = () => {
    setAllRead(notifications?.length || 0);
    dispatch(setReadList(notifications?.map((item) => item.notiid) || []));
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "sign-out") {
      dispatch(logout());
      destroyChat();
      localStorage.clear();
      dispatch(setCredentialProfile(null));
      clearCookie(undefined);
      navigate("/");
    } else if (e.key === "toggle-theme") {
      dispatch(toggleTheme());
    }
  };

  useEffect(() => {
    if (notifications && notifications?.length > 0) {
      const unreadList = notifications?.filter(
        (item) => !readList.includes(item.notiid)
      );
      setAllRead(unreadList?.length || 0);
    }
  }, [readList, notifications, isFetching, isLoadingNofitications]);

  const items: MenuProps["items"] = [
    {
      label: (
        <NavLink className="text-500" to="/community">
          {t("header-community")}
        </NavLink>
      ),
      key: "community",
      icon: <GlobalOutlined />,
    },
    {
      label: (
        <NavLink className="text-500" to="/partners">
          {t("header-partner")}
        </NavLink>
      ),
      key: "partners",
      icon: <TeamOutlined />,
    },
    {
      label: (
        <NavLink
          className="text-500"
          to={process.env.REACT_APP_CHAT_URL || "/"}
          target="_top"
        >
          {t("header-chat")}
        </NavLink>
      ),
      key: "chat",
      icon: <MessageOutlined />,
    },
    {
      label: (
        <NavLink className="text-500" to="vocabularies">
          {t("header-vocabulary")}
        </NavLink>
      ),
      key: "vocabularies",
      // icon: <VocabularyIcon />,
      icon: <FileTextOutlined />,
    },
  ];

  const dropdownItems: MenuProps["items"] = [
    {
      label: (
        <Tooltip title="See your profile">
          <Link to={`/profile/${credentials.userId}`}>
            <Card
              bodyStyle={{
                padding: "8px 12px",
              }}
              hoverable
              className="width-full"
              size="small"
            >
              <Space align="center" size={12}>
                <Avatar
                  style={{ verticalAlign: "middle" }}
                  size="small"
                  src={currentUserProfile?.avatar}
                  icon={!currentUserProfile?.avatar && <UserOutlined />}
                />
                <Typography.Title level={5} className="m-0 color-primary">
                  <span className="text-400">Hi</span>{" "}
                  {currentUserProfile?.firstName}
                  <span className="text-400">!</span>
                </Typography.Title>
              </Space>
            </Card>
          </Link>
        </Tooltip>
      ),
      key: "profile",
    },
    {
      label: (
        <Link to={`profile/${credentials.userId}/settings`}>
          {t("settings")}
        </Link>
      ),
      key: "setting",
      icon: <SettingOutlined />,
    },
    { label: "Toggle theme", key: "toggle-theme", icon: <SwapOutlined /> },
    {
      label: t("sign-out"),
      key: "sign-out",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const menuDropdown = {
    items: dropdownItems,
    onClick: handleMenuClick,
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) refetchNotifications();
  };

  return (
    <Header className="z-index-1 bg-white d-flex justify-space-between align-items-center pos-sticky t-0 width-full with-header-height with-header-border-bottom p-0">
      <div className="container-lg">
        <Row className="width-full d-flex align-items-center">
          <Col span={6} xs={11} md={6}>
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
          <Col span={12} className="text-center" xs={2} md={12}>
            <Menu
              theme="light"
              mode="horizontal"
              selectedKeys={[activeKey]}
              items={items}
              className="d-block"
              overflowedIndicator={<MenuOutlined />}
            />
          </Col>
          <Col span={6} xs={11} md={6}>
            <Row className="toolbars" align="middle" justify="end">
              <Col>
                <Popover
                  content={
                    <NotificationList
                      readList={readList}
                      allRead={allRead}
                      setAllRead={setAllRead}
                      data={notifications}
                      isLoading={isLoadingNofitications}
                    />
                  }
                  title={
                    <div className="d-flex align-items-center justify-space-between">
                      <Space size={4} align="center">
                        <BellOutlined />
                        {t("notifications")}
                      </Space>
                      <Button
                        type="link"
                        onClick={() => {
                          handleMarkAllAsRead();
                        }}
                        className="text-300 fz-12"
                      >
                        {t("mark-all-as-read")}
                      </Button>
                    </div>
                  }
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                  placement="bottom"
                >
                  <Button
                    type="text"
                    className="d-flex align-items-center"
                  // size=""
                  >
                    {!allRead ? (
                      <div className="d-flex align-items-center">
                        <BellOutlined style={{ fontSize: "16px" }} />
                      </div>
                    ) : (
                      <Badge
                        count={allRead}
                        overflowCount={10}
                        size="small"
                        offset={[2, 0]}
                      >
                        <div className="d-flex align-items-center">
                          <BellOutlined style={{ fontSize: "16px" }} />
                        </div>
                      </Badge>
                    )}
                  </Button>
                </Popover>
              </Col>
              <Col>
                <Dropdown
                  menu={menuDropdown}
                  trigger={["click"]}
                  arrow
                  placement="bottomLeft"
                >
                  <Button
                    type="text"
                    className="d-flex align-items-center"
                    size="large"
                  >
                    <Avatar
                      src={currentUserProfile?.avatar || undefined}
                      icon={<UserOutlined />}
                    />
                  </Button>
                </Dropdown>
              </Col>
              <Col xs={1} style={{ minWidth: "36px" }}>
                <LocaleSelect
                  className="d-flex px-0"
                  style={{ marginLeft: "-12px" }}
                  showArrow={false}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Header>
  );
};

export default PageHeader;
