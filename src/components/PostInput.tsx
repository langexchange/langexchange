import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../hooks/hooks";
import { selectCredentalProfile } from "../features/profile/profileSlice";
import PostFormModal from "./PostFormModal";

interface PostInputProps {
  refetch?: () => void;
}

const PostInput: React.FC<PostInputProps> = ({ refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [t] = useTranslation(["commons"]);
  const currentUserProfile = useAppSelector(selectCredentalProfile);

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
      <Card hoverable size="small" onClick={showModal}>
        <div className="d-flex justify-space-between align-items-center py-1">
          <div className="me-2">
            <Avatar
              size={44}
              src={currentUserProfile?.avatar}
              icon={<UserOutlined />}
            />
          </div>
          <Button
            block
            size="large"
            className="text-left has-background-color"
            type="text"
            shape="round"
          >
            <span className="text-300 color-secondary">
              {t("post-input-holder")}
            </span>
          </Button>
        </div>
      </Card>
      <PostFormModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        refetch={refetch}
      />
    </>
  );
};

export default PostInput;
