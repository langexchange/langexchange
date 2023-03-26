import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { message, Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { useTranslation } from "react-i18next";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface UploadImageProps extends UploadProps {
  setFileList?: (fileList: UploadFile[]) => void;
  limit?: number;
  aspect?: number;
  shape?: "rect" | "round";
}

const UploadImage: React.FC<UploadImageProps> = ({
  fileList,
  aspect,
  shape,
  setFileList,
  limit,
  ...props
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileListAlt, setFileListAlt] = useState<UploadFile[]>([]);

  if (!fileList && !setFileList) {
    fileList = fileListAlt;
    setFileList = setFileListAlt;
  }
  const [t] = useTranslation(["commons"]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({
    file,
    fileList: newFileList,
  }) => {
    if (setFileList) setFileList(newFileList);

    if (file.status === "done") {
      message.success(`${file.name} file uploaded successfully`);
    } else if (file.status === "error") {
      message.error(`${file.name} file upload failed.`);
    }
  };

  const uploadButton = (
    <div style={{ width: "100%" }}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{t("Upload")}</div>
    </div>
  );

  return (
    <>
      <ImgCrop
        rotationSlider
        quality={1}
        aspect={aspect || 16 / 9}
        aspectSlider
        showReset
        modalWidth={700}
        cropShape={shape || "rect"}
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          // onChange={handleChange}
          {...props}
        >
          {Number(fileList?.length) >= (limit || 8) ? null : uploadButton}
        </Upload>
      </ImgCrop>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadImage;
