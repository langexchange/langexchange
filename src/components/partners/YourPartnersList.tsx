import { Col, Row, RowProps } from "antd";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import UserCard from "../UserCard";

interface YourPartnersListProps {
  colSpan?: number;
  gutter?: RowProps["gutter"];
  userList: any;
  refetch?: () => void;
}

const YourParnersList: React.FC<YourPartnersListProps> = ({
  colSpan = 6,
  gutter = [24, 24],
  userList,
  refetch,
}) => {
  return (
    <div className="pos-relative">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 450: 2, 700: 3, 1350: 4 }}
      >
        <Masonry gutter="12px">
          {userList?.map((item: any, index: number) => (
            <UserCard
              {...item}
              type="partner"
              refetch={refetch}
              key={item.id || index}
            />
          )) || []}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default YourParnersList;
