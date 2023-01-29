import { Avatar, Badge, Button, Image, Menu, Space, Typography } from "antd";

interface UserItemProps {
  fullname: string;
  size: any;
  number: any;
  color: string;
  image: string;
  isStrong: boolean;
  direction: string;
}

const UserItem = ({
  fullname,
  size,
  number,
  color,
  image,
  isStrong,
  direction,
}: UserItemProps) => {
  return (
    <Space>
      {direction === "right" ? (
        <>
          <Typography.Text strong={isStrong}>{fullname}</Typography.Text>
          <Badge count={number}>
            <Avatar
              style={{ verticalAlign: "middle", backgroundColor: color }}
              size={size}
              src={<Image src={image} style={{ width: 32 }} />}
            />
          </Badge>
        </>
      ) : (
        <>
          <Badge count={number}>
            <Avatar
              style={{ verticalAlign: "middle", backgroundColor: color }}
              size={size}
              src={<Image src={image} style={{ width: 32 }} />}
            />
          </Badge>
          <Typography.Text strong={isStrong}>{fullname}</Typography.Text>
        </>
      )}
    </Space>
  );
};

export default UserItem;
