import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";
import SidebarNavigation from "../../components/profile/SidebarNavigation";
import ProfileCard from "../../pages/partners/ProfileCard";

const ProfileLayout = () => {
  return (
    <Row className="full-height-minus-header py-3">
      <Col span={8}>
        <ProfileCard />
      </Col>
      <Col span={16} className="h-100">
        <Row wrap={false} className="h-100">
          <Col flex="none">
            <SidebarNavigation />
          </Col>
          <Col flex="auto" className="auto-hide-scroll scroll-style-1 px-3">
            <Outlet />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProfileLayout;
