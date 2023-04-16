import {
  Avatar,
  Button,
  Card,
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
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Post } from "../services/post/postService";
import Carousel from "./Carousel";
import usePost from "../hooks/post/usePost";
import PostCardMoreActions from "./PostCardMoreActions";
import { Link } from "react-router-dom";

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
  setPost?: React.Dispatch<React.SetStateAction<Post | null>>;
  hideModalDetail?: () => void;
  refetchListPost?: () => void;
}

const PostCard: React.FC<PostProps> = ({
  post: postData,
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
  setPost: setParentPost,
  hideModalDetail,
  refetchListPost,
}) => {
  const [t] = useTranslation(["commons"]);
  const [
    post,
    setPost,
    { handleHeart, handlePostActions, isLoading, isOwner },
  ] = usePost(postData);
  const headStyle: React.CSSProperties = {
    backgroundColor: "white",
    border: "none",
    paddingBottom: "12px",
    paddingTop: type === "inModal" ? "0" : "12px",
  };

  const handleMenuClick: MenuProps["onClick"] = async (e) => {
    e.domEvent.preventDefault();
    e.domEvent.stopPropagation();
    try {
      switch (e.key) {
        case "0":
          setEditPostId && setEditPostId(post.postId);
          showEditModal && showEditModal();
          break;
        case "2":
          // copy link of post
          navigator.clipboard.writeText(
            `http:localhost:3000/posts/${post.postId}`
          );
          message.success("Copy link successfully");
          break;
        case "3":
          await handlePostActions("updateVisible");
          break;
        case "4":
          await handlePostActions("updateCorrection");
          setParentPost &&
            setParentPost(
              (prev) =>
              ({
                ...prev,
                isTurnOffCorrection: !post.isTurnOffCorrection,
              } as Post)
            );
          break;
        case "5":
          await handlePostActions("updateSharing");
          break;
        case "6":
          await handlePostActions("delete");
          hideModalDetail && hideModalDetail();
          refetchListPost && refetchListPost();
          break;
      }
    } catch (error) {
      message.error("Error when update mode post");
    }
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
        )),
        post.postId
      )}
      cover={
        <Carousel images={post.imagePost} videos={post.videoPost} type={type} />
      }
      actions={[
        <Button type="text" danger block onClick={handleHeart}>
          <Space size={4}>
            {post.isUserInteracted ? <HeartFilled /> : <HeartOutlined />}{" "}
            {post.numOfInteract}
          </Space>
        </Button>,
        <Button
          type="text"
          className="btn-text-success"
          block
          onClick={() => {
            if (inputRef) inputRef.current?.focus();
          }}
        >
          <Space size={4}>
            <CommentOutlined /> {post.numOfCmt}
          </Space>
        </Button>,
        <PostCardMoreActions
          isOwner={isOwner}
          isTurnOffCorrection={post.isTurnOffCorrection}
          isTurnOffShare={post.isTurnOffShare}
          isPublic={post.isPublic}
          handleMenuClick={handleMenuClick}
        />,
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
      <div className="my-2">
        {post.audioPost?.map((item, index) => (
          <audio
            src={item.url}
            controls
            key={index}
            style={{ width: "100%", height: "40px" }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          />
        ))}
      </div>
      {type === "inModal" && !post.isTurnOffCorrection && (
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

const title = (
  owner: any,
  group: PostProps["group"],
  createdAt: string,
  languages: ReactNode,
  postId: string
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
        <div className="d-flex flex-column">
          <Link to={`/profile/${owner?.id}`}>
            <Typography.Title level={5} className="m-0 hover-underline">
              {group ? group.name : [owner.firstName, owner.lastName].join(" ")}
            </Typography.Title>
          </Link>
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
            <Link
              to={`/posts/${postId}`}
              style={{ height: "fit-content", lineHeight: "14px" }}
            >
              <Typography.Text
                type="secondary"
                className="text-400 hover-underline fz-12"
              >
                {createdAt}
              </Typography.Text>
            </Link>
          )}
        </div>
      </Space>
      <Space align="end">{languages}</Space>
    </div>
  );
};

export default PostCard;
