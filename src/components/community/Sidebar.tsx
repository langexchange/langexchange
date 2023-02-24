import { Avatar, Button, Card, List, Menu, Space, Typography } from "antd";
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

const userItems: UserItemProps[] = [];

for (let i = 0; i < 10; i++) {
  const itemProps: UserItemProps = {
    fullname: faker.name.fullName(),
    size: 36,
    number: faker.random.numeric(),
    color: faker.color.rgb({ format: "hex", casing: "lower" }),
    image: faker.image.abstract(),
    isStrong: false,
  };

  userItems.push(itemProps);
}

const items: MenuProps["items"] = [];

let i = 0;
for (let item of userItems) {
  items.push({
    label: <UserItem {...item} direction="left" badge={false} />,
    key: i.toString(),
  });
  i++;
}

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
        className="width-full"
      // align="start"
      >
        <Card
          bodyStyle={{
            padding: "8px 12px",
            width: "max-content",
          }}
          hoverable
          className="width-full"
        >
          <Space align="center" size={12}>
            <Avatar
              style={{ verticalAlign: "middle" }}
              size="large"
              src={faker.image.abstract(50, 50)}
            />
            <Typography.Title level={3} className="m-0 color-primary">
              Dinh Nhu Tan
            </Typography.Title>
          </Space>
        </Card>
        <Space direction="vertical" className="text-left width-full">
          <div className="d-flex align-items-center justify-space-between">
            <Typography.Text type="secondary" className="fz-16 text-500">
              Active partners
            </Typography.Text>
            <Button
              type="text"
              size="small"
              shape="circle"
              icon={<MoreOutlined rotate={90} />}
            />
          </div>
          <List
            // header={<div>Header</div>}
            // footer={<div>Footer</div>}
            className="text-left"
            itemLayout="horizontal"
            dataSource={userItems}
            split={false}
            renderItem={(item) => (
              <List.Item style={{ padding: 0 }}>
                <div className="as-the-button width-full">
                  <UserItem {...item} direction="left" badge={false} />
                </div>
              </List.Item>
            )}
          />
        </Space>
      </Space>
    </div>
  );
};

export default Sidebar;
