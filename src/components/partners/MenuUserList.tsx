import { Menu } from "antd";
import UserItem from "../UserItem";
import type { MenuProps } from "antd";
import { Link, useParams } from "react-router-dom";

interface MenuUserListProps {
  userList: any[];
}

const MenuUserList: React.FC<MenuUserListProps> = ({ userList }) => {
  const items: MenuProps["items"] = [];
  const { id: userId } = useParams();

  for (let item of userList) {
    items.push({
      label: (
        <Link to={item.id} replace>
          <UserItem
            {...item}
            direction="left"
            badge={false}
            fullname={[item.firstName, item.lastName].join(" ")}
            linkToProfile={false}
          />
        </Link>
      ),
      key: item.id,
    });
  }
  return (
    <Menu
      selectedKeys={userId ? [userId] : []}
      mode="vertical"
      items={items}
      className="item-height-max-content"
      style={{ border: "none" }}
    />
  );
};

export default MenuUserList;
