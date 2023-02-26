import { Menu } from "antd";
import UserItem from "../UserItem";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import User from "../../types/User";
import { fakeUsers } from "../../utils/fakeData/fakeUser";

const userItems: User[] = fakeUsers(20);

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

const MenuUserList = () => {
  return (
    <Menu
      onClick={onClick}
      // selectedKeys={[current]}
      mode="vertical"
      items={items}
      className="item-height-max-content"
      style={{ border: "none" }}
    />
  );
};

export default MenuUserList;
