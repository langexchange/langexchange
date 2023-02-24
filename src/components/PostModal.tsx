import { Button, Col, Modal, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import CommentList from "./CommentList";
import PostCard from "./PostCard";
import { SendOutlined } from "@ant-design/icons";

const onTextInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  console.log("Change:", e.target.value);
};

const PostModal = ({ post, isModalOpen, setIsModalOpen }: any) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      width={800}
      wrapClassName="pv-32"
      style={{
        top: 0,
        maxHeight: "100%",
      }}
      bodyStyle={{
        height: "100%",
        overflowY: "scroll",
      }}
      className="d-flex flex-column modal-with-content-scroll"
      footer={[
        <Row gutter={12}>
          <Col flex="auto">
            <TextArea
              showCount
              maxLength={100}
              onChange={onTextInputChange}
              placeholder="Write your comment..."
              allowClear
            />
          </Col>
          <Col flex="none">
            <Button
              size="large"
              shape="circle"
              icon={<SendOutlined />}
              type="primary"
            />
          </Col>
        </Row>,
      ]}
    >
      <PostCard
        {...post}
        hoverable={false}
        bordered={false}
        boxShadow={false}
        correctable={true}
      />
      <CommentList />
    </Modal>
  );
};

export default PostModal;
