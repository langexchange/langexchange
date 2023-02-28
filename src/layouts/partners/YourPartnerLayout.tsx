import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Space,
  Typography,
} from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import MenuUserList from "../../components/partners/MenuUserList";
import { useTranslation } from "react-i18next";

const onSearch = (value: string) => console.log(value);

const YourPartnerLayout = () => {
  const [t] = useTranslation(["commons"]);
  const navigate = useNavigate();
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
              100 {t("partners")}
            </Divider>
          </Space>
          <div className="auto-hide-scroll scroll-style-1">
            <MenuUserList />
          </div>
        </Card>
      </Col>
      <Outlet />
    </Row>
  );
};

export default YourPartnerLayout;
