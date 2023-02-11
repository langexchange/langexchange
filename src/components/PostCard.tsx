import {
  Avatar,
  Button,
  Card,
  Carousel,
  Dropdown,
  Image,
  MenuProps,
  Space,
  Tag,
  Typography,
} from "antd";
import {
  MoreOutlined,
  HeartOutlined,
  CommentOutlined,
} from "@ant-design/icons";

interface Post {
  group?: {
    name: string;
    image: string;
  };
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

interface PostProps extends Post {
  onClick?: (item: Post) => void;
  hoverable?: boolean;
  bordered?: boolean;
  boxShadow?: boolean;
}
const items: MenuProps["items"] = [
  {
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
    key: "0",
  },
  {
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item（disabled）",
    key: "3",
    disabled: true,
  },
];

const PostCard = ({
  group,
  owner,
  images,
  contents,
  languages,
  emotions,
  comments,
  time,
  onClick,
  hoverable = true,
  bordered = true,
  boxShadow = true,
}: PostProps) => {
  return (
    <Card
      bordered={bordered}
      className="width-full post-card"
      hoverable={hoverable}
      style={
        (!boxShadow && {
          boxShadow: "none",
        }) ||
        {}
      }
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
            <Typography.Title level={5} className="m-0">
              {group ? group.name : owner.fullname}
            </Typography.Title>
            {group ? (
              <Space>
                <Typography.Text type="secondary">
                  {owner.fullname}
                </Typography.Text>
                <Typography.Text type="secondary">-</Typography.Text>
                <Typography.Text type="secondary" className="text-400">
                  {time}
                </Typography.Text>
              </Space>
            ) : (
              <Typography.Text type="secondary" className="text-400">
                {time}
              </Typography.Text>
            )}
          </Space>
        </Space>
      }
      // extra={<Button shape="circle" icon={<MoreOutlined />} />}
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
        <Dropdown menu={{ items }}>
          <Button
            type="text"
            icon={<MoreOutlined rotate={90} />}
            className="btn-text-warning width-full"
            block={true}
          />
        </Dropdown>,
      ]}
      headStyle={{
        backgroundColor: "white",
        border: "none",
        paddingTop: "12px",
        paddingBottom: "12px",
      }}
      onClick={() =>
        onClick &&
        onClick({
          group,
          owner,
          images,
          contents,
          languages,
          emotions,
          comments,
          time,
        })
      }
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
