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
    <div>
      <Card
        hoverable
        size="small"
        onClick={showDrawer}
        className="mb-3 float-right"
        style={{ width: "fit-content", zIndex: 1 }}
      >
        <LeftOutlined />
        Dashboard
      </Card>
      <FlashCardList />
      <Dashboard onClose={onClose} open={open} />
    </div>
  );
};

export default VocabularyPracticePage;
