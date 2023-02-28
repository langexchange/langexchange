import { SmileOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Input, Modal, Popover, Row } from "antd";
import { useRef, useState } from "react";
import SeclectLanguageInput from "./SeclectLanguageInput";
import TagsInput from "./TagsInput";
import UploadAudio from "./UploadAudio";
import UploadImage from "./UploadImage";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import type { InputRef } from "antd";
import { faker } from "@faker-js/faker";
import { useTranslation } from "react-i18next";

const PostInput = () => {
  const inputRef = useRef<InputRef>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialTags: string[] = [];
  const [tags, setTags] = useState(initialTags);
  const [open, setOpen] = useState(false);
  const [t] = useTranslation(["commons"]);

  const showModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      inputRef.current!.focus({
        cursor: "start",
      });
    }, 300);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <>
      <Card hoverable size="small" onClick={showModal}>
        <div className="d-flex justify-space-between align-items-center py-1">
          <div className="me-2">
            <Avatar size={44} src={faker.image.abstract()} />
          </div>
          <Button
            block
            size="large"
            className="text-left has-background-color"
            type="text"
            shape="round"
          >
            <span className="text-300 color-secondary">
              {t("post-input-holder")}
            </span>
          </Button>
        </div>
      </Card>
      <Modal
        title={
          <Row align="middle" gutter={8}>
            <Col flex="none">{t("New post")}</Col>
            <Col flex="none">
              <SeclectLanguageInput
                bordered={false}
                showArrow={true}
                showSearch={true}
                size="small"
                mode="multiple"
                placeholder={
                  <span className="text-300 fz-14" style={{ color: "#bfbfbf" }}>
                    {t("languages")}
                  </span>
                }
                width="100%"
                style={{ minWidth: "110px" }}
                className="select-with-no-padding-y"
              />
            </Col>
            <Col flex="auto" className="d-flex align-items-center">
              <TagsInput
                tags={tags}
                setTags={setTags}
                tagColor="green"
                placeholder={t("Add topic").toString()}
                borderStyle="none"
                placeholderStyle={{
                  fontSize: "14px",
                  fontWeight: 300,
                  color: "#bfbfbf",
                }}
              />
            </Col>
          </Row>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        footer={[]}
      >
        <Input.TextArea
          allowClear
          bordered={false}
          placeholder={t("Share something here...").toString()}
          autoSize={{ minRows: 4, maxRows: 20 }}
          size="large"
          className="mb-3 input-font-large-placeholder"
          ref={inputRef}
        />
        <div className="pos-relative text-left mb-3">
          <UploadAudio />
          <Popover
            content={
              <div>
                <Picker data={data} onEmojiSelect={console.log} theme="light" />
              </div>
            }
            title="Title"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            className="pos-absolute"
          >
            <Button
              type="text"
              shape="circle"
              style={{ top: 0, left: "40px", zIndex: 2 }}
              className="btn-text-warning"
              icon={<SmileOutlined style={{ fontSize: "24px" }} />}
            />
          </Popover>
        </div>
        <UploadImage />
        <Button size="large" block type="primary">
          {t("New post")}
        </Button>
      </Modal>
    </>
  );
};

export default PostInput;
