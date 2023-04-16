import { memo, useCallback, useMemo, useRef } from "react";
import { Card, Space, Typography } from "antd";
import { List, arrayMove } from "react-movable";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import CardAddVocabulary from "./CardAddVocabulary";
import { VocabularyForm } from "../../pages/vocabularies/VocabularyCreatePage";

interface ListCardAddVocabularyProps {
  items: VocabularyForm[];
  setItems: React.Dispatch<React.SetStateAction<VocabularyForm[]>>;
}

const ListCardAddVocabulary: React.FC<ListCardAddVocabularyProps> = ({
  items,
  setItems,
}) => {
  const addCard = useCallback(() => {
    setItems((prev) => {
      return [
        ...prev,
        {
          term: "",
          define: "",
          imageUrl: "",
          fileList: [],
          error: false,
        },
      ];
    });
  }, []);

  const removeCard = useCallback((key: number) => {
    setItems((prev) => {
      return prev.filter((_, index) => index !== key);
    });
  }, []);

  return (
    <>
      <List
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          setItems(arrayMove(items, oldIndex, newIndex))
        }
        renderList={({ children, props }) => (
          <div {...props} style={{ listStyleType: "none", padding: 0 }}>
            {children}
          </div>
        )}
        renderItem={({ value, props }) => (
          <div key={props.key} className="my-3" {...props}>
            <CardAddVocabulary
              value={value}
              removeCard={removeCard}
              setItems={setItems}
              props={props}
            />
          </div>
        )}
      />
      <AddCardButton addCard={addCard} />
    </>
  );
};

interface AddCardButtonProps {
  addCard: () => void;
}

const AddCardButton: React.FC<AddCardButtonProps> = memo(
  function AddCardButton({ addCard }) {
    const [t] = useTranslation(["vocabulary"]);
    return (
      <Card hoverable onClick={addCard} className="text-center">
        <Space>
          <Typography.Text strong type="success">
            <PlusOutlined style={{ fontSize: "24px" }} />
          </Typography.Text>
          <Typography.Text strong>{t("Add card")}</Typography.Text>
        </Space>
      </Card>
    );
  }
);

export default ListCardAddVocabulary;
