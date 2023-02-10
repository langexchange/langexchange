import { Avatar, Button, Card, Menu, Space, Typography } from "antd";
import UserItem from "../UserItem";
import { MoreOutlined } from "@ant-design/icons";
import { faker } from "@faker-js/faker";
import type { MenuProps } from "antd";

interface UserItemProps {
  fullname: string;
  size: any;
  number: any;
  color: string;
  image: string;
  isStrong: boolean;
}

const items: UserItemProps[] = [];

for (let i = 0; i < 10; i++) {
  const itemProps: UserItemProps = {
    fullname: faker.name.fullName(),
    size: 36,
    number: faker.random.numeric(),
    color: faker.color.rgb({ format: "hex", casing: "lower" }),
    image: faker.image.abstract(),
    isStrong: false,
  };

  items.push(itemProps);
}

const onClick: MenuProps["onClick"] = (e) => {
  console.log("click ", e);
};

console.log(items);

const Sidebar = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        // backgroundColor: "white",
      }}
    >
      <Space
        size="large"
        direction="vertical"
        className="width-full text-right"
        align="end"
      >
        <Card
          bodyStyle={{ padding: "8px 12px", width: "max-content" }}
          hoverable
        >
          <Space align="center">
            <Typography.Title level={3} className="m-0 color-primary">
              Dinh Nhu Tan
            </Typography.Title>
            <Avatar style={{ verticalAlign: "middle" }} size="large">
              Tan
            </Avatar>
          </Space>
        </Card>
        <Space direction="vertical">
          <Space align="center">
            <Typography.Text type="secondary" strong={true}>
              Study spaces
            </Typography.Text>
            <Button
              // type="text"
              size="small"
              shape="circle"
              icon={<MoreOutlined />}
            />
          </Space>
          <Menu
            onClick={onClick}
            mode="vertical"
            style={{ background: "none", border: "none" }}
          >
            {items.slice(0, 4).map((item, index) => (
              <Menu.Item
                key={index}
                style={{ height: "54px", lineHeight: "54px" }}
              >
                <UserItem {...item} direction="right" />
              </Menu.Item>
            ))}
          </Menu>
        </Space>
        <Space direction="vertical">
          <Space align="center">
            <Typography.Text type="secondary" strong={true}>
              Active partners
            </Typography.Text>
            <Button
              // type="text"
              size="small"
              shape="circle"
              icon={<MoreOutlined />}
            />
          </Space>
          <Menu
            onClick={onClick}
            mode="vertical"
            style={{ background: "none", border: "none" }}
          >
            {items.slice(0, 4).map((item, index) => (
              <Menu.Item
                key={index}
                style={{ height: "50px", lineHeight: "50px" }}
              >
                <UserItem {...item} direction="right" />
              </Menu.Item>
            ))}
          </Menu>
        </Space>
      </Space>
    </div>
  );
};

export default Sidebar;
