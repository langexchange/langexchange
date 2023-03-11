import React from "react";
import { AudioOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Space, UploadProps } from "antd";
import { Button, message, Upload } from "antd";

const defaultProps: UploadProps = {
  name: "file",
  onChange(info) {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  progress: {
    strokeColor: {
      "0%": "#108ee9",
      "100%": "#87d068",
    },
    strokeWidth: 3,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
};

const UploadAudio: React.FC<UploadProps> = (props) => (
  <Upload {...defaultProps} {...props}>
    <Button
      type="text"
      icon={
        <Space size="small">
          <AudioOutlined className="fz-16" />
          <VideoCameraOutlined className="fz-16" />
        </Space>
      }
      shape="round"
      className="btn-text-success"
    />
  </Upload>
);

export default UploadAudio;
