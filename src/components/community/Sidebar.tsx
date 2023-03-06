import UserItem from "../UserItem";
import User from "../../types/User";
import { faker } from "@faker-js/faker";
import { fakeUsers } from "../../utils/fakeData/fakeUser";
import { Avatar, Card, Collapse, List, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/hooks";
import { selectCurrentUserId } from "../../features/auth/authSlice";
import { selectCredentalProfile } from "../../features/profile/profileSlice";

const userItems: User[] = fakeUsers(10);

const Sidebar: React.FC = () => {
  const [t] = useTranslation(["community"]);
  const currentUserId = useAppSelector(selectCurrentUserId);
  const currentUserProfile = useAppSelector(selectCredentalProfile);

  return (
    <Space size="large" direction="vertical" className="width-full">
      <Link to={`/profile/${currentUserId}`}>
        <Card
          bodyStyle={{
            padding: "8px 12px",
            width: "max-content",
          }}
          hoverable
          className="width-full"
        >
          <Space align="center" size={12}>
            <Avatar
              style={{ verticalAlign: "middle" }}
              size="large"
              src={faker.image.abstract(50, 50)}
            />
            <Typography.Title level={3} className="m-0 color-primary">
              {currentUserProfile?.firstName} {currentUserProfile?.lastName}
            </Typography.Title>
          </Space>
        </Card>
      </Link>
      <Collapse
        collapsible="header"
        defaultActiveKey={["1"]}
        bordered={false}
        expandIconPosition="end"
      >
        <Collapse.Panel
          header={
            <Typography.Text
              type="secondary"
              className="fz-16 text-500 d-block"
            >
              {t("active-partners")}
            </Typography.Text>
          }
          key="1"
        >
          <List
            className="text-left"
            itemLayout="horizontal"
            dataSource={userItems}
            split={false}
            renderItem={(item) => (
              <List.Item style={{ padding: 0 }}>
                <div className="as-the-button width-full">
                  <UserItem {...item} direction="left" badge={false} />
                </div>
              </List.Item>
            )}
          />
        </Collapse.Panel>
      </Collapse>
    </Space>
  );
};

export default Sidebar;
