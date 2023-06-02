import { Col, Divider, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ContentTitleWithSearch from "../../components/partners/ContentTitleWithSearch";
import ExplorePartnerList from "../../components/partners/ExplorePartnerList";
import FilterLine from "../../components/partners/FilterLine";
import {
  FriendSuggestionsQuery,
  useGetFriendSuggestionsQuery,
} from "../../services/friend/friendService";
import { Profile } from "../../services/profile/profileServices";

const defaultFilters: FriendSuggestionsQuery = {
  nativeLangs: [],
  targetLangs: [],
  countryCodes: [],
};

const PartnerExplorePage: React.FC = () => {
  const [t] = useTranslation(["commons"]);
  const [data, setData] = useState<Profile[]>([]);
  const [filters, setFilters] =
    useState<FriendSuggestionsQuery>(defaultFilters);
  const { data: suggestFriends, isLoading } = useGetFriendSuggestionsQuery(
    filters,
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (!suggestFriends) return;
    setData(suggestFriends);
  }, [suggestFriends, isLoading]);

  const onSearch = (value: string) => {
    if (!suggestFriends) return;

    if (!value) {
      setData(suggestFriends);
      return;
    }
    const newData = suggestFriends?.filter((item) => {
      const names = [
        item.firstName,
        item.lastName,
        `${item.firstName} ${item.lastName}`,
        `${item.lastName} ${item.firstName}`,
      ];
      return names.some((name) =>
        name.toLowerCase().includes(value.toLowerCase())
      );
    });
    setData(newData);
  };

  return (
    <Col
      span={18}
      className="auto-hide-scroll scroll-style-1 height-full pb-5 overflow-x-hidden"
    >
      <ContentTitleWithSearch title={t("You may know")} onSearch={onSearch} />
      <FilterLine defaultFilters={defaultFilters} setFilters={setFilters} />
      <Divider plain />
      <Skeleton loading={isLoading} active>
        <ExplorePartnerList colSpan={6} partnerList={data} />
      </Skeleton>
    </Col>
  );
};

export default PartnerExplorePage;
