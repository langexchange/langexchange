import { Skeleton } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PostList from "../../components/community/PostList";
import PostModal from "../../components/PostModal";
import {
  Post,
  useGetAllPostOfUserQuery,
} from "../../services/post/postService";

const ProfileWallPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  let { id: userId } = useParams();

  const {
    data: postList,
    isFetching,
    isLoading,
    isError,
  } = useGetAllPostOfUserQuery(userId || null, {
    skip: !userId,
  });

  return (
    <>
      <Skeleton loading={isLoading} avatar active>
        <PostList setPost={setPost} showModal={showModal} postList={postList} />
      </Skeleton>
      <PostModal
        post={post}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default ProfileWallPage;
