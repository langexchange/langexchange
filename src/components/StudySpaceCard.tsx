import { Button, Card, Image, Space, Tag, Typography } from "antd";
import {
  DeleteOutlined,
  UsergroupAddOutlined,
  MoreOutlined,
  TagOutlined,
  TranslationOutlined,
  TeamOutlined,
  FormOutlined,
  MessageOutlined,
  UsergroupDeleteOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

interface StudySpaceProps {
  name: string;
  languages: string[];
  tags: string[];
  descriptions: string;
  members: number;
  posts: number;
  commentsPerDay: number;
  image: string;
  isJoined?: boolean;
}

const StudySpaceCard = ({
  name,
  languages,
  tags,
  descriptions,
  members,
  posts,
  commentsPerDay,
  image,
  isJoined = false,
}: StudySpaceProps) => {
  let actions;
  if (isJoined) {
    actions = [
      <Button type="text" icon={<UsergroupDeleteOutlined />} danger />,
      <Button
        type="text"
        icon={<ArrowRightOutlined />}
        className="btn-text-success"
      />,
    ];
  } else {
    actions = [
      <Button type="text" icon={<DeleteOutlined />} danger />,
      <Button
        type="text"
        icon={<UsergroupAddOutlined />}
        className="btn-text-success"
      />,
      <Button type="text" icon={<MoreOutlined />} />,
    ];
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
            {languages.map((item, index) => (
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
            {tags.map((item, index) => (
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
          <Typography.Paragraph
            ellipsis={{ rows: 3, expandable: false, symbol: "more" }}
            className="m-0"
          >
            {descriptions}
          </Typography.Paragraph>
        </Space>
        <div
          className="d-flex align-items-center justify-space-around"
          style={{ marginTop: "8px" }}
        >
          <Space direction="vertical" size={0} align="center">
            <TeamOutlined className="color-secondary" />
            <Typography.Text type="secondary">
              {members} memebers
            </Typography.Text>
          </Space>
          <Space direction="vertical" size={0} align="center">
            <FormOutlined className="color-secondary" />
            <Typography.Text type="secondary">{posts} posts</Typography.Text>
          </Space>
          <Space direction="vertical" size={0} align="center">
            <MessageOutlined className="color-secondary" />
            <Typography.Text type="secondary">
              {commentsPerDay} discs/day
            </Typography.Text>
          </Space>
        </div>
      </div>
    </Card>
  );
};

export default StudySpaceCard;
