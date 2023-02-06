import { faker } from "@faker-js/faker";
import { Col, Row } from "antd";
import UserCard from "../UserCard";

interface UserProps {
  name: string;
  natives: string[];
  targets: string[];
  country: string;
  image: string;
}

interface YourPartnersListProps {
  colSpan?: number;
}

const items: UserProps[] = [];

for (let i = 0; i < 10; i++) {
  items.push({
    name: faker.random.words(4),
    natives: [faker.random.word(), faker.random.word()],
    targets: [faker.random.word(), faker.random.word()],
    country: faker.random.words(6),
    image: faker.image.abstract(),
  });
}

const YourParnersList = ({ colSpan = 6 }: YourPartnersListProps) => {
  return (
    <div>
      <Row gutter={[24, 24]}>
        {items.map((item, index) => (
          <Col span={colSpan} key={index}>
            <UserCard {...item} type="partner" />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default YourParnersList;
