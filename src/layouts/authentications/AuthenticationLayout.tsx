import { Button, Image, Space, Tabs, Typography } from "antd";
import AuthenBackgroundImage from "../../assets/images/authen_bg.png";
import Logo from "../../assets/images/logo.svg";
import { RollbackOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";
import { Outlet, Link, useMatch } from "react-router-dom";

const items: TabsProps["items"] = [
  {
    label: (
      <Link to="/sign-in" style={{ color: "inherit" }}>
        Sign in
      </Link>
    ),
    key: "signin",
  },
  {
    label: (
      <Link to="/sign-up" style={{ color: "inherit" }}>
        Sign up
      </Link>
    ),
    key: "signup",
  },
];

const backToHome = (
  <Link to="/">
    <Button type="default" icon={<RollbackOutlined />}>
      Go home
    </Button>
  </Link>
);
const AuthenticationLayout = () => {
  const matchSignin = useMatch("/sign-in");
  const matchSignup = useMatch("/sign-up");

  let activeTab = "";

  if (matchSignin) {
    activeTab = "signin";
  } else if (matchSignup) {
    activeTab = "signup";
  }

  return (
    <div style={styles.container}>
      <div
        style={{
          margin: "auto",
          width: "max-content",
          height: "max-content",
          paddingTop: "120px",
        }}
      >
        <Space
          direction="vertical"
          align="center"
          size="large"
          style={{ width: "360px" }}
        >
          <Space direction="vertical" align="center">
            <Image src={Logo} alt="LangExchange logo" />
            <Typography.Text type="secondary">
              LangExchange - Language learning community
            </Typography.Text>
          </Space>
          <Space direction="vertical" align="center">
            <Tabs
              tabBarExtraContent={backToHome}
              items={items}
              style={{ width: "360px" }}
              activeKey={activeTab}
            />
            <div style={{ width: "360px" }}>
              <Outlet />
            </div>
          </Space>
        </Space>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundImage: `url(${AuthenBackgroundImage})`,
    width: "100vw",
    height: "100vh",
  },
};

export default AuthenticationLayout;
