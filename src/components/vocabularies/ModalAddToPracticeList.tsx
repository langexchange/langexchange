import { faker } from "@faker-js/faker";
import { Button, List, message, Modal } from "antd";
import { useTranslation } from "react-i18next";
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

const ModalAddToPracticeList: React.FC<ModalProps> = ({
  open,
  onOk,
  onCancel,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [t] = useTranslation(["commons"]);

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
        title={t("Add set to practice list", { ns: "vocabulary" })}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        width={800}
        wrapClassName="pv-32"
        style={{ top: 0, maxHeight: "100%" }}
        className="d-flex flex-column modal-with-content-scroll"
        footer={null}
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
                  {t("Add")}
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
