import { Button, Col, Layout, Menu, Row, Typography } from "antd";
import {
  FileTextOutlined,
  CompassOutlined,
  StarOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import type { MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    label: <NavLink to="explores">Explores</NavLink>,
    key: "explores",
    icon: <CompassOutlined />,
  },
  {
    label: <NavLink to="yours">Your vocabularies</NavLink>,
    key: "yours",
    icon: <FileTextOutlined />,
  },
  {
    label: <NavLink to="practice">Practice</NavLink>,
    key: "practice",
    icon: <StarOutlined />,
  },
];

const VocabularyHeader = () => {
  const activeKey: string = window.location.pathname.split("/")[2];
  return (
    <Layout.Header
      style={{
        backgroundColor: "white",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        height: "48px",
      }}
    >
      <Row
        className="height-full"
        align="middle"
        style={{
          lineHeight: "48px",
        }}
      >
        <Col span={6}>
          <Typography.Title level={4} className="m-0">
            Vocabulary
          </Typography.Title>
        </Col>
        <Col span={12} className="text-center">
          <Menu
            theme="light"
            mode="horizontal"
            // defaultSelectedKeys={["community"]}
            selectedKeys={[activeKey]}
            items={items}
            className="d-block height-full"
            style={{
              height: "48px",
            }}
          />
        </Col>
        <Col span={6} className="text-right">
          <Link to="create">
            <Button type="primary" icon={<PlusOutlined />}>
              Create Vocabulary set
            </Button>
          </Link>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default VocabularyHeader;
