import { Button, Input, message, Modal, ModalProps, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import Diff from "./Diff";
import type { InputRef } from "antd";
import { useTranslation } from "react-i18next";
import { useCreateCommentMutation } from "../services/comment/commentService";
import { useAppSelector } from "../hooks/hooks";
import { selectCredentials } from "../features/auth/authSlice";

interface CorrectionModalProps extends ModalProps {
  originalText: string;
  setOpen: (isOpen: boolean) => void;
  postId: string | null;
  refetch: () => void;
}

const CorrectionModal: React.FC<CorrectionModalProps> = ({
  originalText,
  setOpen,
  postId,
  refetch,
  ...rest
}) => {
  const [text, setText] = useState<string>(originalText);
  const inputRef = useRef<InputRef>(null);
  const [createComment, { isLoading: isCreatingComment }] =
    useCreateCommentMutation();
  const credentials = useAppSelector(selectCredentials);

  useEffect(() => {
    setText(originalText);
  }, [originalText]);

  useEffect(() => {
    inputRef.current && inputRef.current.focus({ cursor: "end" });
  }, [rest.open]);

  const handleCancel = () => {
    setOpen(false);
    setText(originalText);
  };

  const handleOk = async (
    e: React.MouseEvent<HTMLAnchorElement> & React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!credentials?.userId) return;
    if (!postId) return;

    if (!text) {
      message.error("Please enter your correction");
      return;
    }

    if (text === originalText) {
      message.error("WTF!!! You didn't correct anything");
      return;
    }

    try {
      const commentId = await createComment({
        userId: credentials.userId,
        postId: postId,
        body: {
          text: text,
          correctcmt: originalText,
          audiocmts: [],
          imagecmts: [],
        },
      });
      refetch();
      message.success("Correction submitted");
    } catch (error) {
      message.error("Correct for this post failed");
    }

    if (rest.onOk) {
      setText(originalText);
      rest.onOk(e);
    }
  };
  const [t] = useTranslation(["commons"]);

  return (
    <Modal
      {...rest}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          {t("cancel")}
        </Button>,
        <Button
          key="reset"
          type="primary"
          onClick={() => setText(originalText)}
          className="btn-warning"
        >
          {t("reset")}
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          loading={isCreatingComment}
        >
          {t("submit")}
        </Button>,
      ]}
    >
      <Space direction="vertical">
        {t("Preview")}
        <Diff
          originalText={originalText}
          correctedText={text}
          className="fz-20 text-300 rounded-3 my-0"
          code
          strikeThrough={true}
        />
      </Space>
      <Space direction="vertical" className="width-full mt-2">
        {`${t("Correct")} ${t("here")}`}
        <Input.TextArea
          onChange={(e) => setText(e.target.value)}
          value={text}
          size="large"
          autoSize
          className="fz-18"
          ref={inputRef}
          autoFocus
        />
      </Space>
    </Modal>
  );
};

export default CorrectionModal;
