import { faker } from "@faker-js/faker";
import { Avatar, Badge, Button, List, Space, Typography } from "antd";
import { useState } from "react";

interface Notification {
  image: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [];

for (let i = 0; i < 20; i++) {
  const notification: Notification = {
    image: faker.image.abstract(100, 100),
    title: faker.name.fullName(),
    description: faker.lorem.sentence(),
    read: Number(faker.random.numeric(2)) % 2 === 0,
    time: faker.date.past().toLocaleString(),
  };
  notifications.push(notification);
}

const Notification = ({ notification }: { notification: Notification }) => {
  return (
    <Space
      style={{
        backgroundColor: notification.read ? "white" : "#e6f4ff",
        borderRadius: "8px",
        maxWidth: "400px",
      }}
      className="p-2 width-full my-1 notification-item"
      align="start"
    >
      <Avatar src={notification.image} size={50} />
      <Space direction="vertical" size={0}>
        <Typography.Text strong>{notification.title}</Typography.Text>
        <Typography.Text type="secondary">
          {notification.description}
        </Typography.Text>
        <Typography.Text className="fz-12 color-primary text-600">
          {notification.time}
        </Typography.Text>
      </Space>
    </Space>
  );
};

interface NotificationListProps {
  allRead: boolean;
  setAllRead: (allRead: boolean) => void;
}

const NotificationList = ({ allRead }: NotificationListProps) => {
  const [data, setData] = useState<Notification[]>(notifications);

  return (
    <div
      style={{
        height: "400px",
      }}
      className="overflow-y-scroll"
    >
      <List
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        itemLayout="horizontal"
        dataSource={data}
        split={false}
        renderItem={(item) => (
          <List.Item style={{ padding: 0 }}>
            <Notification
              notification={{ ...item, read: allRead || item.read }}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default NotificationList;
