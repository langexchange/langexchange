import { Button, Input, List, message, Modal, ModalProps } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useAddToPracticeMutation,
  useGetVocabularySetsQuery,
  VocabularySetDetail,
} from "../../services/vocabulary/vocabularyService";
import VocabularySetMenuItem from "./VocabularySetMenuItem";

interface ModalAddToPracticeListProps extends ModalProps {
  refetchPracticeList: () => void;
}

const ModalAddToPracticeList: React.FC<ModalAddToPracticeListProps> = ({
  open,
  onOk,
  onCancel,
  refetchPracticeList,
}) => {
  const [t] = useTranslation(["commons"]);
  const [sets, setSets] = useState<VocabularySetDetail>();
  const { data, isLoading, refetch, isFetching } = useGetVocabularySetsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [addToPractice, { isLoading: isAdding }] = useAddToPracticeMutation();
  const [addingId, setAddingId] = useState<string>("");

  const onSearch = (value: string) => {
    setSets((prev: any) => {
      const newSets = data?.vocabularyPackageDtos.filter(
        (item) =>
          item.title.toLowerCase().includes(value.toLowerCase()) &&
          item.practiceResultDto?.isPracticed === false
      );

      return { ...prev, vocabularyPackageDtos: newSets };
    });
  };

  useEffect(() => {
    if (!data) return;
    setSets((prev: any) => {
      const newSets = data?.vocabularyPackageDtos.filter(
        (item) => item.practiceResultDto?.isPracticed === false
      );

      return { ...prev, vocabularyPackageDtos: newSets };
    });
  }, [data]);

  useEffect(() => {
    if (!open) return;
    refetch();
  }, [open]);

  const handleAdding = async (id: string) => {
    setAddingId(id);
    try {
      await addToPractice(id).unwrap();
      message.success("Added to practice list", 1);
      setAddingId("");
      refetch();
      refetchPracticeList();
    } catch (error) {
      setAddingId("");
      message.error("Sorry, somethings went wrong. Please try again later!", 1);
    }
  };

  return (
    <>
      <Modal
        destroyOnClose={true}
        title={
          <div className="d-flex align-items-center justify-space-between">
            {t("Add set to practice list", { ns: "vocabulary" })}
            <Input.Search
              placeholder={t("type-to-search").toString()}
              allowClear
              onSearch={onSearch}
              style={{ width: 400 }}
              className="me-3"
            />
          </div>
        }
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
          loading={isLoading || isFetching}
          // loadMore={loadMore}
          dataSource={sets?.vocabularyPackageDtos}
          renderItem={(set) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  onClick={() => handleAdding(set.packageId)}
                  loading={isAdding && addingId === set.packageId}
                  key={`btn-action-${set.packageId}`}
                >
                  {t("Add")}
                </Button>,
              ]}
              key={set.packageId}
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
