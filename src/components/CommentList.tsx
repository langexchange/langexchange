import { faker } from "@faker-js/faker";
import { List } from "antd";
import CommentItem from "./CommentItem";

interface Comment {
  owner: {
    fullname: string;
    color: string;
    image: string;
  };
  heartNumber: number;
  contents: string;
  time: string;
}

const items: Comment[] = [];

for (let i = 0; i < 10; i++) {
  const item: Comment = {
    owner: {
      fullname: faker.name.fullName(),
      color: "white",
      image: faker.image.abstract(),
    },
    heartNumber: Number(faker.random.numeric()),
    contents: faker.random.words(Number(faker.random.numeric(2))),
    time: faker.date.past().toString(),
  };
  items.push(item);
}

const CommentList = () => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={items}
      split={false}
      renderItem={(item) => (
        <List.Item>
          <CommentItem {...item} />
        </List.Item>
      )}
    />
  );
};

export default CommentList;
