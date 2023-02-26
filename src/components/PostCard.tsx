import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Image,
  MenuProps,
  message,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import {
  MoreOutlined,
  HeartOutlined,
  CommentOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Slider from "react-slick";
import Post from "../types/Post";
import User from "../types/User";
import { useState } from "react";

interface PostProps extends Post {
  onClick?: (item: Post) => void;
  hoverable?: boolean;
  bordered?: boolean;
  boxShadow?: boolean;
  correctable?: boolean;
  group?: {
    name: string;
    image: string;
  };
  type?: "normal" | "inModal";
  inputRef?: any;
  handleOpenCorrectModal?: () => void;
}

const handleMenuClick: MenuProps["onClick"] = (e) => {
  e.domEvent.preventDefault();
  e.domEvent.stopPropagation();
  message.info("Click on menu item.");
  console.log("click", e);
};

const items: MenuProps["items"] = [
  {
    label: <span>Collect this post</span>,
    key: "0",
  },
  {
    label: <span>Hide this post</span>,
    key: "1",
  },
];

const menuDropdown = {
  items: items,
  onClick: handleMenuClick,
};

const title = (owner: User, group: PostProps["group"], createdAt: string) => {
  return (
    <Space>
      <Avatar
        style={{
          verticalAlign: "middle",
        }}
        size="large"
        src={<Image src={owner.avatar} />}
      />
      <Space size={0} direction="vertical">
        <Typography.Title level={5} className="m-0">
          {group ? group.name : owner.fullname}
        </Typography.Title>
        {group ? (
          <Space>
            <Typography.Text type="secondary">{owner.fullname}</Typography.Text>
            <Typography.Text type="secondary">-</Typography.Text>
            <Typography.Text type="secondary" className="text-400">
              {createdAt}
            </Typography.Text>
          </Space>
        ) : (
          <Typography.Text type="secondary" className="text-400">
            {createdAt}
          </Typography.Text>
        )}
      </Space>
    </Space>
  );
};
function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        right: "24px",
        position: "absolute",
        height: "48px",
        width: "48px",
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      }}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left: "24px",
        position: "absolute",
        zIndex: 2,
        height: "48px",
        width: "48px",
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      }}
    />
  );
}

interface CarouselProps {
  images?: string[];
  type?: "normal" | "inModal";
}

const Carousel: React.FC<CarouselProps> = ({ images, type = "normal" }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots: any) => (
      <div
        style={{ position: "absolute", zIndex: 3, bottom: "8px" }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <ul style={{ margin: 0, padding: 0 }}>{dots}</ul>
      </div>
    ),
  };

  return images ? (
    <>
      <div>
        <Slider {...settings}>
          {images.map((item, index) => (
            <div key={index} className="text-center px-4">
              <Image
                preview={(type === "inModal" && { visible: false }) || false}
                src={item}
                width="100%"
                className="w-100"
                onClick={() => {
                  if (type === "inModal") {
                    setVisible(true);
                  }
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div style={{ display: "none" }}>
        <Image.PreviewGroup
          preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
        >
          {images.map((item, index) => (
            <Image src={item} key={index} />
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  ) : null;
};

const PostCard: React.FC<PostProps> = ({
  id,
  group,
  owner,
  images,
  content,
  languages,
  numHearts,
  numComments,
  comments,
  createdAt,
  onClick,
  hoverable = true,
  bordered = true,
  boxShadow = true,
  type = "normal",
  correctable = false,
  inputRef,
  handleOpenCorrectModal,
}) => {
  const headStyle: React.CSSProperties = {
    backgroundColor: "white",
    border: "none",
    paddingBottom: "12px",
    // paddingLeft: type === "inModal" ? "0" : "24px",
    paddingTop: type === "inModal" ? "0" : "12px",
  };

  const handleHeart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Card
      bordered={bordered}
      className={
        boxShadow
          ? "width-full post-card action-with-no-border action-with-padding"
          : "width-full post-card shadow-none action-with-no-border action-with-padding"
      }
      hoverable={hoverable}
      title={title(owner, group, createdAt)}
      cover={<Carousel images={images} type={type} />}
      actions={[
        <Button type="text" danger block onClick={handleHeart}>
          <Space size="small">
            <HeartOutlined /> {numHearts}
          </Space>
        </Button>,
        <Button
          type="text"
          className="btn-text-success"
          block
          onClick={() => {
            if (inputRef) inputRef.current.focus();
          }}
        >
          <Space size="small">
            <CommentOutlined /> {numComments}
          </Space>
        </Button>,
        <Dropdown menu={menuDropdown} trigger={["click"]}>
          <Button
            type="text"
            icon={<MoreOutlined rotate={90} />}
            className="btn-text-warning width-full"
            block
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        </Dropdown>,
      ]}
      headStyle={headStyle}
      bodyStyle={{ position: "relative" }}
      onClick={() =>
        onClick &&
        onClick({
          id,
          owner,
          images,
          content,
          languages,
          numHearts,
          numComments,
          comments,
          createdAt,
        })
      }
    >
      <Typography.Paragraph>{content}</Typography.Paragraph>
      <Space>
        {languages.map((item, index) => (
          <Tag color="green" key={index}>
            {item}
          </Tag>
        ))}
      </Space>
      {type === "inModal" && correctable && (
        <div className="position-absolute bottom-0 end-0 mb-2 me-4">
          <Tooltip title="Correct for this post">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              className="btn-warning"
              onClick={handleOpenCorrectModal}
            />
          </Tooltip>
        </div>
      )}
    </Card>
  );
};

export default PostCard;
