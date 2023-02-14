import { Avatar, Badge, Button, Space, Typography } from "antd";
import { MoreOutlined } from "@ant-design/icons";

interface MessageMenuItemProps {
  user: {
    fullname: string;
    image: string;
  };
  message: string;
  active?: boolean;
  no_message_unread?: number;
  time: number;
}

const MessageMenuItem = ({
  user,
  message,
  active = false,
  no_message_unread = 0,
  time,
}: MessageMenuItemProps) => {
  return (
    <div
      className="d-flex align-items-center justify-space-between"
      style={{ height: "52px" }}
    >
      <div className="d-flex align-items-center justify-space-between">
        <Badge dot={true} status={(active && "success") || "error"}>
          <Avatar src={user.image} size="large" />
        </Badge>
        <div
          className="d-flex flex-column justify-space-between"
          style={{ marginLeft: "8px" }}
        >
          <div className="d-flex align-items-center">
            <Typography.Text strong={true}>{user.fullname}</Typography.Text>
            {no_message_unread > 0 && (
              <Badge
                count={no_message_unread}
                style={{ marginLeft: "8px", backgroundColor: "#1677ff" }}
              />
            )}
          </div>
          <div className="d-flex align-items-center justify-space-between">
            <Typography.Text
              type="secondary"
              ellipsis={true}
              style={{ fontSize: "12px", width: "300px" }}
            >
              <span
                style={(no_message_unread > 0 && { color: "#1677ff" }) || {}}
              >
                {message}
              </span>
            </Typography.Text>
            <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
              {time}d
            </Typography.Text>
          </div>
        </div>
      </div>
      <Button
        shape="circle"
        icon={<MoreOutlined />}
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      />
    </div>
  );
};

export default MessageMenuItem;
