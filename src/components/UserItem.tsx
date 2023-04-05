import { Avatar, Badge, Image, Space, Typography } from "antd";
import User from "../types/User";
import { UserOutlined } from "@ant-design/icons";

interface UserItemProps extends User {
  size?: any;
  number?: any;
  color?: string;
  isStrong?: boolean;
  direction?: string;
  description?: string;
  badge?: boolean;
}

const UserItem = ({
  fullname,
  size,
  number,
  color,
  avatar,
  isStrong,
  direction,
  description,
  badge,
}: UserItemProps) => {
  return (
    <Space size={12}>
      {direction === "right" ? (
        <>
          <Typography.Text
            strong={isStrong}
            style={(!isStrong && { fontWeight: 500 }) || {}}
          >
            {fullname}
          </Typography.Text>
          {badge ? (
            <Badge count={number}>
              <Avatar
                style={{ verticalAlign: "middle", backgroundColor: color }}
                size={size}
                src={<Image src={avatar} style={{ width: 32 }} />}
              />
            </Badge>
          ) : (
            <Avatar
              style={{ verticalAlign: "middle", backgroundColor: color }}
              size={size}
              src={avatar && <Image src={avatar} style={{ width: 32 }} />}
              icon={!avatar && <UserOutlined />}
            />
          )}
        </>
      ) : (
        <>
          {badge ? (
            <Badge count={number}>
              <Avatar
                style={{ verticalAlign: "middle", backgroundColor: color }}
                size={size}
                src={<Image src={avatar} style={{ width: 32 }} />}
              />
            </Badge>
          ) : (
            <Avatar
              style={{ verticalAlign: "middle", backgroundColor: color }}
              size={size}
              src={<Image src={avatar} style={{ width: 32 }} />}
            />
          )}
          <Space.Compact direction="vertical">
            <Typography.Text
              strong={isStrong}
              style={(!isStrong && { fontWeight: 500 }) || {}}
            >
              {fullname}
            </Typography.Text>
            {description ? (
              <Typography.Text type="secondary">{description}</Typography.Text>
            ) : null}
          </Space.Compact>
        </>
      )}
    </Space>
  );
};

export default UserItem;
