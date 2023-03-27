import { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import CommentList from "./CommentList";
import PostCard from "./PostCard";
import CorrectionModal from "./CorrectionModal";
import { useTranslation } from "react-i18next";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useAppSelector } from "../hooks/hooks";
import { selectCredentials } from "../features/auth/authSlice";
import PostFormModal from "./PostFormModal";
import {
  Button,
  Col,
  InputRef,
  message,
  Modal,
  Popover,
  Row,
  Select,
  Skeleton,
  Space,
  Spin,
  Upload,
  UploadFile,
} from "antd";
import {
  SendOutlined,
  AudioOutlined,
  SmileOutlined,
  FileImageOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import {
  Comment,
  useCreateCommentMutation,
  useGetCommentsQuery,
} from "../services/comment/commentService";
import { Post, useGetPostQuery } from "../services/post/postService";
import useUploadFile from "../hooks/upload/useUploadFile";

export const InputComment: React.FC<any> = ({
  inputRef,
  isOpenCorrectModal,
  postId,
  refetch,
}) => {
  const [t] = useTranslation(["commons"]);
  const uploadImage = useRef<any>(null);
  const uploadAudio = useRef<any>(null);
  const credentials = useAppSelector(selectCredentials);
  const [
    imageFileList,
    setImageFileList,
    uploadImageFiles,
    isUploadImageFiles,
  ] = useUploadFile([], credentials.incId, "image");
  const [
    audioFileList,
    setAudioFileList,
    uploadAudioFiles,
    isUploadAudioFiles,
  ] = useUploadFile([], credentials.incId, "image");
  const [comment, setComment] = useState<string>("");
  const [createComment, { isLoading: isCreatingComment }] =
    useCreateCommentMutation();

  useEffect(() => {
    if (isOpenCorrectModal) return;
    inputRef.current?.focus();
  }, [inputRef.current]);

  const handleSelectEmoji = (values: any) => {
    setComment(comment + values.native);
  };

  const handleUpload = async () => {
    try {
      const images = await uploadImageFiles();
      const audios = await uploadAudioFiles();
      return {
        imagecmts: images,
        audiocmts: audios,
      };
    } catch (error) {
      message.error("Upload files failed");
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!credentials?.incId || !credentials?.userId) return;

    if (!comment && imageFileList.length === 0 && audioFileList.length === 0) {
      message.error("Please enter your comment");
      return;
    }

    try {
      const result = await handleUpload();
      const commentId = await createComment({
        userId: credentials.userId,
        postId: postId,
        body: {
          text: comment,
          correctcmt: "",
          audiocmts: result?.audiocmts as never[],
          imagecmts: result?.imagecmts as never[],
        },
      });
      refetch();
      setComment("");
      setImageFileList([]);
      setAudioFileList([]);
    } catch (error) {
      message.error("Create comment failed");
    }
  };

  const isUploading = isUploadImageFiles || isUploadAudioFiles;

  return (
    <Spin
      spinning={isUploading || isCreatingComment}
      tip={isUploading ? "Uploading..." : "Creating..."}
    >
      <div className="text-left px-4">
        <Upload
          listType="picture-card"
          className="ant-upload-d-block ant-hidden-action"
          onRemove={(file) => {
            const index = imageFileList.indexOf(file);
            const newFileList = imageFileList.slice();
            newFileList.splice(index, 1);
            setImageFileList(newFileList);
          }}
          beforeUpload={(file) => {
            const isRightFormat = file.type.includes("image");
            if (!isRightFormat) {
              message.error(`${file.name} is not a image file`);
              return Upload.LIST_IGNORE;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const newFile: UploadFile = file;
              newFile.url = reader.result?.toString() || undefined;
              setImageFileList((prev) => [...prev, newFile]);
            };

            return false;
          }}
          fileList={imageFileList}
        >
          <Button style={{ display: "none" }} ref={uploadImage}>
            Upload
          </Button>
        </Upload>
        <Upload
          listType="text"
          className="ant-upload-d-block"
          onRemove={(file) => {
            const index = audioFileList.indexOf(file);
            const newAudioList = audioFileList.slice();
            newAudioList.splice(index, 1);
            setAudioFileList(newAudioList);
          }}
          beforeUpload={(file) => {
            const isRightFormat = file.type.includes("audio");
            if (!isRightFormat) {
              message.error(`${file.name} is not a audio file`);
              return Upload.LIST_IGNORE;
            }

            setAudioFileList([...audioFileList, file]);

            return false;
          }}
          fileList={audioFileList}
        >
          <Button style={{ display: "none" }} ref={uploadAudio}>
            Upload
          </Button>
        </Upload>
        <Space align="center" size={0}>
          <Popover
            content={
              <div>
                <Picker
                  data={data}
                  onEmojiSelect={handleSelectEmoji}
                  theme="light"
                />
              </div>
            }
            trigger="click"
          >
            <Button
              type="text"
              shape="circle"
              icon={<SmileOutlined className="secondary-color" />}
            />
          </Popover>
          <Button
            type="text"
            shape="circle"
            icon={<AudioOutlined className="secondary-color" />}
            onClick={() => uploadAudio.current?.click()}
          />
          <Button
            type="text"
            shape="circle"
            icon={<FileImageOutlined className="secondary-color" />}
            onClick={() => uploadImage.current?.click()}
          />
        </Space>

        <Row gutter={[8, 0]}>
          <Col flex="auto">
            <TextArea
              onChange={(e) => setComment(e.target.value)}
              placeholder={t("input-comment-placeholder").toString()}
              allowClear
              ref={inputRef}
              value={comment}
              autoFocus
              autoSize
              size="large"
              className="has-background-color rounded-pill"
              bordered={false}
            />
          </Col>
          <Col flex="none">
            <Button
              size="large"
              shape="circle"
              icon={<SendOutlined />}
              type="primary"
              onClick={handleSubmit}
            />
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

interface PostModalProps {
  postId: string | null;
  isModalOpen: boolean;
  setIsModalOpen: (v: boolean) => void;
  setPostId: (v: string | null) => void;
  refetchListPost?: () => void;
}
const PostModal: React.FC<PostModalProps> = ({
  postId,
  isModalOpen,
  setIsModalOpen,
  setPostId,
  refetchListPost,
}) => {
  const [isOpenCorrectModal, setIsOpenCorrectModal] = useState(false);
  const [t] = useTranslation(["commons"]);
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPostId, setEditPostId] = useState<string | null>(null);

  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleEditOk = () => {
    setIsEditModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

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
  } = useGetCommentsQuery(postId, {
    // pollingInterval: 5000,
    refetchOnMountOrArgChange: true,
    skip: !postId,
  });

  const {
    data: fetchPost,
    isLoading: isPostDetailLoading,
    refetch: refetchPostDetail,
    isFetching: isPostDetailFetching,
  } = useGetPostQuery(postId, {
    refetchOnMountOrArgChange: true,
    skip: !postId,
  });

  useEffect(() => {
    if (!fetchPost) return;
    setPost(fetchPost);
  }, [fetchPost, isPostDetailLoading, isPostDetailFetching]);

  const handleCancel = () => {
    setCommentList([]);
    setPostId(null);
    setPost(null);
    setIsModalOpen(false);
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

  return (
    <>
      <Modal
        className="d-flex flex-column t-0 mh-100 modal-small modal-with-content-scroll"
        open={isModalOpen}
        onCancel={handleCancel}
        width={800}
        wrapClassName="pv-32"
        bodyStyle={modalBodyStyle}
        footer={
          !post?.isTurnOffCorrection
            ? [
              <InputComment
                key="input-comment"
                inputRef={inputRef}
                isOpenCorrectModal={isOpenCorrectModal}
                postId={postId}
                refetch={refetch}
              />,
            ]
            : []
        }
      >
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
              refetchListPost={refetchListPost}
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
                suffixIcon={<CaretDownOutlined style={{ color: "#8c8c8c" }} />}
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
      </Modal>
      <CorrectionModal
        title={t("Correct content for this post")}
        originalText={post?.text || ""}
        open={isOpenCorrectModal}
        setOpen={setIsOpenCorrectModal}
        onOk={handleSubmitCorrection}
        width={700}
        postId={postId}
        refetch={refetch}
      />
      <PostFormModal
        editPostId={editPostId}
        setEditPostId={setEditPostId}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        handleOk={handleEditOk}
        handleCancel={handleEditCancel}
      />
    </>
  );
};

const modalBodyStyle: React.CSSProperties = {
  borderBottom: "1px solid #e8e8e8",
};

export default PostModal;
