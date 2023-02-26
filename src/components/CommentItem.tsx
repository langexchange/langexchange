import { Avatar, Button, Col, Row, Space, Typography } from "antd";
import { HeartOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import Diff from "./Diff";
import Comment from "../types/Comment";

const CommentItem: React.FC<Comment> = ({
  id,
  owner,
  numHearts,
  content,
  createdAt,
  type,
}) => {
  return (
    <Space align="start">
      <Avatar size="large" src={owner.avatar} />
      <Space
        className="has-background-color py-2 px-3 rounded-4"
        direction="vertical"
      >
        <Typography.Text strong={true}>{owner.fullname}</Typography.Text>
        <Typography.Paragraph>
          {type === "corrected" ? (
            <Diff
              originalText={content}
              correctedText={content.replace("A", "abcdedit")}
            />
          ) : (
            <span>content</span>
          )}
        </Typography.Paragraph>
        <Row align="middle">
          <Col flex="auto">
            <Space>
              <Space size={0}>
                <Button
                  type="text"
                  icon={<HeartOutlined />}
                  shape="circle"
                  danger
                />
                <Typography.Text type="danger">{numHearts}</Typography.Text>
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
                className="btn-text-secondary secondary-color"
              />
            </Space>
          </Col>
          <Col flex="none">
            <Typography.Text
              type="secondary"
              className="float-right ms-4 fz-12 text-500"
            >
              {createdAt}
            </Typography.Text>
          </Col>
        </Row>
      </Space>
    </Space>
  );
};

export default CommentItem;
