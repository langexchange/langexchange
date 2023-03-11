import { Button, message, Modal, Space, Tag, Typography } from "antd";
import VocabularyList from "./VocabularyList";
import { PlusOutlined } from "@ant-design/icons";

const VocabularyModal = ({
  vocabularySet,
  isModalVocabularyOpen,
  setIsModalVocabularyOpen,
}: any) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleCollect = () => {
    setIsModalVocabularyOpen(false);
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const handleCancel = () => {
    setIsModalVocabularyOpen(false);
  };

  return (
    <>
      {contextHolder}
      {vocabularySet && (
        <Modal
          open={isModalVocabularyOpen}
          onCancel={handleCancel}
          width={800}
          wrapClassName="pv-32"
          style={{
            top: 0,
            maxHeight: "100%",
          }}
          className="d-flex flex-column modal-with-content-scroll"
          footer={[
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCollect}
            >
              Collect this!
            </Button>,
          ]}
          title={
            <Space align="start" direction="vertical">
              <Space align="center">
                <Typography.Title level={4} className="m-0">
                  {vocabularySet.title}
                </Typography.Title>
                <Tag color="magenta">
                  {vocabularySet.vocabularies.length} vocabularies
                </Tag>
              </Space>
              <Space>
                <Space>
                  Term:
                  <Tag color="blue">{vocabularySet.termLanguage}</Tag>
                </Space>
                <Space>
                  Define:
                  <Tag color="green">{vocabularySet.definitionLanguage}</Tag>
                </Space>
              </Space>
            </Space>
          }
        >
          <VocabularyList vocabularies={vocabularySet.vocabularies} />
        </Modal>
      )}
    </>
  );
};

export default VocabularyModal;
