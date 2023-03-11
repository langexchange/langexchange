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
import TextArea from "antd/es/input/TextArea";
import CommentList from "./CommentList";
import PostCard from "./PostCard";
import {
  SendOutlined,
  AudioOutlined,
  SmileOutlined,
  FileImageOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import CorrectionModal from "./CorrectionModal";
import { useTranslation } from "react-i18next";
import {
  Comment,
  useCreateCommentMutation,
  useGetCommentsQuery,
} from "../services/comment/commentService";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useAppSelector } from "../hooks/hooks";
import { selectCredentials } from "../features/auth/authSlice";
import { AttachedFile } from "../services/post/postService";
import { RcFile } from "antd/es/upload";
import { useUploadFileMutation } from "../services/upload/uploadService";

const InputComment: React.FC<any> = ({
  inputRef,
  isOpenCorrectModal,
  postId,
  refetch,
}) => {
  const [t] = useTranslation(["commons"]);
  const uploadImage = useRef<any>(null);
  const uploadAudio = useRef<any>(null);
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [audioFileList, setAudioFileList] = useState<UploadFile[]>([]);
  const [comment, setComment] = useState<string>("");
  const credentials = useAppSelector(selectCredentials);
  const [uploadFiles, { isLoading: isUploading }] = useUploadFileMutation();
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
    if (!credentials?.incId) return;

    const returnData = {
      audiocmts: [] as AttachedFile[],
      imagecmts: [] as AttachedFile[],
    };
    if (imageFileList.length > 0) {
      const formData = new FormData();
      imageFileList.forEach((file) => {
        formData.append("files[]", file as RcFile);
      });

      try {
        const result = await uploadFiles({
          type: "image",
          userId: credentials.incId,
          body: formData,
        }).unwrap();
        returnData.imagecmts = result.map((item) => ({
          type: item.fileType,
          url: item.url,
        })) as never[];
      } catch (error) {
        message.error("Upload image failed");
      }
    }
    // upload audio
    if (audioFileList.length > 0) {
      const formData = new FormData();
      audioFileList.forEach((file) => {
        formData.append("files[]", file as RcFile);
      });

      try {
        const result = await uploadFiles({
          type: "audio",
          userId: credentials.incId,
          body: formData,
        }).unwrap();
        returnData.audiocmts = result.map((item) => ({
          type: item.fileType,
          url: item.url,
        })) as never[];
      } catch (error) {
        message.error("Upload audio failed");
      }
    }
    return returnData;
  };

  const [isUpLoading, setIsUpLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!credentials?.incId) return;
    if (!credentials?.userId) return;

    if (!comment && imageFileList.length === 0 && audioFileList.length === 0) {
      message.error("Please enter your comment");
      return;
    }

    try {
      setIsUpLoading(true);
      const result = await handleUpload();
      setIsUpLoading(false);
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
      setIsUpLoading(false);
      message.error("Create comment failed");
    }
  };

  return (
    <Spin
      spinning={isUpLoading || isCreatingComment}
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

const PostModal = ({ post, isModalOpen, setIsModalOpen }: any) => {
  const [isOpenCorrectModal, setIsOpenCorrectModal] = useState(false);
  const [t] = useTranslation(["commons"]);
  const [commentList, setCommentList] = useState<Comment[]>([]);

  const deleteCommentInList = (id: string) => {
    setCommentList((prev) => prev.filter((item) => item.commentId !== id));
  };

  const {
    data: comments,
    isLoading,
    refetch,
  } = useGetCommentsQuery(post?.postId, {
    skip: !post?.postId,
  });

  const handleCancel = () => {
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
    if (comments) {
      const sortedComment = [...comments].sort(
        (a, b) =>
          new Date(b.updatedAt || b.createdAt).getTime() -
          new Date(a.updatedAt || a.createdAt).getTime()
      );

      setCommentList(sortedComment);
    }
  }, [comments, isLoading]);

  const sortComments = (value: any) => {
    if (!comments) return;
    let sortComments = [...comments];
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
        footer={[
          <InputComment
            key="input-comment"
            inputRef={inputRef}
            isOpenCorrectModal={isOpenCorrectModal}
            postId={post?.postId}
            refetch={refetch}
          />,
        ]}
      >
        <PostCard
          {...post}
          hoverable={false}
          bordered={false}
          boxShadow={false}
          correctable={true}
          type="inModal"
          inputRef={inputRef}
          handleOpenCorrectModal={handleOpenCorrectModal}
        />
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
            />
          </Skeleton>
        </div>
      </Modal>
      <CorrectionModal
        title={t("Correct content for this post")}
        originalText={post?.text || ""}
        open={isOpenCorrectModal}
        setOpen={setIsOpenCorrectModal}
        onOk={handleSubmitCorrection}
        width={700}
        postId={post?.postId}
        refetch={refetch}
      />
    </>
  );
};

const modalBodyStyle: React.CSSProperties = {
  borderBottom: "1px solid #e8e8e8",
};

export default PostModal;
