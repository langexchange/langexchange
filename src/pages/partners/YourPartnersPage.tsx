import { Button, Col, FloatButton, Input, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import YourParnersList from "../../components/partners/YourPartnersList";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const YourPartnersPage: React.FC = () => {
  const data: any = useOutletContext();
  const [userList, setUserList] = useState<any>([]);
  const [t] = useTranslation(["commons"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data?.userList) return;

    setUserList(data.userList);
  }, [data, data.userList]);

  return (
    <div
      className="auto-hide-scroll scroll-style-1 height-full px-3"
      id="your_partner_list"
    >
      <Row
        justify="space-between"
        align="top"
        className="mb-3 px-2"
        gutter={[12, 12]}
      >
        <Row gutter={12}>
          <Col lg={0}>
            <Button
              type="text"
              shape="circle"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
            />
          </Col>
          <Col>
            <Typography.Title level={3} className="m-0">
              Bạn đồng hành của bạn
            </Typography.Title>
          </Col>
        </Row>
        <Col lg={0}>
          <Input.Search
            placeholder={t("type-to-search").toString()}
            onSearch={data.onSearch}
            style={{ width: "min(400px, 80vw)" }}
          />
        </Col>
      </Row>
      <YourParnersList
        colSpan={6}
        gutter={[12, 12]}
        userList={userList}
        refetch={data.refetch}
      />
      <FloatButton.BackTop
        target={() => document.getElementById("your_partner_list") || window}
        style={{ bottom: 154, right: 8, height: "48px", width: "48px" }}
      />
    </div>
  );
};

export default YourPartnersPage;
