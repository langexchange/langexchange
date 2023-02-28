import { Button, Input, Modal, ModalProps, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import Diff from "./Diff";
import type { InputRef } from "antd";
import { useTranslation } from "react-i18next";

interface CorrectionModalProps extends ModalProps {
  originalText: string;
  setOpen: (isOpen: boolean) => void;
}

const CorrectionModal: React.FC<CorrectionModalProps> = ({
  originalText,
  setOpen,
  ...rest
}) => {
  const [text, setText] = useState<string>(originalText);
  const inputRef = useRef<InputRef>(null);

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

  const handleOk = (
    e: React.MouseEvent<HTMLAnchorElement> & React.MouseEvent<HTMLButtonElement>
  ) => {
    setText(originalText);
    if (rest.onOk) {
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
        <Button key="submit" type="primary" onClick={handleOk}>
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
