import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Layout,
  Row,
  Skeleton,
  Space,
  Typography,
} from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import MenuUserList from "../../components/partners/MenuUserList";
import { useTranslation } from "react-i18next";
import { useGetFriendsQuery } from "../../services/friend/friendService";
import { useEffect, useState } from "react";

const YourPartnerLayout: React.FC = () => {
  const [t] = useTranslation(["commons"]);
  const navigate = useNavigate();
  const [userList, setUserList] = useState<any>([]);

  const { data, isLoading, refetch } = useGetFriendsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!data) return;

    setUserList(data);
  }, [data, isLoading]);

  const onSearch = (value: string) => {
    if (!data) return;

    setUserList(
      data.filter((item: any) =>
        [item.firstName, item.lastName]
          .join(" ")
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );
  };

  return (
    <Layout
      className="pos-relative full-height-minus-header py-3"
      style={{
        background: "inherit",
      }}
    >
      <Layout.Sider
        theme="light"
        width={300}
        style={{
          height: "fit-content",
          background: "transparent",
        }}
        breakpoint="lg"
        collapsedWidth="0"
        collapsible={true}
        trigger={null}
      >
        <Card
          size="small"
          className="pos-relative d-flex flex-column overflow-hidden"
          bodyStyle={{
            height: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Space direction="vertical" className="width-full" size="middle">
            <Space align="center">
              <Button
                type="text"
                shape="circle"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate(-1)}
              />
              <Typography.Title level={3} className="m-0">
                {t("All partners")}
              </Typography.Title>
            </Space>
            <Input.Search
              placeholder={t("type-to-search").toString()}
              onSearch={onSearch}
            />
            <Divider orientation="left" plain>
              {data?.length} {t("partners")}
            </Divider>
          </Space>
          <div className="auto-hide-scroll scroll-style-1">
            <Skeleton loading={isLoading} active>
              <MenuUserList userList={userList} />
            </Skeleton>
          </div>
        </Card>
      </Layout.Sider>
      <Layout.Content>
        <Outlet
          context={{ userList: userList, refetch: refetch, onSearch: onSearch }}
        />
      </Layout.Content>
    </Layout>
  );
};

export default YourPartnerLayout;
