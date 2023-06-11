import { Button, Col, Image, Layout, Menu, Row, Space, Typography } from "antd";
import {
  FileTextOutlined,
  CompassOutlined,
  StarOutlined,
  PlusOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import type { MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import VocabularyIcon from "../../assets/images/vocabularyLogo.png";

const VocabularyHeader: React.FC = () => {
  const [t] = useTranslation(["vocabulary", "commons"]);

  const items: MenuProps["items"] = [
    {
      label: (
        <NavLink to="vocabularies/explores">
          {t("Explore", { ns: "commons" })}
        </NavLink>
      ),
      key: "explores",
      icon: <CompassOutlined />,
    },
    {
      label: <NavLink to="vocabularies/yours">{t("Your vocabulary")}</NavLink>,
      key: "yours",
      icon: <FileTextOutlined />,
    },
    {
      label: <NavLink to="vocabularies/practice">{t("Practice")}</NavLink>,
      key: "practice",
      icon: <StarOutlined />,
    },
  ];

  const activeKey: string = window.location.pathname.split("/")[2];

  return (
    <Layout.Header className="z-index-1 bg-white justify-space-between pos-sticky t-0 width-full with-header-height with-header-border-bottom px-0">
      <div className="container-lg">
        <Row className="height-full" align="middle" justify="space-between">
          <Col sm={6} xs={11}>
            <Space>
              <Image src={VocabularyIcon} height={32} width={32} />
              <Typography.Title
                level={4}
                className="m-0 text-500"
                style={{ color: "#4f65d1" }}
              >
                {t("Vocabulary", { ns: "commons" })}
              </Typography.Title>
            </Space>
          </Col>
          <Col sm={12} className="text-center" xs={2}>
            <Menu
              theme="light"
              mode="horizontal"
              selectedKeys={[activeKey || "explores"]}
              items={items}
              className="d-block height-full"
              overflowedIndicator={<MenuOutlined />}
            />
          </Col>
          <Col sm={0} className="text-right" xs={11}>
            <Link
              to="/vocabularies/create"
              style={{ maxWidth: "100%" }}
              className="d-flex align-items-center justify-content-end"
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{
                  display: "block",
                  maxWidth: "60%",
                }}
                className="me-0"
              />
            </Link>
          </Col>
          <Col sm={6} className="text-right" xs={0}>
            <Link
              to="/vocabularies/create"
              style={{ maxWidth: "100%" }}
              className="d-flex align-items-center justify-content-end"
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{
                  display: "block",
                  maxWidth: "100%",
                }}
                className="me-0"
              >
                <Typography.Text style={{ color: "white" }} ellipsis={true}>
                  {t("Create vocabulary set")}
                </Typography.Text>
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    </Layout.Header>
  );
};

export default VocabularyHeader;
