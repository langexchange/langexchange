import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Profile } from "../../services/profile/profileServices";
import UserCard from "../UserCard";

interface ExplorePartnerListProps {
  partnerList?: Profile[];
  colSpan?: number;
}

const ExplorePartnerList: React.FC<ExplorePartnerListProps> = ({
  colSpan = 6,
  partnerList = [],
}) => {
  return (
    <div>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 24 / colSpan }}
      >
        <Masonry gutter="16px" columnsCount={24 / colSpan}>
          {partnerList.map((item, index) => (
            <UserCard {...item} type="explore" key={index} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default ExplorePartnerList;
