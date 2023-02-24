import { Col, Row } from "antd";
import { useState } from "react";
import PostList from "../../components/community/PostList";
import RightSidebar from "../../components/community/RightSidebar";
import Sidebar from "../../components/community/Sidebar";
import PostInput from "../../components/PostInput";
import PostModal from "../../components/PostModal";

const CommunityPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [post, setPost] = useState({
    owner: {
      fullname: "",
      color: "",
      image: "",
    },
    images: [""],
    contents: "",
    languages: [""],
    emotions: "",
    comments: "",
    time: "",
  });

  const showModal = () => {
    console.log("show");
    setIsModalOpen(true);
  };

  return (
    <div>
      <Row
        justify="space-between"
        className="full-height-minus-header py-3"
        gutter={24}
      >
        <Col span={6}>
          <Sidebar />
        </Col>
        <Col span={12} className="overflow-y-scroll height-full px-3 pb-5">
          <div className="mb-3">
            <PostInput />
          </div>
          <PostList setPost={setPost} showModal={showModal} />
        </Col>
        <Col span={6}>
          <RightSidebar />
        </Col>
      </Row>
      <PostModal
        post={post}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default CommunityPage;
