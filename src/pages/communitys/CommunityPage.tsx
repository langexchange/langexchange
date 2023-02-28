import { Col, Row } from "antd";
import { useState } from "react";
import PostList from "../../components/community/PostList";
import RightSidebar from "../../components/community/RightSidebar";
import Sidebar from "../../components/community/Sidebar";
import PostInput from "../../components/PostInput";
import PostModal from "../../components/PostModal";
import Post from "../../types/Post";

const CommunityPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);

  const showModal = () => {
    console.log("show");
    setIsModalOpen(true);
  };

  return (
    <>
      <div>
        <Row
          justify="space-between"
          className="full-height-minus-header py-3"
          gutter={24}
        >
          <Col span={6}>
            <Sidebar />
          </Col>
          <Col
            span={12}
            className="height-full px-3 pb-5 auto-hide-scroll scroll-style-1"
            id="style-1"
          >
            <div className="mb-3">
              <PostInput />
            </div>
            <PostList setPost={setPost} showModal={showModal} />
          </Col>
          <Col span={6}>
            <RightSidebar />
          </Col>
        </Row>
      </div>
      <PostModal
        post={post}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default CommunityPage;
