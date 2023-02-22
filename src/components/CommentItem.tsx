import { Avatar, Button, Col, Row, Space, Typography } from "antd";
import { HeartOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import Diff from "./Diff";

interface CommentProps {
  owner: {
    fullname: string;
    color: string;
    image: string;
  };
  heartNumber: number;
  contents: string;
  time: string;
}

const CommentItem = ({ owner, heartNumber, contents, time }: CommentProps) => {
  return (
    <Space align="start">
      <Avatar size="large" />
      <Space
        direction="vertical"
        style={{
          backgroundColor: "#f0f2f5",
          borderRadius: "18px",
          padding: "8px 12px",
        }}
      >
        <Typography.Text strong={true}>{owner.fullname}</Typography.Text>
        <Typography.Paragraph>
          <Diff
            originalText={contents}
            correctedText={contents.replace("A", "abcdedit")}
          />
        </Typography.Paragraph>
        <Row>
          <Col flex="auto">
            <Space>
              <Space size={0}>
                <Button
                  type="text"
                  icon={<HeartOutlined />}
                  danger
                  shape="circle"
                />
                <Typography.Text type="danger">{heartNumber}</Typography.Text>
              </Space>
              <Button
                type="text"
                icon={<EditOutlined />}
                className="btn-text-warning"
                shape="circle"
              />
              <Button
                type="text"
                icon={<MoreOutlined rotate={90} />}
                shape="circle"
                className="btn-text-secondary"
              />
            </Space>
          </Col>
          <Col flex="none">
            <Typography.Text type="secondary" style={{ float: "right" }}>
              {time}
            </Typography.Text>
          </Col>
        </Row>
      </Space>
    </Space>
  );
};

export default CommentItem;
