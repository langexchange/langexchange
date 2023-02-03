import { faker } from "@faker-js/faker";
import { Col, Row } from "antd";
import PostCard from "../PostCard";

interface PostProps {
  group: {
    name: string;
    image: string;
  };
  owner: {
    fullname: string;
    color: string;
    image: string;
  };
  images: string[];
  contents: string;
  languages: string[];
  emotions: string;
  comments: string;
  time: string;
}

const items: PostProps[] = [];

for (let i = 0; i < 10; i++) {
  const itemProps: PostProps = {
    group: {
      name: faker.random.words(4),
      image: faker.image.abstract(),
    },
    owner: {
      fullname: faker.name.fullName(),
      image: faker.image.abstract(),
      color: faker.color.rgb({ format: "hex", casing: "lower" }),
    },
    images: [
      faker.image.abstract(),
      faker.image.abstract(),
      faker.image.abstract(),
    ],
    emotions: faker.random.numeric(),
    comments: faker.random.numeric(),
    languages: [faker.random.word(), faker.random.word(), faker.random.word()],
    contents: faker.random.words(80),
    time: faker.date.past().toString(),
  };

  items.push(itemProps);
}
const GroupPostList = () => {
  return (
    <Row gutter={[0, 24]}>
      {items.map((item, index) => (
        <Col span={24} key={index}>
          <PostCard {...item} />
        </Col>
      ))}
    </Row>
  );
};

export default GroupPostList;
