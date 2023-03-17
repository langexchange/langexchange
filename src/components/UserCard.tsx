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
import { Profile } from "../services/profile/profileServices";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

type Type = "explore" | "request" | "partner";

interface UserProps extends Profile {
  type: Type;
}

const UserCard: React.FC<UserProps> = ({ type, ...profile }) => {
  const [t] = useTranslation(["commons", "countries"]);
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
      cover={profile?.avatar ? <Image src={profile.avatar} /> : undefined}
      actions={actions}
      style={{ flexDirection: "column" }}
      bodyStyle={{ flex: 1 }}
      className="d-flex"
    >
      <div
        className="d-flex justify-space-between"
        style={{ flexDirection: "column", height: "100%" }}
      >
        <Space direction="vertical">
          <Space wrap>
            <Typography.Title level={4} className="m-0">
              {[profile.firstName, profile.lastName].join(" ")}
            </Typography.Title>
            <Space
              align="center"
              className="has-background-color rounded-4 px-2"
            >
              <span className="fz-18">
                {profile?.country && getUnicodeFlagIcon(profile.country)}
              </span>
              <Typography.Text>
                {t(profile.country, { ns: "countries" })}
              </Typography.Text>
            </Space>
          </Space>
          <Space size={4} wrap>
            <span className="me-2 text-500 secondary-color">{t("Native")}</span>
            {[profile.nativeLanguage].map((item) => (
              <Tag
                color="green"
                key={item.id}
                icon={<TranslationOutlined />}
                className="m-0"
              >
                {item.name}
              </Tag>
            ))}
          </Space>
          <Space size={4} wrap>
            <span className="me-2 text-500 secondary-color">{t("Target")}</span>
            {profile.targetLanguages.map((item) => (
              <Tag
                color="blue"
                key={item.id}
                icon={<TagOutlined />}
                className="m-0"
              >
                {item.name}
              </Tag>
            ))}
          </Space>
        </Space>
      </div>
    </Card>
  );
};

export default UserCard;
