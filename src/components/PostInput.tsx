import { SmileOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Input,
  message,
  Modal,
  Popover,
  Space,
  Spin,
  Switch,
  Upload,
  UploadFile,
} from "antd";
import { useRef, useState } from "react";
import SeclectLanguageInput from "./SeclectLanguageInput";
import TagsInput from "./TagsInput";
import UploadAudio from "./UploadAudio";
import UploadImage from "./UploadImage";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import type { InputRef } from "antd";
import { faker } from "@faker-js/faker";
import { useTranslation } from "react-i18next";
import { RcFile } from "antd/lib/upload/interface";
import { useUploadFileMutation } from "../services/upload/uploadService";
import { selectCredentials } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks/hooks";
import {
  AttachedFile,
  useCreatePostMutation,
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

const PostInput = () => {
  const inputRef = useRef<InputRef>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [audioFileList, setAudioFileList] = useState<UploadFile[]>([]);
  const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);
  const [uploadFiles, { isLoading }] = useUploadFileMutation();
  const [createPost, { isLoading: isCreatingPost }] = useCreatePostMutation();
  const initialTags: string[] = [];
  const [tags, setTags] = useState(initialTags);
  const [open, setOpen] = useState(false);
  const [t] = useTranslation(["commons"]);
  const [post, setPost] = useState(initialPost);
  const [uploading, setUploading] = useState(false);
  const credentials = useAppSelector(selectCredentials);

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
        formData.append("files[]", file as RcFile);
      });

      try {
        const result = await uploadFiles({
          type: "image",
          userId: credentials.incId,
          body: formData,
        }).unwrap();
        returnData.imagePost = result.map((item) => ({
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
        returnData.audioPost = result.map((item) => ({
          type: item.fileType,
          url: item.url,
        })) as never[];
      } catch (error) {
        message.error("Upload audio failed");
      }
    }
    // upload video
    if (videoFileList.length > 0) {
      const formData = new FormData();
      videoFileList.forEach((file) => {
        formData.append("files[]", file as RcFile);
      });

      try {
        const result = await uploadFiles({
          type: "video",
          userId: credentials.incId,
          body: formData,
        }).unwrap();
        returnData.videoPost = result.map((item) => ({
          type: item.fileType,
          url: item.url,
        })) as never[];
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
      console.log(files);
      const postId = await createPost({
        userId: credentials.userId,
        body: {
          ...post,
          ...files,
          label: tags[0],
        },
      }).unwrap();
      console.log(postId);
      message.success("Create post successfully!");
      setIsModalOpen(false);
      setPost(initialPost);
      setImageFileList([]);
      setAudioFileList([]);
      setVideoFileList([]);
      setTags(initialTags);
    } catch (error) {
      setUploading(false);
      message.error("Create post failed!");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      inputRef.current!.focus({
        cursor: "start",
      });
    }, 300);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleSelectEmoji = (values: any) => {
    handlePostValueChange("text", post.text + values.native);
  };

  const handlePostValueChange = (key: string, value: any) => {
    setPost((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Card hoverable size="small" onClick={showModal}>
        <div className="d-flex justify-space-between align-items-center py-1">
          <div className="me-2">
            <Avatar size={44} src={faker.image.abstract()} />
          </div>
          <Button
            block
            size="large"
            className="text-left has-background-color"
            type="text"
            shape="round"
          >
            <span className="text-300 color-secondary">
              {t("post-input-holder")}
            </span>
          </Button>
        </div>
      </Card>
      <Modal
        title={
          <div className="d-flex align-items-center gap-3">
            <span className="fz-18">{t("New post")}</span>
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
              tags={tags}
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
            // setFileList={setImageFileList}
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
    </>
  );
};

export default PostInput;
