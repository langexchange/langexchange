import { faker } from "@faker-js/faker";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Menu, MenuProps, Space } from "antd";
import ModalAddToPracticeList from "./ModalAddToPracticeList";
import VocabularySetMenuItem from "./VocabularySetMenuItem";
import { getElementInPathnameAt } from "../../utils/extractPathname";
import { useTranslation } from "react-i18next";

interface VocabularySet {
  id: number;
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
    id: i,
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

const items: MenuProps["items"] = [];

for (let set of sets) {
  items.push({
    label: (
      <Link to={set.id.toString()}>
        <VocabularySetMenuItem {...set} />
      </Link>
    ),
    key: set.id,
  });
}

const onClick: MenuProps["onClick"] = (e) => { };

const PracticeSidebar = () => {
  const activeKey = getElementInPathnameAt(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [t] = useTranslation(["vocabulary"]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Space
        direction="vertical"
        className="px-2 pb-3 text-center"
        style={{ borderBottom: "1px solid #eee" }}
      >
        <Button type="primary" onClick={showModal} className="mb-2">
          {t("Add set to practice list")}
        </Button>
        <Input.Search
          placeholder={t("type-to-search", { ns: "commons" }).toString()}
        />
      </Space>
      <Menu
        onClick={onClick}
        selectedKeys={[activeKey]}
        mode="vertical"
        items={items}
        className="auto-hide-scroll scroll-style-1 item-height-max-content border-0"
      />
      <ModalAddToPracticeList
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </>
  );
};

export default PracticeSidebar;
