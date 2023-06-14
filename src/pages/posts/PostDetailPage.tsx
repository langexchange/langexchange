import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  Col,
  Divider,
  InputRef,
  message,
  Row,
  Select,
  Skeleton,
} from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import {
  Comment,
  useGetCommentsQuery,
} from "../../services/comment/commentService";
import { Post, useGetPostQuery } from "../../services/post/postService";
import { InputComment } from "../../components/PostModal";
import CorrectionModal from "../../components/CorrectionModal";
import PostFormModal from "../../components/PostFormModal";
import CommentList from "../../components/CommentList";
import PostCard from "../../components/PostCard";
import { useNavigate, useParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage";

const PostDetailPage: React.FC = () => {
  const [isOpenCorrectModal, setIsOpenCorrectModal] = useState(false);
  const [t] = useTranslation(["commons"]);
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const { id: postId } = useParams();

  const showEditModal = () => setIsEditModalOpen(true);
  const handleEditOk = () => setIsEditModalOpen(false);
  const handleEditCancel = () => setIsEditModalOpen(false);

  const deleteCommentInList = (id: string) => {
    setCommentList((prev) => prev.filter((item) => item.commentId !== id));
  };

  const setInteractCommentInList = (
    id: string,
    isLiked: boolean,
    numOfInteract: number
  ) => {
    setCommentList((prev) => {
      let newList = [...prev];
      const index = newList.findIndex((item) => item.commentId === id);
      if (index !== -1) {
        newList[index] = {
          ...newList[index],
          numOfInteract,
          isUserInteracted: isLiked,
        };
      }
      return newList;
    });
  };

  const {
    data: comments,
    isLoading,
    refetch,
    isFetching: isCommentFetching,
  } = useGetCommentsQuery(postId || "", {
    // pollingInterval: 5000,
    refetchOnMountOrArgChange: true,
    skip: !postId,
  });

  const {
    data: fetchPost,
    isLoading: isPostDetailLoading,
    refetch: refetchPostDetail,
    isFetching: isPostDetailFetching,
    isError,
  } = useGetPostQuery(postId || "", {
    refetchOnMountOrArgChange: true,
    skip: !postId,
  });

  useEffect(() => {
    if (!fetchPost) return;
    setPost(fetchPost);
  }, [fetchPost, isPostDetailLoading, isPostDetailFetching]);

  const handleCancel = () => {
    setCommentList([]);
    setPost(null);
  };

  const handleSubmitCorrection = () => {
    setIsOpenCorrectModal(false);
  };
  const handleOpenCorrectModal = () => {
    setIsOpenCorrectModal(true);
  };

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (!comments) return;

    const sortedComment = [...comments].sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt).getTime() -
        new Date(a.updatedAt || a.createdAt).getTime()
    );

    setCommentList([...sortedComment]);
  }, [comments, isLoading, isCommentFetching]);

  const sortComments = (value: any) => {
    if (!commentList) return;
    let sortComments = [...commentList];
    switch (value) {
      case "newest_first":
        sortComments.sort(
          (a, b) =>
            new Date(b.updatedAt || b.createdAt).getTime() -
            new Date(a.updatedAt || a.createdAt).getTime()
        );
        break;
      case "oldest_first":
        sortComments.sort(
          (a, b) =>
            new Date(a.updatedAt || a.createdAt).getTime() -
            new Date(b.updatedAt || b.createdAt).getTime()
        );
        break;
      case "only_correction":
        sortComments.sort(
          (a, b) =>
            new Date(b.updatedAt || b.createdAt).getTime() -
            new Date(a.updatedAt || a.createdAt).getTime()
        );
        sortComments = sortComments.filter((item) => item.correctcmt);
        break;
      case "most_interact":
        sortComments.sort((a, b) => b.numOfInteract - a.numOfInteract);
        break;

      default:
        break;
    }
    setCommentList([...sortComments]);
  };
  const navigate = useNavigate();
  if (isError)
    return (
      <NotFoundPage
        subTitle="Post not found!"
        className="full-height-minus-header"
      />
    );

  return (
    <>
      <Row
        justify="center"
        className="pt-2 pb-5 "
        style={{ minHeight: "calc(100vh - 56px)" }}
      >
        <Col xl={12} xs={24} md={16}>
          <Card size="small" bodyStyle={{ padding: "12px 0" }} bordered={false}>
            <Skeleton
              loading={isPostDetailLoading || isPostDetailFetching}
              active
              avatar
            >
              {post && (
                <PostCard
                  setEditPostId={setEditPostId}
                  showEditModal={showEditModal}
                  post={post}
                  hoverable={false}
                  bordered={false}
                  boxShadow={false}
                  correctable={true}
                  type="inModal"
                  inputRef={inputRef}
                  handleOpenCorrectModal={handleOpenCorrectModal}
                  setPost={setPost}
                  hideModalDetail={handleCancel}
                  refetchListPost={() => {
                    message.success({
                      content: "Delete post successfully",
                    });
                    navigate("/community");
                  }}
                />
              )}
            </Skeleton>
            {!post?.isTurnOffCorrection && (
              <div className="px-4">
                <div className="text-right" style={{ zIndex: 4 }}>
                  <Select
                    className="input-select-comment-sort-title"
                    bordered={false}
                    defaultValue="newest_first"
                    style={{ fontWeight: 500 }}
                    dropdownMatchSelectWidth={false}
                    onChange={sortComments}
                    suffixIcon={
                      <CaretDownOutlined style={{ color: "#8c8c8c" }} />
                    }
                    options={[
                      { value: "newest_first", label: "Newest first" },
                      { value: "oldest_first", label: "Oldest first" },
                      { value: "only_correction", label: "Only correction" },
                      { value: "most_interact", label: "The most interacts" },
                    ]}
                  />
                </div>
                <Skeleton loading={isLoading} active avatar>
                  <CommentList
                    commentList={commentList}
                    ownerPostId={post?.userId}
                    refetch={refetch}
                    deleteCommentInList={deleteCommentInList}
                    setInteractCommentInList={setInteractCommentInList}
                  />
                </Skeleton>
              </div>
            )}
            <Divider plain />
            <div className="mb-3">
              {!post?.isTurnOffCorrection && (
                <InputComment
                  key="input-comment"
                  inputRef={inputRef}
                  isOpenCorrectModal={isOpenCorrectModal}
                  postId={postId}
                  refetch={refetch}
                />
              )}
            </div>
          </Card>
        </Col>
      </Row>
      <CorrectionModal
        title={t("Correct content for this post")}
        originalText={post?.text || ""}
        open={isOpenCorrectModal}
        setOpen={setIsOpenCorrectModal}
        onOk={handleSubmitCorrection}
        width={700}
        postId={postId || null}
        refetch={refetch}
      />
      <PostFormModal
        editPostId={editPostId}
        setEditPostId={setEditPostId}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        handleOk={handleEditOk}
        handleCancel={handleEditCancel}
        refetch={refetchPostDetail}
      />
    </>
  );
};

export default PostDetailPage;
