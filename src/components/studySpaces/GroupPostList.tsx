import { Col, Row } from "antd";
import Post from "../../types/Post";
import PostCard from "../PostCard";
import { faker } from "@faker-js/faker";
import { fakePost } from "../../utils/fakeData/fakePost";

interface PostProps extends Post {
  group: {
    name: string;
    image: string;
  };
}

const items: PostProps[] = [];

for (let i = 0; i < 10; i++) {
  const itemProps: PostProps = {
    ...fakePost(),
    group: {
      name: faker.random.words(4),
      image: faker.image.abstract(),
    },
  };

  items.push(itemProps);
}
const GroupPostList: React.FC = () => {
  return (
    <Row gutter={[0, 24]}>
      {items.map((item, index) => (
        <Col span={24} key={index}>
          {/* <PostCard {...item} /> */}
        </Col>
      ))}
    </Row>
  );
};

export default GroupPostList;
