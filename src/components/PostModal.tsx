import { Button, Col, InputRef, message, Modal, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import CommentList from "./CommentList";
import PostCard from "./PostCard";
import { SendOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import CorrectionModal from "./CorrectionModal";
import { useTranslation } from "react-i18next";

const onTextInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  console.log("Change:", e.target.value);
};

const InputComment: React.FC<any> = ({ inputRef, isOpenCorrectModal }) => {
  const [t] = useTranslation(["commons"]);

  useEffect(() => {
    if (isOpenCorrectModal) return;
    inputRef.current?.focus();
  }, [inputRef.current]);

  return (
    <Row gutter={[12, 0]} className="px-4">
      <Col flex="auto">
        <TextArea
          onChange={onTextInputChange}
          placeholder={t("input-comment-placeholder").toString()}
          allowClear
          ref={inputRef}
          autoFocus
          autoSize
          size="large"
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
    </Row>
  );
};

const PostModal = ({ post, isModalOpen, setIsModalOpen }: any) => {
  const [isOpenCorrectModal, setIsOpenCorrectModal] = useState(false);
  const [t] = useTranslation(["commons"]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmitCorrection = () => {
    message.success("Correction submitted");
    setIsOpenCorrectModal(false);
  };
  const handleOpenCorrectModal = () => {
    setIsOpenCorrectModal(true);
  };

  const inputRef = useRef<InputRef>(null);

  return (
    <>
      <Modal
        className="d-flex flex-column t-0 mh-100 modal-small modal-with-content-scroll"
        open={isModalOpen}
        onCancel={handleCancel}
        width={800}
        wrapClassName="pv-32"
        bodyStyle={modalBodyStyle}
        footer={[
          <InputComment
            key="input-comment"
            inputRef={inputRef}
            isOpenCorrectModal={isOpenCorrectModal}
          />,
        ]}
      >
        <PostCard
          {...post}
          hoverable={false}
          bordered={false}
          boxShadow={false}
          correctable={true}
          type="inModal"
          inputRef={inputRef}
          handleOpenCorrectModal={handleOpenCorrectModal}
        />
        <CommentList />
      </Modal>
      <CorrectionModal
        title={t("Correct content for this post")}
        originalText={post?.content || ""}
        open={isOpenCorrectModal}
        setOpen={setIsOpenCorrectModal}
        onOk={handleSubmitCorrection}
        width={700}
      />
    </>
  );
};

const modalBodyStyle: React.CSSProperties = {
  // height: "100%",
};

export default PostModal;
