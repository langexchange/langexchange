import {
  FileImageOutlined,
  FileTextOutlined,
  AudioOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Divider, Input, Space, Typography } from "antd";

const PostInput = () => {
  return (
    <Card bodyStyle={{ padding: "12px 24px" }}>
      <div className="d-flex align-items-center justify-space-between">
        <Avatar style={{ marginRight: "8px" }} size="large">
          T
        </Avatar>
        <Input
          size="large"
          placeholder="Let's share something to practice together..."
        />
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div className="d-flex align-items-center justify-space-around">
        <Button type="text">
          <Space>
            <FileImageOutlined className="fz-20 color-danger" />
            <Typography.Text type="secondary" strong={true}>
              Pictures/Videos
            </Typography.Text>
          </Space>
        </Button>
        <Button type="text">
          <Space>
            <FileTextOutlined className="fz-20 color-warning" />
            <Typography.Text type="secondary" strong={true}>
              Templates
            </Typography.Text>
          </Space>
        </Button>
        <Button type="text">
          <Space>
            <AudioOutlined className="fz-20 color-success" />
            <Typography.Text type="secondary" strong={true}>
              Audio records
            </Typography.Text>
          </Space>
        </Button>
      </div>
    </Card>
  );
};

export default PostInput;
