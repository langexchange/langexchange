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
    label: <NavLink to="vocabularies/explores">Explores</NavLink>,
    key: "explores",
    icon: <CompassOutlined />,
  },
  {
    label: <NavLink to="vocabularies/yours">Your vocabularies</NavLink>,
    key: "yours",
    icon: <FileTextOutlined />,
  },
  {
    label: <NavLink to="vocabularies/practice">Practice</NavLink>,
    key: "practice",
    icon: <StarOutlined />,
  },
];

const VocabularyHeader = () => {
  const activeKey: string = window.location.pathname.split("/")[2];
  return (
    <Layout.Header className="z-index-1 bg-white justify-space-between pos-sticky t-0 width-full with-header-height with-header-border-bottom">
      <div className="container">
        <Row className="height-full" align="middle" style={{}}>
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
            />
          </Col>
          <Col span={6} className="text-right">
            <Link to="/vocabularies/create">
              <Button type="primary" icon={<PlusOutlined />}>
                Create Vocabulary set
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    </Layout.Header>
  );
};

export default VocabularyHeader;
