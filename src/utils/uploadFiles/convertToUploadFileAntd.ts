import { UploadFile } from "antd";
import { AttachedFile } from "../../services/post/postService";

export const convertToUploadFileAntd = (file: AttachedFile): UploadFile => {
  const timeNow = Date.now().toString();
  return {
    uid: timeNow,
    name: file.type + timeNow,
    status: "done",
    url: file.url,
    thumbUrl: file.url,
    type: file.type,
  };
};

const convertToUploadFilesAntd = (files: AttachedFile[]): UploadFile[] => {
  let results: UploadFile[] = [];
  files.forEach((item) => {
    results.push(convertToUploadFileAntd(item));
  });
  return results;
};

export default convertToUploadFilesAntd;
