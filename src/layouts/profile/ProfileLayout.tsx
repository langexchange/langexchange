import { Col, FloatButton, Row } from "antd";
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
    <Row className="full-height-minus-header py-3" gutter={[0, 28]}>
      <Col md={9} xs={24} className="d-flex flex-column h-100 overflow-hidden">
        <ProfileCard userId={userId} isCurrentUser={isCurrentUser} />
      </Col>
      <Col md={15} xs={24} className="h-100">
        <Col flex="auto" xs={24} sm={0} className="mb-3">
          <SidebarNavigation
            canSeeSettings={isCurrentUser}
            mode="horizontal"
            toggleable={false}
            className="justify-content-center"
          />
        </Col>

        <Row wrap={false} className="h-100" gutter={[12, 12]}>
          <Col flex="none" xs={0} sm={20}>
            <SidebarNavigation canSeeSettings={isCurrentUser} />
          </Col>

          <Col
            flex="auto"
            className="auto-hide-scroll scroll-style-1"
            id="scroll-back_top"
          >
            <Outlet />
            <FloatButton.BackTop
              target={() =>
                document.getElementById("scroll-back_top") || window
              }
              style={{ bottom: 154, right: 8, height: "48px", width: "48px" }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProfileLayout;
