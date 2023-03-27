import {
  Button,
  Card,
  Col,
  Divider,
  Input,
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

  const { data, isLoading } = useGetFriendsQuery(undefined, {
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
    <Row
      justify="space-between"
      className="pos-relative full-height-minus-header py-3"
      gutter={0}
    >
      <Col
        span={6}
        className="pos-relative height-full d-flex flex-column overflow-hidden"
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
      </Col>
      <Outlet context={{ userList: data }} />
    </Row>
  );
};

export default YourPartnerLayout;
