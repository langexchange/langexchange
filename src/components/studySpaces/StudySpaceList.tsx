import { faker } from "@faker-js/faker";
import { Col, Row } from "antd";
import StudySpaceCard from "../StudySpaceCard";

interface StudySpaceProps {
  name: string;
  languages: string[];
  tags: string[];
  descriptions: string;
  members: number;
  posts: number;
  commentsPerDay: number;
  image: string;
}

interface StudySpaceListProps {
  colSpan?: number;
  isJoined?: boolean;
}

const items: StudySpaceProps[] = [];

for (let i = 0; i < 10; i++) {
  items.push({
    name: faker.random.words(4),
    languages: [faker.random.word(), faker.random.word(), faker.random.word()],
    tags: [faker.random.word(), faker.random.word()],
    descriptions: faker.random.words(25),
    members: Number(faker.random.numeric()),
    posts: Number(faker.random.numeric()),
    commentsPerDay: Number(faker.random.numeric()),
    image: faker.image.abstract(),
  });
}

const StudySpaceList = ({
  colSpan = 6,
  isJoined = false,
}: StudySpaceListProps) => {
  return (
    <div>
      <Row gutter={[24, 24]}>
        {items.map((item, index) => (
          <Col span={colSpan} key={index}>
            <StudySpaceCard {...item} isJoined={isJoined} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StudySpaceList;
