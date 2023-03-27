import { Col, Row, RowProps } from "antd";
import UserCard from "../UserCard";

interface YourPartnersListProps {
  colSpan?: number;
  gutter?: RowProps["gutter"];
  userList: any;
}

const YourParnersList: React.FC<YourPartnersListProps> = ({
  colSpan = 6,
  gutter = [24, 24],
  userList,
}) => {
  return (
    <div>
      <Row gutter={gutter}>
        {userList?.map((item: any, index: number) => (
          <Col span={colSpan} key={userList.id || index}>
            <UserCard {...item} type="partner" />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default YourParnersList;
