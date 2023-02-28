import { useState } from "react";
import PostList from "../../components/community/PostList";
import PostModal from "../../components/PostModal";
import Post from "../../types/Post";

const ProfileWallPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);

  const showModal = () => {
    console.log("show");
    setIsModalOpen(true);
  };

  return (
    <>
      <PostList setPost={setPost} showModal={showModal} />
      <PostModal
        post={post}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default ProfileWallPage;
