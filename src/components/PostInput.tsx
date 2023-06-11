import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Row, Typography } from "antd";
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
        <Row gutter={12} wrap={false} align="middle">
          <Col flex="none">
            <Avatar
              size={40}
              src={currentUserProfile?.avatar}
              icon={<UserOutlined />}
            />
          </Col>
          <Col flex="auto">
            <Button
              block
              size="large"
              className="text-left has-background-color"
              type="text"
              shape="round"
            >
              <Typography.Text
                className="text-300 color-secondary fz-16"
                ellipsis={true}
              >
                {t("post-input-holder")}
              </Typography.Text>
            </Button>
          </Col>
        </Row>
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
