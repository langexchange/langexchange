import { SmileOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import SeclectLanguageInput from "./SeclectLanguageInput";
import TagsInput from "./TagsInput";
import UploadAudio from "./UploadAudio";
import UploadImage from "./UploadImage";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Col, InputRef, Row } from "antd";
import { useTranslation } from "react-i18next";
import { selectCredentials } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks/hooks";
import useUploadFile from "../hooks/upload/useUploadFile";
import convertToUploadFilesAntd from "../utils/uploadFiles/convertToUploadFileAntd";
import {
  useCreatePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
} from "../services/post/postService";
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
  refetch?: () => void;
}

const PostFormModal: React.FC<PostFormModalProps> = ({
  editPostId = null,
  setEditPostId,
  setIsModalOpen,
  isModalOpen,
  handleOk,
  handleCancel,
  refetch,
}) => {
  const [t] = useTranslation(["commons"]);
  const inputRef = useRef<InputRef>(null);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [post, setPost] = useState(initialPost);
  const [tags, setTags] = useState(initialTags);
  const credentials = useAppSelector(selectCredentials);
  const [createPost, { isLoading: isCreatingPost }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdatingPost }] = useUpdatePostMutation();
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
  ] = useUploadFile([], credentials.incId, "audio");
  const [
    videoFileList,
    setVideoFileList,
    uploadVideoFiles,
    isUploadVideoFiles,
  ] = useUploadFile([], credentials.incId, "video");

  const {
    data: fetchPost,
    isLoading: isPostDetailLoading,
    // refetch: refetchPostDetail,
    // isFetching: isPostDetailFetching,
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
    setAudioFileList(convertToUploadFilesAntd(fetchPost.audioPost));
    setVideoFileList(convertToUploadFilesAntd(fetchPost.videoPost));
    setImageFileList(convertToUploadFilesAntd(fetchPost.imagePost));
  }, [fetchPost, isPostDetailLoading]);

  const handlePostValueChange = (key: string, value: any) =>
    setPost((prev) => ({ ...prev, [key]: value }));

  const handleOpenChange = (newOpen: boolean) => setOpen(newOpen);
  const handleOpenChange1 = (newOpen: boolean) => setOpen1(newOpen);

  const handleSelectEmoji = (values: any) =>
    handlePostValueChange("text", post.text + values.native);

  const handleUpload = async () => {
    try {
      const imagePost = await uploadImageFiles();
      const audioPost = await uploadAudioFiles();
      const videoPost = await uploadVideoFiles();
      return { imagePost, audioPost, videoPost };
    } catch (error) {
      message.error("Upload files failed");
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!credentials?.userId) return;

    if (
      !post.text &&
      imageFileList.length === 0 &&
      audioFileList.length === 0 &&
      videoFileList.length === 0
    )
      return message.error("Post must have text or media!");

    if (!post.langId) {
      message.error("Please select language!");
      return;
    }

    try {
      const files = await handleUpload();
      const postData: any = {
        userId: credentials.userId,
        body: { ...post, ...files, labels: tags },
      };

      if (editPostId) {
        postData.postId = editPostId;
        await updatePost(postData).unwrap();
        message.success("Update post successfully!");
      } else {
        await createPost(postData).unwrap();
        message.success("Create post successfully!");
      }
      refetch && refetch();
      setIsModalOpen(false);
      setPost(initialPost);
      setImageFileList([]);
      setAudioFileList([]);
      setVideoFileList([]);
      setEditPostId && setEditPostId(null);
      setTags(initialTags);
    } catch (error) {
      message.error("Create post failed!");
    }
  };

  const isHandling =
    isCreatingPost ||
    isUpdatingPost ||
    isUploadImageFiles ||
    isUploadAudioFiles ||
    isUploadVideoFiles;

  return (
    <Skeleton loading={isPostDetailLoading} active>
      <Modal
        title={
          <Row gutter={12}>
            <Col>
              <span className="fz-18">
                {editPostId ? "Edit post" : t("New post")}
              </span>
            </Col>
            <Col>
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
                allLanguages={false}
                exceptLanguages={[]}
                className="me-2"
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
            </Col>
          </Row>
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
        <Row>
          <Col xs={0} sm={24}>
            <div className="pos-relative text-right mb-3">
              <UploadAudio
                fileList={[...audioFileList, ...videoFileList]}
                onRemove={(file) => {
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
                  shape="circle"
                  style={{ top: 0, right: "70px", zIndex: 2 }}
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
                  onChange={(checked: boolean) => {
                    handlePostValueChange("isTurnOffCorrection", !checked);
                  }}
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
          </Col>
          <Col xs={24} sm={0}>
            <div className="">
              <Space align="center" className="w-100 justify-space-between">
                <Space align="center">
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
                    onChange={(checked: boolean) => {
                      handlePostValueChange("isTurnOffCorrection", !checked);
                    }}
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
                  open={open1}
                  onOpenChange={handleOpenChange1}
                  className="p-0"
                >
                  <Button
                    type="text"
                    shape="circle"
                    className="btn-text-warning"
                    icon={<SmileOutlined style={{ fontSize: "16px" }} />}
                  />
                </Popover>
              </Space>
              <div className="text-center">
                <UploadAudio
                  fileList={[...audioFileList, ...videoFileList]}
                  onRemove={(file) => {
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
                      file.type.includes("video") ||
                      file.type.includes("audio");
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
              </div>
            </div>
          </Col>
        </Row>

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
          onChange={undefined}
        />
        <Button
          loading={isHandling}
          size="large"
          block
          type="primary"
          onClick={handleSubmit}
        >
          {isHandling
            ? "Processing..."
            : editPostId
              ? "Update post"
              : t("New post")}
        </Button>
      </Modal>
    </Skeleton>
  );
};

export default PostFormModal;
