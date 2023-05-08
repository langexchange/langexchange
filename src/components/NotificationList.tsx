import { Avatar, List, Space, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Notification,
  useGetNotificationsQuery,
} from "../services/notifications/notificationsService";

interface NotificationItemProps {
  notification: Notification;
}
const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const navigate = useNavigate();
  const read: boolean = true;
  const onClick = () => {
    if (!notification.postid) return;
    navigate(`/posts/${notification.postid}`);
  };

  return (
    <Space
      style={{
        backgroundColor: read ? "white" : "#e6f4ff",
        borderRadius: "8px",
        maxWidth: "400px",
      }}
      className="p-2 width-full my-1 notification-item"
      align="start"
      onClick={onClick}
    >
      {/* <Avatar src={notification.image} size={50} /> */}
      <Space direction="vertical" size={0}>
        <Typography.Text strong>{notification.notifyMessage}</Typography.Text>
        {notification.subNotification?.map((subNotification) => (
          <Typography.Text type="secondary">{subNotification}</Typography.Text>
        ))}
        <Typography.Text className="fz-12 color-primary text-600">
          {new Date(notification.createdAt).toLocaleString()}
        </Typography.Text>
      </Space>
    </Space>
  );
};

interface NotificationListProps {
  allRead: boolean;
  setAllRead: (allRead: boolean) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ allRead }) => {
  // const [data, setData] = useState<Notification[]>(notifications);
  const { data, isLoading } = useGetNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  console.log(data);

  return (
    <div
      style={{
        height: "400px",
      }}
      className="overflow-y-scroll"
    >
      <List
        itemLayout="horizontal"
        dataSource={data}
        // split={false}
        loading={isLoading}
        renderItem={(item) => (
          <List.Item style={{ padding: 0 }}>
            <NotificationItem notification={item} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default NotificationList;
