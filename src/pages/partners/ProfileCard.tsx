import {
  Avatar,
  Button,
  Card,
  Divider,
  Rate,
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

const inforItems = [
  {
    icon: <HomeOutlined />,
    text: "Hanoi, Vietnam",
  },
  {
    icon: <FormOutlined />,
    text: "100 posts",
  },
  {
    icon: <TeamOutlined />,
    text: "50 partners",
  },
];

const nativeLanguages = [
  {
    language: "Vietnamese",
    rate: 4,
  },
  {
    language: "English",
    rate: 4,
  },
];

const targetLanguages = [
  {
    language: "Chinese",
    rate: 2,
  },
  {
    language: "Japanese",
    rate: 3,
  },
];

interface Language {
  language: string;
  rate: number;
}

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
  language,
  rate,
}) => {
  return (
    <div className="d-flex align-items-center justify-space-between">
      <Tag color={color}>{language}</Tag>
      <Rate disabled defaultValue={rate} />
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

const ProfileCard: React.FC = () => {
  return (
    <Card className="height-full pos-relative card-custome-scroll bg-white h-100 w-100">
      <div className="avatar and basic info">
        <div className="d-flex align-items-center justify-space-between">
          <Space>
            <Avatar size={100} src={faker.image.avatar()} />
            <Space direction="vertical" size={0}>
              <Typography.Title level={3} className="m-0">
                Dinh Nhu Tan
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
      <Space className="languages width-full" direction="vertical" size="large">
        {[
          {
            title: "Native languages",
            icon: <SketchOutlined />,
            color: "blue",
            languages: nativeLanguages,
          },
          {
            title: "Target languages",
            icon: <HeartOutlined />,
            color: "green",
            languages: targetLanguages,
          },
        ].map((item, index) => (
          <LanguageRateList {...item} key={index} />
        ))}
      </Space>
      <br />
      <br />
      <Typography.Paragraph italic className="text-justify text-300">
        "{faker.lorem.paragraphs()}"
      </Typography.Paragraph>
      <div className="interest">
        <Divider orientation="left" plain>
          Interests
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
  );
};

export default ProfileCard;
