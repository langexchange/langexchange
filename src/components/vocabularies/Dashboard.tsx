import { Drawer, Typography } from "antd";
import VocabularyList from "../VocabularyList";
import { useTranslation } from "react-i18next";

interface DashboardProps {
  onClose?: () => void;
  open: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ onClose, open }) => {
  const [t] = useTranslation(["vocabulary"]);

  return (
    <Drawer
      title={t("Dashboard")}
      placement="right"
      onClose={onClose}
      open={open}
      width="50%"
    >
      <Typography.Title level={5} type="warning">
        {t("Inprogress")} (3)
      </Typography.Title>
      <VocabularyList type="hard" />
      <Typography.Title level={5} type="danger">
        {t("Unschooled")} (3)
      </Typography.Title>
      <VocabularyList />
      <Typography.Title level={5} type="success">
        {t("Schooled")} (3)
      </Typography.Title>
      <VocabularyList type="known" />
    </Drawer>
  );
};

export default Dashboard;
