import {
  Avatar,
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
import {
  Language,
  useGetProfileQuery,
} from "../../services/profile/profileServices";
import { useAppSelector } from "../../hooks/hooks";
import { selectCredentalProfile } from "../../features/profile/profileSlice";

interface LanguageRateProps extends Language {
  color: TagProps["color"];
}

interface LanguageRateListProps {
  title: string;
  icon: React.ReactNode;
  color: TagProps["color"];
  languages: Language[];
}

const LanguageRate: React.FC<LanguageRateProps> = ({
  color,
  name: language,
  level: rate,
}) => {
  const { t } = useTranslation(["commons"]);
  return (
    <div className="d-flex align-items-center justify-space-between">
      <Tag color={color}>{t(`${language}`)}</Tag>
      <Rate disabled value={rate} />
    </div>
  );
};

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

const LanguageRateList: React.FC<LanguageRateListProps> = ({
  title,
  icon,
  color,
  languages,
}) => {
  return (
    <Space direction="vertical" className="width-full">
      <Typography.Text type="secondary">
        <Space align="center">
          {icon}
          {title}
        </Space>
      </Typography.Text>
      <Space direction="vertical" className="width-full px-4">
        {languages.map((item, index) => (
          <LanguageRate {...item} color={color} key={index} />
        ))}
      </Space>
    </Space>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  text: string;
}
const InfoItem: React.FC<InfoItemProps> = ({ icon, text }) => {
  return (
    <Typography.Text type="secondary">
      <Space align="center">
        {icon}
        {text}
      </Space>
    </Typography.Text>
  );
};

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
          <div className="d-flex align-items-center justify-space-between">
            <Space size="middle">
              <Avatar
                size={100}
                src={
                  profile?.avatar ? <Image src={profile.avatar} /> : undefined
                }
                icon={<UserOutlined />}
                style={{
                  border: "solid 1px #f8f8f8",
                  boxShadow: "0 0 0 4px #f1f1f1, 0 0 0 6px #f1f1ff",
                }}
              />
              <Space direction="vertical" size={0}>
                <Typography.Title level={3} className="m-0">
                  {[profile?.firstName, profile?.lastName].join(" ")}
                </Typography.Title>
                {[
                  {
                    icon: profile?.country && (
                      <span style={{ color: "black", fontSize: "16px" }}>
                        {getUnicodeFlagIcon(profile?.country || "")}
                      </span>
                    ),
                    text: t(`${profile?.country}`, { ns: "countries" }),
                  },
                  {
                    icon: <FormOutlined />,
                    text: `${profile?.numOfPosts} ${t("posts")}`,
                  },
                  {
                    icon: <TeamOutlined />,
                    text: `${profile?.numOfPartners} ${t("partners")}`,
                  },
                ].map((item, index) => (
                  <InfoItem {...item} key={index} />
                ))}
              </Space>
            </Space>
            {!isCurrentUser && (
              <Space direction="vertical">
                <Button
                  type="primary"
                  shape="round"
                  icon={<UserDeleteOutlined />}
                  danger
                />
                <Button
                  type="primary"
                  shape="round"
                  icon={<MessageOutlined />}
                  className="btn-success"
                />
              </Space>
            )}
          </div>
        </div>
        <br />
        <Typography.Paragraph italic className="text-center text-300">
          "{profile?.introduction}"
        </Typography.Paragraph>
        <br />
        <Space
          className="languages width-full"
          direction="vertical"
          size="large"
        >
          {[
            {
              title: t("Native languages"),
              icon: <SketchOutlined />,
              color: "blue",
              languages:
                (profile?.nativeLanguage && [profile?.nativeLanguage]) ||
                ([] as Language[]),
            },
            {
              title: t("Target languages"),
              icon: <HeartOutlined />,
              color: "green",
              languages: profile?.targetLanguages || ([] as Language[]),
            },
          ].map((item, index) => (
            <LanguageRateList {...item} key={index} />
          ))}
        </Space>
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
        <div className="topics"></div>
      </Card>
    </Skeleton>
  );
};

export default ProfileCard;
