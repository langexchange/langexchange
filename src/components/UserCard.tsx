import {
  Button,
  Card,
  Image,
  message,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  TagOutlined,
  TranslationOutlined,
  UserAddOutlined,
  CheckOutlined,
  MessageOutlined,
  UserDeleteOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Profile } from "../services/profile/profileServices";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { Link } from "react-router-dom";
import {
  useAcceptFriendRequestMutation,
  useSendFriendRequestMutation,
} from "../services/friend/friendService";

type Type = "explore" | "request" | "partner";

interface UserCardProps extends Profile {
  type: Type;
  refetch?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ type, refetch, ...profile }) => {
  const [t] = useTranslation(["commons", "countries"]);
  let actions;
  const [sendFriendRequest, { isLoading: isSending }] =
    useSendFriendRequestMutation();
  const [acceptFriendRequest, { isLoading: isAccepting }] =
    useAcceptFriendRequestMutation();

  const handleSendFriendRequest = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!profile?.id) return;
    try {
      await sendFriendRequest(profile.id).unwrap();
      message.success({
        content: "Send request successful!",
      });
    } catch (error) {
      message.error({
        content: "Oops! Something went wrong.",
      });
    }
  };

  const handleAcceptRequest = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!profile?.id) return;
    try {
      await acceptFriendRequest(profile.id).unwrap();
      refetch && refetch();
      message.success({
        content: "Accept request successful!",
      });
    } catch (error) {
      message.error({
        content: "Oops! Something went wrong.",
      });
    }
  };

  switch (type) {
    case "explore":
      actions = [
        <Tooltip title={t("Add to partner")}>
          <Button
            type="text"
            icon={<UserAddOutlined />}
            className="btn-text-success"
            block
            onClick={handleSendFriendRequest}
            loading={isSending}
          />
        </Tooltip>,
        <Tooltip title={t("Remove")}>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
            block
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
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
            onClick={handleAcceptRequest}
            loading={isAccepting}
            block
          />
        </Tooltip>,
        <Tooltip title={t("Remove request")}>
          <Button type="text" icon={<CloseOutlined />} danger block />
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
            block
          />
        </Tooltip>,
        <Tooltip title={t("Remove from partner")}>
          <Button type="text" icon={<UserDeleteOutlined />} danger block />
        </Tooltip>,
      ];
      break;

    default:
      break;
  }

  return (
    <Link to={`/profile/${profile.id}`}>
      <Card
        hoverable
        cover={
          profile?.avatar ? (
            <Image
              src={profile.avatar}
              style={{ width: "calc(100% - 2px)" }}
              className="d-block ma"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            />
          ) : undefined
        }
        actions={actions}
        style={{ flexDirection: "column" }}
        bodyStyle={{ flex: 1 }}
        className="d-flex"
        size="small"
      >
        <div
          className="d-flex justify-space-between"
          style={{ flexDirection: "column", height: "100%" }}
        >
          <Space direction="vertical" className="text-center">
            <Typography.Title level={4} className="m-0">
              {[profile.firstName, profile.lastName].join(" ")}
            </Typography.Title>
            <Space
              align="center"
              className="has-background-color rounded-4 px-2"
            >
              <span>
                {profile?.country && getUnicodeFlagIcon(profile.country)}
              </span>
              <Typography.Text>
                {t(profile.country, { ns: "countries" })}
              </Typography.Text>
            </Space>
            <Space size={4} wrap className="w-100 text-left">
              <span className="me-2 text-500 secondary-color">
                {t("Native")}
              </span>
              {[profile.nativeLanguage].map((item, index) => (
                <Tag
                  color="green"
                  key={item.id || index}
                  icon={<TranslationOutlined />}
                  className="m-0"
                >
                  {item.name || "Vietnamese"}
                </Tag>
              ))}
            </Space>
            <Space size={4} wrap className="w-100 text-left">
              <span className="me-2 text-500 secondary-color">
                {t("Target")}
              </span>
              {profile.targetLanguages.map((item, index) => (
                <Tag
                  color="blue"
                  key={item.id || index}
                  icon={<TagOutlined />}
                  className="m-0"
                >
                  {item.name || "English"}
                </Tag>
              ))}
            </Space>
          </Space>
        </div>
      </Card>
    </Link>
  );
};

export default UserCard;
