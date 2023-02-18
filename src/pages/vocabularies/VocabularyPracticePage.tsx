import { useState } from "react";
import { Card } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import FlashCardList from "../../components/vocabularies/FlashCardList";
import Dashboard from "../../components/vocabularies/Dashboard";

const VocabularyPracticePage = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FlashCardList />
      <Card
        hoverable
        size="small"
        style={{ right: "12px", top: "60px" }}
        className="pos-absolute"
        onClick={showDrawer}
      >
        <LeftOutlined />
        Dashboard
      </Card>
      <Dashboard onClose={onClose} open={open} />
    </>
  );
};

export default VocabularyPracticePage;
