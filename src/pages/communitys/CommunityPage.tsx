import { Col, Row, Skeleton } from "antd";
import { useState } from "react";
import PostList from "../../components/community/PostList";
import RightSidebar from "../../components/community/RightSidebar";
import Sidebar from "../../components/community/Sidebar";
import PostInput from "../../components/PostInput";
import PostModal from "../../components/PostModal";
import { selectCredentials } from "../../features/auth/authSlice";
import { useAppSelector } from "../../hooks/hooks";
import {
  Post,
  useGetAllPostOfUserQuery,
} from "../../services/post/postService";

const CommunityPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [postId, setPostId] = useState<string | null>(null);
  const credentials = useAppSelector(selectCredentials);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const {
    data: postList,
    isFetching,
    isLoading,
    isError,
  } = useGetAllPostOfUserQuery(credentials?.userId, {
    skip: !credentials?.userId,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div>
        <Row
          justify="space-between"
          className="full-height-minus-header"
          gutter={24}
        >
          <Col span={6} className="py-3">
            <Sidebar />
          </Col>
          <Col
            span={12}
            className="height-full py-3 px-4 pb-5 auto-hide-scroll scroll-style-1"
            id="style-1"
          >
            <div className="mb-3">
              <PostInput />
            </div>
            <Skeleton loading={isLoading} avatar active>
              <PostList
                setPostId={setPostId}
                showModal={showModal}
                postList={postList}
              />
            </Skeleton>
          </Col>
          <Col span={6} className="py-3">
            <RightSidebar />
          </Col>
        </Row>
      </div>
      <PostModal
        postId={postId}
        setPostId={setPostId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default CommunityPage;
