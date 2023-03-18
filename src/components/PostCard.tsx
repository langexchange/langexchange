import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Image,
  MenuProps,
  message,
  Skeleton,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import {
  MoreOutlined,
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Slider from "react-slick";
import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AttachedFile,
  Post,
  useInteractPostMutation,
  useLazyGetNumOfInteractQuery,
} from "../services/post/postService";
import ReactPlayer from "react-player";
import { useAppSelector } from "../hooks/hooks";
import { selectCredentials } from "../features/auth/authSlice";

interface PostProps {
  setEditPostId?: (v: string | null) => void;
  showEditModal?: () => void;
  post: Post;
  setPostId?: (v: string | null) => void;
  onClick?: (item: string) => void;
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

const title = (
  owner: any,
  group: PostProps["group"],
  createdAt: string,
  languages: ReactNode
) => {
  if (!owner) return <Skeleton.Input style={{ width: 100 }} active={true} />;
  return (
    <div className="d-flex gap-3">
      <Space>
        <Avatar
          style={{
            verticalAlign: "middle",
          }}
          size="large"
          src={owner?.avatar ? <Image src={owner.avatar} /> : undefined}
          icon={<UserOutlined />}
        />
        <Space size={0} direction="vertical">
          <Typography.Title level={5} className="m-0">
            {group ? group.name : [owner.firstName, owner.lastName].join(" ")}
          </Typography.Title>
          {group ? (
            <Space>
              <Typography.Text type="secondary">
                {owner.firstName + " " + owner.lastName}
              </Typography.Text>
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
      <Space align="end">{languages}</Space>
    </div>
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
  images?: AttachedFile[];
  videos?: AttachedFile[];
  type?: "normal" | "inModal";
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  videos,
  type = "normal",
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    adaptiveHeight: true,
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
      <div style={{ background: "#ebedf0" }}>
        <Slider {...settings}>
          {images.map((item, index) => (
            <div key={index} className="text-center px-4">
              <Image
                preview={type === "inModal"}
                src={item.url}
                className="w-100"
                width="auto"
                height="auto"
              />
            </div>
          ))}
          {videos?.map((item, index) => (
            <div key={index} className="text-center px-4">
              <ReactPlayer
                url={item.url}
                controls={true}
                width="100%"
                height="auto"
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  ) : null;
};

const PostCard: React.FC<PostProps> = ({
  post,
  group,
  onClick,
  hoverable = true,
  bordered = true,
  boxShadow = true,
  type = "normal",
  correctable = false,
  inputRef,
  handleOpenCorrectModal,
  setEditPostId,
  showEditModal,
}) => {
  const [t] = useTranslation(["commons"]);
  const headStyle: React.CSSProperties = {
    backgroundColor: "white",
    border: "none",
    paddingBottom: "12px",
    paddingTop: type === "inModal" ? "0" : "12px",
  };

  const credentials = useAppSelector(selectCredentials);
  const [numOfLikes, setNumOfLikes] = useState(post.numOfInteract);
  const [isLike, setIsLike] = useState(post.isUserInteracted);
  const [interactPost, { isLoading: isInteractingPost }] =
    useInteractPostMutation();
  const [getNumOfInteract, { isLoading: isGettingNumOfInteract }] =
    useLazyGetNumOfInteractQuery();

  useEffect(() => {
    setNumOfLikes(post.numOfInteract);
    setIsLike(post.isUserInteracted);
  }, [post.numOfInteract, post.isUserInteracted]);

  const handleHeart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (!credentials.userId) return;
      let mode = 0;
      if (isLike) mode = 1;

      await interactPost({
        userId: credentials.userId,
        postId: post.postId,
        mode: mode as 0 | 1,
      }).unwrap();
      const numOfInteract = await getNumOfInteract(post.postId).unwrap();
      setNumOfLikes(numOfInteract);
      setIsLike(!isLike);
    } catch (error) {
      message.error("Error when interacting post");
    }
  };

  const items: MenuProps["items"] = [
    {
      label: <span>{t("Edit this post")}</span>,
      key: "0",
    },
    {
      label: <span>{t("Collect this post")}</span>,
      key: "1",
    },
    {
      label: <span>{t("Hide this post")}</span>,
      key: "2",
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    e.domEvent.preventDefault();
    e.domEvent.stopPropagation();
    if (e.key === "0") {
      setEditPostId && setEditPostId(post.postId);
      showEditModal && showEditModal();
    }
  };

  const menuDropdown = {
    items: items,
    onClick: handleMenuClick,
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
      title={title(
        post.userInfo,
        group,
        new Date(post.createdAt).toLocaleString(),
        [post.langName].map((item, index) => (
          <Tag color="green" key={index}>
            {item}
          </Tag>
        ))
      )}
      cover={
        <Carousel images={post.imagePost} videos={post.videoPost} type={type} />
      }
      actions={[
        <Button type="text" danger block onClick={handleHeart}>
          <Space size={4}>
            {isLike ? <HeartFilled /> : <HeartOutlined />} {numOfLikes}
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
          <Space size={4}>
            <CommentOutlined /> {post.numOfCmt}
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
      bodyStyle={{ position: "relative", paddingBottom: "12px" }}
      onClick={() => onClick && onClick(post.postId)}
    >
      <Typography.Paragraph>{post.text}</Typography.Paragraph>
      <div className="">
        {post?.labels?.map((item, index) => (
          <Tag key={index}>{item}</Tag>
        ))}
      </div>
      <div className="mb-2">
        {post.audioPost?.map((item, index) => (
          <audio
            src={item.url}
            controls
            key={index}
            style={{ width: "100%", height: "40px" }}
          />
        ))}
      </div>
      {type === "inModal" && correctable && (
        <div
          className="position-absolute end-0 mb-2 me-4"
          style={{ bottom: "-28px" }}
        >
          <Tooltip title={t("Correct content for this post")}>
            <Button
              type="primary"
              size="large"
              shape="circle"
              icon={<EditOutlined />}
              className="btn-success"
              onClick={handleOpenCorrectModal}
              style={{
                boxShadow: "0 0 0 4px #f1f1f1, 0 0 0 4px #fff",
                zIndex: 3,
              }}
            />
          </Tooltip>
        </div>
      )}
    </Card>
  );
};

export default PostCard;
