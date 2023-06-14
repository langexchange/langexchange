import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Profile } from "../../services/profile/profileServices";
import UserCard from "../UserCard";

interface PartnerRequestListProps {
  colSpan?: number;
  partnerList?: Profile[];
  refetch?: () => void;
}

const PartnerRequestList: React.FC<PartnerRequestListProps> = ({
  colSpan = 6,
  partnerList = [],
  refetch,
}) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 440: 2, 550: 3, 1200: 24 / colSpan }}
    >
      <Masonry gutter="12px">
        {partnerList.map((item, index) => (
          <UserCard {...item} type="request" key={index} refetch={refetch} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default PartnerRequestList;
