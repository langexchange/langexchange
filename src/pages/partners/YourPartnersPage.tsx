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
import type { SelectProps } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import MenuUserList from "../../components/partners/MenuUserList";
import YourParnersList from "../../components/partners/YourPartnersList";

const onSearch = (value: string) => console.log(value);

const YourPartnersPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Row
        style={{
          height: "calc(100vh - 64px)",
          padding: "24px 50px",
        }}
        justify="space-between"
      >
        <Col span={6}>
          <Space align="center">
            <Button
              type="text"
              shape="circle"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
            />
            <Typography.Title level={3} className="m-0">
              All partners
            </Typography.Title>
          </Space>
          <br />
          <br />
          <Card>
            <Space direction="vertical" className="width-full" size="middle">
              <Input.Search
                placeholder="input search text"
                onSearch={onSearch}
              />
              <Divider orientation="left" plain>
                100 partners
              </Divider>
            </Space>
            <div style={{ maxHeight: "550px", overflowY: "scroll" }}>
              <MenuUserList />
            </div>
          </Card>
        </Col>
        <Col
          span={18}
          style={{
            overflowY: "scroll",
            height: "100%",
            padding: "0 24px 48px 24px",
          }}
        >
          <YourParnersList />
        </Col>
      </Row>
    </div>
  );
};

export default YourPartnersPage;
