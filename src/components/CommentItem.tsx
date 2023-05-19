import {
  Avatar,
  Badge,
  Button,
  Col,
  Image,
  message,
  Popconfirm,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import {
  HeartOutlined,
  EditOutlined,
  UserOutlined,
  HeartFilled,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Diff from "./Diff";
import {
  Comment,
  useDeleteCommentMutation,
  useInteractCommentMutation,
} from "../services/comment/commentService";
import { useAppSelector } from "../hooks/hooks";
import { selectCredentials } from "../features/auth/authSlice";
import { useLazyGetNumOfInteractQuery } from "../services/comment/commentService";
import { Link } from "react-router-dom";

interface CommentProps extends Comment {
  ownerPostId?: string;
  openEditModal: () => void;
  setEditComment: (v: Comment) => void;
  deleteCommentInList: (id: string) => void;
  setInteractCommentInList: (
    id: string,
    isLiked: boolean,
    numOfInteract: number
  ) => void;
}

const CommentItem: React.FC<CommentProps> = (comment) => {
  const credentials = useAppSelector(selectCredentials);
  const [deleteComment, { isLoading: isDeletingComment }] =
    useDeleteCommentMutation();

  const handleEdit = () => {
    comment.openEditModal();
    comment.setEditComment(comment);
  };

  const handleDeleteComment = async () => {
    try {
      const res = await deleteComment({
        commentId: comment.commentId,
        postId: comment.postId,
        userId: comment.userId,
      });
      comment.deleteCommentInList(comment.commentId);
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const [interactComment, { isLoading: isInteractingComment }] =
    useInteractCommentMutation();
  const [getNumOfInteract, { isLoading: isGettingNumOfInteract }] =
    useLazyGetNumOfInteractQuery();

  const handleInteract = async () => {
    try {
      if (!credentials.userId) return;
      let mode = 0; // if (isLiked) mode = 1;
      if (comment.isUserInteracted) mode = 1;

      await interactComment({
        userId: credentials.userId,
        commentId: comment.commentId,
        mode: mode as 0 | 1,
      }).unwrap();

      const numOfInteract = await getNumOfInteract(comment.commentId).unwrap();
      comment.setInteractCommentInList(
        comment.commentId,
        !comment.isUserInteracted,
        numOfInteract
      );
    } catch (error) {
      message.error("Error when interacting post");
    }
  };

  const content = (
    <Space align="start">
      <Avatar
        size="large"
        src={comment?.userInfo?.avatar || undefined}
        icon={<UserOutlined />}
      />
      <Space
        className="has-background-color py-2 px-3 rounded-4"
        direction="vertical"
      >
        <Link to={`/profile/${comment.userId}`}>
          <Typography.Text strong={true} className="hover-underline">
            {[comment.userInfo.firstName, comment.userInfo.lastName].join(" ")}
          </Typography.Text>
        </Link>
        <Typography.Paragraph className="m-0">
          {comment.correctcmt ? (
            <Diff
              originalText={comment.correctcmt}
              correctedText={comment.text}
              code
              style={{
                margin: 0,
                background: "#fefff8",
                borderRadius: "8px",
                border: "none",
              }}
              strikeThrough={true}
            />
          ) : (
            <span>{comment.text}</span>
          )}
        </Typography.Paragraph>
        {comment.audiocmts?.map((item, index) => (
          <audio
            src={item.url}
            controls
            key={index}
            style={{ width: "100%", height: "40px" }}
          />
        ))}
        <div className="d-flex gap-2">
          {comment.imagecmts.map((item, index) => (
            <Image src={item.url} key={index} style={{ display: "inline" }} />
          ))}
        </div>
        <Row align="middle">
          <Col flex="auto">
            <Space size={16}>
              <Space size={0}>
                <Button
                  type="text"
                  onClick={handleInteract}
                  icon={
                    comment.isUserInteracted ? (
                      <HeartFilled />
                    ) : (
                      <HeartOutlined />
                    )
                  }
                  shape="circle"
                  danger
                  size="small"
                />
                <Typography.Text type="danger">
                  {comment.numOfInteract}
                </Typography.Text>
              </Space>
              {credentials?.userId === comment.userId && (
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  className="btn-text-success"
                  shape="circle"
                  size="small"
                  onClick={handleEdit}
                />
              )}
              {(credentials?.userId === comment.ownerPostId ||
                credentials?.userId === comment.userId) && (
                  <Popconfirm
                    title="Delete the comment"
                    description="Are you sure to delete this comment?"
                    onConfirm={handleDeleteComment}
                    okText="Yes"
                    cancelText="No"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      shape="circle"
                      className="btn-text-secondary secondary-color"
                      size="small"
                    />
                  </Popconfirm>
                )}
            </Space>
          </Col>
          <Col flex="none">
            <Typography.Text
              type="secondary"
              className="float-right ms-4 fz-12 text-500"
            >
              {new Date(
                comment.updatedAt || comment.createdAt
              ).toLocaleString()}
            </Typography.Text>
          </Col>
        </Row>
      </Space>
    </Space>
  );
  if (comment.correctcmt)
    return (
      <Spin spinning={isDeletingComment} tip="Deleting...">
        <Badge.Ribbon text="Correction" color="green">
          {content}
        </Badge.Ribbon>
      </Spin>
    );
  return content;
};

export default CommentItem;
