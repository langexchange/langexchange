import { Button, Card, Image, Space, Tag, Tooltip, Typography } from "antd";
import {
  DeleteOutlined,
  TagOutlined,
  TranslationOutlined,
  UserAddOutlined,
  CheckOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

type Type = "explore" | "request" | "partner";

interface UserProps {
  name: string;
  natives: string[];
  targets: string[];
  country: string;
  image: string;
  type: Type;
}

const UserCard: React.FC<UserProps> = ({
  name,
  natives,
  targets,
  country,
  image,
  type,
}) => {
  const [t] = useTranslation(["commons"]);
  let actions;

  switch (type) {
    case "explore":
      actions = [
        <Tooltip title={t("Add to partner")}>
          <Button
            type="text"
            icon={<UserAddOutlined />}
            className="btn-text-success"
          />
        </Tooltip>,
        <Tooltip title={t("Remove")}>
          <Button type="text" icon={<DeleteOutlined />} danger />
        </Tooltip>,
      ];
      break;
    case "request":
      actions = [
        <Tooltip title={t("Approve")}>
          <Button
            type="text"
            icon={<CheckOutlined />}
            className="btn-text-success"
          />
        </Tooltip>,
        <Tooltip title={t("Remove request")}>
          <Button type="text" icon={<DeleteOutlined />} danger />
        </Tooltip>,
      ];
      break;
    case "partner":
      actions = [
        <Tooltip title={t("Chat")}>
          <Button
            type="text"
            icon={<MessageOutlined />}
            className="btn-text-success"
          />
        </Tooltip>,
        <Tooltip title={t("Remove from partner")}>
          <Button type="text" icon={<DeleteOutlined />} danger />
        </Tooltip>,
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
            {t("Native")}:
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
            {t("Target")}:
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
