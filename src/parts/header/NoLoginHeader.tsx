import Logo from "../../assets/images/logo.svg";
import { Button, Dropdown, Image, Layout, Menu, Space, message } from "antd";
import { DownOutlined, GlobalOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Header } = Layout;

// const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//   message.info("Click on left button.");
//   console.log("click left button", e);
// };

const handleMenuClick: MenuProps["onClick"] = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};

const languages: MenuProps["items"] = [
  {
    label: "English",
    key: "1",
  },
  {
    label: "Vietnamese",
    key: "2",
  },
  {
    label: "Chinese",
    key: "3",
    danger: true,
  },
  {
    label: "Japanese",
    key: "4",
    danger: true,
    disabled: true,
  },
];

const menuProps = {
  items: languages,
  onClick: handleMenuClick,
};

const items: MenuProps["items"] = [
  {
    label: "About",
    key: "about",
  },
];

const NoLoginHeader = () => {
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
      <div className="logo">
        <Image src={Logo} alt="LangExchange Logo" width={161} />
      </div>
      <Space className="toolbars" align="center">
        <Menu theme="light" mode="horizontal" items={items} />
        <Dropdown menu={menuProps}>
          <Button type="text">
            <Space>
              <GlobalOutlined />
              English (UK)
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <Space>
          <Button type="primary">Sign in</Button>
          <Button>Sign up</Button>
        </Space>
      </Space>
    </Header>
  );
};
export default NoLoginHeader;
