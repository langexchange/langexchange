import { Col, Row } from "antd";
import PostCard from "../PostCard";
import { Post } from "../../services/post/postService";
import PostFormModal from "../PostFormModal";
import { useState } from "react";

interface PostListProps {
  setPostId?: React.Dispatch<React.SetStateAction<string | null>>;
  showModal?: () => void;
  postList?: Post[];
  refetchListPost?: () => void;
}

const PostList: React.FC<PostListProps> = ({
  setPostId,
  showModal,
  postList,
  refetchListPost,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPostId, setEditPostId] = useState<string | null>(null);

  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleEditOk = () => {
    setIsEditModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };
  const onClick = (item: string) => {
    setPostId && setPostId(item);
    showModal && showModal();
  };

  return (
    <>
      <Row gutter={[0, 24]} className="pb-5">
        {postList?.map((item) => (
          <Col span={24} key={item.postId}>
            <PostCard
              setEditPostId={setEditPostId}
              showEditModal={showEditModal}
              post={item}
              setPostId={setPostId}
              onClick={(item) => {
                onClick(item);
              }}
              refetchListPost={refetchListPost}
            />
          </Col>
        ))}
      </Row>
      <PostFormModal
        editPostId={editPostId}
        setEditPostId={setEditPostId}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        handleOk={handleEditOk}
        handleCancel={handleEditCancel}
      />
    </>
  );
};

export default PostList;
