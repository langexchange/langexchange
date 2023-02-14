import { Menu } from "antd";
import { faker } from "@faker-js/faker";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import MessageMenuItem from "./MessageMenuItem";

interface MessageMenuItem {
  user: {
    fullname: string;
    image: string;
  };
  message: string;
  active?: boolean;
  no_message_unread?: number;
  time: number;
}

const items: MessageMenuItem[] = [];

for (let i = 0; i < 20; i++) {
  const itemProps: MessageMenuItem = {
    user: {
      fullname: faker.name.fullName(),
      image: faker.image.abstract(),
    },
    message: faker.random.words(20),
    active: Number(faker.random.numeric()) % 2 === 0,
    no_message_unread: i % 2 == 0 ? 0 : Number(faker.random.numeric()),
    time: Number(faker.random.numeric()),
  };

  items.push(itemProps);
}

const menuItems: MenuProps["items"] = [];

let i = 0;
for (let item of items) {
  menuItems.push({
    label: (
      <Link to="detail">
        <MessageMenuItem {...item} />
      </Link>
    ),
    key: i.toString(),
  });
  i++;
}

const MessageMenu = () => {
  return (
    <Menu
      // selectedKeys={[current]}
      mode="vertical"
      items={menuItems}
      className="item-height-max-content"
    />
  );
};

export default MessageMenu;
