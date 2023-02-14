import { Menu } from "antd";
import UserItem from "../UserItem";
import { faker } from "@faker-js/faker";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import MessageMenu from "../MessageMenu";

interface UserItemProps {
  fullname: string;
  size: any;
  number: any;
  color: string;
  image: string;
  isStrong: boolean;
  description: string;
}

const userItems: UserItemProps[] = [];

for (let i = 0; i < 20; i++) {
  const itemProps: UserItemProps = {
    fullname: faker.name.fullName(),
    size: 36,
    number: faker.random.numeric(),
    color: faker.color.rgb({ format: "hex", casing: "lower" }),
    image: faker.image.abstract(),
    isStrong: false,
    description: faker.random.words(4),
  };

  userItems.push(itemProps);
}

const items: MenuProps["items"] = [];

let i = 0;
for (let item of userItems) {
  items.push({
    label: (
      <Link to="detail">
        <UserItem {...item} direction="left" badge={false} />
      </Link>
    ),
    key: i.toString(),
  });
  i++;
}

const onClick: MenuProps["onClick"] = (e) => {
  console.log("click ", e);
};

const LeftSidebar = () => {
  return (
    <div>
      <MessageMenu />
    </div>
  );
};

export default LeftSidebar;
