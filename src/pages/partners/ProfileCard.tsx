import {
  Avatar,
  Button,
  Card,
  Divider,
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
  HomeOutlined,
  FormOutlined,
  TeamOutlined,
  SketchOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { faker } from "@faker-js/faker";
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
  return (
    <div className="d-flex align-items-center justify-space-between">
      <Tag color={color}>{language}</Tag>
      <Rate disabled value={rate} />
    </div>
  );
};

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

  const [t] = useTranslation(["commons"]);
  const inforItems = [
    {
      icon: <HomeOutlined />,
      text: "Hanoi, Vietnam",
    },
    {
      icon: <FormOutlined />,
      text: `100 ${t("posts")}`,
    },
    {
      icon: <TeamOutlined />,
      text: `50 ${t("partners")}`,
    },
  ];
  console.log("render");

  if (isError) return <div>Something went wrong</div>;
  const profile = isCurrentUser ? currentUserProfile : fetchProfile;

  return (
    <Skeleton loading={isLoading || isFetching} active avatar>
      <Card className="height-full pos-relative card-custome-scroll bg-white h-100 w-100">
        <div className="avatar and basic info">
          <div className="d-flex align-items-center justify-space-between">
            <Space>
              <Avatar size={100} src={faker.image.avatar()} />
              <Space direction="vertical" size={0}>
                <Typography.Title level={3} className="m-0">
                  {[profile?.firstName, profile?.lastName].join(" ")}
                </Typography.Title>
                {inforItems.map((item, index) => (
                  <InfoItem {...item} key={index} />
                ))}
              </Space>
            </Space>
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
            <Tag color="magenta">magenta</Tag>
            <Tag color="red">red</Tag>
            <Tag color="volcano">volcano</Tag>
            <Tag color="orange">orange</Tag>
            <Tag color="gold">gold</Tag>
            <Tag color="lime">lime</Tag>
            <Tag color="green">green</Tag>
            <Tag color="cyan">cyan</Tag>
            <Tag color="blue">blue</Tag>
            <Tag color="geekblue">geekblue</Tag>
            <Tag color="purple">purple</Tag>
            <Tag color="magenta">magenta</Tag>
          </Space>
        </div>
        <div className="topics"></div>
      </Card>
    </Skeleton>
  );
};

export default ProfileCard;
