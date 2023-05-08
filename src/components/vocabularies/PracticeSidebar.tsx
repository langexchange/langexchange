import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Menu, MenuProps, Skeleton, Space } from "antd";
import ModalAddToPracticeList from "./ModalAddToPracticeList";
import VocabularySetMenuItem from "./VocabularySetMenuItem";
import { getElementInPathnameAt } from "../../utils/extractPathname";
import { useTranslation } from "react-i18next";
import { useGetPracticeListQuery } from "../../services/vocabulary/vocabularyService";

const onClick: MenuProps["onClick"] = (e) => {};

const PracticeSidebar: React.FC = () => {
  const activeKey = getElementInPathnameAt(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [t] = useTranslation(["vocabulary"]);
  const { data, isLoading, refetch } = useGetPracticeListQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  let items: MenuProps["items"] = [];

  if (data) {
    for (let set of data) {
      items.push({
        label: (
          <Link to={set.packageId}>
            <VocabularySetMenuItem
              id={set.packageId}
              title={set.title}
              description={set.description}
              vocabularyDtos={[]}
              numberWords={set.totalVocabs}
              numberWordsLearned={set.totalVocabs - set.currentNumOfVocab}
              refetch={refetch}
            />
          </Link>
        ),
        key: set.packageId,
      });
    }
  }

  return (
    <div className="sider-with-content-scroll py-3 px-2">
      <Space
        direction="vertical"
        className="px-2 pb-3 text-center w-100"
        style={{ borderBottom: "1px solid #eee" }}
      >
        <Button type="primary" onClick={showModal} className="mb-2">
          {t("Add set to practice list")}
        </Button>
        <Input.Search
          placeholder={t("type-to-search", { ns: "commons" }).toString()}
        />
      </Space>
      <Skeleton loading={isLoading} active>
        <Menu
          onClick={onClick}
          selectedKeys={[activeKey]}
          mode="vertical"
          items={items}
          className="auto-hide-scroll scroll-style-1 item-height-max-content border-0"
        />
      </Skeleton>
      <ModalAddToPracticeList
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        refetchPracticeList={refetch}
      />
    </div>
  );
};

export default PracticeSidebar;
