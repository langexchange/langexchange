import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Profile } from "../../services/profile/profileServices";
import UserCard from "../UserCard";

interface ExplorePartnerListProps {
  partnerList?: Profile[];
  colSpan?: number;
  refetch?: () => void;
}

const ExplorePartnerList: React.FC<ExplorePartnerListProps> = ({
  colSpan = 6,
  partnerList = [],
  refetch,
}) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        350: 1,
        500: 2,
        800: 3,
        900: 3,
        1200: 24 / colSpan,
      }}
    >
      <Masonry gutter="12px">
        {partnerList.map((item, index) => (
          <UserCard {...item} type="explore" key={index} refetch={refetch} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ExplorePartnerList;
