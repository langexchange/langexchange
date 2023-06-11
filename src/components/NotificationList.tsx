import { Avatar, List, Space, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setReadList } from "../features/notiSlice";
import { useAppDispatch } from "../hooks/hooks";
import {
  Notification,
  useGetNotificationsQuery,
} from "../services/notifications/notificationsService";

interface NotificationItemProps {
  notification: Notification;
  read: boolean;
}
const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  read,
}) => {
  const navigate = useNavigate();
  const onClick = () => {
    if (notification.type == "friend_notify") {
      const data = JSON.parse(notification.notifyData);
      navigate(`/profile/${data.FromId}`);
      return;
    }
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
  data?: Notification[];
  readList: string[];
  isLoading: boolean;
  allRead: number;
  setAllRead: (allRead: number) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  allRead,
  data,
  isLoading,
  readList,
}) => {
  // const [data, setData] = useState<Notification[]>(notifications);
  // const { data, isLoading } = useGetNotificationsQuery(undefined, {
  //   refetchOnMountOrArgChange: true,
  // });
  //
  // console.log(data);
  const dispatch = useAppDispatch();
  const onClick = (id: string) => {
    dispatch(setReadList([...readList, id]));
  };

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
          <List.Item
            style={{ padding: 0 }}
            onClick={() => onClick(item.notiid)}
          >
            <NotificationItem
              notification={item}
              read={readList?.includes(item.notiid)}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default NotificationList;
