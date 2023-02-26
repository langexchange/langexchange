import { Col, Row } from "antd";
import PostCard from "../PostCard";
import Post from "../../types/Post";
import { fakePosts } from "../../utils/fakeData/fakePost";

const items: Post[] = fakePosts(15);

interface PostListProps {
  setPost?: React.Dispatch<React.SetStateAction<Post | null>>;
  showModal?: () => void;
}

const PostList: React.FC<PostListProps> = ({ setPost, showModal }) => {
  const onClick = (item: Post) => {
    setPost && setPost(item);
    showModal && showModal();
  };

  return (
    <Row gutter={[0, 24]}>
      {items.map((item, index) => (
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
