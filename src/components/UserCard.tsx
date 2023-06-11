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
  useRejectFriendRequestMutation,
  useSendFriendRequestMutation,
  useUnfriendMutation,
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
  const [rejectFriendRequest, { isLoading: isRejecting }] =
    useRejectFriendRequestMutation();
  const [unfriend, { isLoading: isUnfriending }] = useUnfriendMutation();

  const handleSendFriendRequest = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!profile?.id) return;
    try {
      await sendFriendRequest(profile.id).unwrap();
      message.success("Send request successful!", 1);
    } catch (error) {
      message.error("Oops! Something went wrong.", 1);
    }
  };

  const handleAcceptRequest = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!profile?.id) return;
    try {
      await acceptFriendRequest(profile.id).unwrap();
      refetch && refetch();
      message.success("Accept request successful!", 1);
    } catch (error) {
      message.error("Oops! Something went wrong.", 1);
    }
  };

  const handleRejectRequest = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!profile?.id) return;
    try {
      await rejectFriendRequest(profile.id).unwrap();
      refetch && refetch();
      message.success("Reject request successful!", 1);
    } catch (error) {
      message.error("Oops! Something went wrong.", 1);
    }
  };

  const handleUnfriend = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!profile?.id) return;

    try {
      await unfriend(profile.id).unwrap();
      refetch && refetch();
      message.success("Huỷ kết bạn thành công", 1);
    } catch (error) {
      message.error("Opps! Đã có lỗi xảy ra, vui lòng thử lại sau", 1);
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
          <Button
            type="text"
            icon={<CloseOutlined />}
            danger
            block
            onClick={handleRejectRequest}
            loading={isRejecting}
          />
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
          <Button
            type="text"
            icon={<UserDeleteOutlined />}
            danger
            block
            onClick={handleUnfriend}
            loading={isUnfriending}
          />
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
          <Image
            src={
              profile?.avatar ||
              "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
            }
            style={{ width: "calc(100% - 2px)" }}
            className="d-block ma"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        }
        actions={actions}
        style={{ flexDirection: "column" }}
        bodyStyle={{ flex: 1 }}
        className="d-flex h-100"
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
                  {item.name}
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
                  {item.name}
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
