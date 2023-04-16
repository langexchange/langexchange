import { Col, Divider, Skeleton } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ContentTitleWithSearch from "../../components/partners/ContentTitleWithSearch";
import ExplorePartnerList from "../../components/partners/ExplorePartnerList";
import FilterLine from "../../components/partners/FilterLine";
import {
  FriendSuggestionsQuery,
  useGetFriendSuggestionsQuery,
} from "../../services/friend/friendService";

const defaultFilters: FriendSuggestionsQuery = {
  nativeLangs: [],
  targetLangs: [],
  countryCodes: [],
};

const PartnerExplorePage: React.FC = () => {
  const [t] = useTranslation(["commons"]);
  const [filters, setFilters] =
    useState<FriendSuggestionsQuery>(defaultFilters);
  const { data: suggestFriends, isLoading } = useGetFriendSuggestionsQuery(
    filters,
    { refetchOnMountOrArgChange: true }
  );

  return (
    <Col
      span={18}
      className="auto-hide-scroll scroll-style-1 height-full pb-5 overflow-x-hidden"
    >
      <ContentTitleWithSearch title={t("You may know")} />
      <FilterLine defaultFilters={defaultFilters} setFilters={setFilters} />
      <Divider plain />
      <Skeleton loading={isLoading} active>
        <ExplorePartnerList colSpan={6} partnerList={suggestFriends} />
      </Skeleton>
    </Col>
  );
};

export default PartnerExplorePage;
