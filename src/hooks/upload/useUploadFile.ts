import { useState } from "react";
import { RcFile } from "antd/es/upload";
import { UploadFile } from "antd";
import { useUploadFileMutation } from "../../services/upload/uploadService";
import { AttachedFile } from "../../services/post/postService";

const useUploadFile = (
  initialFileList: UploadFile[] = [],
  userIncId: string | null = "",
  type: "image" | "audio" | "video"
): [
    UploadFile[],
    React.Dispatch<React.SetStateAction<UploadFile<any>[]>>,
    () => Promise<AttachedFile[]>,
    boolean
  ] => {
  const [upload, { isLoading: isUploading }] = useUploadFileMutation();
  const [fileList, setFileList] = useState<UploadFile[]>(initialFileList);

  const uploadFiles = async () => {
    const formData = new FormData();
    const completedFiles: AttachedFile[] = [];

    fileList.forEach((file) => {
      if (file.status === "done" && file.url) {
        completedFiles.push({
          type: type,
          url: file.url,
        });
      }

      formData.append("files[]", file as RcFile);
    });

    if (fileList.length === 0) return [];
    if (formData.getAll("files[]").length === 0) return completedFiles;
    if (!userIncId || userIncId === "") throw new Error("User not found");

    try {
      const result = await upload({
        type: type,
        userId: userIncId,
        body: formData,
      }).unwrap();

      return [
        ...completedFiles,
        ...result.map((item) => ({ type: item.fileType, url: item.url })),
      ] as AttachedFile[];
    } catch (error) {
      throw error;
    }
  };

  return [fileList, setFileList, uploadFiles, isUploading];
};

export default useUploadFile;
