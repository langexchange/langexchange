import { Skeleton } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PostList from "../../components/community/PostList";
import PostModal from "../../components/PostModal";
import { useGetAllPostOfUserQuery } from "../../services/post/postService";

const ProfileWallPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [postId, setPostId] = useState<string | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  let { id: userId } = useParams();

  const {
    data: postList,
    refetch: refetchListPost,
    isFetching,
    isLoading,
    isError,
  } = useGetAllPostOfUserQuery(userId || null, {
    skip: !userId,
  });

  return (
    <>
      <Skeleton loading={isLoading} avatar active>
        <PostList
          setPostId={setPostId}
          showModal={showModal}
          postList={postList}
          refetchListPost={refetchListPost}
        />
      </Skeleton>
      <PostModal
        postId={postId}
        setPostId={setPostId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default ProfileWallPage;
