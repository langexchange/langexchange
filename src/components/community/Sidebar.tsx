import UserItem from "../UserItem";
import {
  Avatar,
  Card,
  Collapse,
  List,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/hooks";
import { selectCurrentUserId } from "../../features/auth/authSlice";
import { selectCredentalProfile } from "../../features/profile/profileSlice";
import { UserOutlined } from "@ant-design/icons";
import { useGetFriendsQuery } from "../../services/friend/friendService";

const Sidebar: React.FC = () => {
  const [t] = useTranslation(["community"]);
  const currentUserId = useAppSelector(selectCurrentUserId);
  const currentUserProfile = useAppSelector(selectCredentalProfile);
  const { data, isLoading, refetch } = useGetFriendsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

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
              src={currentUserProfile?.avatar}
              icon={!currentUserProfile?.avatar && <UserOutlined />}
            />
            <Typography.Title level={4} className="m-0 color-primary">
              {currentUserProfile?.firstName} {currentUserProfile?.lastName}
            </Typography.Title>
          </Space>
        </Card>
      </Link>
      <Card bordered={false} bodyStyle={{ padding: 0 }}>
        <Collapse
          collapsible="header"
          defaultActiveKey={["1"]}
          bordered={false}
          expandIconPosition="end"
          style={{ background: "#00000005" }}
        >
          <Collapse.Panel
            header={
              <Typography.Text
                // type="secondary"
                className="fz-16 text-500 d-block"
              >
                {t("active-partners")}
              </Typography.Text>
            }
            key="1"
          >
            <Skeleton loading={isLoading} active avatar>
              <List
                className="text-left"
                itemLayout="horizontal"
                dataSource={data}
                split={false}
                renderItem={(item: any) => (
                  <List.Item style={{ padding: 0 }}>
                    <div className="as-the-button width-full">
                      <UserItem
                        {...item}
                        direction="left"
                        badge={false}
                        fullname={[item.firstName, item.lastName].join(" ")}
                      />
                    </div>
                  </List.Item>
                )}
              />
            </Skeleton>
          </Collapse.Panel>
        </Collapse>
      </Card>
    </Space>
  );
};

export default Sidebar;
