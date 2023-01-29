import {
  Avatar,
  Button,
  Card,
  Carousel,
  Image,
  Space,
  Tag,
  Typography,
} from "antd";
import {
  MoreOutlined,
  HeartOutlined,
  CommentOutlined,
} from "@ant-design/icons";

interface PostProps {
  owner: {
    fullname: string;
    color: string;
    image: string;
  };
  images: string[];
  contents: string;
  languages: string[];
  emotions: string;
  comments: string;
  time: string;
}

const PostCard = ({
  owner,
  images,
  contents,
  languages,
  emotions,
  comments,
  time,
}: PostProps) => {
  return (
    <Card
      className="width-full"
      hoverable
      type="inner"
      title={
        <Space>
          <Avatar
            style={{
              verticalAlign: "middle",
              backgroundColor: owner.color,
            }}
            size="large"
            src={<Image src={owner.image} />}
          />
          <Space size={0} direction="vertical">
            <Typography.Text strong={true}>{owner.fullname}</Typography.Text>
            <Typography.Text type="secondary">{time}</Typography.Text>
          </Space>
        </Space>
      }
      extra={<Button shape="circle" icon={<MoreOutlined />} />}
      cover={
        <Carousel>
          {images.map((item, index) => (
            <div key={index} className="text-center">
              <Image src={item} height={300} />
            </div>
          ))}
        </Carousel>
      }
      actions={[
        <Button type="text" danger block={true}>
          <Space size="small">
            <HeartOutlined /> {emotions}
          </Space>
        </Button>,
        <Button type="text" className="btn-text-success" block={true}>
          <Space size="small">
            <CommentOutlined /> {comments}
          </Space>
        </Button>,
        <Button
          type="text"
          icon={<MoreOutlined />}
          className="btn-text-warning width-full"
          block={true}
        />,
      ]}
    >
      <Typography.Paragraph>{contents}</Typography.Paragraph>
      <Space>
        {languages.map((item, index) => (
          <Tag color="green" key={index}>
            {item}
          </Tag>
        ))}
      </Space>
    </Card>
  );
};

export default PostCard;
