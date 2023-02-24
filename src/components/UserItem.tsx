import { Avatar, Badge, Image, Space, Typography } from "antd";

interface UserItemProps {
  fullname: string;
  size?: any;
  number?: any;
  color?: string;
  image: string;
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
  image,
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
                src={<Image src={image} style={{ width: 32 }} />}
              />
            </Badge>
          ) : (
            <Avatar
              style={{ verticalAlign: "middle", backgroundColor: color }}
              size={size}
              src={<Image src={image} style={{ width: 32 }} />}
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
                src={<Image src={image} style={{ width: 32 }} />}
              />
            </Badge>
          ) : (
            <Avatar
              style={{ verticalAlign: "middle", backgroundColor: color }}
              size={size}
              src={<Image src={image} style={{ width: 32 }} />}
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
