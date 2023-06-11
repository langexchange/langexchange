import { Col, FloatButton, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import PostList from "../../components/community/PostList";
import RightSidebar from "../../components/community/RightSidebar";
import Sidebar from "../../components/community/Sidebar";
import PostInput from "../../components/PostInput";
import PostModal from "../../components/PostModal";
import {
  Post,
  PostSuggestionQuery,
  useGetPostSuggestionsQuery,
} from "../../services/post/postService";

const defaultFilters: PostSuggestionQuery = {
  filterLangs: [],
  isNewest: true,
  isOnlyFriend: false,
};

const CommunityPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [postId, setPostId] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filters, setFilters] = useState(defaultFilters);

  const {
    data: postList,
    refetch,
    isLoading,
  } = useGetPostSuggestionsQuery(filters, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!postList) return;
    setPosts(postList);
  }, [postList]);

  const onSearch = (value: string) => {
    if (!postList) return;
    if (!value) {
      setPosts(postList);
    }
    const newData = postList?.filter((item) => {
      if (
        item.userInfo.firstName?.toLowerCase().includes(value.toLowerCase()) ||
        item.userInfo.lastName?.toLowerCase().includes(value.toLowerCase())
      )
        return true;
      if (
        item.labels.some((label) =>
          label.toLowerCase().includes(value.toLowerCase())
        )
      )
        return true;
      return item.text.toLowerCase().includes(value.toLowerCase());
    });
    setPosts(newData);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <Row
      className="full-height-minus-header auto-hide-scroll scroll-style-1 "
      id="middle_community"
      gutter={24}
    >
      <Col xs={0} md={0} lg={7} xl={6} className="py-3 position-sticky top-0">
        <Sidebar />
      </Col>
      <Col xs={24} md={24} lg={10} xl={12} className="height-full py-3 pb-5">
        <div className="mb-3">
          <PostInput refetch={refetch} />
        </div>
        <Skeleton loading={isLoading} avatar active>
          <PostList
            setPostId={setPostId}
            showModal={showModal}
            postList={posts}
            refetchListPost={refetch}
          />
        </Skeleton>
      </Col>
      <Col xs={0} md={0} lg={7} xl={6} className="py-3 position-sticky top-0">
        <RightSidebar
          defaultFilters={defaultFilters}
          setFilters={setFilters}
          resetFilters={resetFilters}
          onSearch={onSearch}
        />
      </Col>

      <PostModal
        postId={postId}
        setPostId={setPostId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        refetchListPost={refetch}
      />
      <FloatButton.BackTop
        target={() => document.getElementById("middle_community") || window}
        style={{ bottom: 154, right: 8, height: "48px", width: "48px" }}
      />
    </Row>
  );
};

export default CommunityPage;
