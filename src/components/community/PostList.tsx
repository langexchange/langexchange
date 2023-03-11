import { Col, Row } from "antd";
import PostCard from "../PostCard";
import { Post } from "../../services/post/postService";

interface PostListProps {
  setPost?: React.Dispatch<React.SetStateAction<Post | null>>;
  showModal?: () => void;
  postList?: Post[];
}

const PostList: React.FC<PostListProps> = ({
  setPost,
  showModal,
  postList,
}) => {
  const onClick = (item: Post) => {
    setPost && setPost(item);
    showModal && showModal();
  };

  return (
    <Row gutter={[0, 24]}>
      {postList?.map((item, index) => (
        <Col span={24} key={index}>
          <PostCard
            {...item}
            onClick={(item) => {
              onClick(item);
            }}
          />
        </Col>
      ))}
    </Row>
  );
};

export default PostList;
