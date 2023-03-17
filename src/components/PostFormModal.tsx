import { SmileOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  message,
  Modal,
  Popover,
  Skeleton,
  Space,
  Switch,
  Upload,
  UploadFile,
} from "antd";
import { useEffect, useRef, useState } from "react";
import SeclectLanguageInput from "./SeclectLanguageInput";
import TagsInput from "./TagsInput";
import UploadAudio from "./UploadAudio";
import UploadImage from "./UploadImage";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import type { InputRef } from "antd";
import { useTranslation } from "react-i18next";
import { RcFile } from "antd/lib/upload/interface";
import { useUploadFileMutation } from "../services/upload/uploadService";
import { selectCredentials } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks/hooks";
import {
  AttachedFile,
  useCreatePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
} from "../services/post/postService";

const initialPost = {
  langId: "",
  text: "",
  label: "",
  isTurnOffCorrection: false,
  isTurnOffComment: false,
  isTurnOffShare: false,
  isPublic: true,
};
const initialTags: string[] = [];

interface PostFormModalProps {
  editPostId?: string | null;
  setEditPostId?: (value: string | null) => void;
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const PostFormModal: React.FC<PostFormModalProps> = ({
  editPostId = null,
  setEditPostId,
  setIsModalOpen,
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const [t] = useTranslation(["commons"]);
  const inputRef = useRef<InputRef>(null);
  const [post, setPost] = useState(initialPost);
  const [tags, setTags] = useState(initialTags);
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [audioFileList, setAudioFileList] = useState<UploadFile[]>([]);
  const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);
  const [uploadFiles, { isLoading }] = useUploadFileMutation();
  const [createPost, { isLoading: isCreatingPost }] = useCreatePostMutation();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const credentials = useAppSelector(selectCredentials);
  const [updatePost, { isLoading: isUpdatingPost }] = useUpdatePostMutation();

  const {
    data: fetchPost,
    isLoading: isPostDetailLoading,
    refetch: refetchPostDetail,
    isFetching: isPostDetailFetching,
  } = useGetPostQuery(editPostId, {
    skip: !editPostId,
  });

  useEffect(() => {
    if (!isModalOpen || !inputRef.current) return;
    setTimeout(() => {
      inputRef.current!.focus({
        cursor: "end",
      });
    }, 200);
  }, [isModalOpen, inputRef.current]);

  useEffect(() => {
    if (!fetchPost) return;
    setPost(fetchPost);
    setTags(fetchPost.labels);
    const listAudio: UploadFile[] = [];
    const listVideo: UploadFile[] = [];
    const listImage: UploadFile[] = [];
    fetchPost.audioPost?.forEach((item, index) => {
      listAudio.push({
        uid: index.toString(),
        name: "Audio_" + index.toString(),
        status: "done",
        url: item.url,
      });
    });
    fetchPost.videoPost?.forEach((item, index) => {
      listVideo.push({
        uid: index.toString(),
        name: "Video_" + index.toString(),
        status: "done",
        url: item.url,
      });
    });
    fetchPost.imagePost?.forEach((item, index) => {
      listImage.push({
        uid: index.toString(),
        name: "Image_" + index.toString(),
        status: "done",
        url: item.url,
      });
    });
    setAudioFileList(listAudio);
    setVideoFileList(listVideo);
    setImageFileList(listImage);
  }, [fetchPost, isPostDetailLoading]);

  const handlePostValueChange = (key: string, value: any) => {
    setPost((prev) => ({ ...prev, [key]: value }));
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleSelectEmoji = (values: any) => {
    handlePostValueChange("text", post.text + values.native);
  };

  const handleUpload = async () => {
    if (!credentials?.incId) return;

    const returnData = {
      imagePost: [] as AttachedFile[],
      audioPost: [] as AttachedFile[],
      videoPost: [] as AttachedFile[],
    };
    if (imageFileList.length > 0) {
      const formData = new FormData();
      imageFileList.forEach((file) => {
        if (file.status === "done" && file.url) {
          returnData.imagePost.push({
            type: "image",
            url: file.url,
          });
          return;
        }
        formData.append("files[]", file as RcFile);
      });

      try {
        const result = await uploadFiles({
          type: "image",
          userId: credentials.incId,
          body: formData,
        }).unwrap();
        result.forEach((item) => {
          returnData.imagePost.push({
            type: "image",
            url: item.url,
          });
        });
      } catch (error) {
        message.error("Upload image failed");
      }
    }
    // upload audio
    if (audioFileList.length > 0) {
      const formData = new FormData();
      audioFileList.forEach((file) => {
        if (file.status === "done" && file.url) {
          returnData.audioPost.push({
            type: "audio",
            url: file.url,
          });
          return;
        }
        formData.append("files[]", file as RcFile);
      });

      try {
        const result = await uploadFiles({
          type: "audio",
          userId: credentials.incId,
          body: formData,
        }).unwrap();
        result.forEach((item) => {
          returnData.audioPost.push({
            type: "audio",
            url: item.url,
          });
        });
      } catch (error) {
        message.error("Upload audio failed");
      }
    }
    // upload video
    if (videoFileList.length > 0) {
      const formData = new FormData();
      videoFileList.forEach((file) => {
        if (file.status === "done" && file.url) {
          returnData.videoPost.push({
            type: "video",
            url: file.url,
          });
          return;
        }
        formData.append("files[]", file as RcFile);
      });

      try {
        const result = await uploadFiles({
          type: "video",
          userId: credentials.incId,
          body: formData,
        }).unwrap();
        result.forEach((item) => {
          returnData.videoPost.push({
            type: "video",
            url: item.url,
          });
        });
      } catch (error) {
        message.error("Upload video failed");
      }
    }
    return returnData;
  };

  const handleSubmit = async () => {
    if (!credentials?.userId) {
      message.error("Please login to post!");
      return;
    }

    if (
      !post.text &&
      imageFileList.length === 0 &&
      audioFileList.length === 0 &&
      videoFileList.length === 0
    ) {
      message.error("Post must have text or media!");
      return;
    }
    if (!post.langId) {
      message.error("Please select language!");
      return;
    }
    setUploading(true);
    try {
      const files = await handleUpload();
      setUploading(false);
      if (editPostId) {
        const postId = await updatePost({
          userId: credentials.userId,
          postId: editPostId,
          body: {
            ...post,
            ...files,
            labels: tags,
          },
        });
        message.success("Update post successfully!");
      } else {
        const postId = await createPost({
          userId: credentials.userId,
          body: {
            ...post,
            ...files,
            labels: tags,
          },
        }).unwrap();
        message.success("Create post successfully!");
      }
      setIsModalOpen(false);
      setPost(initialPost);
      setImageFileList([]);
      setAudioFileList([]);
      setVideoFileList([]);
      setEditPostId && setEditPostId(null);
      setTags(initialTags);
    } catch (error) {
      setUploading(false);
      message.error("Create post failed!");
    }
  };

  return (
    <Skeleton loading={isPostDetailLoading} active>
      <Modal
        title={
          <div className="d-flex align-items-center gap-3">
            <span className="fz-18">
              {editPostId ? "Edit post" : t("New post")}
            </span>
            <SeclectLanguageInput
              showArrow={true}
              showSearch={true}
              size="small"
              placeholder={
                <span className="text-300 fz-14" style={{ color: "#bfbfbf" }}>
                  {t("languages")}
                </span>
              }
              dropdownMatchSelectWidth={false}
              value={post.langId || null}
              onChange={(value: string) =>
                handlePostValueChange("langId", value)
              }
            />
            <TagsInput
              tags={tags || []}
              setTags={setTags}
              tagColor="magenta"
              placeholder={t("Add topic").toString()}
              borderStyle="dashed"
              placeholderStyle={{
                fontSize: "14px",
                fontWeight: 300,
                color: "#bfbfbf",
              }}
              limit={1}
            />
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        footer={[]}
      >
        <Input.TextArea
          allowClear
          bordered={false}
          placeholder={t("Share something here...").toString()}
          autoSize={{ minRows: 4, maxRows: 20 }}
          size="large"
          className="mb-3 input-font-large-placeholder"
          ref={inputRef}
          onChange={(e) => handlePostValueChange("text", e.target.value)}
          value={post.text}
        />
        <div className="pos-relative text-right mb-3">
          <UploadAudio
            fileList={[...audioFileList, ...videoFileList]}
            onRemove={(file) => {
              console.log(file.type);
              if (file?.type?.includes("video")) {
                const index = videoFileList.indexOf(file);
                const newFileList = videoFileList.slice();
                newFileList.splice(index, 1);
                setVideoFileList(newFileList);
              } else if (file?.type?.includes("audio")) {
                const index = audioFileList.indexOf(file);
                const newFileList = audioFileList.slice();
                newFileList.splice(index, 1);
                setAudioFileList(newFileList);
              }
            }}
            beforeUpload={(file) => {
              const isRightFormat =
                file.type.includes("video") || file.type.includes("audio");
              if (!isRightFormat) {
                message.error(`${file.name} is not a audio/video file`);
                return Upload.LIST_IGNORE;
              }

              if (file.type.includes("video")) {
                setVideoFileList([...videoFileList, file]);
              } else if (file.type.includes("audio")) {
                setAudioFileList([...audioFileList, file]);
              }

              return false;
            }}
          />
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
            title="Title"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            className="pos-absolute"
          >
            <Button
              type="text"
              shape="round"
              style={{ top: 0, right: "76px", zIndex: 2 }}
              className="btn-text-warning"
              icon={<SmileOutlined style={{ fontSize: "16px" }} />}
            />
          </Popover>
          <Space
            className="pos-absolute"
            align="center"
            style={{
              left: 0,
              top: "4px",
              // transform: "translateY(-50%)",
            }}
          >
            <Switch
              checkedChildren="Public"
              unCheckedChildren="Private"
              defaultChecked
              checked={post.isPublic}
              onChange={(checked: boolean) =>
                handlePostValueChange("isPublic", checked)
              }
            />
            <Switch
              checkedChildren="Correct on"
              unCheckedChildren="Correct off"
              defaultChecked
              checked={!post.isTurnOffCorrection}
              onChange={(checked: boolean) =>
                handlePostValueChange("isTurnOffCorrection", !checked)
              }
            />
            <Switch
              checkedChildren="Share on"
              unCheckedChildren="Share off"
              defaultChecked
              checked={!post.isTurnOffShare}
              onChange={(checked: boolean) =>
                handlePostValueChange("isTurnOffShare", !checked)
              }
            />
          </Space>
        </div>
        <UploadImage
          fileList={imageFileList}
          onRemove={(file) => {
            const index = imageFileList.indexOf(file);
            const newFileList = imageFileList.slice();
            newFileList.splice(index, 1);
            setImageFileList(newFileList);
          }}
          beforeUpload={(file) => {
            const isPNG = file.type.includes("image");
            if (!isPNG) {
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
          setFileList={setImageFileList}
        />
        <Button
          loading={uploading || isLoading || isCreatingPost}
          size="large"
          block
          type="primary"
          onClick={handleSubmit}
        >
          {isCreatingPost
            ? "Creating post..."
            : isLoading || uploading
              ? "Uploading files..."
              : t("New post")}
        </Button>
      </Modal>
    </Skeleton>
  );
};

export default PostFormModal;
