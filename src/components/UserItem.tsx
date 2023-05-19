import { Avatar, Badge, Image, Space, Typography } from "antd";
import User from "../types/User";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { CSSProperties } from "react";

interface UserItemProps extends User {
  size?: any;
  number?: any;
  color?: string;
  isStrong?: boolean;
  direction?: string;
  description?: string;
  badge?: boolean;
  linkToProfile?: boolean;
  className?: string;
  style?: CSSProperties;
}

const UserItem: React.FC<UserItemProps> = ({
  id,
  fullname,
  size,
  number,
  color,
  avatar,
  isStrong,
  direction,
  description,
  badge,
  className,
  style,
  linkToProfile = true,
}) => {
  const navigate = useNavigate();
  return (
    <Space size={12} className={className} style={style}>
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
              style={{
                verticalAlign: "middle",
                backgroundColor: color,
                border: "1px solid #f0f0f0",
              }}
              size={size}
              src={<Image src={avatar} />}
            />
          )}
          <Space direction="vertical">
            {linkToProfile ? (
              <Typography.Text
                strong={isStrong}
                style={(!isStrong && { fontWeight: 500 }) || {}}
                className="hover-underline"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  navigate(`/profile/${id}`);
                }}
              >
                {fullname}
              </Typography.Text>
            ) : (
              <Typography.Text
                strong={isStrong}
                style={(!isStrong && { fontWeight: 500 }) || {}}
                className="hover-underline"
              >
                {fullname}
              </Typography.Text>
            )}
            {description ? (
              <Typography.Text type="secondary">{description}</Typography.Text>
            ) : null}
          </Space>
        </>
      )}
    </Space>
  );
};

export default UserItem;
