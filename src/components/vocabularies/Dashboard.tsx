import { Drawer, Typography } from "antd";
import VocabularyList from "../VocabularyList";

interface DashboardProps {
  onClose?: () => void;
  open: boolean;
}

const Dashboard = ({ onClose, open }: DashboardProps) => {
  return (
    <Drawer
      title="Dashboard"
      placement="right"
      onClose={onClose}
      open={open}
      width="50%"
    >
      <Typography.Title level={5} type="warning">
        Inprogress (3)
      </Typography.Title>
      <VocabularyList type="hard" />
      <Typography.Title level={5} type="danger">
        Unschooled (3)
      </Typography.Title>
      <VocabularyList />
      <Typography.Title level={5} type="success">
        Schooled (3)
      </Typography.Title>
      <VocabularyList type="known" />
    </Drawer>
  );
};

export default Dashboard;
