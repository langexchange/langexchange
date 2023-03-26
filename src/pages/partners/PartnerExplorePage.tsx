import { Col, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ContentTitleWithSearch from "../../components/partners/ContentTitleWithSearch";
import ExplorePartnerList from "../../components/partners/ExplorePartnerList";
import FilterLine from "../../components/partners/FilterLine";
import { selectCredentalProfile } from "../../features/profile/profileSlice";
import { useAppSelector } from "../../hooks/hooks";
import {
  FriendSuggestionsQuery,
  useGetFriendSuggestionsQuery,
} from "../../services/friend/friendService";

const PartnerExplorePage: React.FC = () => {
  const [t] = useTranslation(["commons"]);
  const currentProfile = useAppSelector(selectCredentalProfile);
  const [filters, setFilters] = useState<FriendSuggestionsQuery>({
    nativeLangs: [],
    targetLangs: [],
    countryCodes: currentProfile?.country ? [currentProfile.country] : [],
  });
  const { data: suggestFriends, isLoading } = useGetFriendSuggestionsQuery(
    filters,
    {
      skip: filters.countryCodes.length === 0,
      refetchOnMountOrArgChange: true,
    }
  );
  useEffect(() => {
    if (currentProfile) {
      setFilters((prev) => ({
        ...prev,
        countryCodes: currentProfile?.country ? [currentProfile.country] : [],
      }));
    }
  }, [currentProfile]);

  return (
    <Col
      span={18}
      className="auto-hide-scroll scroll-style-1 height-full pb-5 overflow-x-hidden"
    >
      <ContentTitleWithSearch title={t("You may know")} />
      <FilterLine />
      <Skeleton loading={isLoading} active>
        <ExplorePartnerList colSpan={8} partnerList={suggestFriends} />
      </Skeleton>
    </Col>
  );
};

export default PartnerExplorePage;
