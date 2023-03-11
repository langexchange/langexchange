import {
  Button,
  Input,
  message,
  Modal,
  Popover,
  Typography,
  Upload,
  UploadFile,
} from "antd";
import { useEffect, useRef, useState } from "react";
import {
  Comment,
  useUpdateCommentMutation,
} from "../services/comment/commentService";
import { UploadOutlined, SmileOutlined } from "@ant-design/icons";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useAppSelector } from "../hooks/hooks";
import { selectCredentials } from "../features/auth/authSlice";
import { AttachedFile } from "../services/post/postService";
import { RcFile } from "antd/es/upload";
import { useUploadFileMutation } from "../services/upload/uploadService";

interface UpdateCommentModalProps {
  editComment: Comment | null;
  refetch: () => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  setEditComment: (value: Comment | null) => void;
}
const UpdateCommentModal: React.FC<UpdateCommentModalProps> = ({
  editComment,
  refetch,
  open,
  setOpen,
  setEditComment,
}) => {
  const [audioFileList, setAudioFileList] = useState<UploadFile[]>([]);
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [uploadFiles, { isLoading: isUploading }] = useUploadFileMutation();
  const credentials = useAppSelector(selectCredentials);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>(editComment?.text || "");

  const changeText = (e: any) => {
    setText(e.target.value);
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
        if (file?.status === "done") return;
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
        if (file?.status === "done") return;
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

  const handleSelectEmoji = (values: any) => {
    setText(text + values.native);
  };

  const [isUpLoading, setIsUpLoading] = useState<boolean>(false);
  const [updateComment, { isLoading: isUpdating }] = useUpdateCommentMutation();

  const handleOk = async () => {
    if (!credentials?.incId) return;
    if (!credentials?.userId) return;
    if (!editComment?.commentId) return;

    if (!text && imageFileList.length === 0 && audioFileList.length === 0) {
      message.error("Please enter your comment");
      return;
    }

    try {
      setIsUpLoading(true);
      let audiocmts: AttachedFile[] = [];
      let imagecmts: AttachedFile[] = [];
      audioFileList.forEach((item) => {
        if (!item.url) return;
        if (item.status === "done") {
          audiocmts.push({
            type: "audio",
            url: item.url,
          });
        }
      });
      imageFileList.forEach((item) => {
        if (!item.url) return;
        if (item.status === "done") {
          imagecmts.push({
            type: "image",
            url: item.url,
          });
        }
      });
      const result = await handleUpload();
      setIsUpLoading(false);
      audiocmts = audiocmts.concat(result?.audiocmts as never[]);
      imagecmts = imagecmts.concat(result?.imagecmts as never[]);
      const commentId = await updateComment({
        userId: credentials.userId,
        commentId: editComment.commentId,
        postId: editComment.postId,
        body: {
          text: text,
          correctcmt: editComment.correctcmt,
          audiocmts: audiocmts,
          imagecmts: imagecmts,
        },
      });

      setOpen(false);
      refetch();
      setEditComment(null);
      setImageFileList([]);
      setAudioFileList([]);
    } catch (error) {
      setIsUpLoading(false);
      message.error("Create comment failed");
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setEditComment(null);
    setAudioFileList([]);
    setImageFileList([]);
  };

  useEffect(() => {
    if (editComment) {
      const listAudio: UploadFile[] = [];

      editComment.audiocmts?.forEach((item, index) => {
        listAudio.push({
          uid: index.toString(),
          name: "Audio_" + index.toString(),
          status: "done",
          url: item.url,
        });
      });
      setAudioFileList(listAudio);

      const listImage: UploadFile[] = [];

      editComment.imagecmts?.forEach((item, index) => {
        listImage.push({
          uid: index.toString(),
          name: "Image_" + index.toString(),
          status: "done",
          url: item.url,
        });
      });
      setImageFileList(listImage);
      setText(editComment.text);
    }
  }, [editComment]);

  return (
    <Modal
      title="Edit comment"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isUploading || isUpdating}
    >
      {audioFileList && (
        <div className="mb-3">
          <div className="mb-2">
            <Typography.Text strong={true}>Audio</Typography.Text>
          </div>
          <Upload
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
            <Button size="small" icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>
        </div>
      )}
      {imageFileList && (
        <div className="mb-3">
          <div className="mb-2">
            <Typography.Text strong={true}>Images</Typography.Text>
          </div>
          <Upload
            listType="picture-card"
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
            + Upload
          </Upload>
        </div>
      )}
      <div className="mb-2">
        <Typography.Text strong={true}>Content</Typography.Text>
      </div>
      <div className="pos-relative">
        <div
          className="pos-absolute"
          style={{ zIndex: 2, bottom: 0, right: 0 }}
        >
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
        </div>
        <Input.TextArea
          className="pb-4"
          ref={inputRef}
          value={text}
          onChange={changeText}
          autoSize
        />
      </div>
    </Modal>
  );
};

export default UpdateCommentModal;
