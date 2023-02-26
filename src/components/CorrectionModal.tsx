import { Button, Input, Modal, ModalProps, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import Diff from "./Diff";
import type { InputRef } from "antd";

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

  return (
    <Modal
      {...rest}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="reset"
          type="primary"
          onClick={() => setText(originalText)}
          className="btn-warning"
        >
          Reset
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Space direction="vertical">
        Preview:
        <Diff
          originalText={originalText}
          correctedText={text}
          className="fz-20 text-300 rounded-3 my-0"
          code
        />
      </Space>
      <Space direction="vertical" className="width-full mt-2">
        Correct here:
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
