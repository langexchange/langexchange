import { faker } from "@faker-js/faker";
import { Button, List, message, Modal } from "antd";
import VocabularySetMenuItem from "./VocabularySetMenuItem";

interface ModalProps {
  open?: boolean | undefined;
  onOk?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | undefined;
  onCancel?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | undefined;
}

interface VocabularySet {
  owner?: {
    fullname: string;
    color?: string;
    image: string;
  };
  title: string;
  descriptions: string;
  termLanguage: string;
  defineLanguage: string;
}

const sets: VocabularySet[] = [];

for (let i = 0; i < 20; i++) {
  const set: VocabularySet = {
    owner: {
      fullname: faker.name.fullName(),
      image: faker.image.abstract(),
    },
    title: faker.random.words(4),
    descriptions: faker.random.numeric(),
    termLanguage: faker.random.word(),
    defineLanguage: faker.random.word(),
  };

  sets.push(set);
}

const ModalAddToPracticeList = ({ open, onOk, onCancel }: ModalProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };
  return (
    <>
      {contextHolder}
      <Modal
        title="Add vocabulary set to practice list"
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        width={800}
        wrapClassName="pv-32"
        style={{ top: 0, maxHeight: "100%" }}
        bodyStyle={{ height: "100%", overflowY: "scroll" }}
        className="d-flex flex-column modal-with-content-scroll"
      >
        <List
          itemLayout="horizontal"
          // loading={initLoading}
          // loadMore={loadMore}
          dataSource={sets}
          renderItem={(set) => (
            <List.Item
              actions={[
                <Button type="primary" onClick={success}>
                  Add
                </Button>,
              ]}
            >
              <VocabularySetMenuItem
                {...set}
                moreHidden={true}
                progressHidden={true}
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};

export default ModalAddToPracticeList;
