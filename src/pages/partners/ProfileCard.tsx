import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Image,
  Rate,
  Skeleton,
  Space,
  Tag,
  TagProps,
  Typography,
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
  userId: string;
  isCurrentUser?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  const { userId, isCurrentUser = false } = props;
  const currentUserProfile = useAppSelector(selectCredentalProfile);

  const {
    data: fetchProfile,
    isFetching,
    isLoading,
    isError,
  } = useGetProfileQuery(userId, {
    skip: isCurrentUser,
  });

  const [t] = useTranslation(["commons", "countries"]);

  if (isError) return <div>Something went wrong</div>;
  const profile = isCurrentUser ? currentUserProfile : fetchProfile;

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
            <Typography.Title level={2} className="m-0">
              {[profile?.firstName, profile?.lastName].join(" ")}
            </Typography.Title>
            {!isCurrentUser && (
              <Space>
                <Button
                  type="primary"
                  shape="round"
                  icon={<UserDeleteOutlined />}
                  danger
                  size="small"
                >
                  Huỷ kết bạn
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  icon={<MessageOutlined />}
                  className="btn-success"
                  size="small"
                >
                  Gửi tin nhắn
                </Button>
              </Space>
            )}
            <Space size={6}>
              <Space align="center">
                <span style={{ color: "black", fontSize: "20px" }}>
                  {profile?.country && getUnicodeFlagIcon(profile.country)}
                </span>
                <Typography.Text strong>
                  {t(`${profile?.country}`, { ns: "countries" })}
                </Typography.Text>
              </Space>
              <span
                className="secondary-color text-500"
                style={{ fontSize: "18px" }}
              >
                &#183;
              </span>
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
              <span
                className="secondary-color text-500"
                style={{ fontSize: "18px" }}
              >
                &#183;
              </span>
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
        <br />
        <Typography.Paragraph italic className="text-center text-300">
          "{profile?.introduction}"
        </Typography.Paragraph>
        <Divider />
        <div className="mb-2">
          <Tag color="#2db7f5">
            <SketchOutlined /> {t("Native languages")}
          </Tag>
        </div>
        {profile?.nativeLanguage && (
          <Card type="inner" size="small" className="w-50 ma">
            <div className="d-flex flex-column align-items-center justify-space-between gap-2">
              <Typography.Text strong>
                {t(`${profile.nativeLanguage.name}`)}
              </Typography.Text>
              <Rate disabled value={profile?.nativeLanguage.level} />
            </div>
          </Card>
        )}
        <div className="mb-2 mt-3">
          <Tag color="#87d068">
            <HeartOutlined /> {t("Target languages")}
          </Tag>
        </div>
        <div className="d-flex gap-2">
          {profile?.targetLanguages?.map((language) => (
            <Card type="inner" size="small" className="w-50" key={language.id}>
              <div className="d-flex flex-column align-items-center justify-space-between gap-2">
                <Typography.Text strong>
                  {t(`${language.name}`)}
                </Typography.Text>
                <Rate disabled value={language.level} />
              </div>
            </Card>
          ))}
        </div>
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
