import { Button, Card, Image, Space, Tag, Typography } from "antd";
import {
  DeleteOutlined,
  TagOutlined,
  TranslationOutlined,
  UserAddOutlined,
  CheckOutlined,
  MessageOutlined,
} from "@ant-design/icons";

type Type = "explore" | "request" | "partner";

interface UserProps {
  name: string;
  natives: string[];
  targets: string[];
  country: string;
  image: string;
  type: Type;
}

const UserCard = ({
  name,
  natives,
  targets,
  country,
  image,
  type,
}: UserProps) => {
  let actions;

  switch (type) {
    case "explore":
      actions = [
        <Button
          type="text"
          icon={<UserAddOutlined />}
          className="btn-text-success"
        />,
        <Button type="text" icon={<DeleteOutlined />} danger />,
      ];
      break;
    case "request":
      actions = [
        <Button
          type="text"
          icon={<CheckOutlined />}
          className="btn-text-success"
        />,
        <Button type="text" icon={<DeleteOutlined />} danger />,
      ];
      break;
    case "partner":
      actions = [
        <Button
          type="text"
          icon={<MessageOutlined />}
          className="btn-text-success"
        />,
        <Button type="text" icon={<DeleteOutlined />} danger />,
      ];
      break;

    default:
      break;
  }

  return (
    <Card
      hoverable
      cover={<Image src={image} />}
      actions={actions}
      style={{ height: "100%", flexDirection: "column" }}
      bodyStyle={{ flex: 1 }}
      className="d-flex"
    >
      <div
        className="d-flex justify-space-between"
        style={{ flexDirection: "column", height: "100%" }}
      >
        <Space direction="vertical">
          <Typography.Title level={5} className="m-0">
            {name}
          </Typography.Title>
          <Space size={4} wrap>
            Natives:
            {natives.map((item, index) => (
              <Tag
                color="green"
                key={index}
                icon={<TranslationOutlined />}
                className="m-0"
              >
                {item}
              </Tag>
            ))}
          </Space>
          <Space size={4} wrap>
            Targets:
            {targets.map((item, index) => (
              <Tag
                color="blue"
                key={index}
                icon={<TagOutlined />}
                className="m-0"
              >
                {item}
              </Tag>
            ))}
          </Space>
          <Typography.Text type="secondary">{country}</Typography.Text>
        </Space>
      </div>
    </Card>
  );
};

export default UserCard;
