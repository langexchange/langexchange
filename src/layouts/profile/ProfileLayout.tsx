import { Col, Row } from "antd";
import { Outlet, useParams } from "react-router-dom";
import SidebarNavigation from "../../components/profile/SidebarNavigation";
import { selectCurrentUserId } from "../../features/auth/authSlice";
import { useAppSelector } from "../../hooks/hooks";
import NotFoundPage from "../../pages/NotFoundPage";
import ProfileCard from "../../pages/partners/ProfileCard";

const ProfileLayout = () => {
  let { id: userId } = useParams();

  const currentUserId = useAppSelector(selectCurrentUserId);
  const isCurrentUser = userId === currentUserId;
  if (!userId) return <NotFoundPage />;

  return (
    <Row className="full-height-minus-header py-3">
      <Col span={9} className="d-flex flex-column h-100 overflow-hidden">
        <ProfileCard userId={userId} isCurrentUser={isCurrentUser} />
      </Col>
      <Col span={15} className="h-100">
        <Row wrap={false} className="h-100">
          <Col flex="none">
            <SidebarNavigation canSeeSettings={isCurrentUser} />
          </Col>
          <Col flex="auto" className="auto-hide-scroll scroll-style-1 px-4">
            <Outlet />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProfileLayout;
