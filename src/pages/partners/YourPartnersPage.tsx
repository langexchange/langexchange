import { Col } from "antd";
import { useOutletContext } from "react-router-dom";
import YourParnersList from "../../components/partners/YourPartnersList";

const YourPartnersPage: React.FC = () => {
  const data: any = useOutletContext();
  return (
    <Col span={18} className="auto-hide-scroll scroll-style-1 height-full px-3">
      <YourParnersList
        colSpan={6}
        gutter={[12, 12]}
        userList={data.userList}
        refetch={data.refetch}
      />
    </Col>
  );
};

export default YourPartnersPage;
