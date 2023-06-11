import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Image,
  Rate,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
  message,
} from "antd";
import {
  UserDeleteOutlined,
  MessageOutlined,
  FormOutlined,
  TeamOutlined,
  SketchOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { useTranslation } from "react-i18next";
import { useGetProfileQuery } from "../../services/profile/profileServices";
import { useAppSelector } from "../../hooks/hooks";
import { selectCredentalProfile } from "../../features/profile/profileSlice";
import {
  useAcceptFriendRequestMutation,
  useGetFriendRequestsQuery,
  useRejectFriendRequestMutation,
  useSendFriendRequestMutation,
  useUnfriendMutation,
} from "../../services/friend/friendService";
import { Link } from "react-router-dom";

const colors = [
  "magenta",
  "red",
  "cyan",
  "volcano",
  "blue",
  "geekblue",
  "orange",
  "gold",
  "lime",
  "green",
  "purple",
];

interface ProfileCardProps {
  userId?: string;
  isCurrentUser?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  const { userId, isCurrentUser = false } = props;
  const currentUserProfile = useAppSelector(selectCredentalProfile);
  const [unfriend, { isLoading: isUnfriending }] = useUnfriendMutation();
  const [sendFriendRequest, { isLoading: isSending }] =
    useSendFriendRequestMutation();
  const [acceptFriendRequest, { isLoading: isAccepting }] =
    useAcceptFriendRequestMutation();
  const [rejectFriendRequest, { isLoading: isRejecting }] =
    useRejectFriendRequestMutation();

  const {
    data: fetchProfile,
    isFetching,
    isLoading,
    isError,
    refetch,
  } = useGetProfileQuery(userId, {
    skip: isCurrentUser,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: requestList,
    isLoading: isLoadingRequest,
    refetch: refetchRequest,
  } = useGetFriendRequestsQuery(undefined, {});

  const [t] = useTranslation(["commons", "countries"]);

  if (isError) return <div>Something went wrong</div>;
  const profile = isCurrentUser ? currentUserProfile : fetchProfile;

  const handleUnfriend = async () => {
    if (!userId) return;

    try {
      await unfriend(userId).unwrap();
      refetch();
      message.success("Huỷ kết bạn thành công", 1);
    } catch (error) {
      message.error("Opps! Đã có lỗi xảy ra, vui lòng thử lại sau", 1);
    }
  };

  const handleSendFriendRequest = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) return;
    try {
      await sendFriendRequest(userId).unwrap();
      message.success("Send request successful!", 1);
    } catch (error) {
      message.error("Oops! Something went wrong.", 1);
    }
  };

  const handleRejectRequest = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) return;
    try {
      await rejectFriendRequest(userId).unwrap();
      refetch();
      refetchRequest();
      message.success("Reject request successful!", 1);
    } catch (error) {
      message.error("Oops! Something went wrong.", 1);
    }
  };

  const handleAcceptRequest = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) return;
    try {
      await acceptFriendRequest(userId).unwrap();
      message.success("Accept request successful!", 1);
      refetch();
    } catch (error) {
      message.error("Oops! Something went wrong.", 1);
    }
  };

  return (
    <Skeleton loading={isLoading || isFetching} active avatar>
      <Card className="height-full pos-relative card-custome-scroll bg-white h-100 w-100">
        <div className="avatar and basic info">
          <Space direction="vertical" className="w-100 text-center">
            <Avatar
              size={140}
              src={profile?.avatar ? <Image src={profile.avatar} /> : undefined}
              icon={<UserOutlined />}
              style={{
                border: "solid 1px #f8f8f8",
                boxShadow: "0 0 0 4px #f1f1f1, 0 0 0 6px #f1f1ff",
              }}
            />
            <Link to={`/profile/${userId}`}>
              <Typography.Title level={2} className="m-0 hover-underline">
                {[profile?.firstName, profile?.lastName].join(" ")}
              </Typography.Title>
            </Link>
            {!isCurrentUser && (
              <Space wrap={true} className="justify-content-center">
                {profile?.isFriend ? (
                  <>
                    <Button
                      type="primary"
                      shape="round"
                      icon={<UserDeleteOutlined />}
                      danger
                      size="small"
                      loading={isUnfriending}
                      onClick={handleUnfriend}
                    >
                      Huỷ kết bạn
                    </Button>
                    <Button
                      type="default"
                      shape="round"
                      icon={<MessageOutlined />}
                      className="btn-outlined-secondary"
                      size="small"
                    >
                      Gửi tin nhắn
                    </Button>
                  </>
                ) : requestList?.some(
                  (request: any) => request.id === userId
                ) ? (
                  <>
                    <Button
                      type="primary"
                      shape="round"
                      icon={<UserDeleteOutlined />}
                      className="btn-success"
                      size="small"
                      loading={isAccepting}
                      onClick={handleAcceptRequest}
                    >
                      Đồng ý
                    </Button>
                    <Button
                      type="default"
                      shape="round"
                      icon={<UserDeleteOutlined />}
                      className="btn-outlined-secondary"
                      size="small"
                      onClick={handleRejectRequest}
                      loading={isRejecting}
                    >
                      Từ chối
                    </Button>
                  </>
                ) : (
                  <Button
                    type="primary"
                    shape="round"
                    icon={<UserDeleteOutlined />}
                    size="small"
                    loading={isSending}
                    onClick={handleSendFriendRequest}
                  >
                    Kết bạn
                  </Button>
                )}
              </Space>
            )}
            <Space size={8} wrap={true} className="justify-content-center">
              <Space align="center">
                <span style={{ color: "black", fontSize: "20px" }}>
                  {profile?.country && getUnicodeFlagIcon(profile.country)}
                </span>
                <Typography.Text strong>
                  {t(`${profile?.country}`, { ns: "countries" })}
                </Typography.Text>
              </Space>
              <Space align="center">
                <Typography.Text type="secondary">
                  <FormOutlined size={20} />
                </Typography.Text>
                <span>
                  <Typography.Text strong>
                    {profile?.numOfPosts}
                  </Typography.Text>{" "}
                  <Typography.Text>{t("posts")}</Typography.Text>
                </span>
              </Space>
              <Space align="center">
                <Typography.Text type="secondary">
                  <TeamOutlined size={20} />
                </Typography.Text>
                <span>
                  <Typography.Text strong>
                    {profile?.numOfPartners}
                  </Typography.Text>{" "}
                  <Typography.Text>{t("partners")}</Typography.Text>
                </span>
              </Space>
            </Space>
          </Space>
        </div>
        <Typography.Paragraph italic className="text-center text-400 mt-2">
          "{profile?.introduction}"
        </Typography.Paragraph>
        <Divider />
        <div className="mb-2">
          <Tag color="#2db7f5">
            <SketchOutlined /> {t("Native languages")}
          </Tag>
        </div>
        {profile?.nativeLanguage && (
          <Row justify="center">
            <Col xs={24} sm={12}>
              <Card type="inner" size="small">
                <div className="d-flex flex-column align-items-center justify-space-between gap-2">
                  <Typography.Text strong>
                    {t(`${profile.nativeLanguage.name}`)}
                  </Typography.Text>
                  <Rate disabled value={profile?.nativeLanguage.level} />
                </div>
              </Card>
            </Col>
          </Row>
        )}
        <div className="mb-2 mt-3">
          <Tag color="#87d068">
            <HeartOutlined /> {t("Target languages")}
          </Tag>
        </div>
        <Row gutter={[12, 12]} justify="center">
          {profile?.targetLanguages?.map((language) => (
            <Col key={language.id} xs={24} sm={12}>
              <Card type="inner" size="small">
                <div className="d-flex flex-column align-items-center justify-space-between gap-2">
                  <Typography.Text strong>
                    {t(`${language.name}`)}
                  </Typography.Text>
                  <Rate disabled value={language.level} />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <Space
          className="languages width-full"
          direction="vertical"
          size="large"
        ></Space>
        <br />
        <div className="interest">
          <Divider orientation="left" plain>
            {t("Interests")}
          </Divider>
          <Space size={[0, 8]} wrap>
            {profile?.hobbies?.map((item, index) => (
              <Tag color={colors[index % 11]} key={index}>
                {item}
              </Tag>
            ))}
          </Space>
        </div>
      </Card>
    </Skeleton>
  );
};

export default ProfileCard;
